class Resources {
    constructor() {
        let basePath = "http://" + window.location.href.split('/')[2] + "/";
        let imagePath = "images/";
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
        images[this.symbols.zero] = basePath + imagePath + symbolPath + "0.svg";
        images[this.symbols.one] = basePath + imagePath + symbolPath + "1.svg";
        images[this.symbols.two] = basePath + imagePath + symbolPath + "2.svg";
        images[this.symbols.three] = basePath + imagePath + symbolPath + "3.svg";
        images[this.symbols.four] = basePath + imagePath + symbolPath + "4.svg";
        images[this.symbols.five] = basePath + imagePath + symbolPath + "5.svg";
        images[this.symbols.six] = basePath + imagePath + symbolPath + "6.svg";
        images[this.symbols.seven] = basePath + imagePath + symbolPath + "7.svg";
        images[this.symbols.eight] = basePath + imagePath + symbolPath + "8.svg";
        images[this.symbols.nine] = basePath + imagePath + symbolPath + "9.svg";
        images[this.symbols.ten] = basePath + imagePath + symbolPath + "10.svg";
        images[this.symbols.eleven] = basePath + imagePath + symbolPath + "11.svg";
        images[this.symbols.twelve] = basePath + imagePath + symbolPath + "12.svg";
        images[this.symbols.thirteen] = basePath + imagePath + symbolPath + "13.svg";
        images[this.symbols.fourteen] = basePath + imagePath + symbolPath + "14.svg";
        images[this.symbols.fifteen] = basePath + imagePath + symbolPath + "15.svg";
        images[this.symbols.sixteen] = basePath + imagePath + symbolPath + "16.svg";
        images[this.symbols.seventeen] = basePath + imagePath + symbolPath + "17.svg";
        images[this.symbols.eighteen] = basePath + imagePath + symbolPath + "18.svg";
        images[this.symbols.nineteen] = basePath + imagePath + symbolPath + "19.svg";
        images[this.symbols.twenty] = basePath + imagePath + symbolPath + "20.svg";
        images[this.symbols.half] = basePath + imagePath + symbolPath + "Half.svg";
        images[this.symbols.infinity] = basePath + imagePath + symbolPath + "Infinity.svg";
        images[this.symbols.X] = basePath + imagePath + symbolPath + "X.svg";
        images[this.symbols.Y] = basePath + imagePath + symbolPath + "Y.svg";
        images[this.symbols.Z] = basePath + imagePath + symbolPath + "Z.svg";
        images[this.symbols.black] = basePath + imagePath + symbolPath + "Black.svg";
        images[this.symbols.blackGreen] = basePath + imagePath + symbolPath + "BlackGreen.svg";
        images[this.symbols.blackPhyrexian] = basePath + imagePath + symbolPath + "BlackPhyrexian.svg";
        images[this.symbols.blackRed] = basePath + imagePath + symbolPath + "BlackRed.svg";
        images[this.symbols.blue] = basePath + imagePath + symbolPath + "Blue.svg";
        images[this.symbols.blueBlack] = basePath + imagePath + symbolPath + "BlueBlack.svg";
        images[this.symbols.bluePhyrexian] = basePath + imagePath + symbolPath + "BluePhyrexian.svg";
        images[this.symbols.blueRed] = basePath + imagePath + symbolPath + "BlueRed.svg";
        images[this.symbols.colorless] = basePath + imagePath + symbolPath + "Colorless.svg";
        images[this.symbols.blackGeneric] = basePath + imagePath + symbolPath + "GenericBlack.svg";
        images[this.symbols.blueGeneric] = basePath + imagePath + symbolPath + "GenericBlue.svg";
        images[this.symbols.greenGeneric] = basePath + imagePath + symbolPath + "GenericGreen.svg";
        images[this.symbols.redGeneric] = basePath + imagePath + symbolPath + "GenericRed.svg";
        images[this.symbols.whiteGeneric] = basePath + imagePath + symbolPath + "GenericWhite.svg";
        images[this.symbols.green] = basePath + imagePath + symbolPath + "Green.svg";
        images[this.symbols.greenBlue] = basePath + imagePath + symbolPath + "GreenBlue.svg";
        images[this.symbols.greenPhyrexian] = basePath + imagePath + symbolPath + "GreenPhyrexian.svg";
        images[this.symbols.greenWhite] = basePath + imagePath + symbolPath + "GreenWhite.svg";
        images[this.symbols.red] = basePath + imagePath + symbolPath + "Red.svg";
        images[this.symbols.redGreen] = basePath + imagePath + symbolPath + "RedGreen.svg";
        images[this.symbols.redPhyrexian] = basePath + imagePath + symbolPath + "RedPhyrexian.svg";
        images[this.symbols.redWhite] = basePath + imagePath + symbolPath + "RedWhite.svg";
        images[this.symbols.white] = basePath + imagePath + symbolPath + "White.svg";
        images[this.symbols.whiteBlack] = basePath + imagePath + symbolPath + "WhiteBlack.svg";
        images[this.symbols.whiteBlue] = basePath + imagePath + symbolPath + "WhiteBlue.svg";
        images[this.symbols.whitePhyrexian] = basePath + imagePath + symbolPath + "WhitePhyrexian.svg";
        images[this.symbols.tap] = basePath + imagePath + symbolPath + "Tap.svg";
        images[this.symbols.untap] = basePath + imagePath + symbolPath + "Untap.svg";
        images[this.title] = basePath + imagePath + "title.png";
        this.images = images;

        this.backgrounds = [
            basePath + imagePath + backgroundPath + "rakdos1.jpg",
            basePath + imagePath + backgroundPath + "rakdos2.jpg",
            basePath + imagePath + backgroundPath + "rakdos3.jpg",
            basePath + imagePath + backgroundPath + "izzet1.jpg",
            basePath + imagePath + backgroundPath + "izzet2.jpg",
            basePath + imagePath + backgroundPath + "izzet3.jpg",
            basePath + imagePath + backgroundPath + "simic1.jpg",
            basePath + imagePath + backgroundPath + "simic2.jpg",
            basePath + imagePath + backgroundPath + "simic3.jpg",
            basePath + imagePath + backgroundPath + "selesnya1.jpg",
            basePath + imagePath + backgroundPath + "selesnya2.jpg",
            basePath + imagePath + backgroundPath + "selesnya3.jpg",
            basePath + imagePath + backgroundPath + "orzhov1.jpg",
            basePath + imagePath + backgroundPath + "orzhov2.jpg",
            basePath + imagePath + backgroundPath + "orzhov3.jpg",
        ];
    }
}

var resources = new Resources();