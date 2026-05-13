export class ProfileController {
    constructor(mdl, vw) {
        this.storage = mdl;
        this.screen = vw;
        this.token = this.storage.getActiveSession();

        if (!this.token) {
            window.location.href = 'login.html?err=unauth';
            return;
        }

        this.screen.injectData(this.token);
        this.screen.attachSaveListener(this.execSave.bind(this));
    }

    execSave(dto) {
        this.screen.renderStatus('', true);
        if (!dto.date) {
            this.screen.renderStatus('Please pick a valid birth date!', false);
            return;
        }

        const dObj = new Date(dto.date);
        const now = new Date();

        if (!dto.name.trim()) {
            this.screen.renderStatus('Full name cannot be empty!', false);
            return;
        }
        if (!dto.password.trim() || dto.password.length < 4) {
            this.screen.renderStatus('Password must be at least 4 characters!', false);
            return;
        }
        if (dObj > now || dObj.getFullYear() < 1900) {
            this.screen.renderStatus('Birth date is invalid!', false);
            return;
        }

        const res = this.storage.updateAccount(this.token.email, dto);
        this.screen.renderStatus(res.msg, res.ok);
        if (res.ok) {
            this.token = this.storage.getActiveSession();

            const navNameSpan = document.querySelector('.text-light.fw-bold');
            if (navNameSpan) navNameSpan.innerText = `Hello, ${this.token.name.split(' ')[0]}!`;

            const navAvatarImg = document.querySelector('nav img.rounded-circle');
            if (navAvatarImg && this.token.avatar) {
                if (this.token.avatar.startsWith('data:image') || this.token.avatar.startsWith('images/')) {
                    navAvatarImg.src = this.token.avatar;
                }
            }
        }
    }
}