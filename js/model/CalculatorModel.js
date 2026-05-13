export class CalculatorModel {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;

    constructor() {
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    clearEntry() {
        this.currentOperand = '0';
    }

    appendNumber(number) {
        const digitsCount = this.currentOperand.toString().replace('.', '').length;
        if (digitsCount >= 15) return;

        if (number === '.' && this.currentOperand.includes('.')) return;

        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    parseValue(str) {
        if (/[A-F]/.test(str)) {
            return parseInt(str, 16);
        }
        return parseFloat(str);
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = this.parseValue(this.previousOperand);
        const current = this.parseValue(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '*': computation = prev * current; break;
            case '/': computation = current === 0 ? 'Error' : prev / current; break;
            case 'AND': computation = prev & current; break;
            case 'OR': computation = prev | current; break;
            case 'XOR': computation = prev ^ current; break;
            case '<<': computation = prev << current; break;
            case '>>': computation = prev >> current; break;
            case 'MOD': computation = prev % current; break;
            default: return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    calculatePercentage() {
        if (this.currentOperand === '' || this.currentOperand === 'Error') return;
        this.currentOperand = (this.parseValue(this.currentOperand) / 100).toString();
    }

    calculateNot() {
        if (this.currentOperand === '' || this.currentOperand === 'Error') return;
        let current = this.parseValue(this.currentOperand);
        this.currentOperand = (~current).toString();
    }

    getBaseValues() {
        let num = this.parseValue(this.currentOperand);

        if (isNaN(num) || this.currentOperand === 'Error') {
            return { hex: '0', dec: '0', oct: '0', bin: '0' };
        }

        let intNum = Math.trunc(num);

        return {
            hex: intNum.toString(16).toUpperCase(),
            dec: intNum.toString(10),
            oct: intNum.toString(8),
            bin: intNum.toString(2)
        };
    }
}