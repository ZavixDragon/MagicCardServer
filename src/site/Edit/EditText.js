//Requires OOJScript.js and Resources.js

function editTextOnLoad() {
    let elements = new EditText().initialize();
    document.body.appendChild(elements[0].arise());
    document.body.appendChild(elements[1].arise());
}

class EditText {
    constructor() {
        this.text = "";
        this.selectedIndex = 0;
    }

    initialize() {
        this.textArea = new Entity("textarea");
        new KeyUpEvent((event) => this.updateSelectedIndex()).attach(this.textArea);
        new MouseDownEvent((event) => this.updateSelectedIndex()).attach(this.textArea);
        new ChangeEvent((event) => this.text = this.textArea.getElement().value).attach(this.textArea);
        let buttons = CreateContainer([
            this.createButton(resources.mana.x, resources.images[resources.mana.x]),
            this.createButton(resources.mana.zero, resources.images[resources.mana.zero]),
            this.createButton(resources.mana.one, resources.images[resources.mana.one]),
            this.createButton(resources.mana.two, resources.images[resources.mana.two]),
            this.createButton(resources.mana.three, resources.images[resources.mana.three]),
            this.createButton(resources.mana.four, resources.images[resources.mana.four]),
            this.createButton(resources.mana.six, resources.images[resources.mana.six]),
            this.createButton(resources.mana.black, resources.images[resources.mana.black]),
            this.createButton(resources.mana.blue, resources.images[resources.mana.blue]),
            this.createButton(resources.mana.green, resources.images[resources.mana.green]),
            this.createButton(resources.mana.red, resources.images[resources.mana.red]),
            this.createButton(resources.mana.white, resources.images[resources.mana.white]),
            this.createButton(resources.mana.blackGreen, resources.images[resources.mana.blackGreen]),
            this.createButton(resources.mana.blackRed, resources.images[resources.mana.blackRed]),
            this.createButton(resources.mana.blueBlack, resources.images[resources.mana.blueBlack]),
            this.createButton(resources.mana.blueRed, resources.images[resources.mana.blueRed]),
            this.createButton(resources.mana.greenBlue, resources.images[resources.mana.greenBlue]),
            this.createButton(resources.mana.greenWhite, resources.images[resources.mana.greenWhite]),
            this.createButton(resources.mana.redGreen, resources.images[resources.mana.redGreen]),
            this.createButton(resources.mana.redWhite, resources.images[resources.mana.redWhite]),
            this.createButton(resources.mana.whiteBlack, resources.images[resources.mana.whiteBlack]),
            this.createButton(resources.mana.whiteBlue, resources.images[resources.mana.whiteBlue]),
            this.createButton(resources.mana.blackGeneric, resources.images[resources.mana.blackGeneric]),
            this.createButton(resources.mana.blueGeneric, resources.images[resources.mana.blueGeneric]),
            this.createButton(resources.mana.greenGeneric, resources.images[resources.mana.greenGeneric]),
            this.createButton(resources.mana.redGeneric, resources.images[resources.mana.redGeneric]),
            this.createButton(resources.mana.whiteGeneric, resources.images[resources.mana.whiteGeneric]),
        ]);
        return [this.textArea, buttons];
    }

    createButton(imageSignature, imageName) {
        let button = CreateButton(() => this.insertImage(imageSignature));
        let image = CreateImage(imageName);
        new Style("svg-button").attach(button);
        new Content(image).attach(button);
        return button;
    }

    insertImage(imageSignature) {
        let element = this.textArea.getElement();
        this.text = element.value.slice(0, this.selectedIndex) + imageSignature + element.value.slice(this.selectedIndex);
        element.value = this.text;
        element.selectionStart = this.selectedIndex + imageSignature.length;
        this.selectedIndex = this.selectedIndex + imageSignature.length;
        element.focus();
    }

    updateSelectedIndex() {
        if (!isNaN(this.textArea.getElement().selectionStart))
            this.selectedIndex = this.textArea.getElement().selectionStart;
    }

    setText(text) {
        this.text = text;
        this.textArea.getElement().value = text;
    }
 }