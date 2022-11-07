export class UserInfo {
    constructor({name, work}) {
        this._name = name;
        this._work = work;
        console.log({name,work})
    }

    getUserInfo () {
        return {name: this._name.textContent, work: this._work.textContent};
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._work.textContent = data.work;
    }
}
