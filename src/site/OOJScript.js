class Component {
    constructor() {
        let id = generateId();
        this.getId = () => id;
        this.isInitialized = () => false;
    }

    initialize() {
        if (this.isInitialized())
            throw "This component has already been initialized";
        this.isInitialized = () => true;
    }
}

class Collection extends Component {
    constructor(contents = []) {
        super();
        this.getContents = () => contents;
    }

    initialize() {
        super.initialize();
    }

    getById(id) {
        for (let i = 0; i < this.getContents().length; i++)
            if (this.getContents()[i].getId() === id)
                return this.getContents()[i];
        throw "No element with the id ${id} found";
    }

    add(item) {
        this.getContents().push(item);
        if (this.isInitialized())
            document.getElementById(this.getId()).appendChild(item.initialize());
    }

    remove(item) {
        let contents = this.getContents().filter(x => x.id !== item.id);
        this.getContents = () => contents;
        if (this.isInitialized())
            document.getElementById(this.getId()).removeChild(document.getElementById(item.getId()));
    }
}

class List extends Collection {
    constructor(contents = [], style = "") {
        super(contents);
        this.getStyle = () => style;
    }

    initialize() {
        super.initialize();
        let list = document.createElement('ul');
        list.id = this.getId();
        list.className = this.getStyle();
        for (var i = 0; i < this.getContents().length; i++)
            list.appendChild(this.getContents()[i].initialize());
        return list;
    }
}

class ListItem extends Component {
    constructor(content = new Text(), style = "") {
        super();
        this.getContent = () => content;
        this.getStyle = () => style;
    }

    initialize() {
        super.initialize();
        let listItem = document.createElement('li');
        listItem.id = this.getId();
        listItem.className = this.getStyle();
        listItem.appendChild(this.getContent().initialize());
        return listItem;
    }
}

class Button extends Component {
    constructor(onPress = () => {}, content = new Text(), style = "") {
        super();
        this.onPress = onPress;
        this.getContent = () => content;
        this.getStyle = () => style;
    }

    initialize() {
        super.initialize();
        let button = document.createElement('button');
        button.id = this.getId();
        button.className = this.getStyle();
        button.appendChild(this.getContent().initialize());
        button.onclick = () => this.onPress();
        return button;
    }
}

class ComboBox extends Collection {
    constructor(contents = [], style = "") {
        super(contents);
        this.getStyle = () => style;
    }

    initialize() {
        super.initialize();
        let comboBox = document.createElement('select');
        comboBox.id = this.getId();
        comboBox.className = this.getStyle();
        for (let i = 0; i < this.getContents().length; i++)
            comboBox.appendChild(this.getContents()[i].initialize());
        comboBox.onchange = () => { console.log("event on change fired"); this.getById(document.getElementById(this.getId()).value).select(); };
        return comboBox;
    }
}

class Option extends Component {
    constructor(onSelect = () => {}, content = new Text(), style = "") {
        super();
        this.onSelect = onSelect;
        this.getContent = () => content;
        this.getStyle = () => style;
    }

    initialize() {
        super.initialize();
        let option = document.createElement("option");
        option.id = this.getId();
        option.style = this.getStyle();
        option.appendChild(this.getContent().initialize());
        option.value = this.getId();
        return option;
    }

    select() {
        this.onSelect();
    }
}

class Text extends Component {
    constructor(text = "") {
        super();
        this.getText = () => text;
    }

    initialize() {
        return document.createTextNode(this.getText());
    }
}
