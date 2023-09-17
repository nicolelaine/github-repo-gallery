//select the div with a class of “overview”. This div is where your profile information will appear
const overview = document.querySelector(".overview");

//github username
const username = "nicolelaine";

//select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

//GLOBAL VARIABLES END HERE

//async function to grab userdata off github using their API
const getUser = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const user = await res.json();
   // console.log(user);
    displayUser(user); //call function to display user data, passing it the JSON data
};
getUser();

// function to display the user on the repo gallery site
const displayUser = function (user) {
   const userInfo = document.createElement("div");
   userInfo.className = "user-info";
   userInfo.innerHTML = `
   <figure>
   <img alt="user avatar" src=${user.avatar_url} />
 </figure>
 <div>
   <p><strong>Name:</strong> ${user.name}</p>
   <p><strong>Bio:</strong> ${user.bio}</p>
   <p><strong>Location:</strong> ${user.location}</p>
   <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
 </div> 
   `;
   overview.append(userInfo);
   getRepos(); //call to get the repos
};

//async function to fetch the repos
const getRepos = async function () {
  const res = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`)
  const repos = await res.json();
  console.log(repos);
  displayRepo(repos); //call to display the repos
};
//getRepos(); // Call the getRepos function to fetch the repositories

//function to display each repo on the page
const displayRepo = function (repos) {
    for (let repo of repos) {
        const li = document.createElement("li");
        li.className = "repo";
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};