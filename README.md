# DevCalc | Laboratory Work #2: Development of Web Application Functionality in JavaScript

## Project Overview
DevCalc is a multi-page web application developed as an educational project for a university Web Design course. It serves as a dual-purpose tool, providing both standard arithmetic capabilities and a specialized mode tailored for software developers. For this second laboratory work, the static interface has been upgraded with dynamic functionality using vanilla JavaScript and the MVC (Model-View-Controller) architecture.

## Assignment Goals
* Develop functionality for the static pages created in the first laboratory work using the MVC design pattern.
* Organize code into ES6 modules (classes).
* Implement application logic strictly without the use of Web frameworks like React, AngularJS, or VueJS.
* Utilize JavaScript data structures or `localStorage` for data management.

## Developer Details
* **Institution:** National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute"
* **Faculty:** Faculty of Software Systems and Applied Mathematics 
* **Specialty:** 123 – Computer Engineering 
* **Student:** Zhulenov Maksym 
* **Group:** KV-33 

## Technologies Used
* **Markup/Styling:** HTML5, CSS3, Bootstrap 
* **Programming Language:** JavaScript (ES6) 
* **Architecture:** MVC (Model-View-Controller)
* **Environment:** VS Code 

## Repository Structure
* `index.html`, `about.html`, `login.html`, `register.html`, `profile.html` — Application views.
* `css/`, `images/`, `lib/` — Static assets and external libraries.
* `js/` — Core JavaScript functionality organized by the MVC pattern:
  * `calculator.js`, `auth.js`, `profile.js` — Master initializers that link the Model, View, and Controller.
  * `model/` — Contains `CalculatorModel.js` and `UserModel.js` for business logic, state management, and `localStorage` interactions.
  * `view/` — Contains `CalculatorView.js`, `AuthView.js`, and `ProfileView.js` for DOM manipulation and UI rendering.
  * `controller/` — Contains `CalculatorController.js`, `AuthController.js`, and `ProfileController.js` to handle user inputs, perform validation, and bridge views with models.

## Educational Disclaimer
This is a non-commercial academic project. [cite_start]All form inputs are used for UI demonstration purposes only; no real personal data is stored or processed.

## Project Links
* **Live Demo (GitHub Pages):** [Github Pages](https://maksymzhulenov.github.io/DevCalc/)
* **Lab Report (Google Drive):** [Google Drive](https://docs.google.com/document/d/1IYKYZCGzphnKawC71Z6YYNTNpi4gxAkeJSKUP-Gev5o/edit?usp=sharing)
