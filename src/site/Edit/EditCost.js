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
            this.createSetColorlessOption(resources.symbols.zero),
            this.createSetColorlessOption(resources.symbols.one),
            this.createSetColorlessOption(resources.symbols.two),
            this.createSetColorlessOption(resources.symbols.three),
            this.createSetColorlessOption(resources.symbols.four),
            this.createSetColorlessOption(resources.symbols.five),
            this.createSetColorlessOption(resources.symbols.six),
            this.createSetColorlessOption(resources.symbols.seven),
            this.createSetColorlessOption(resources.symbols.eight),
            this.createSetColorlessOption(resources.symbols.nine),
            this.createSetColorlessOption(resources.symbols.ten),
            this.createSetColorlessOption(resources.symbols.eleven),
            this.createSetColorlessOption(resources.symbols.twelve),
            this.createSetColorlessOption(resources.symbols.thirteen),
            this.createSetColorlessOption(resources.symbols.fourteen),
            this.createSetColorlessOption(resources.symbols.fifteen),
            this.createSetColorlessOption(resources.symbols.sixteen),
            this.createSetColorlessOption(resources.symbols.seventeen),
            this.createSetColorlessOption(resources.symbols.eighteen),
            this.createSetColorlessOption(resources.symbols.nineteen),
            this.createAddOption(resources.symbols.half),
            this.createAddOption(resources.symbols.X),
            this.createAddOption(resources.symbols.Y),
            this.createAddOption(resources.symbols.Z),
            this.createAddOption(resources.symbols.black),
            this.createAddOption(resources.symbols.blue),
            this.createAddOption(resources.symbols.green),
            this.createAddOption(resources.symbols.red),
            this.createAddOption(resources.symbols.white),
            this.createAddOption(resources.symbols.blackGreen),
            this.createAddOption(resources.symbols.blackRed),
            this.createAddOption(resources.symbols.blueBlack),
            this.createAddOption(resources.symbols.blueRed),
            this.createAddOption(resources.symbols.greenBlue),
            this.createAddOption(resources.symbols.greenWhite),
            this.createAddOption(resources.symbols.redGreen),
            this.createAddOption(resources.symbols.redWhite),
            this.createAddOption(resources.symbols.whiteBlack),
            this.createAddOption(resources.symbols.whiteBlue),
            this.createAddOption(resources.symbols.blackGeneric),
            this.createAddOption(resources.symbols.blueGeneric),
            this.createAddOption(resources.symbols.greenGeneric),
            this.createAddOption(resources.symbols.redGeneric),
            this.createAddOption(resources.symbols.whiteGeneric),
            this.createAddOption(resources.symbols.blackPhyrexian),
            this.createAddOption(resources.symbols.bluePhyrexian),
            this.createAddOption(resources.symbols.greenPhyrexian),
            this.createAddOption(resources.symbols.redPhyrexian),
            this.createAddOption(resources.symbols.whitePhyrexian),
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
            if (this.cost[i][0] === resources.symbols.zero
                || this.cost[i][0] === resources.symbols.one
                || this.cost[i][0] === resources.symbols.two
                || this.cost[i][0] === resources.symbols.three
                || this.cost[i][0] === resources.symbols.four
                || this.cost[i][0] === resources.symbols.six) {
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