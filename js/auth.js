import { UserModel } from './model/UserModel.js';
import { AuthView } from './view/AuthView.js';
import { AuthController } from './controller/AuthController.js';

document.addEventListener('DOMContentLoaded', () => {
    const dataStore = new UserModel();
    const gui = new AuthView();
    const ctrl = new AuthController(dataStore, gui);

    console.log('Auth MVC started!');
});