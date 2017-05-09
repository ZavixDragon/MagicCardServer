function onPageLoad() {
    setBackground();
    let titleImage = CreateImage(resources.images[resources.title]);
    let titleButton = CreateLink("/");
    new Style("title-image").attach(titleButton);
    new Content(titleImage).attach(titleButton);

    let link = CreateLink("/EditCard/none");
    new Text("Add").attach(link);
    new Style("header-link").attach(link);

    let container = CreateContainer([titleButton, link]);
    new Style("header-bar dark-border flex-container-row flex-left").attach(container);
    document.getElementById("header").appendChild(container.arise());

}

function setBackground() {
    let url = resources.backgrounds[Math.floor(Math.random()*resources.backgrounds.length)];
    document.body.style = "background-image: url('" + url + "'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;"
}

function escapeStr(str) {
    return str.replace(/\\|\"|\//g, "\$&");
}

function unescapeStr(str) {
    return str.replace(/\\\\|\\\"|\\\//g, "$&".substring(1))
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}
