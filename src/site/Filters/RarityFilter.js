class RarityFilter {
    constructor(filters, reload) {
        this.filters = filters;
        this.reload = reload;
    }

    initialize() {
        let rarities = ["Common", "Uncommon", "Rare", "Mythic Rare"];
        let options = [];
        options.push(this.createTextOption("None"));
        for (let rarity of rarities)
            options.push(this.createTextOption(rarity));
        let comboBox = CreateComboBox(options);
        new ChangeEvent((event) => {
            if (comboBox.getElement().value === "None")
                delete this.filters.author;
            else
                this.filters["author"] = (card) => card.rarity === comboBox.getElement().value;
            this.reload();
        }).attach(comboBox);
        return comboBox;
    }

    createTextOption(text) {
        let option = CreateOption(text);
        new Text(text).attach(option);
        return option;
    }
}