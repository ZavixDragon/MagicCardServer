class Component {
    constructor() {
        this.id = generateId();
        this.initialized = false;
    }

    initialize() {
        if (this.initialized)
            throw "This component has already been initialized";
        this.initialized = true;
    }
}

class Collection extends Component {
    constructor(contents = []) {
        super();
        this.contents = contents;
    }

    getById(id) {
        for (let i = 0; i < this.contents.length; i++)
            if (this.contents[i].id === id)
                return this.contents[i];
        throw "No element with the id ${id} found";
    }

    add(item) {
        this.contents.add(item);
        if (super.initialized)
            document.getElementById(super.id).appendChild(item.initialize());
    }

    remove(item) {
        this.contents = this.contents.filter(x => x.id !== item.id);
        if (super.initialized)
            document.getElementById(super.id).removeChild(document.getElementById(item.id));
    }
}

class List extends Collection {
    constructor(contents = [], style = "") {
        super(contents);
        this.style = style;
    }

    initialize() {
        super.initialize();
        let list = document.createElement('ul');
        list.id = this.id;
        list.className = this.style;
        for (var i = 0; i < this.contents.length; i++)
            list.appendChild(this.contents[i].initialize());
        return list;
    }
}

class ListItem extends Component {
    constructor(content = new Text(), style = "") {
        super();
        this.content = content;
        this.style = style;
    }

    initialize() {
        super.initialize();
        let listItem = document.createElement('li');
        listItem.id = this.id();
        listItem.className = this.style;
        listItem.innerHTML = this.content.initialize();
        return listItem;
    }
}

class Button extends Component {
    constructor(onPress = () => {}, content = new Text(), style = "") {
        super();
        this.onPress = onPress;
        this.content = content;
        this.style = style;
    }

    initialize() {
        super.initialize();
        let button = document.createElement('button');
        button.id = this.id;
        button.className = this.style;
        button.innerHTML = this.content.initialize();
        button.onclick = this.onPress();
        return button;
    }
}

class ComboBox extends Collection {
    constructor(contents = [], style = "") {
        super(contents);
        this.style = style;
    }

    initialize() {
        super.initialize();
        let comboBox = document.createElement('select');
        comboBox.id = this.id;
        comboBox.className = this.style;
        for (let i = 0; i < this.contents.length; i++)
            comboBox.appendChild(this.contents[i].initialize());
        comboBox.addEventListener('onchange', () => this.getById(document.getElementById(this.id).value).select());
        return comboBox;
    }
}

class Option extends Component {
    constructor(onSelect = () => {}, content = new Text(), style = "") {
        super();
        this.onSelect = onSelect;
        this.content = content;
        this.style = style;
    }

    initialize() {
        super.initialize();
        let option = document.createElement("option");
        option.id = this.id;
        option.style = this.style;
        option.appendChild(this.content.initialize());
        option.value = this.id;
        return option;
    }

    select() {
        this.onSelect();
    }
}

class Text extends Component {
    constructor(text = "") {
        super();
        this.text = text;
    }

    initialize() {
        return document.createTextNode(this.text);
    }
}
