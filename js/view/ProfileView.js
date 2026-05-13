export class ProfileView {
    inputs = {};
    ui = {};
    cachedBase64Image = null;

    constructor() {
        this.inputs = {
            name: document.getElementById('profName'),
            email: document.getElementById('profEmail'),
            gender: document.getElementById('profGender'),
            date: document.getElementById('profDate'),
            pass: document.getElementById('profPass')
        };

        this.ui = {
            btnSave: document.getElementById('btnSaveProfile'),
            alertBox: document.getElementById('profileMessage'),
            imgAvatar: document.getElementById('profileAvatar'),
            btnPhoto: document.getElementById('btnChangePhoto'),
            fileUploader: document.getElementById('avatarUpload')
        };

        this.initPhotoUploader();
    }

    initPhotoUploader() {
        if (this.ui.btnPhoto && this.ui.fileUploader) {
            this.ui.btnPhoto.addEventListener('click', () => {
                this.ui.fileUploader.click();
            });

            this.ui.fileUploader.addEventListener('change', (ev) => {
                const selectedFile = ev.target.files[0];
                if (selectedFile) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.cachedBase64Image = e.target.result;
                        if (this.ui.imgAvatar) {
                            this.ui.imgAvatar.src = this.cachedBase64Image;
                        }
                    };
                    reader.readAsDataURL(selectedFile);
                }
            });
        }
    }

    injectData(userData) {
        if (!userData) return;

        if (this.inputs.name) this.inputs.name.value = userData.name || '';
        if (this.inputs.email) this.inputs.email.innerText = userData.email || '';
        if (this.inputs.gender) this.inputs.gender.value = userData.gender || 'male';
        if (this.inputs.date) this.inputs.date.value = userData.date || '';
        if (this.inputs.pass) this.inputs.pass.value = userData.password || '';

        if (this.ui.imgAvatar) {
            this.cachedBase64Image = userData.avatar || 'images/avatar.png';

            if (this.cachedBase64Image.startsWith('data:image') || this.cachedBase64Image.startsWith('images/')) {
                this.ui.imgAvatar.src = this.cachedBase64Image;
            } else {
                this.ui.imgAvatar.src = `images/avatar.png`;
            }
        }
    }

    extractData() {
        return {
            name: this.inputs.name ? this.inputs.name.value : '',
            gender: this.inputs.gender ? this.inputs.gender.value : 'male',
            date: this.inputs.date ? this.inputs.date.value : '',
            password: this.inputs.pass ? this.inputs.pass.value : '',
            avatar: this.cachedBase64Image
        };
    }

    renderStatus(text, isOk) {
        if (this.ui.alertBox) {
            this.ui.alertBox.innerHTML = `<span class="${isOk ? 'text-success' : 'text-danger'}">${text}</span>`;
        }
    }

    attachSaveListener(callback) {
        if (this.ui.btnSave) {
            this.ui.btnSave.addEventListener('click', () => {
                callback(this.extractData());
            });
        }
    }
}