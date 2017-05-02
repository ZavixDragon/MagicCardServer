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
            this.createButton(resources.symbols.tap, resources.images[resources.symbols.tap]),
            this.createButton(resources.symbols.untap, resources.images[resources.symbols.untap]),
            this.createButton(resources.symbols.zero, resources.images[resources.symbols.zero]),
            this.createButton(resources.symbols.one, resources.images[resources.symbols.one]),
            this.createButton(resources.symbols.two, resources.images[resources.symbols.two]),
            this.createButton(resources.symbols.three, resources.images[resources.symbols.three]),
            this.createButton(resources.symbols.four, resources.images[resources.symbols.four]),
            this.createButton(resources.symbols.five, resources.images[resources.symbols.five]),
            this.createButton(resources.symbols.six, resources.images[resources.symbols.six]),
            this.createButton(resources.symbols.seven, resources.images[resources.symbols.seven]),
            this.createButton(resources.symbols.eight, resources.images[resources.symbols.eight]),
            this.createButton(resources.symbols.nine, resources.images[resources.symbols.nine]),
            this.createButton(resources.symbols.ten, resources.images[resources.symbols.ten]),
            this.createButton(resources.symbols.eleven, resources.images[resources.symbols.eleven]),
            this.createButton(resources.symbols.twelve, resources.images[resources.symbols.twelve]),
            this.createButton(resources.symbols.thirteen, resources.images[resources.symbols.thirteen]),
            this.createButton(resources.symbols.fourteen, resources.images[resources.symbols.fourteen]),
            this.createButton(resources.symbols.fifteen, resources.images[resources.symbols.fifteen]),
            this.createButton(resources.symbols.sixteen, resources.images[resources.symbols.sixteen]),
            this.createButton(resources.symbols.seventeen, resources.images[resources.symbols.seventeen]),
            this.createButton(resources.symbols.eighteen, resources.images[resources.symbols.eighteen]),
            this.createButton(resources.symbols.nineteen, resources.images[resources.symbols.nineteen]),
            this.createButton(resources.symbols.twenty, resources.images[resources.symbols.twenty]),
            this.createButton(resources.symbols.half, resources.images[resources.symbols.half]),
            this.createButton(resources.symbols.infinity, resources.images[resources.symbols.infinity]),
            this.createButton(resources.symbols.X, resources.images[resources.symbols.X]),
            this.createButton(resources.symbols.Y, resources.images[resources.symbols.Y]),
            this.createButton(resources.symbols.Z, resources.images[resources.symbols.Z]),
            this.createButton(resources.symbols.black, resources.images[resources.symbols.black]),
            this.createButton(resources.symbols.blue, resources.images[resources.symbols.blue]),
            this.createButton(resources.symbols.green, resources.images[resources.symbols.green]),
            this.createButton(resources.symbols.red, resources.images[resources.symbols.red]),
            this.createButton(resources.symbols.white, resources.images[resources.symbols.white]),
            this.createButton(resources.symbols.blackGreen, resources.images[resources.symbols.blackGreen]),
            this.createButton(resources.symbols.blackRed, resources.images[resources.symbols.blackRed]),
            this.createButton(resources.symbols.blueBlack, resources.images[resources.symbols.blueBlack]),
            this.createButton(resources.symbols.blueRed, resources.images[resources.symbols.blueRed]),
            this.createButton(resources.symbols.greenBlue, resources.images[resources.symbols.greenBlue]),
            this.createButton(resources.symbols.greenWhite, resources.images[resources.symbols.greenWhite]),
            this.createButton(resources.symbols.redGreen, resources.images[resources.symbols.redGreen]),
            this.createButton(resources.symbols.redWhite, resources.images[resources.symbols.redWhite]),
            this.createButton(resources.symbols.whiteBlack, resources.images[resources.symbols.whiteBlack]),
            this.createButton(resources.symbols.whiteBlue, resources.images[resources.symbols.whiteBlue]),
            this.createButton(resources.symbols.blackGeneric, resources.images[resources.symbols.blackGeneric]),
            this.createButton(resources.symbols.blueGeneric, resources.images[resources.symbols.blueGeneric]),
            this.createButton(resources.symbols.greenGeneric, resources.images[resources.symbols.greenGeneric]),
            this.createButton(resources.symbols.redGeneric, resources.images[resources.symbols.redGeneric]),
            this.createButton(resources.symbols.whiteGeneric, resources.images[resources.symbols.whiteGeneric]),
            this.createButton(resources.symbols.blackPhyrexian, resources.images[resources.symbols.blackPhyrexian]),
            this.createButton(resources.symbols.bluePhyrexian, resources.images[resources.symbols.bluePhyrexian]),
            this.createButton(resources.symbols.greenPhyrexian, resources.images[resources.symbols.greenPhyrexian]),
            this.createButton(resources.symbols.redPhyrexian, resources.images[resources.symbols.redPhyrexian]),
            this.createButton(resources.symbols.whitePhyrexian, resources.images[resources.symbols.whitePhyrexian]),
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