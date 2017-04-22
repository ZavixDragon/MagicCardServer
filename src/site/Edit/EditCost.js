//Requires Resources.js, OOJScript.js

function editCostOnLoad() {
    let elements = new EditCost().initialize();
    for (let element of elements)
        document.body.appendChild(element.arise());
}

class EditCost {
    constructor() {
        this.cost = [];
    }

    initialize() {
        let options = this.createOptions();
        let currentShownCosts = CreateContainer();
        this.costButtons = currentShownCosts.getTraitByName("Contents");
        return [options, currentShownCosts];
    }

    createOptions() {
        return CreateContainer([
            this.createAddOption(resources.mana.x),
            this.createSetColorlessOption(resources.mana.zero),
            this.createSetColorlessOption(resources.mana.one),
            this.createSetColorlessOption(resources.mana.two),
            this.createSetColorlessOption(resources.mana.three),
            this.createSetColorlessOption(resources.mana.four),
            this.createSetColorlessOption(resources.mana.six),
            this.createAddOption(resources.mana.black),
            this.createAddOption(resources.mana.blue),
            this.createAddOption(resources.mana.green),
            this.createAddOption(resources.mana.red),
            this.createAddOption(resources.mana.white),
            this.createAddOption(resources.mana.blackGreen),
            this.createAddOption(resources.mana.blackRed),
            this.createAddOption(resources.mana.blueBlack),
            this.createAddOption(resources.mana.blueRed),
            this.createAddOption(resources.mana.greenBlue),
            this.createAddOption(resources.mana.greenWhite),
            this.createAddOption(resources.mana.redGreen),
            this.createAddOption(resources.mana.redWhite),
            this.createAddOption(resources.mana.whiteBlack),
            this.createAddOption(resources.mana.whiteBlue),
            this.createAddOption(resources.mana.blackGeneric),
            this.createAddOption(resources.mana.blueGeneric),
            this.createAddOption(resources.mana.greenGeneric),
            this.createAddOption(resources.mana.redGeneric),
            this.createAddOption(resources.mana.whiteGeneric),
        ]);
    }

    createAddOption(manaType) {
        let image = CreateImage(resources.images[manaType]);
        let button = CreateButton(() => this.addCost(manaType));
        new Style("svg-button").attach(button);
        new Content(image).attach(button);
        return button;
    }

    createSetColorlessOption(colorlessName) {
        let image = CreateImage(resources.images[colorlessName]);
        let button = CreateButton(() => this.setColorlessAmount(colorlessName));
        new Style("svg-button").attach(button);
        new Content(image).attach(button);
        return button;
    }

    setColorlessAmount(numberMana) {
        for (let i = 0; i < this.cost.length; i++) {
            if (this.cost[i][0] === resources.mana.zero
                || this.cost[i][0] === resources.mana.one
                || this.cost[i][0] === resources.mana.two
                || this.cost[i][0] === resources.mana.three
                || this.cost[i][0] === resources.mana.four
                || this.cost[i][0] === resources.mana.six) {
                this.removeCost(this.cost[i][0], this.cost[i][1]);
            }
        }
        this.addCost(numberMana);
    }

    addCost(manaType) {
        let button = this.createCostButton(manaType)
        this.cost.push([manaType, button]);
        this.costButtons.add(button);
    }

    removeCost(manaType, costButton) {
        for (let i = 0; i < this.cost.length; i++) {
            if (this.cost[i][0] === manaType) {
                this.cost.splice(i, 1);
                break;
            }
        }
        this.costButtons.drop(costButton);
    }

    createCostButton(manaType) {
        let image = CreateImage(resources.images[manaType]);
        let button = new Entity("button");
        new Style("svg-button").attach(button);
        new ClickEvent((event) => this.removeCost(manaType, button)).attach(button);
        new Content(image).attach(button);
        return button;
    }

    setCost(costs) {
        for (let cost of costs)
            this.addCost(cost);
    }
}