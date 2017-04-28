class InputPassword {
    constructor() {
        this.password = document.cookie.split("=")[1].split(";")[0];
    }

    initialize() {
        let passwordInput = CreatePasswordInput();
        new ChangeEvent((event) => {
            this.password = passwordInput.getElement().value
            document.cookie = "password=" + this.password;
        }).attach(passwordInput);
        new Value(this.password).attach(passwordInput);
        return passwordInput;
    }
}