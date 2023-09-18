//select the div with a class of “overview”. This div is where your profile information will appear
const overview = document.querySelector(".overview");

//github username
const username = "nicolelaine";

//select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

//selects the section with a class of “repos” where all your repo information appears. 
const repoSection = document.querySelector(".repos");

//selects the section with a class of “repo-data” where the individual repo data will appear.
const repoData = document.querySelector(".repo-data");

//selects the back button to return to the main repo gallery 
const backButton = document.querySelector(".view-repos")

//selects input with the "seach by name" placeholder
const filterInput = document.querySelector(".filter-repos")


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
//getRepos();  Call the getRepos function to fetch the repositories

//function to display each repo on the page
const displayRepo = function (repos) {
    filterInput.classList.remove("hide"); //should show the search button at the top of the page
    for (let repo of repos) {
        const li = document.createElement("li");
        li.className = "repo";
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

//event listener for a click event on the the unordered list with a class of “repo-list."
  repoList.addEventListener("click", function (e) {
     if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        repoInformation(repoName);     }   
});

//async function to get specific repo information
const repoInformation = async function (repoName) {
  const res = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
   const repoInfo = await res.json();
   console.log(repoInfo);
   const fetchLanguages = await fetch (`https://api.github.com/repos/${username}/${repoName}/languages`);
   const languageData = await fetchLanguages.json();
   console.log(languageData);
   const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    console.log(languages);
    displayRepoInformation(repoInfo, languages);
};

//function to display the specific repo information
const displayRepoInformation = function (repoInfo, languages) {
    repoData.innerText = ``;
   const newDiv = document.createElement("div");
   newDiv.innerHTML = `
   <h3>Name: ${repoInfo.name}</h3>
       <p>Description: ${repoInfo.description}</p>
       <p>Default Branch: ${repoInfo.default_branch}</p>
       <p>Languages: ${languages.join(", ")}</p>
       <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
       `;
    repoData.append(newDiv);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    backButton.classList.remove("hide");
};

//event listener for the button to go back to the repo gallery
backButton.addEventListener("click", function () {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

//event listener to capture input in the search bar
filterInput.addEventListener("input", function (e) {
    const searchCapture = e.target.value.toLowerCase();
    console.log(searchCapture);
    const repos = document.querySelectorAll(".repo");
       repos.forEach(function(repo) {
        const lowercaseRepo = repo.innerText.toLowerCase();
        if (lowercaseRepo.includes(searchCapture)) {
           repo.classList.remove("hide");
        }   else {
           repo.classList.add("hide");
        }
       });
});