export class CalculatorView {
    display = {};
    panels = {};
    basesOut = {};
    buttonsList = null;
    dotBtn = null;
    modes = {};
    constructor() {
        this.display = {
            prev: document.querySelector('.calc-display .text-muted'),
            curr: document.querySelector('.calc-display .h2'),
            container: document.getElementById('calculator')
        };

        this.modes = {
            standard: document.getElementById('standard'),
            programmer: document.getElementById('programmer')
        };

        this.panels = {
            left: document.getElementById('prog-panel-left'),
            right: document.getElementById('prog-panel-right'),
            bases: document.getElementById('prog-bases')
        };

        this.basesOut = {
            hex: document.querySelector('#prog-bases div:nth-child(1) span'),
            dec: document.querySelector('#prog-bases div:nth-child(2) span'),
            oct: document.querySelector('#prog-bases div:nth-child(3) span'),
            bin: document.querySelector('#prog-bases div:nth-child(4) span')
        };

        this.buttonsList = document.querySelectorAll('.calc-btn');
        this.dotBtn = Array.from(this.buttonsList).find(btn => btn.innerText.trim() === '.');

        this.initAnimations();
        window.addEventListener('resize', () => this.handleResize());
    }

    initAnimations() {
        if (this.display.container) {
            this.display.container.style.transition = 'max-width 0.3s ease, max-height 0.3s ease';
            this.display.container.style.maxHeight = '650px';
        }

        const extraPanels = [this.panels.left, this.panels.right, this.panels.bases];
        extraPanels.forEach(el => {
            if (el) {
                el.style.transition = 'opacity 0.3s ease';
                el.style.opacity = '0';
            }
        });
    }

    handleResize() {
        if (!this.display.container) return;
        const isMobile = window.innerWidth < 768;

        if (this.modes.programmer && this.modes.programmer.checked) {
            if (isMobile) {
                this.display.container.style.maxWidth = '380px';
                this.display.container.style.maxHeight = '950px';
            } else {
                this.display.container.style.maxWidth = '680px';
                this.display.container.style.maxHeight = '650px';
            }
        } else {
            this.display.container.style.maxWidth = '380px';
            this.display.container.style.maxHeight = '650px';
        }
    }

    bindModeToggle(handler) {
        if (this.modes.programmer) {
            this.modes.programmer.addEventListener('change', () => {
                this.panels.left.classList.remove('d-none');
                this.panels.right.classList.remove('d-none');
                this.panels.bases.classList.remove('d-none');

                void this.display.container.offsetHeight;

                setTimeout(() => {
                    this.panels.left.style.opacity = '1';
                    this.panels.right.style.opacity = '1';
                    this.panels.bases.style.opacity = '1';
                    this.handleResize();
                }, 10);

                if (this.dotBtn) this.dotBtn.disabled = true;
                if (handler) handler('programmer');
            });
        }

        if (this.modes.standard) {
            this.modes.standard.addEventListener('change', () => {
                const isMobile = window.innerWidth < 768;

                if (isMobile && this.display.container) {
                    this.display.container.style.maxHeight = this.display.container.scrollHeight + 'px';
                    void this.display.container.offsetHeight;
                }

                this.panels.left.style.opacity = '0';
                this.panels.right.style.opacity = '0';
                this.panels.bases.style.opacity = '0';

                this.handleResize();

                setTimeout(() => {
                    if (this.modes.standard.checked) {
                        this.panels.left.classList.add('d-none');
                        this.panels.right.classList.add('d-none');
                        this.panels.bases.classList.add('d-none');
                    }
                }, 300);

                if (this.dotBtn) this.dotBtn.disabled = false;
                if (handler) handler('standard');
            });
        }
    }

    formatNumber(number) {
        if (number === '' || number === 'Error') return number;
        const stringNum = number.toString();
        if (/[A-F]/.test(stringNum)) return stringNum;
        if (stringNum.endsWith('.')) return stringNum;
        const parts = stringNum.split('.');

        if ((parts.length === 2 && parts[1].length > 10) || stringNum.includes('e')) {
            return (parseFloat(stringNum).toPrecision(10) / 1).toString();
        }

        return stringNum;
    }

    updateDisplay(current, previous, operation) {
        const displayCurrent = this.formatNumber(current);
        if (this.display.curr) this.display.curr.innerText = displayCurrent === '' ? '\u00A0' : displayCurrent;

        if (operation != null) {
            if (this.display.prev) this.display.prev.innerText = `${this.formatNumber(previous)} ${operation}`;
        } else {
            if (this.display.prev) this.display.prev.innerText = previous ? this.formatNumber(previous) : '\u00A0';
        }
    }

    updateBases(bases) {
        if (this.basesOut.hex && bases) {
            this.basesOut.hex.innerText = bases.hex;
            this.basesOut.dec.innerText = bases.dec;
            this.basesOut.oct.innerText = bases.oct;
            this.basesOut.bin.innerText = bases.bin;
        }
    }

    bindButtonClicks(handler) {
        if (!this.buttonsList) return;
        this.buttonsList.forEach(button => {
            button.addEventListener('click', (e) => {
                let value = e.currentTarget.innerText.trim();
                if (value === 'C' && e.currentTarget.classList.contains('btn-danger')) {
                    value = 'CLEAR';
                }
                handler(value);
            });
        });
    }
}