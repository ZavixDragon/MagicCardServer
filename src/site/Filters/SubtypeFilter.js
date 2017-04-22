class SubtypeFilter {
    constructor(filters, reload) {
        this.filters = filters;
        this.reload = reload;
    }

    initialize() {
        let input = CreateTextInput();
        new ChangeEvent((event) => {
           if (input.getElement().value === undefined || input.getElement().value === "")
               delete this.filters.subtype;
           else
               this.filters["subtype"] = (card) => card.subtypes.some(x => x.toLowerCase() === input.getElement().value.toLowerCase());
           this.reload();
        }).attach(input);
        return input;
    }
}