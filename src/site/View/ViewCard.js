//Requires JOOcyScript.js

function viewCardOnLoad(cardId) {
    onPageLoad();
    new API().getCard(cardId, (card) => {
        //Image
        document.getElementById("image").appendChild(createCardImage(card.image).arise());
        //Name
        document.getElementById("name").appendChild(CreateLabel(card.name).arise());
        //Cost
        for (let cost of card.cost)
            document.getElementById("cost").appendChild(createSvgImage(resources.images[cost]).arise());
        //Types
        for (let type of card.types)
            document.getElementById("type").appendChild(CreateLabel(type).arise());
        if (card.subtypes.length > 0)
            document.getElementById("type").appendChild(CreateLabel("-").arise());
        for (let subtype of card.subtypes)
            document.getElementById("type").appendChild(CreateLabel(subtype).arise());
        //Rarity
        document.getElementById("rarity").appendChild(CreateLabel(card.rarity).arise());
        //Text
        document.getElementById("text").innerHTML = convertText(card.text);
        //Stats
        document.getElementById("stats").appendChild(CreateLabel(card.power + "/" + card.toughness).arise());
        //Loyalty
        document.getElementById("loyalty").appendChild(CreateLabel(card.loyalty).arise());
        //Author
        document.getElementById("author").appendChild(CreateLabel(card.author).arise());
        //Edit
        document.getElementById("edit").appendChild(createEditButton(card._id).arise());
    });
}

function createCardImage(src) {
    let cardImage = CreateImage(src);
    new Style("card-image").attach(cardImage);
    return cardImage;
}

function createSvgImage(src) {
    let image = CreateImage(src);
    new Style("svg-image").attach(image);
    return image;
}

function convertText(text) {
    let innerHtml = "";
    for (let segment of text.match(/(<[^>]*>|[^<]*)/g))
    {
        if (segment.startsWith('<') && segment.endsWith(">"))
            innerHtml += "<span><img class='svg-image' src='" + resources.images[segment] + "'></span>"
        else
            innerHtml += segment;
    }
    innerHtml = innerHtml.replace(/(?:\r\n|\r|\n)/g, '<br />');
    return innerHtml;
}

function createEditButton(id) {
    let link = CreateLink("/EditCard/" + id);
    let button = CreateButton(() => {});
    new Text("Edit").attach(button);
    new Content(button).attach(link);
    return link;
}