var nextId = 0;

function generateId() {
    nextId++;
    return "AddCard - " + nextId;
}

function addCardInit() {
    let typeList = new List();
    let blankOption = new Option(() => {}, new Text("-"));
    let creatureOption = new Option(() => {
        let text = new Text("Creature");
        let button = new Button(() => {}, text);
        let listItem = new ListItem(button);
        button.onPress = () => typeList.remove(listItem);
        typeList.add(listItem);
    }, new Text("Creature"));
    let types = new ComboBox([blankOption, creatureOption]);
    document.body.appendChild(types.initialize());
    document.body.appendChild(typeList.initialize());
}

