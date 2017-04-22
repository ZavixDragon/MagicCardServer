// Requires OOJScript

function editStatsOnLoad() {
    let elements = new EditStats().initialize();
    document.body.appendChild(elements[0].arise());
    document.body.appendChild(elements[1].arise());
}

class EditStats {
    constructor() {
        this.power = 0;
        this.toughness = 0;
    }

    initialize() {
        this.powerInput = CreateTextInput();
        new ChangeEvent((event) => this.power = this.powerInput.getElement().value).attach(this.powerInput);
        this.toughnessInput = CreateTextInput();
        new ChangeEvent((event) => this.toughness = this.toughnessInput.getElement().value).attach(this.toughnessInput);
        let style = new Style("number-input");
        style.attach(this.powerInput);
        style.attach(this.toughnessInput);
        let maxLength = new MaxLength(3);
        maxLength.attach(this.powerInput);
        maxLength.attach(this.toughnessInput);
        return [this.powerInput, this.toughnessInput];
    }

    setStats(power, toughness) {
        this.powerInput.getElement().value = power;
        this.power = power;
        this.toughnessInput.getElement().value = toughness;
        this.toughness = toughness;
    }
}