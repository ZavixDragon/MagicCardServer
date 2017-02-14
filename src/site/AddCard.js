var nextId = 0;

function generateId() {
    nextId++;
    return "AddCard - " + nextId;
}

function addCardInit() {
    let typeList = new List();
    let blankOption = new Option(() => {}, new Text("-"));
    let creatureOption = new Option(() => typeList.add(new Button(() => typeList.remove(this), "Creature")), new Text("Creature"))
    let types = new ComboBox([blankOption, creatureOption]);

    document.body.appendChild(types.initialize());
    document.body.appendChild(typeList.initialize());
}

