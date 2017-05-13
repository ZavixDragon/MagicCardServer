class TypeFilter {
    constructor(filters, reload) {
        this.filters = filters;
        this.reload = reload;
        this.internalFilters = {};
    }

    initialize() {
        let container = CreateContainer([
            this.createTypeOption("Creature"),
            this.createTypeOption("Sorcery"),
            this.createTypeOption("Instant"),
            this.createTypeOption("Enchantment"),
            this.createTypeOption("Land"),
            this.createTypeOption("Basic"),
            this.createTypeOption("Legendary"),
            this.createTypeOption("Planeswalker"),
            this.createTypeOption("Artifact"),
        ]);
        new Style("flex-container-column flex-left").attach(container);
        return container;
    }

    createTypeOption(option) {
        let checkbox = CreateCheckbox();
        new ChangeEvent((event) => {
            if (checkbox.getElement().checked)
                this.internalFilters[option] = (card) => card.types.some(x => x === option);
            else
                delete this.internalFilters[option];
            this.setFilters();
            this.reload();
        }).attach(checkbox);
        let span = CreateSpan();
        let label = new Entity("label");
        new Contents([checkbox, span]).attach(label);
        let innerLabel = CreateLabel(option);
        new Text(option).attach(innerLabel);
        new Content(innerLabel).attach(span);
        new Style("checkbox").attach(label);
        return label;
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
}