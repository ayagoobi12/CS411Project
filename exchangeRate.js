export async function fetchSelectedCurrencyRate() {
    const selectedCurrency = document.getElementById('currency-select').value;
    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/USD`);
        const data = await response.json();
        displayCurrencyRate(data.rates, selectedCurrency);
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        document.getElementById('rate-display').textContent = 'Failed to load the rate';
    }
}

function displayCurrencyRate(rates, currency) {
    const rateDisplay = document.getElementById('rate-display');
    if (rates && rates[currency]) {
        rateDisplay.textContent = `1 USD = ${rates[currency]} ${currency}`;
    } else {
        rateDisplay.textContent = `Rate for ${currency} not available.`;
    }
}
