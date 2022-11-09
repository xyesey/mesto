export class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        console.log(this._items)
        console.log(this._renderer)
    }

    rendererItems() {
        this._items.forEach(item => this._renderer(item))
    }

    addItem(element) {
        this._containerSelector.prepend(element)
    }
}
