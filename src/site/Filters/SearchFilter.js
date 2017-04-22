class SearchFilter {
    constructor(filters, reload) {
        this.filters = filters;
        this.reload = reload;
    }

    initialize() {
        let input = CreateTextInput();
        new ChangeEvent((event) => {
            if (input.getElement().value === undefined || input.getElement().value === "")
                delete this.filters.search;
            else
                this.filters["search"] = card => card.name.toLowerCase().includes(input.getElement().value.toLowerCase())
                    || card.text.toLowerCase().includes(input.getElement().value.toLowerCase());
            this.reload();
        }).attach(input);
        return input;
    }
}