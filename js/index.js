//Solution Below

//Adding the DOMContentLoaded event listener to retrieve the DOM content
document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("github-form");
    let user = document.getElementById("user-list");
    let repos = document.getElementById("repos-list");
    let data;
    let name;
    console.log(form);

//submit event to enable user to search for users and repos
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      name = e.target.search.value;
      console.log(name);
      getUser();
      form.reset();
    });
  
// Using getUser functon to retrieve user from github database
    const getUser = () => {
      fetch(`https://api.github.com/search/users?q=${name}`)
        .then((resp) => resp.json())
        .then((userData) => {
          user.innerHTML = "";
          repos.innerHTML = "";
          data = userData;
          console.log(data);
          userInfo();
        });
    };
  
//Creating the userInfo function to display user details, including the user name, avatar, and link to profile
    const userInfo = () => {
      console.log(data.items[0].login);
      let userName = document.createElement("li");
      let avatar = document.createElement("li");
      let link = document.createElement("li");
      userName.append(data.items[0].login);
      avatar.innerHTML = `<img src = "${data.items[0].avatar_url}">`;
      link.append(data.items[0].url);
  
      user.appendChild(userName);
      user.appendChild(avatar);
      user.appendChild(link);
  
      console.log(userName);
      userName.addEventListener("click", () => {
        console.log(data.items[0].repos_url);
        fetchUserRepos();
      });
    };

//using fetchUserRepos function to fetch data on user repositories

    const fetchUserRepos = () => {
      fetch(`https://api.github.com/users/${name}/repos`)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          console.log(name);
          data.forEach((repo) => {
            if (repo.name) {
              let repoList = document.createElement("li");
              repoList.append(repo.name);
              repos.appendChild(repoList);
            }
          });
        });
    };
  });

