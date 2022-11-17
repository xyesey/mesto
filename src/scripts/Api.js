export class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers
    }

    _fetch(link, newMethod = "GET", newBody) {
        return fetch(this._url+link, { 
            method: newMethod, 
            headers: this._headers,
            body: JSON.stringify(newBody),
        })

        .then(res => this._checkRes(res))
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInfoProfile() {
        return this._fetch('/users/me')
    }

    infoProfileEdit(data) {
        return this._fetch('/users/me', 'PATCH', data)
    }

    setAvatar(data) {
        return this._fetch(`/users/me/avatar`, `PATCH`, data)
    }

    getInitialCards() {
        return this._fetch('/cards')
    }

    postedCard(data) {
        return this._fetch(`/cards`, 'POST', data)
    }

    deleteCard(id) {
        return this._fetch(`/cards/${id}`, 'DELETE')
    }

    likeActive(id) {
        return this._fetch(`/cards/${id}/likes`, 'PUT')
    }

    likeInactive(id) {
        return this._fetch(`/cards/${id}/likes`, 'DELETE')
    }

}

