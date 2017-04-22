//Requires OOJScript.js

function editRarityOnLoad() {
    let element = new EditRarity().initialize();
    document.body.appendChild(element.arise());
}

class EditRarity {
    constructor() {
        this.rarity = "Common";
    }

    initialize() {
        this.comboBox = CreateComboBox([
            this.createOption("Common"),
            this.createOption("Uncommon"),
            this.createOption("Rare"),
            this.createOption("Mythic Rare"),
        ]);
        new ChangeEvent((event) => this.rarity = this.comboBox.getElement().value).attach(this.comboBox);
        return this.comboBox;
    }

    createOption(name) {
        let option = CreateOption(name);
        new Text(name).attach(option);
        return option;
    }

    setRarity(rarity) {
        this.rarity = rarity;
        this.comboBox.getElement().value = rarity;
    }
}