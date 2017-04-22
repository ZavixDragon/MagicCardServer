//Requires OOJScript.js

function editSubtypesOnLoad() {
    let elements = new EditSubtypes().initialize();
    document.body.appendChild(elements[0].arise());
    document.body.appendChild(elements[1].arise());
    document.body.appendChild(elements[2].arise());
}

class EditSubtypes {
    constructor() {
        this.subtypes = [];
    }

    initialize() {
        this.subtypeInput = CreateTextInput();
        let buttons = CreateContainer();
        this.subtypeButtons = buttons.getTraitByName("Contents");

        let addButton = CreateButton(() => this.addSubtype());
        new Text("Add").attach(addButton);
        return [this.subtypeInput, addButton, buttons];
    }

    addSubtype() {
        let input = this.subtypeInput.getElement()
        let value = input.value;
        input.value = "";
        this.addSpecificSubtype(value);
    }

    addSpecificSubtype(subtype) {
        this.subtypes.push(subtype);
        let button = new Entity("button");
        new ClickEvent((event) => this.removeSubtype(button, subtype)).attach(button);
        new Text(subtype).attach(button);
        new Style("list-button").attach(button);
        this.subtypeButtons.add(button);
    }

    removeSubtype(button, value) {
        this.subtypeButtons.drop(button);
        this.subtypes.remove(value);
    }

    setSubtypes(subtypes) {
        for (let subtype of subtypes)
            this.addSpecificSubtype(subtype);
    }
}
