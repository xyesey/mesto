export class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    rendererItems() {
        this._items.forEach(item => this._renderer(item))
    }

    addItem(element) {
        this._containerSelector.prepend(element)
    }
}
