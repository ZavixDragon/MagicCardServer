function onIndexLoad() {
    onPageLoad();
    new IndexPage().initialize();
}

class IndexPage {
    constructor() {
        this.cards = [];
        this.filters = {};
        this.container = CreateContainer([]);
        this.cardContainer = this.container.getTraitByName("Contents");
        this.currentlyShowing = CreateLabel("Currently Showing Cards: 0");
        this.count = 0;

        new Style("flex-container-row flex-center dark-border").attach(this.container);
        this.filters["deleted"] = ((card) => !card.isDeleted);
    }

    initialize() {
        document.getElementById("cards").appendChild(this.container.arise());
        document.getElementById("search").appendChild(new SearchFilter(this.filters, () => this.reload()).initialize().arise());
        document.getElementById("cmc").appendChild(new CMCFilter(this.filters, () => this.reload()).initialize().arise());
        document.getElementById("colors").appendChild(new ColorFilter(this.filters, () => this.reload()).initialize().arise());
        document.getElementById("type").appendChild(new TypeFilter(this.filters, () => this.reload()).initialize().arise());
        document.getElementById("subtype").appendChild(new SubtypeFilter(this.filters, () => this.reload()).initialize().arise());
        document.getElementById("rarity").appendChild(new RarityFilter(this.filters, () => this.reload()).initialize().arise());
        document.getElementById("author").appendChild(new AuthorFilter(this.filters, () => this.reload()).initialize().arise());
        document.getElementById("count").appendChild(this.currentlyShowing.arise());

        new API().getAllCards((card) => {
            this.cards.push(card);
            this.addCard(card);
        });
    }

    addCard(card) {
        for (let filterKey of Object.keys(this.filters)) {
            let filter = this.filters[filterKey];
            if (!filter(card))
                return;
        }
        this.count++;
        this.currentlyShowing.getElement().innerHTML = "Currently Showing Cards: " + this.count;
        this.cardContainer.add(this.createCardDisplay(card));
    }

    createCardDisplay(card) {
        let container = CreateContainer();
        new Style("flex-container-column flex-item").attach(container);
        let contents = container.getTraitByName("Contents");
        contents.add(this.createCardImage(card.image, card._id));
        contents.add(this.createCardName(card.name, card._id));
        return container;
    }

    createCardImage(src, id) {
        let image = CreateImage(src);
        new Style("card-image").attach(image);
        let link = CreateLink("/ViewCard/" + id);
        new Content(image).attach(link);
        return link;
    }

    createCardName(name, id) {
        let label = CreateLabel(name);
        let link = CreateLink("/ViewCard/" + id);
        new ExplicitStyle("margin-top: -5px").attach(link);
        new Content(label).attach(link);
        return link;
    }

    reload() {
        this.count = 0;
        this.currentlyShowing.getElement().innerHTML = "Currently Showing Cards: " + this.count;
        this.cardContainer.clear();
        for (let card of this.cards)
            this.addCard(card);
    }
}