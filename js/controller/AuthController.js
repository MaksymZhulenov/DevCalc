export class AuthController {
    constructor(mdl, vw) {
        this.storage = mdl;
        this.screen = vw;

        this.screen.attachUpListener(this.execUp.bind(this));
        this.screen.attachInListener(this.execIn.bind(this));

        this.parseUrlForErrors();
    }

    execUp(dto) {
        this.screen.renderUpStatus('', true);

        if (!dto.date) {
            this.screen.renderUpStatus('Please pick a valid date!', false);
            return;
        }

        const dObj = new Date(dto.date);
        const now = new Date();

        if (!dto.name.trim()) {
            this.screen.renderUpStatus('Full name is required!', false);
            return;
        }
        if (!dto.password.trim() || dto.password.length < 4) {
            this.screen.renderUpStatus('Password must be at least 4 characters!', false);
            return;
        }
        if (dObj > now || dObj.getFullYear() < 1900) {
            this.screen.renderUpStatus('Birth date is invalid!', false);
            return;
        }

        const res = this.storage.createAccount(dto);
        this.screen.renderUpStatus(res.msg, res.ok);

        if (res.ok) {
            setTimeout(() => window.location.href = 'login.html', 1500);
        }
    }

    execIn(dto) {
        this.screen.renderInStatus('', true);
        const res = this.storage.authenticate(dto.email, dto.password, dto.remember);
        this.screen.renderInStatus(res.msg, res.ok);

        if (res.ok) {
            setTimeout(() => window.location.href = 'profile.html', 1000);
        }
    }

    parseUrlForErrors() {
        const prm = new URLSearchParams(window.location.search);
        if (prm.get('err') === 'unauth') {
            this.screen.renderInStatus('Please log in to access this page!', false);
            window.history.replaceState(null, '', 'login.html');
        }
    }
}