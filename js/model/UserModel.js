export class UserModel {
    dbKey = 'devcalc_users_data';
    sessionKey = 'devcalc_active_token';

    constructor() {
        this.dbKey = 'devcalc_users_data';
        this.sessionKey = 'devcalc_active_token';
    }

    fetchRecords() {
        const data = localStorage.getItem(this.dbKey);
        return data ? JSON.parse(data) : [];
    }

    commitRecords(records) {
        localStorage.setItem(this.dbKey, JSON.stringify(records));
    }

    locateByEmail(targetEmail) {
        return this.fetchRecords().find(acc => acc.email === targetEmail);
    }

    createAccount(payload) {
        if (this.locateByEmail(payload.email)) {
            return { ok: false, msg: 'Email is already registered!' };
        }
        const allAccounts = this.fetchRecords();
        allAccounts.push(payload);
        this.commitRecords(allAccounts);
        return { ok: true, msg: 'Account created successfully!' };
    }

    authenticate(mail, pwd, keepLogged) {
        const acc = this.locateByEmail(mail);
        if (!acc) return { ok: false, msg: 'Account does not exist!' };
        if (acc.password !== pwd) return { ok: false, msg: 'Incorrect password!' };

        if (keepLogged) {
            localStorage.setItem(this.sessionKey, JSON.stringify(acc));
        } else {
            sessionStorage.setItem(this.sessionKey, JSON.stringify(acc));
        }
        return { ok: true, msg: 'Signed in successfully!' };
    }

    updateAccount(email, newPayload) {
        let allAccounts = this.fetchRecords();
        let index = allAccounts.findIndex(acc => acc.email === email);

        if (index !== -1) {
            allAccounts[index] = { ...allAccounts[index], ...newPayload, email: email };
            this.commitRecords(allAccounts);
            if (localStorage.getItem(this.sessionKey)) {
                localStorage.setItem(this.sessionKey, JSON.stringify(allAccounts[index]));
            } else if (sessionStorage.getItem(this.sessionKey)) {
                sessionStorage.setItem(this.sessionKey, JSON.stringify(allAccounts[index]));
            }
            return { ok: true, msg: 'Profile updated successfully!' };
        }
        return { ok: false, msg: 'User account not found!' };
    }

    getActiveSession() {
        const token = localStorage.getItem(this.sessionKey) || sessionStorage.getItem(this.sessionKey);
        return token ? JSON.parse(token) : null;
    }

    destroySession() {
        localStorage.removeItem(this.sessionKey);
        sessionStorage.removeItem(this.sessionKey);
    }
}