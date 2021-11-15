// Set events on fields
class Start {
    constructor() {
        const facade = new Facade();
        const eCapital = document.getElementById('capital');
        const eApy = document.getElementById('apy');
        const eCompoundInterest = document.getElementById('compound-interest');
        const eYears = document.getElementById('years');
        [ eCapital, eApy, eYears].forEach((e) => { e.addEventListener('keyup', () => facade.drawTables(eCapital.value, eApy.value, eCompoundInterest.checked, eYears.value))});
        eCompoundInterest.addEventListener('change', () => facade.drawTables(eCapital.value, eApy.value, eCompoundInterest.checked, eYears.value));

        facade.drawTables(eCapital.value, eApy.value, eCompoundInterest.checked, eYears.value);
    }
}

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

class ProfitsCalculator {
    constructor () {
        this.months = {
            '0': 'January',
            '1': 'February',
            '2': 'March',
            '3': 'April',
            '4': 'May',
            '5': 'June',
            '6': 'July',
            '7': 'August',
            '8': 'September',
            '9': 'October',
            '10': 'November',
            '11': 'Dicember'
        };
    }

    getAllProfits (capital, apy, isCompoundInterest, years) {
        const date = new Date();
        const fullYear = date.getFullYear();
        const data = { years: [] };
        let totalYearProfits = 0;
        let newCapital = capital;
        for (let y = 0; y < years; y++) {
            let profits = this.getYearProfits(capital, apy, isCompoundInterest);
            let currentYear = fullYear + y;
            let profitsInYear = profits.slice(-1)[0].totalProfit;
            
            totalYearProfits = this.fixAmount(totalYearProfits + profitsInYear);
            newCapital += profits.slice(-1)[0].totalProfit;
            data.years.push({
                fullYear: currentYear,
                startCapital: this.fixAmount(capital),
                endCapital: this.fixAmount(newCapital),
                profits,
                profitsInYear
            });
            capital = newCapital;
        }

        data.totalProfits = this.fixAmount(totalYearProfits);

        return data;
    }

    getYearProfits (capital, apy, isCompoundInterest) {
        const profits = [];
        const monthProfitPercentage = apy / 12;
        let newCapital = capital;
        let totalProfit = 0;
        for (let month = 0; month <= 11; month++) {
            let profit = newCapital / 100 * monthProfitPercentage;
            let fullMonth = this.months[month];
            totalProfit += profit;
            if (isCompoundInterest) { newCapital += profit; }

            profits.push({
                fullMonth,
                profit: this.fixAmount(profit),
                totalProfit: this.fixAmount(totalProfit)
            });
        }

        return profits;
    }

    canCalculateProfits (capital, apy, years) {
        return  capital > 0 &&
                apy >= 1 &&
                years >= 1
    }

    fixAmount (amount) {
        return Number(amount.toFixed(2));
    }
}

class Tables {
    constructor () {
        this.report = document.getElementById('report');
    }

    drawTables (data) {
        const years = data.years;
        for (let year of years) {
            this.report.appendChild(this.drawTable(year));
        }
    }

    drawTable (yearData) {
        // Years
        const yearTable = this.createTable();
        const [ eThead1, eTbody1 ] = yearTable.children;
        this.drawRow(eThead1, ['Year', 'Initial Instestiment', 'Total Profits']);
        this.drawRow(eThead1, [yearData.fullYear, yearData.startCapital, yearData.profitsInYear]);
        this.drawRow(eTbody1, [''], { colSpan: 3 });
        yearTable.classList.add('year');

        // Months
        const monthsTable = this.createTable();
        const [ eThead2, eTbody2 ] = monthsTable.children;
        this.drawRow(eThead2, ['Month', 'Profit']);
        for (let profit of yearData.profits) {
            this.drawRow(eTbody2, [profit.fullMonth, profit.profit]);
        }
        monthsTable.classList.add('months');

        const lastRowCell = eTbody1.rows[eTbody1.rows.length-1].cells[0];
        lastRowCell.appendChild(monthsTable);

        return yearTable;
    }

    drawRow (el, data, attr) {
        const eRow = el.insertRow();
        data.forEach(content => {
            const cell = eRow.insertCell();
            if (attr && Object.keys(attr).length > 0) {
                for (let p in attr) {
                    cell[p] = attr[p];
                }
            }
            cell.innerHTML = content;
        });

        return eRow;
    }

    createTable () {
        const eTable = document.createElement('table');
        const eThead = document.createElement('thead');
        const eTbody = document.createElement('tbody');
        eTable.appendChild(eThead);
        eTable.appendChild(eTbody);

        return eTable;
    }

    clear () {        
        this.report.innerHTML = '';
    }
}

new Start();