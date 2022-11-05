import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super (popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._caption = this._popup.querySelector('.popup__caption');
    }

    open(name, image) {
        super.open();
        this._image.alt = name;
        this._image.src = image;
        this._caption.textContent = name;
        console.log(this._image);
    }
}