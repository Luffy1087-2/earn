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

export default ProfitsCalculator;