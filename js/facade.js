import ProfitsCalculator from './profits-calculator.js';
import Tables from './tables.js';

class Facade {
    constructor () {
        this.calc = new ProfitsCalculator();
        this.tables = new Tables();
    }

    drawTables (capital, apy, isCompoundInterest, years, evt) {
        let newYears = years;
        
        if (this.shouldForceYear(evt)) {
            newYears = evt.currentTarget.value = 90;
        }

        if (!this.calc.canCalculateProfits(capital, apy, newYears)) {
            evt.preventDefault();
            return;
        }

        const profits = this.calc.getAllProfits(Number(capital), Number(apy), isCompoundInterest, Number(years));
        console.log(profits);
        this.tables.clear();
        this.tables.drawTables(profits);
    }

    shouldForceYear (evt) {
        if (!evt) {
            return false;
        }
        
        const el = evt.currentTarget;

        return el.id === 'years' && el.value > 90;
    }
}

export default Facade;