export class UserInfo {
    constructor({name, work, avatar}) {
        this._name = name;
        this._work = work;
        this._avatar = avatar;
    }

    getUserInfo () {
        return {name: this._name.textContent, work: this._work.textContent};
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._work.textContent = data.work;
        this._avatar.src = avatar;
    }
}
