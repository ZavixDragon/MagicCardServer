class Resources {
    constructor() {
        let imagePath = "../images/";
        let manaPath = "mana/";
        let backgroundPath = "background/";

        this.mana = {
            zero: "<0>",
            one: "<1>",
            two: "<2>",
            three: "<3>",
            four: "<4>",
            six: "<6>",
            black: "<B>",
            blackGreen: "<B/G>",
            blackPhyrexian: "<B/P>",
            blackRed: "<B/R>",
            blue: "<U>",
            blueBlack: "<U/B>",
            bluePhyrexian: "<U/P>",
            blueRed: "<U/R>",
            colorless: "<C>",
            blackGeneric: "<2/B>",
            blueGeneric: "<2/U>",
            greenGeneric: "<2/G>",
            redGeneric: "<2/R>",
            whiteGeneric: "<2/W>",
            green: "<G>",
            greenBlue: "<G/B>",
            greenPhyrexian: "<G/P>",
            greenWhite: "<G/W>",
            red: "<R>",
            redGreen: "<R/G>",
            redPhyrexian: "<R/P>",
            redWhite: "<R/W>",
            white: "<W>",
            whiteBlack: "<W/B>",
            whiteBlue: "<W/U>",
            whitePhyrexian: "<W/P>",
            x: "<X>",
        };

        this.title = "Ravnica's Shadow";

        let images = {};
        images[this.mana.zero] = imagePath + manaPath + "0.svg";
        images[this.mana.one] = imagePath + manaPath + "1.svg";
        images[this.mana.two] = imagePath + manaPath + "2.svg";
        images[this.mana.three] = imagePath + manaPath + "3.svg";
        images[this.mana.four] = imagePath + manaPath + "4.svg";
        images[this.mana.six] = imagePath + manaPath + "6.svg";
        images[this.mana.black] = imagePath + manaPath + "Black.svg";
        images[this.mana.blackGreen] = imagePath + manaPath + "BlackGreen.svg";
        images[this.mana.blackPhyrexian] = imagePath + manaPath + "BlackPhyrexian.svg";
        images[this.mana.blackRed] = imagePath + manaPath + "BlackRed.svg";
        images[this.mana.blue] = imagePath + manaPath + "Blue.svg";
        images[this.mana.blueBlack] = imagePath + manaPath + "BlueBlack.svg";
        images[this.mana.bluePhyrexian] = imagePath + manaPath + "BluePhyrexian.svg";
        images[this.mana.blueRed] = imagePath + manaPath + "BlueRed.svg";
        images[this.mana.colorless] = imagePath + manaPath + "Colorless.svg";
        images[this.mana.blackGeneric] = imagePath + manaPath + "GenericBlack.svg";
        images[this.mana.blueGeneric] = imagePath + manaPath + "GenericBlue.svg";
        images[this.mana.greenGeneric] = imagePath + manaPath + "GenericGreen.svg";
        images[this.mana.redGeneric] = imagePath + manaPath + "GenericRed.svg";
        images[this.mana.whiteGeneric] = imagePath + manaPath + "GenericWhite.svg";
        images[this.mana.green] = imagePath + manaPath + "Green.svg";
        images[this.mana.greenBlue] = imagePath + manaPath + "GreenBlue.svg";
        images[this.mana.greenPhyrexian] = imagePath + manaPath + "GreenPhyrexian.svg";
        images[this.mana.greenWhite] = imagePath + manaPath + "GreenWhite.svg";
        images[this.mana.red] = imagePath + manaPath + "Red.svg";
        images[this.mana.redGreen] = imagePath + manaPath + "RedGreen.svg";
        images[this.mana.redPhyrexian] = imagePath + manaPath + "RedPhyrexian.svg";
        images[this.mana.redWhite] = imagePath + manaPath + "RedWhite.svg";
        images[this.mana.white] = imagePath + manaPath + "White.svg";
        images[this.mana.whiteBlack] = imagePath + manaPath + "WhiteBlack.svg";
        images[this.mana.whiteBlue] = imagePath + manaPath + "WhiteBlue.svg";
        images[this.mana.whitePhyrexian] = imagePath + manaPath + "WhitePhyrexian.svg";
        images[this.mana.x] = imagePath + manaPath + "X.svg";
        images[this.title] = imagePath + "title.png";
        this.images = images;

        this.backgrounds = [
            imagePath + backgroundPath + "rakdos1.jpg",
            imagePath + backgroundPath + "rakdos2.jpg",
            imagePath + backgroundPath + "rakdos3.jpg",
            imagePath + backgroundPath + "izzet1.jpg",
            imagePath + backgroundPath + "izzet2.jpg",
            imagePath + backgroundPath + "izzet3.jpg",
            imagePath + backgroundPath + "simic1.jpg",
            imagePath + backgroundPath + "simic2.jpg",
            imagePath + backgroundPath + "simic3.jpg",
            imagePath + backgroundPath + "selesnya1.jpg",
            imagePath + backgroundPath + "selesnya2.jpg",
            imagePath + backgroundPath + "selesnya3.jpg",
            imagePath + backgroundPath + "orzhov1.jpg",
            imagePath + backgroundPath + "orzhov2.jpg",
            imagePath + backgroundPath + "orzhov3.jpg",
        ];
    }
}

var resources = new Resources();