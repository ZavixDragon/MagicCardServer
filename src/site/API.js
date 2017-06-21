class API {
    constructor() {
        this.path = 'http://52.43.242.81:9039/';
    }

    writeCard(card, username, password) {
        let authorizedRequest = {};
        authorizedRequest.Username = username;
        authorizedRequest.Password = password;
        authorizedRequest.Id = card.Id;
        authorizedRequest.Content = card;
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => console.log(request);
        request.open("POST", this.path + "put", true);
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
        request.open("POST", this.path + "get", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send("{ id: \"" + cardId + "\"}");
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
        request.open("POST", this.path + "list", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send("{}");
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

