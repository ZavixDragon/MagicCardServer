class AuthorFilter {
    constructor(filters, reload) {
        this.filters = filters;
        this.reload = reload;
    }

    initialize() {
        let authors = ["Caleb", "Noah"];
        let options = [];
        options.push(this.createTextOption("None"));
        for (let author of authors)
            options.push(this.createTextOption(author));
        let comboBox = CreateComboBox(options);
        new ChangeEvent((event) => {
            if (comboBox.getElement().value === "None")
                delete this.filters.author;
            else
                this.filters["author"] = (card) => card.author === comboBox.getElement().value;
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