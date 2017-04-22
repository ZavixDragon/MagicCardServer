// Requires OOJScript

function editLoyaltyOnLoad() {
    let element = new EditLoyalty().initialize();
    document.body.appendChild(element.arise());
}

class EditLoyalty {
    constructor() {
        this.loyalty = 0;
    }

    initialize() {
        this.loyaltyInput = CreateTextInput();
        new ChangeEvent((event) => this.loyalty = this.loyaltyInput.getElement().value).attach(this.loyaltyInput);
        new Style("number-input").attach(this.loyaltyInput);
        new MaxLength(3).attach(this.loyaltyInput);
        return this.loyaltyInput;
    }

    setLoyalty(loyalty) {
        this.loyaltyInput.getElement().value = loyalty;
        this.loyalty = loyalty;
    }
}
