import { fetchSelectedCurrencyRate } from '/static/exchangeRate.js';
import { displayStockData } from '/static/stockTicker.js';

document.addEventListener('DOMContentLoaded', function () {
    let transactions = [];

    // Fetch existing transactions and initialize the application
    fetch('/get-transactions', {
        headers: {
            'Cache-Control': 'no-cache', // Prevents caching of the response
        }
    })
        .then(response => response.json())
        .then(data => {
            transactions = data.transactions; // Ensure transactions array is refreshed with latest data
            const list = document.getElementById('transactions-list');
            list.innerHTML = ''; // Clear the list before adding items to prevent duplication
            transactions.forEach(transaction => addTransactionToList(transaction));
            updateFinancialData(financialChart, transactions); // Pass transactions and chart to function
        })
        .catch(error => console.error('Failed to load transactions:', error));

    // Event listener for currency rate checking
    const rateButton = document.getElementById('rate-check-button');
    rateButton.addEventListener('click', fetchSelectedCurrencyRate);

    // Event listener for stock input
    // Event listener for stock input
    document.getElementById('stock-input').addEventListener('change', function (event) {
        const selectedStock = event.target.value.toUpperCase(); // Convert to uppercase
        fetch(`/get_stock_data/${selectedStock}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.error('Error fetching stock data:', data.error);
                    // Handle error
                } else {
                    populateDateSelect(data.dates);
                }
            })
            .catch(error => {
                console.error('Error fetching stock data:', error);
                // Handle error
            });
    });
    // Event listener for date select dropdown
    document.getElementById('date-select').addEventListener('change', function (event) {
        const selectedStock = document.getElementById('stock-input').value.toUpperCase(); // Convert to uppercase
        const selectedDate = event.target.value;
        displayStockData(selectedStock, selectedDate);
    });
    // Function to populate the date select dropdown with the last 100 days
    function populateDateSelect(stockData) {
        const dateSelect = document.getElementById('date-select');
        const today = new Date();
        for (let i = 0; i < 100; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const option = document.createElement('option');
            option.value = formatDate(date);
            option.textContent = formatDate(date);
            dateSelect.appendChild(option);
        }
    }

    // Function to format date as YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    // Initialize pie chart for financial overview
    const ctx = document.getElementById('financial-chart').getContext('2d');
    const financialChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                label: 'Financial Overview',
                data: [0, 0], // Initialize with zero data
                backgroundColor: ['green', 'red'],
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { position: 'right' },
        },
    });

    // Handle form submission for new transactions
    const transactionForm = document.getElementById('transaction-form');
    transactionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(transactionForm);
        const description = formData.get('description');
        const amount = parseFloat(formData.get('amount').replace(/\$|,/g, ''));
        const type = formData.get('type');
        const newTransaction = { description, amount, type };

        fetch('/add-transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTransaction),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const transactionWithId = { ...newTransaction, id: data.transactionId };
                    transactions.push(transactionWithId);
                    addTransactionToList(transactionWithId);
                    updateFinancialData(financialChart, transactions); // Pass transactions and chart to function
                } else {
                    alert('Failed to save transaction.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to save transaction.');
            });
    });

    // Function to add a transaction to the list
    function addTransactionToList(transaction) {
        const list = document.getElementById('transactions-list');
        const item = document.createElement('li');
        item.textContent = `${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.type})`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('data-id', transaction.id);
        removeButton.addEventListener('click', () => removeTransaction(removeButton, transaction.id));
        item.appendChild(removeButton);
        list.appendChild(item);
    }

    function removeTransaction(buttonElement, transactionId) {
        fetch(`/delete-transaction/${transactionId}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Failed to delete transaction');
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    transactions = transactions.filter(t => t.id !== transactionId);
                    buttonElement.closest('li').remove();
                    updateFinancialData(financialChart, transactions); // Pass transactions and chart to function
                    alert('Transaction removed successfully!');
                } else {
                    alert('Failed to remove transaction.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error removing transaction.');
            });
    }

    // Update financial data and refresh the chart
    function updateFinancialData(chart, transactions) {
        const [totalIncome, totalExpenses] = calculateChartData(transactions);
        document.getElementById('total-income').textContent = totalIncome.toFixed(2);
        document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
        document.getElementById('net-savings').textContent = (totalIncome - totalExpenses).toFixed(2);

        chart.data.datasets[0].data = [totalIncome, totalExpenses];
        chart.update();
    }

    // Calculate totals for the financial chart
    function calculateChartData(transactions) {
        const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
        const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
        return [income, expenses];
    }
});
