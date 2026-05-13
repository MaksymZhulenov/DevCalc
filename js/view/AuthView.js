export class AuthView {
    upElements = {};
    inElements = {};
    constructor() {
        this.upElements = {
            form: document.getElementById('fullName')?.closest('form'),
            name: document.getElementById('fullName'),
            gender: document.getElementById('genderSelect'),
            date: document.getElementById('birthDate'),
            email: document.getElementById('emailReg'),
            pass: document.getElementById('passwordReg'),
            alert: document.createElement('div')
        };
        this.upElements.alert.className = 'text-center mt-3 fw-bold';
        if (this.upElements.form) {
            this.upElements.form.appendChild(this.upElements.alert);
        }
        this.inElements = {
            form: document.getElementById('emailInput')?.closest('form'),
            email: document.getElementById('emailInput'),
            pass: document.getElementById('passwordInput'),
            rem: document.getElementById('rememberMe'),
            alert: document.createElement('div')
        };
        this.inElements.alert.className = 'text-center mt-3 fw-bold';
        if (this.inElements.form) {
            this.inElements.form.appendChild(this.inElements.alert);
        }
    }

    extractUpData() {
        return {
            name: this.upElements.name ? this.upElements.name.value : '',
            gender: this.upElements.gender ? this.upElements.gender.value : '',
            email: this.upElements.email ? this.upElements.email.value : '',
            date: this.upElements.date ? this.upElements.date.value : '',
            password: this.upElements.pass ? this.upElements.pass.value : ''
        };
    }

    renderUpStatus(text, isOk) {
        if (this.upElements.alert) {
            this.upElements.alert.innerHTML = `<span class="${isOk ? 'text-success' : 'text-danger'}">${text}</span>`;
        }
    }

    attachUpListener(cb) {
        if (this.upElements.form) {
            this.upElements.form.addEventListener('submit', (ev) => {
                ev.preventDefault();
                cb(this.extractUpData());
            });
        }
    }

    extractInData() {
        return {
            email: this.inElements.email ? this.inElements.email.value : '',
            password: this.inElements.pass ? this.inElements.pass.value : '',
            remember: this.inElements.rem ? this.inElements.rem.checked : false
        };
    }

    renderInStatus(text, isOk) {
        if (this.inElements.alert) {
            this.inElements.alert.innerHTML = `<span class="${isOk ? 'text-success' : 'text-danger'}">${text}</span>`;
        }
    }

    attachInListener(cb) {
        if (this.inElements.form) {
            this.inElements.form.addEventListener('submit', (ev) => {
                ev.preventDefault();
                cb(this.extractInData());
            });
        }
    }
}