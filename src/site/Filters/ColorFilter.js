class ColorFilter {
    constructor(filters, reload) {
        this.filters = filters;
        this.reload = reload;
        this.internalFilters = {};
    }

    initialize() {
        let container = CreateContainer([
            this.createButton("black"),
            this.createButton("blue"),
            this.createButton("green"),
            this.createButton("red"),
            this.createButton("white"),
        ]);
        new Style("flex-container-row").attach(container);
        return container;
    }

    createButton(color) {
        let button = CreateButton();
        new ExplicitStyle("background-image: url('" + resources.images[resources.symbols[color]] + "'); background-size: 30px;").attach(button);

        new Style("color-button flex-item").attach(button);
        new ClickEvent((event) => this.includesColor(button, color)).attach(button);

        return button;
    }

    includesColor(button, color) {
        button.getTraitByName("ClickEvent").remove(button.getElement());
        button.getTraitByName("Style").remove(button.getElement());

        new Style("color-button flex-item check-button").attach(button);
        new ClickEvent((event) => this.excludesColor(button, color)).attach(button);

        this.internalFilters[color] = (card) => this.doesCardContainColor(card, color);
        this.setFilters();
        this.reload();
    }

    excludesColor(button, color) {
        button.getTraitByName("ClickEvent").remove(button.getElement());
        button.getTraitByName("Style").remove(button.getElement());

        new Style("color-button flex-item x-button").attach(button);
        new ClickEvent((event) => this.indifferent(button, color)).attach(button);

        this.internalFilters[color] = (card) => !this.doesCardContainColor(card, color);
        this.setFilters();
        this.reload();
    }

    indifferent(button, color) {
        button.getTraitByName("ClickEvent").remove(button.getElement());
        button.getTraitByName("Style").remove(button.getElement());

        new Style("color-button flex-item").attach(button);
        new ClickEvent((event) => this.includesColor(button, color)).attach(button);

        delete this.internalFilters[color];
        this.setFilters();
        this.reload();
    }

    setFilters() {
        this.filters["Colors"] = (card) => {
            for (let filterKey of Object.keys(this.internalFilters)) {
                let filter = this.internalFilters[filterKey];
                if (!filter(card))
                    return false;
            }
            return true;
        }
    }

    doesCardContainColor(card, color) {
        let colorLetter = resources.symbols[color].substring(1, 2);
        if (card.cost.some(x => x.includes(colorLetter)))
            return true;
        let symbolsOfText = card.text.match(/(<[^>]*>)/g);
        if (symbolsOfText === null)
            return false;
        for (let symbol of symbolsOfText)
            if (symbol.includes(colorLetter))
                return true;
        return false;
    }
}