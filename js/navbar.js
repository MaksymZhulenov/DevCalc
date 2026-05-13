import { UserModel } from './model/UserModel.js';

document.addEventListener('DOMContentLoaded', () => {
    const mngr = new UserModel();
    const active = mngr.getActiveSession();
    const targetNav = document.querySelector('.d-flex.align-items-center.gap-3');

    if (targetNav) {
        if (active) {
            let avatarSrc = 'images/avatar.png';

            if (active.avatar && (active.avatar.startsWith('data:image') || active.avatar.startsWith('images/'))) {
                avatarSrc = active.avatar;
            }

            targetNav.innerHTML = `
                <span class="text-light fw-bold">Hello, ${active.name.split(' ')[0]}!</span>
                <a href="profile.html">
                    <img src="${avatarSrc}" alt="Profile" class="rounded-circle shadow-sm bg-white"
                        style="width: 35px; height: 35px; object-fit: cover;">
                </a>
                <a href="#" id="exitSessionBtn" class="btn btn-outline-light btn-sm fw-bold">Logout</a>
            `;

            document.getElementById('exitSessionBtn').addEventListener('click', (ev) => {
                ev.preventDefault();
                mngr.destroySession();
                window.location.href = 'index.html';
            });
        } else {
            targetNav.innerHTML = `
                <a href="login.html" class="text-light text-decoration-none">Login</a>
                <a href="register.html" class="btn btn-light btn-sm fw-bold text-primary">Sign Up</a>
            `;
        }
    }
});