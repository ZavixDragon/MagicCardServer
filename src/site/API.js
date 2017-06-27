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
        this.executeJsonRequest("put", putRequest, x => console.log(x));
    }

    putImage(image, id, username, password) {
        let putRequest = {};
        putRequest.Username = username;
        putRequest.Password = password;
        putRequest.Bucket = "enigma-dragons-images";
        putRequest.Id = id;
        putRequest.Content = image;
        this.executeJsonRequest("put", putRequest, x => console.log(x))
    }

    getCard(cardId, callback, imageCallback) {
        let getRequest = {};
        getRequest.Bucket = "custom-magic-sets";
        getRequest.Id = cardId;
        this.executeJsonRequest("get", getRequest, x => {
            callback(x);
            this.getImage(x.imageId, imageCallback);
        });
    }

    getImage(imageId, callback) {
        let getRequest = {};
        getRequest.Bucket = "enigma-dragons-images";
        getRequest.Id = imageId;
        this.executeJsonRequest("get", getRequest, x => callback(x));
    }

    getAllCards(singleCardCallback) {
        let getRequest = {};
        getRequest.Bucket = "custom-magic-sets";
        this.executeJsonRequest("list", getRequest, x => {
            this.ids = x;
            this.getNextCard(singleCardCallback);
            this.getNextCard(singleCardCallback);
            this.getNextCard(singleCardCallback);
            this.getNextCard(singleCardCallback);
        });
    }

    removeCard(cardId, username, password) {
        let removeRequest = {};
        removeRequest.Username = username;
        removeRequest.Password = password;
        removeRequest.Bucket = "custom-magic-sets";
        removeRequest.Id = cardId;
        this.executeJsonRequest("remove", removeRequest, x => console.log(x));
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

    executeJsonRequest(endpoint, jsonRequest, callback) {
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

