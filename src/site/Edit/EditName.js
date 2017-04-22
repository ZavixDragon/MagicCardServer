//requires OOJscript.js

function editNameOnLoad() {
    let element = new EditName().initialize();
    document.body.appendChild(element.arise());
}

class EditName {
    constructor() {
        this.name = "";
    }

    initialize() {
        this.textInput = CreateTextInput();
        new ChangeEvent((event) => this.name = this.textInput.getElement().value).attach(this.textInput);
        return this.textInput;
    }

    setName(name) {
        this.name = name;
        this.textInput.getElement().value = name;
    }
}