const card = document.querySelector('.card');
card.addEventListener('click', function (event) {
    if (event.target.closest('.card')) {
        window.open('https://discord.com/users/315698903146168341', '_blank');
    }
});

fetch("https://api.lanyard.rest/v1/users/315698903146168341")
    .then(response => response.json())
    .then(data => {
        document.getElementById("username").textContent = data.data.discord_user.username;
        document.getElementById("status").textContent = data.data.discord_status;
        document.getElementById("avatar").src = `https://cdn.discordapp.com/avatars/${data.data.discord_user.id}/${data.data.discord_user.avatar}.png`;
        const statusCircle = document.querySelector('.status-circle');
        switch (data.data.discord_status) {
            case 'online':
                statusCircle.classList.add('status-online');
                break;
            case 'idle':
                statusCircle.classList.add('status-idle');
                break;
            case 'dnd':
                statusCircle.classList.add('status-dnd');
                break;
            default:
                statusCircle.classList.add('status-offline');
        }
        const activitiesList = document.getElementById("activities");
        data.data.activities.forEach(activity => {
            const li = document.createElement("li");
            const activityIcon = activity.assets ? `<span class="activity-icon"><img src="https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png" alt="Activity Icon"></span>` : '';
            const startTime = activity.timestamps ? Math.round((Date.now() - activity.timestamps.start) / 60000) + ' minutes ago' : '';
            li.innerHTML = `${activityIcon}<span class="activity-name">${activity.name}</span><span class="activity-start-time">${startTime}</span>`;
            activitiesList.appendChild(li);
        });
    })
    .catch(error => console.error(error));