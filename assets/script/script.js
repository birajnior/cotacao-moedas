const moeda = document.getElementById('moeda');
const inputMoeda = document.getElementById('valor');

const segMoeda = document.getElementById('seg-moeda');
const inputSegMoeda = document.getElementById('seg-valor');

const swap = document.getElementById('swap');

moeda.addEventListener('change', calcular);
inputMoeda.addEventListener('input', calcular);
segMoeda.addEventListener('change', calcular);
inputSegMoeda.addEventListener('input', calcular);

const taxInfo = document.getElementById('taxInfo');
swap.addEventListener('click', infoSwap);

main ();

function main() {
    let dinheiro = {
        'BRL': 'Real',
        'EUR': 'Euro',
        'USD': 'Dólar',
        'GBP': 'Libra Esterlina',
        'ARS': 'Peso Argentino',
    }

    let options = [];

    for (var [key, value] of Object.entries(dinheiro)) {
        options.push(`<option value='${key}'>${value}</option>`);
    }

    moeda.innerHTML = options.join('\n');
    segMoeda.innerHTML = options.join('\n');

    calcular();
}

function infoSwap() {
    let temp = moeda.value;
    moeda.value = segMoeda.value;
    segMoeda.value = temp;

    calcular();
}

async function getURL(url) {
    return (await fetch(url)).json();
  }

function getInfoSelect(select) {
    return select.options[select.selectedIndex].text;
}

async function calcular() {
    let primeiro = moeda.value;
    let segundo =  segMoeda.value; 

    let { rates } = await getURL(`https://api.exchangerate-api.com/v4/latest/${primeiro}`);


    let rate = rates[segundo];
    taxInfo.innerText = `1 ${getInfoSelect(moeda)} = ${rate} ${getInfoSelect(segMoeda)}`;
    inputSegMoeda.value = (inputMoeda.value * rate).toFixed(3);

}