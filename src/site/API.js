class API {
    constructor() {
        let getUrl = window.location;
        this.path = getUrl .protocol + "//" + getUrl.host + "/";
    }

    writeCard(card, password) {
        let authorizedRequest = {};
        authorizedRequest.password = password;
        authorizedRequest.card = card;
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => console.log(request.responseText);
        request.open("POST", this.path + "Cards/writeCard", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(authorizedRequest));
    }

    readCard(cardId, callback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState != 4  || request.status != 200)
                return;
            callback(JSON.parse(request.responseText));
        };
        request.open("POST", this.path + "Cards/readCard", true);
        request.setRequestHeader("Content-type", "text/plain");
        request.send(cardId);
    }

    readAllCards(singleCardCallback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState != 4  || request.status != 200)
                return;
            this.ids = JSON.parse(request.responseText);
            this.readNextCard(singleCardCallback);
            this.readNextCard(singleCardCallback);
            this.readNextCard(singleCardCallback);
            this.readNextCard(singleCardCallback);
        };
        request.open("GET", this.path + "Cards/readAllCards", true);
        request.send();
    }

    readNextCard(singleCardCallback) {
        if (this.ids.length === 0)
            return;
        let id = this.ids[0];
        this.ids.splice(0, 1);
        this.readCard(id, x => {
            this.readNextCard(singleCardCallback);
            singleCardCallback(x);
        })
    }
}

