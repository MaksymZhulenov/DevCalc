import { UserModel } from './model/UserModel.js';
import { ProfileView } from './view/ProfileView.js';
import { ProfileController } from './controller/ProfileController.js';

document.addEventListener('DOMContentLoaded', () => {
    const dataStore = new UserModel();
    const gui = new ProfileView();
    const ctrl = new ProfileController(dataStore, gui);
});