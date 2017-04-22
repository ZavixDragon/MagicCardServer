class CMCFilter {
    constructor(filters, reload) {
        this.filters = filters;
        this.reload = reload;
    }

    initialize() {
        let cmcInput = CreateNumberInput();
        new ChangeEvent((event) => {
            if (cmcInput.getElement().value === undefined || cmcInput.getElement().value === "")
                delete this.filters.cmc;
            else
                this.filters["cmc"] = (card) => this.calculateCosts(card) === parseInt(cmcInput.getElement().value);
            this.reload();
        }).attach(cmcInput);
        return cmcInput;
    }

    calculateCosts(card) {
        let cost = 0;
        for (let symbol of card.cost)
            cost += this.calculateCost(symbol)
        return cost;
    }

    calculateCost(symbol) {
        if (isNaN(symbol.substring(1, symbol.length - 1)))
            return 1;
        return parseInt(symbol.substring(1, symbol.length - 1));
    }
}
