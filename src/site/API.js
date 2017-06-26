class API {
    constructor() {
        this.path = 'http://52.43.242.81:9039/';
    }

    putCard(card, username, password) {
        let putRequest = {};
        putRequest.Username = username;
        putRequest.Password = password;
        putRequest.Bucket = "custom-magic-sets";
        putRequest.Id = card.Id;
        putRequest.Content = card;
        excuteJsonRequest("put", putRequest, x => console.log(x));
    }

    putImage(image, id, username, password) {
        let putRequest = {};
        putRequest.Username = username;
        putRequest.Password = password;
        putRequest.Bucket = "enigma-dragons-images";
        putRequest.Id = id;
        putRequest.Content = image;
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => console.log(request);
        request.open("POST", this.path + "put", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(putRequest));
    }

    getCard(cardId, callback, imageCallback) {
        let getRequest = {};
        getRequest.Bucket = "custom-magic-sets";
        getRequest.Id = cardId;
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState != 4  || request.status != 200)
                return;
            let card = JSON.parse(request.responseText);
            callback(card);
            getImage(card.imageId, imageCallback);
        };
        request.open("POST", this.path + "get", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(getRequest));
    }

    getImage(imageId, callback) {
        let getRequest = {};
        getRequest.Bucket = "enigma-dragons-images";
        getRequest.Id = imageId;
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState != 4  || request.status != 200)
                return;
            callback(JSON.parse(request.responseText));
        };
        request.open("POST", this.path + "get", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(getRequest));
    }

    getAllCards(singleCardCallback) {
        let getRequest = {};
        getRequest.Bucket = "custom-magic-sets";
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState != 4  || request.status != 200)
                return;
            this.ids = JSON.parse(request.responseText);
            this.getNextCard(singleCardCallback);
            this.getNextCard(singleCardCallback);
            this.getNextCard(singleCardCallback);
            this.getNextCard(singleCardCallback);
        };
        request.open("POST", this.path + "list", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(getRequest));
    }

    removeCard(cardId, username, password) {

    }

    getNextCard(singleCardCallback) {
        if (this.ids.length === 0)
            return;
        let id = this.ids[0];
        this.ids.splice(0, 1);
        this.getCard(id, x => {
            this.getNextCard(singleCardCallback);
            singleCardCallback(x);
        })
    }

    excuteJsonRequest(endpoint, jsonRequest, callback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState != 4  || request.status != 200)
                return;
            callback(JSON.parse(request.responseText));
        };
        request.open("POST", this.path + endpoint, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(jsonRequest));
    }
}

