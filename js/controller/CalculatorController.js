export class CalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.isProgrammerMode = false;
        this.view.bindButtonClicks(this.handleInput.bind(this));

        this.view.bindModeToggle((mode) => {
            this.isProgrammerMode = (mode === 'programmer');
            this.model.clear();
            this.updateView();
        });

        this.updateView();
    }

    handleInput(value) {
        if (!value) return;

        if ((value >= '0' && value <= '9') || value === '.' || /^[A-F]$/.test(value)) {
            this.model.appendNumber(value);
        } else if (value === 'CLEAR') {
            this.model.clear();
        } else if (value === 'CE') {
            this.model.clearEntry();
        } else if (value === '=') {
            this.model.compute();
        } else if (value === '%') {
            if (this.isProgrammerMode) {
                this.model.chooseOperation('MOD');
            } else {
                this.model.calculatePercentage();
            }
        } else if (value === 'NOT') {
            this.model.calculateNot();
        } else if (['+', '-', '*', '/', 'AND', 'OR', 'XOR', '<<', '>>'].includes(value)) {
            this.model.chooseOperation(value);
        }

        this.updateView();
    }

    updateView() {
        this.view.updateDisplay(
            this.model.currentOperand,
            this.model.previousOperand,
            this.model.operation
        );

        const bases = this.model.getBaseValues();
        this.view.updateBases(bases);
    }
}