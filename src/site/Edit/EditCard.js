//Requires OOJScript.js, EditName.js, EditCost.js, EditType.js, EditSubtype.js, EditText.js, EditStats.js, EditImage.js, EditAuthor.js

function editCardOnLoad(cardId) {
    onPageLoad();
    this.editAuthor = new EditAuthor();
    this.editName = new EditName();
    this.editCost = new EditCost();
    this.editTypes = new EditTypes();
    this.editSubtypes = new EditSubtypes();
    this.editRarity = new EditRarity();
    this.editText = new EditText();
    this.editStats = new EditStats();
    this.editLoyalty = new EditLoyalty();
    this.editImage = new EditImage();
    this.usernameInput = new InputUsername();
    this.passwordInput = new InputPassword();

    document.getElementById("author").appendChild(this.editAuthor.initialize().arise());
    document.getElementById("name").appendChild(this.editName.initialize().arise());
    let costElements = this.editCost.initialize();
    document.getElementById("cost").appendChild(costElements[1].arise());
    document.getElementById("costOptions").appendChild(costElements[0].arise());
    let typeElements = this.editTypes.initialize();
    document.getElementById("typeList").appendChild(typeElements[0].arise());
    document.getElementById("types").appendChild(typeElements[1].arise());
    let subtypeElements = this.editSubtypes.initialize();
    document.getElementById("subtypeList").appendChild(subtypeElements[2].arise());
    document.getElementById("subtypes").appendChild(subtypeElements[0].arise());
    document.getElementById("subtypes").appendChild(subtypeElements[1].arise());
    document.getElementById("rarity").appendChild(this.editRarity.initialize().arise());
    let textElements = this.editText.initialize();
    document.getElementById("textArea").appendChild(textElements[0].arise());
    document.getElementById("additions").appendChild(textElements[1].arise());
    let statsElements = this.editStats.initialize();
    document.getElementById("stats").appendChild(CreateLabel("Power:").arise());
    document.getElementById("stats").appendChild(statsElements[0].arise());
    document.getElementById("stats").appendChild(CreateLabel("Toughness:").arise());
    document.getElementById("stats").appendChild(statsElements[1].arise());
    document.getElementById("loyalty").appendChild(this.editLoyalty.initialize().arise());
    document.getElementById("dropbox").appendChild(this.editImage.initialize().arise());
    document.getElementById("username").appendChild(this.usernameInput.initialize().arise());
    document.getElementById("password").appendChild(this.passwordInput.initialize().arise());

    let saveButton = CreateButton((event) => {
        this.card.author = this.editAuthor.author;
        this.card.name = this.editName.name;
        this.card.cost = [];
        for (let cost of this.editCost.cost)
            this.card.cost.push(cost[0]);
        this.card.types = this.editTypes.types;
        this.card.subtypes = this.editSubtypes.subtypes;
        this.card.rarity = this.editRarity.rarity;
        this.card.text = this.editText.text;
        this.card.power = this.editStats.power;
        this.card.toughness = this.editStats.toughness;
        this.card.loyalty = this.editLoyalty.loyalty;
        this.card.imageId = this.editImage.id;
        new API().putCard(this.card, this.usernameInput.username, this.passwordInput.password);
        new API().putImage(escapeStr(this.editImage.bytes), this.editImage.id, this.usernameInput.username, this.passwordInput.password)
        window.location.href = "/";
    });
    new Text("Save").attach(saveButton);

    let deleteButton = CreateButton((event) => {
        new API().removeCard(this.card.id, this.usernameInput.username, this.passwordInput.password);
        window.location.href = "/";
    });
    new Text("Delete").attach(deleteButton);

    let style = new Style("normal-button");
    style.attach(saveButton);
    style.attach(deleteButton);
    document.getElementById("resolve").appendChild(saveButton.arise());

    if (cardId !== "none") {
        new API().getCard(cardId, (card) => {
            this.card = card;
            this.editAuthor.setAuthor(this.card.author);
            this.editName.setName(this.card.name);
            this.editCost.setCost(this.card.cost);
            this.editTypes.setTypes(this.card.types);
            this.editSubtypes.setSubtypes(this.card.subtypes);
            this.editRarity.setRarity(this.card.rarity);
            this.editText.setText(this.card.text);
            this.editStats.setStats(this.card.power, this.card.toughness);
            this.editLoyalty.setLoyalty(this.card.loyalty);
            this.editImage.setId(this.card.imageId);
        }, (image) => {
            this.editImage.setImage(unescapeStr(image));
        });
        document.getElementById("resolve").appendChild(deleteButton.arise());
    } else {
        this.card = {};
        this.card.id = generateId();
        this.editImage.setId("custom-magic-card");
        new API().getImage(this.editImage.Id, (image) => this.editImage.setImage(unescapeStr(image)));
    }
}