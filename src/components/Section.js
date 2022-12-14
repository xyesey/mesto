export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    rendererItems(items, myId) {
        items.forEach((item) => {
            this._renderer(item, myId)
        })
    }

    addItem(element, first) {
        if (first) {
            this._containerSelector.prepend(element)
        } else {
            this._containerSelector.append(element)
        }
    }
}
