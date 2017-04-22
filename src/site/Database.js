class Repo {
    constructor() {
        this.path = "http://127.0.0.2:5984/cards/";
    }

    write(card) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => console.log(request.responseText);
        request.open("PUT", this.path + card._id, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(card));
    }

    read(cardId, callback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => callback(JSON.parse(request.responseText));
        request.open("GET", this.path + cardId, true);
        request.send();
    }

    readAll(singleCardCallback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState != 4  || request.status != 200)
                return;
            let rows = JSON.parse(request.responseText).rows;
            for (let card of rows)
                this.read(card.id, singleCardCallback);
        };
        request.open("GET", this.path + "_all_docs", true);
        request.send(null);
    }
}

