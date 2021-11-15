import ProfitsCalculator from './profits-calculator.js';
import Tables from './tables.js';

class Facade {
    constructor () {
        this.calc = new ProfitsCalculator();
        this.tables = new Tables();
    }

    drawTables (capital, apy, isCompoundInterest, years) {
        if (!this.calc.canCalculateProfits(capital, apy, years)) {
            return;
        }

        const profits = this.calc.getAllProfits(Number(capital), Number(apy), isCompoundInterest, Number(years));
        console.log(profits);
        this.tables.clear();
        this.tables.drawTables(profits);
    }
}

export default Facade;