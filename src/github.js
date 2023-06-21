const reposContainer = document.getElementById("repos");

async function getRepos() {
    try {
        const response = await fetch("https://api.github.com/users/PatrykBr/repos");
        const data = await response.json();

        const fragment = document.createDocumentFragment();

        for (const { name, html_url, stargazers_count, forks_count, language = "N/A", updated_at } of data) {
            const repoBox = document.createElement("div");
            repoBox.classList.add("repo-box");
            repoBox.innerHTML = `
                <div class="name-and-language">
                    <a href="${html_url}" target="_blank">${name}</a>
                </div>
                <div class="stars-and-forks">
                    <div class="stars-container">
                        <p class="stars">${stargazers_count}</p>
                        <img src="https://img.icons8.com/ios/FFFFFF/1200/star--v1.png" alt="Star" width="18">
                    </div>
                    <div class="forks-container">
                        <p class="forks">${forks_count}</p>
                        <img src="https://img.icons8.com/ios/FFFFFF/1200/code-fork.png" alt="Fork" width="18">
                    </div>
                </div>
                <p class="language">${language}</p>
                <p class="last-updated">Last updated: ${new Date(updated_at).toLocaleDateString()}</p>
            `;
            fragment.appendChild(repoBox);
        }

        reposContainer.appendChild(fragment);
    } catch (error) {
        console.error(error);
    }
}

getRepos();