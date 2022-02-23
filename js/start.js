import Facade from './facade.js';

{
    const facade = new Facade();
    const eCapital = document.getElementById('capital');
    const eApy = document.getElementById('apy');
    const eCompoundInterest = document.getElementById('compound-interest');
    const eYears = document.getElementById('years');
    [ eCapital, eApy, eYears].forEach(e => { e.addEventListener('keyup', evt => facade.drawTables(eCapital.value, eApy.value, eCompoundInterest.checked, eYears.value, evt))});
    eCompoundInterest.addEventListener('change', () => facade.drawTables(eCapital.value, eApy.value, eCompoundInterest.checked, eYears.value));

    facade.drawTables(eCapital.value, eApy.value, eCompoundInterest.checked, eYears.value);
}