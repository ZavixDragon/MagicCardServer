//Requires OOJScript.js

function editTypesOnLoad() {
    let elements = new EditTypes().initialize();
    document.body.appendChild(elements[0].arise());
    document.body.appendChild(elements[1].arise());
}

class EditTypes {
    constructor() {
        this.types = [];

        this.typeOptions = ["-", "Creature", "Sorcery", "Instant", "Enchantment", "Land", "Basic", "Legendary", "Planeswalker"];
    }

    initialize() {
        let currentTypes = CreateContainer();
        this.typeButtons = currentTypes.getTraitByName("Contents");
        this.options = CreateComboBox(this.typeOptions.map((option) => this.createOption(option)));
        new ChangeEvent((event) => this.addType()).attach(this.options);
        return [currentTypes, this.options];
    }

    createOption(value) {
        let option = CreateOption(value);
        new Text(value).attach(option);
        return option;
    }

    addType() {
        let element = this.options.getElement();
        let selectedValue = element.options[element.selectedIndex].value;
        this.addSpecificType(selectedValue);
    }

    addSpecificType(value) {
        let contents = this.options.getTraitByName("Contents");

        this.types.push(value);

        for (let entity of contents.entities)
            if (entity.getElement().value === value)
                contents.drop(entity);

        let button = new Entity("button");
        new ClickEvent((event) => this.removeType(button, value)).attach(button);
        new Style("list-button").attach(button);
        new Text(value).attach(button);
        this.typeButtons.add(button);
    }

    removeType(button, value) {
        this.typeButtons.drop(button);
        this.types.remove(value);
        this.options.getTraitByName("Contents").add(this.createOption(value));
    }

    setTypes(types) {
        for (let type of types)
            this.addSpecificType(type);
    }
}