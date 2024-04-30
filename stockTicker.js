

// Function to populate the day select dropdown based on selected stock
function populateDaySelect(stock) {
    const daySelect = document.getElementById('day-select');
    daySelect.innerHTML = ''; // Clear previous options
    fetch(`/get_stock_data/${stock}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(day => {
                const option = document.createElement('option');
                option.value = day.date;
                option.textContent = day.date;
                daySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching stock data:', error));
}

// Function to display stock data for selected stock and day
export async function displayStockData(stock, selectedDate) {
    const stockDataContainer = document.getElementById('stock-data');
    stockDataContainer.innerHTML = ''; // Clear previous data
    fetch(`/get_stock_data/${stock}`)
        .then(response => response.json())
        .then(data => {
            const timeSeriesData = data["Time Series (Daily)"];
            if (timeSeriesData) {
                const selectedData = timeSeriesData[selectedDate];
                if (selectedData) {
                    const dataHTML = `
                        <p>Date: ${selectedDate}</p>
                        <p>Open: ${selectedData['1. open']}</p>
                        <p>Close: ${selectedData['4. close']}</p>
                        <p>High: ${selectedData['2. high']}</p>
                        <p>Low: ${selectedData['3. low']}</p>
                        <p>Volume: ${selectedData['5. volume']}</p>
                    `;
                    stockDataContainer.innerHTML = dataHTML;
                } else {
                    stockDataContainer.innerHTML = '<p>No data available for selected date.</p>';
                }
            } else {
                stockDataContainer.innerHTML = '<p>No time series data available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching stock data:', error);
            stockDataContainer.innerHTML = '<p>Error fetching stock data. Please try again later.</p>';
        });
}




