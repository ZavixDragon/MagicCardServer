class InputUsername {
    constructor() {
        this.username = getCookie("username");
        if (this.username === undefined)
            this.username = "";
    }

    initialize() {
        let usernameInput = CreateTextInput();
        new ChangeEvent((event) => {
            this.username = usernameInput.getElement().value
            putCookie("username", this.username);
        }).attach(usernameInput);
        new Value(this.username).attach(usernameInput);
        return usernameInput;
    }
}