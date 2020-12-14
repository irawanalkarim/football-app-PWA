const dbPromised = idb.open("pwa-foot", 1, upgradeDb => {
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(team) {
    dbPromised
        .then(db => {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(team);
            store.put(team);
            return tx.complete;
        })
        .then(() => {
            alert('Club favorit berhasil ditambahkan ke daftar koleksi.');
            window.location.href = "./index.html#teams";
        });
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(db => {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(teams => {
                resolve(teams);
            });
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(db => {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(id);
            })
            .then(team => {
                resolve(team);
            });
    });
}

function deleteTeam(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(db => {
                var tx = db.transaction("teams", "readwrite");
                tx.objectStore("teams").delete(id);
                return tx;
            })
            .then(transaction => {
                if (transaction.complete) {
                    resolve(true);
                } else {
                    reject(new Error(transaction.onerror));
                }
            })
            .then(() => {
                alert('Club favorit telah dihapus dari daftar koleksi.');
                window.location.href = "./index.html#saved";
            });
    });
}