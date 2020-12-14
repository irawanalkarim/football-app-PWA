let base_url = "https://api.football-data.org/v2/";

function status(response) {
    if (response.status !== 200) {
        console.log(`Error : ${response.status}`);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log(`Error : ${error}`);
}

function getTeams() {

    if ('caches' in window) {
        caches.match(`${base_url}teams/`)
            .then(response => {
                if (response) {
                    response.json()
                        .then(data => {
                            let teamsHTML = "";
                            data.teams.forEach(team => {
                                teamsHTML += `
                                <tr>
                                    <td><img src="${team.crestUrl}" width="20px" alt="club-icon"></td>
                                    <td><a href="./teams.html?id=${team.id}">${team.name}</a></td>
                                    <td>${team.shortName}</td>
                                    <td>${team.tla}</td>
                                </tr>
                                `;
                            });
                            document.getElementById("rowTeams").innerHTML = teamsHTML;
                        })
                }
            })
    }

    fetch(`${base_url}teams/`, {
            method: "GET",
            headers: {
                "X-Auth-Token": "a6ba9bb5aa4546149242a3416e70d36e"
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            let teamsHTML = "";
            data.teams.forEach(team => {
                teamsHTML += `
                <tr>
                    <td><img src="${team.crestUrl}" width="20px" alt="club-icon"></td>
                    <td><a href="./teams.html?id=${team.id}">${team.name}</a></td>
                    <td>${team.shortName}</td>
                    <td>${team.tla}</td>
                </tr>
                `;
            });
            document.getElementById("rowTeams").innerHTML = teamsHTML;
        })
        .catch(error);
}

function getTeamById() {
    return new Promise(function(resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ('caches' in window) {
            caches.match(`${base_url}teams/${idParam}/`)
                .then(function(response) {
                    if (response) {
                        response.json()
                            .then(data => {
                                let teamHTML = `
                                <div class="col s12 m6">
                                    <img src="${data.crestUrl}" class="profil" width="50%" alt="club-icon">
                                </div>
                                <div class="col s12 m6">
                                    <div class="card">
                                        <div class="card-content">
                                            <span class="card-title">${data.name}</span>
                                            <p><b>Short Name :</b></p>
                                            <p>${data.shortName}</p>
                                            <p><b>Address :</b></p>
                                            <p>${data.address}</p>
                                            <p><b>Email :</b></p>
                                            <p>${data.email}</p>
                                            <p><b>Website :</b></p>
                                            <p>${data.website}</p>
                                            <p><b>Phone :</b></p>
                                            <p>${data.phone}</p>
                                            <p><b>Club Colors :</b></p>
                                            <p>${data.clubColors}</p>
                                            <p><b>Venue :</b></p>
                                            <p>${data.venue}</p>
                                        </div>
                                    </div>
                                </div>
                                `;
                                document.getElementById("team-information").innerHTML = teamHTML;
                                resolve(data);
                            });
                    }
                });
        }

        fetch(`${base_url}teams/${idParam}/`, {
                method: "GET",
                headers: {
                    "X-Auth-Token": "a6ba9bb5aa4546149242a3416e70d36e"
                }
            })
            .then(status)
            .then(json)
            .then(data => {
                console.log(data);
                let teamHTML = `
                    <div class="col s12 m6">
                        <img src="${data.crestUrl}" class="profil" width="50%" alt="club-icon">
                    </div>
                    <div class="col s12 m6">
                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">${data.name}</span>
                                <p><b>Short Name :</b></p>
                                <p>${data.shortName}</p>
                                <p><b>Address :</b></p>
                                <p>${data.address}</p>
                                <p><b>Email :</b></p>
                                <p>${data.email}</p>
                                <p><b>Website :</b></p>
                                <p>${data.website}</p>
                                <p><b>Phone :</b></p>
                                <p>${data.phone}</p>
                                <p><b>Club Colors :</b></p>
                                <p>${data.clubColors}</p>
                                <p><b>Venue :</b></p>
                                <p>${data.venue}</p>
                            </div>
                        </div>
                    </div>
                    `;
                document.getElementById("team-information").innerHTML = teamHTML;
                resolve(data);
            });
    });
}

function getSavedTeams() {
    getAll()
        .then(teams => {
            console.log(teams);
            let teamsHTML = "";
            teams.forEach(team => {
                teamsHTML += `
                    <tr>
                        <td><img src="${team.crestUrl}" width="20px" alt="club-icon"></td>
                        <td><a href="./teams.html?id=${team.id}&saved=true">${team.name}</a></td>
                        <td>${team.shortName}</td>
                        <td>${team.tla}</td>
                    </tr>
                `;
            });
            document.getElementById("rowTeams").innerHTML = teamsHTML;
        });
}

function getSavedTeamById() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    getTeamById(idParam)
        .then(team => {
            let teamHTML = `
            <div class="col s12 m6">
                <img src="${team.crestUrl}" class="profil" width="50%" alt="club-icon">
            </div>
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">${team.name}</span>
                        <p><b>Short Name :</b></p>
                        <p>${team.shortName}</p>
                        <p><b>Address :</b></p>
                        <p>${team.address}</p>
                        <p><b>Email :</b></p>
                        <p>${team.email}</p>
                        <p><b>Website :</b></p>
                        <p>${team.website}</p>
                        <p><b>Phone :</b></p>
                        <p>${team.phone}</p>
                        <p><b>Club Colors :</b></p>
                        <p>${team.clubColors}</p>
                        <p><b>Venue :</b></p>
                        <p>${team.venue}</p>
                    </div>
                </div>
            </div>
            `;
            document.getElementById("team-information").innerHTML = teamHTML;
        });
}

function getStandings() {

    if ('caches' in window) {
        caches.match(`${base_url}competitions/2021/standings/`).then(response => {
            if (response) {
                response.json().then(data => {
                    console.log(data);
                    data.standings.forEach(standing => {
                        console.log(standing.type);
                        let rowStandingsHTML = "";
                        standing.table.forEach(team => {
                            console.log(team);
                            rowStandingsHTML += `
                            <tr>
                                <td><img src="${team.team.crestUrl}" width="20px" alt="club-icon"></td>
                                <td>${team.team.name}</td>
                                <td>${team.playedGames}</td>
                                <td>${team.won}</td>
                                <td>${team.draw}</td>
                                <td>${team.lost}</td>
                                <td>${team.points}</td>
                                <td>${team.goalsFor}</td>
                                <td>${team.goalsAgainst}</td>
                                <td>${team.goalDifference}</td>
                            </tr>
                            `;
                        });
                        document.getElementById("rowStandings").innerHTML = rowStandingsHTML;
                    })
                })
            }
        })
    }

    fetch(`${base_url}competitions/2021/standings/`, {
            method: "GET",
            headers: {
                "X-Auth-Token": "a6ba9bb5aa4546149242a3416e70d36e"
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            console.log(data);
            data.standings.forEach(standing => {
                console.log(standing.type);
                let rowStandingsHTML = "";
                standing.table.forEach(team => {
                    console.log(team);
                    rowStandingsHTML += `
                    <tr>
                        <td><img src="${team.team.crestUrl}" width="20px" alt="club-icon"></td>
                        <td>${team.team.name}</td>
                        <td>${team.playedGames}</td>
                        <td>${team.won}</td>
                        <td>${team.draw}</td>
                        <td>${team.lost}</td>
                        <td>${team.points}</td>
                        <td>${team.goalsFor}</td>
                        <td>${team.goalsAgainst}</td>
                        <td>${team.goalDifference}</td>
                    </tr>
                    `;
                });
                document.getElementById("rowStandings").innerHTML = rowStandingsHTML;
            })
        })
        .catch(error);
}