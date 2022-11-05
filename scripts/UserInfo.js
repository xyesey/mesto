export class UserInfo {
    constructor({name, job}) {
        this._name = name;
        this._job = job;
    }

    getUserInfo () {
        return {name: this._name.textContent, job: this._job.textContent}
    }

    setUserInfo(name, job) {
        if (name, job) {
            this._name.textContent = name;
            this._job.textContent = job;
        }
    }
}