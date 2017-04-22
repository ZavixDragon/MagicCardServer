//Requires OOJScripts.js, Resources.js

function editImageOnLoad() {
    let element = new EditImage().initialize();
    document.body.appendChild(element.arise());
}

class EditImage {
    constructor() {
        this.bytes = "";
    }

    initialize() {
        this.fileInput = CreateFileInput();
        new ChangeEvent((event) => this.uploadImage()).attach(this.fileInput);
        let dropBox = CreateImageDropbox();
        new Style("imagedropbox").attach(dropBox);
        this.image = dropBox.getTraitByName("Content").content;
        new LoadEvent((event) => this.bytes = this.image.getElement().src).attach(this.image);
        let container = CreateContainer([this.fileInput, dropBox]);

        return container;
    }

    uploadImage() {
        let element = this.fileInput.getElement();
        if (element.files && element.files[0]) {
            let reader = new FileReader();
            reader.onload = (event) => this.image.getElement().src = event.target.result;
            reader.readAsDataURL(element.files[0]);
        }
    }

    setImage(bytes) {
        this.bytes = bytes;
        this.image.getElement().src = bytes;
    }
}