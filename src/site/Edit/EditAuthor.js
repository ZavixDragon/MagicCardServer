//requires OOJscript.js

function editAuthorOnLoad() {
    let element = new EditAuthor().initialize();
    document.body.appendChild(element.arise());
}

class EditAuthor {
    constructor() {
        this.author = "Caleb";
    }

    initialize() {
        this.comboBox = CreateComboBox([
            this.createOption("Caleb"),
            this.createOption("Noah")
        ]);
        new ChangeEvent((event) => this.author = this.comboBox.getElement().value).attach(this.comboBox);
        return this.comboBox;
    }

    createOption(name) {
        let option = CreateOption(name);
        new Text(name).attach(option);
        return option;
    }

    setAuthor(author) {
        this.author = author;
        this.comboBox.getElement().value = author;
    }
}