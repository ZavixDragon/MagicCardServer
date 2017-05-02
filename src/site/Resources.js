class Resources {
    constructor() {
        let imagePath = "../images/";
        let symbolPath = "symbols/";
        let backgroundPath = "background/";

        this.symbols = {
            zero: "<0>",
            one: "<1>",
            two: "<2>",
            three: "<3>",
            four: "<4>",
            five: "<5>",
            six: "<6>",
            seven: "<7>",
            eight: "<8>",
            nine: "<9>",
            ten: "<10>",
            eleven: "<11>",
            twelve: "<12>",
            thirteen: "<13>",
            fourteen: "<14>",
            fifteen: "<15>",
            sixteen: "<16>",
            seventeen: "<17>",
            eighteen: "<18>",
            nineteen: "<19>",
            twenty: "<20>",
            half: "<1/2>",
            infinity: "<inf>",
            X: "<X>",
            Y: "<Y>",
            Z: "<Z>",
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
            tap: "<T>",
            untap: "<UT>",
        };

        this.title = "Shadow Over Ravnica";

        let images = {};
        images[this.symbols.zero] = imagePath + symbolPath + "0.svg";
        images[this.symbols.one] = imagePath + symbolPath + "1.svg";
        images[this.symbols.two] = imagePath + symbolPath + "2.svg";
        images[this.symbols.three] = imagePath + symbolPath + "3.svg";
        images[this.symbols.four] = imagePath + symbolPath + "4.svg";
        images[this.symbols.five] = imagePath + symbolPath + "5.svg";
        images[this.symbols.six] = imagePath + symbolPath + "6.svg";
        images[this.symbols.seven] = imagePath + symbolPath + "7.svg";
        images[this.symbols.eight] = imagePath + symbolPath + "8.svg";
        images[this.symbols.nine] = imagePath + symbolPath + "9.svg";
        images[this.symbols.ten] = imagePath + symbolPath + "10.svg";
        images[this.symbols.eleven] = imagePath + symbolPath + "11.svg";
        images[this.symbols.twelve] = imagePath + symbolPath + "12.svg";
        images[this.symbols.thirteen] = imagePath + symbolPath + "13.svg";
        images[this.symbols.fourteen] = imagePath + symbolPath + "14.svg";
        images[this.symbols.fifteen] = imagePath + symbolPath + "15.svg";
        images[this.symbols.sixteen] = imagePath + symbolPath + "16.svg";
        images[this.symbols.seventeen] = imagePath + symbolPath + "17.svg";
        images[this.symbols.eighteen] = imagePath + symbolPath + "18.svg";
        images[this.symbols.nineteen] = imagePath + symbolPath + "19.svg";
        images[this.symbols.twenty] = imagePath + symbolPath + "20.svg";
        images[this.symbols.half] = imagePath + symbolPath + "Half.svg";
        images[this.symbols.infinity] = imagePath + symbolPath + "Infinity.svg";
        images[this.symbols.X] = imagePath + symbolPath + "X.svg";
        images[this.symbols.Y] = imagePath + symbolPath + "Y.svg";
        images[this.symbols.Z] = imagePath + symbolPath + "Z.svg";
        images[this.symbols.black] = imagePath + symbolPath + "Black.svg";
        images[this.symbols.blackGreen] = imagePath + symbolPath + "BlackGreen.svg";
        images[this.symbols.blackPhyrexian] = imagePath + symbolPath + "BlackPhyrexian.svg";
        images[this.symbols.blackRed] = imagePath + symbolPath + "BlackRed.svg";
        images[this.symbols.blue] = imagePath + symbolPath + "Blue.svg";
        images[this.symbols.blueBlack] = imagePath + symbolPath + "BlueBlack.svg";
        images[this.symbols.bluePhyrexian] = imagePath + symbolPath + "BluePhyrexian.svg";
        images[this.symbols.blueRed] = imagePath + symbolPath + "BlueRed.svg";
        images[this.symbols.colorless] = imagePath + symbolPath + "Colorless.svg";
        images[this.symbols.blackGeneric] = imagePath + symbolPath + "GenericBlack.svg";
        images[this.symbols.blueGeneric] = imagePath + symbolPath + "GenericBlue.svg";
        images[this.symbols.greenGeneric] = imagePath + symbolPath + "GenericGreen.svg";
        images[this.symbols.redGeneric] = imagePath + symbolPath + "GenericRed.svg";
        images[this.symbols.whiteGeneric] = imagePath + symbolPath + "GenericWhite.svg";
        images[this.symbols.green] = imagePath + symbolPath + "Green.svg";
        images[this.symbols.greenBlue] = imagePath + symbolPath + "GreenBlue.svg";
        images[this.symbols.greenPhyrexian] = imagePath + symbolPath + "GreenPhyrexian.svg";
        images[this.symbols.greenWhite] = imagePath + symbolPath + "GreenWhite.svg";
        images[this.symbols.red] = imagePath + symbolPath + "Red.svg";
        images[this.symbols.redGreen] = imagePath + symbolPath + "RedGreen.svg";
        images[this.symbols.redPhyrexian] = imagePath + symbolPath + "RedPhyrexian.svg";
        images[this.symbols.redWhite] = imagePath + symbolPath + "RedWhite.svg";
        images[this.symbols.white] = imagePath + symbolPath + "White.svg";
        images[this.symbols.whiteBlack] = imagePath + symbolPath + "WhiteBlack.svg";
        images[this.symbols.whiteBlue] = imagePath + symbolPath + "WhiteBlue.svg";
        images[this.symbols.whitePhyrexian] = imagePath + symbolPath + "WhitePhyrexian.svg";
        images[this.symbols.tap] = imagePath + symbolPath + "Tap.svg";
        images[this.symbols.untap] = imagePath + symbolPath + "Untap.svg";
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