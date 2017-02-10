class ListItem {
    constructor(content) {
        this.content = content;
    }

    get() {
        return "<li>${content.get()}</li>";
    }
}

class Button {
    constructor(content, action) {
        this.content = content;
        this.action = action;
    }

    get() {
        var button = document.createElement('button');
        button.innerHTML = content.get();
        button.onclick = action();
        return element.outerHTML;
    }
}

