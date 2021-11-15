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

export default Tables;