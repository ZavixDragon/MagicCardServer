class InputPassword {
    constructor() {
        this.password = getCookie("password");
        if (this.password === undefined)
            this.password = "";
    }

    initialize() {
        let passwordInput = CreatePasswordInput();
        new ChangeEvent((event) => {
            this.password = passwordInput.getElement().value
            putCookie("password", this.password);
        }).attach(passwordInput);
        new Value(this.password).attach(passwordInput);
        return passwordInput;
    }
}