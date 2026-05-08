// Currency Exchange Application - XE Clone
// Simple JavaScript for L3 students
// Educational project for learning web development

// Currency data with exchange rates
const currencyData = {
    USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸', rate: 1.0 },
    EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺', rate: 0.85 },
    GBP: { name: 'British Pound', symbol: '£', flag: '🇬🇧', rate: 0.73 },
    JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', rate: 110.5 },
    CAD: { name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', rate: 1.25 },
    AUD: { name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', rate: 1.35 },
    CHF: { name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', rate: 0.92 },
    CNY: { name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', rate: 6.45 },
    INR: { name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', rate: 74.5 },
    MXN: { name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', rate: 20.1 },
    BRL: { name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', rate: 5.2 },
    ZAR: { name: 'South African Rand', symbol: 'R', flag: '🇿🇦', rate: 15.2 },
    RUB: { name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', rate: 73.8 },
    KRW: { name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', rate: 1180.5 },
    SGD: { name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', rate: 1.35 },
    HKD: { name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', rate: 7.8 },
    SEK: { name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', rate: 8.6 },
    NOK: { name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', rate: 8.4 },
    NZD: { name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', rate: 1.45 },
    TRY: { name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', rate: 8.9 }
};

// Application state (simple variables)
let currentTheme = localStorage.getItem('theme') || 'light';
let defaultFromCurrency = localStorage.getItem('defaultFromCurrency') || 'USD';
let defaultToCurrency = localStorage.getItem('defaultToCurrency') || 'EUR';
let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');

// Initialize application when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Currency Exchange App Loaded');
    initializeApp();
});

function initializeApp() {
    // Apply saved theme
    applyTheme(currentTheme);
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize page-specific functionality
    initializePage();
    
    // Setup event listeners
    setupEventListeners();
    
    // Populate currency dropdowns
    populateCurrencyDropdowns();
}

// Simple navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Page-specific initialization
function initializePage() {
    const pageName = window.location.pathname.split('/').pop();
    
    switch(pageName) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;
        case 'converter.html':
            initializeConverterPage();
            break;
        case 'details.html':
            initializeDetailsPage();
            break;
        case 'history.html':
            initializeHistoryPage();
            break;
        case 'settings.html':
            initializeSettingsPage();
            break;
    }
}

// Home page functionality
function initializeHomePage() {
    const quickAmount = document.getElementById('quick-amount');
    const quickFrom = document.getElementById('quick-from');
    const quickTo = document.getElementById('quick-to');
    const quickConvertBtn = document.getElementById('quick-convert-btn');
    const quickResult = document.getElementById('quick-result');
    
    if (quickConvertBtn) {
        quickConvertBtn.addEventListener('click', function() {
            const amount = parseFloat(quickAmount.value);
            const from = quickFrom.value;
            const to = quickTo.value;
            
            if (isNaN(amount) || amount <= 0) {
                showMessage('Please enter a valid amount', 'error');
                return;
            }
            
            const result = convertCurrency(amount, from, to);
            const rate = getExchangeRate(from, to);
            
            quickResult.innerHTML = `
                <div class="quick-result-content">
                    <strong>${amount} ${from}</strong> = <strong>${result.toFixed(2)} ${to}</strong><br>
                    <small>Rate: 1 ${from} = ${rate.toFixed(4)} ${to}</small>
                </div>
            `;
            quickResult.style.display = 'block';
        });
    }
}

// Converter page functionality
function initializeConverterPage() {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-btn');
    const resultDiv = document.getElementById('conversion-result');
    const saveBtn = document.getElementById('save-conversion');
    
    // Set default currencies
    if (fromCurrency) fromCurrency.value = defaultFromCurrency;
    if (toCurrency) toCurrency.value = defaultToCurrency;
    
    if (convertBtn) {
        convertBtn.addEventListener('click', function() {
            const amount = parseFloat(amountInput.value);
            const from = fromCurrency.value;
            const to = toCurrency.value;
            
            if (isNaN(amount) || amount <= 0) {
                showMessage('Please enter a valid amount', 'error');
                return;
            }
            
            const result = convertCurrency(amount, from, to);
            const rate = getExchangeRate(from, to);
            
            resultDiv.innerHTML = `
                <div class="conversion-result-content">
                    <h3>Conversion Result</h3>
                    <div class="result-amount">${amount} ${from} = ${result.toFixed(2)} ${to}</div>
                    <div class="result-rate">Exchange Rate: 1 ${from} = ${rate.toFixed(4)} ${to}</div>
                    <div class="result-info">
                        <p>From: ${currencyData[from].name} (${currencyData[from].flag})</p>
                        <p>To: ${currencyData[to].name} (${currencyData[to].flag})</p>
                    </div>
                </div>
            `;
            
            // Enable save button
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.onclick = function() {
                    saveConversion(amount, from, to, result);
                };
            }
        });
    }
    
    if (swapBtn) {
        swapBtn.addEventListener('click', function() {
            const temp = fromCurrency.value;
            fromCurrency.value = toCurrency.value;
            toCurrency.value = temp;
        });
    }
}

// Details page functionality
function initializeDetailsPage() {
    const currencySelect = document.getElementById('currency-select');
    const currencyInfo = document.getElementById('currency-info');
    const chartContainer = document.getElementById('chart-container');
    
    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            const currency = this.value;
            displayCurrencyDetails(currency);
        });
        
        // Display first currency by default
        if (currencySelect.options.length > 0) {
            displayCurrencyDetails(currencySelect.value);
        }
    }
}

function displayCurrencyDetails(currency) {
    const info = currencyData[currency];
    const currencyInfo = document.getElementById('currency-info');
    
    if (info && currencyInfo) {
        currencyInfo.innerHTML = `
            <div class="currency-details">
                <h2>${info.flag} ${info.name} (${currency})</h2>
                <div class="currency-info-grid">
                    <div class="info-item">
                        <label>Symbol:</label>
                        <span>${info.symbol}</span>
                    </div>
                    <div class="info-item">
                        <label>Exchange Rate:</label>
                        <span>1 USD = ${info.rate} ${currency}</span>
                    </div>
                    <div class="info-item">
                        <label>Popular:</label>
                        <span>${info.popular ? 'Yes' : 'No'}</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// History page functionality
function initializeHistoryPage() {
    displayConversionHistory();
    setupHistoryFilters();
}

function displayConversionHistory() {
    const historyContainer = document.getElementById('history-list');
    
    if (historyContainer) {
        if (conversionHistory.length === 0) {
            historyContainer.innerHTML = '<p>No conversion history yet. Start converting currencies!</p>';
            return;
        }
        
        let html = '<div class="history-items">';
        
        // Display last 10 conversions
        conversionHistory.slice(-10).reverse().forEach(item => {
            html += `
                <div class="history-item">
                    <div class="history-amount">${item.amount} ${item.from} → ${item.result.toFixed(2)} ${item.to}</div>
                    <div class="history-date">${new Date(item.date).toLocaleString()}</div>
                    <button class="delete-btn" onclick="deleteConversion(${item.id})">Delete</button>
                </div>
            `;
        });
        
        html += '</div>';
        historyContainer.innerHTML = html;
    }
}

function setupHistoryFilters() {
    const filterSelect = document.getElementById('history-filter');
    const clearBtn = document.getElementById('clear-history');
    const exportBtn = document.getElementById('export-history');
    
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            filterHistory(this.value);
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all history?')) {
                clearHistory();
            }
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportHistory);
    }
}

// Settings page functionality
function initializeSettingsPage() {
    const themeToggle = document.getElementById('theme-toggle');
    const defaultFromSelect = document.getElementById('default-from');
    const defaultToSelect = document.getElementById('default-to');
    const saveSettingsBtn = document.getElementById('save-settings');
    
    // Set current values
    if (themeToggle) {
        themeToggle.checked = currentTheme === 'dark';
    }
    
    if (defaultFromSelect) {
        defaultFromSelect.value = defaultFromCurrency;
    }
    
    if (defaultToSelect) {
        defaultToSelect.value = defaultToCurrency;
    }
    
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            // Save theme
            currentTheme = themeToggle.checked ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
            applyTheme(currentTheme);
            
            // Save default currencies
            defaultFromCurrency = defaultFromSelect.value;
            defaultToCurrency = defaultToSelect.value;
            localStorage.setItem('defaultFromCurrency', defaultFromCurrency);
            localStorage.setItem('defaultToCurrency', defaultToCurrency);
            
            showMessage('Settings saved successfully!', 'success');
        });
    }
}

// Utility functions
function convertCurrency(amount, fromCurrency, toCurrency) {
    const fromRate = currencyData[fromCurrency].rate;
    const toRate = currencyData[toCurrency].rate;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / fromRate;
    const result = usdAmount * toRate;
    
    return result;
}

function getExchangeRate(fromCurrency, toCurrency) {
    const fromRate = currencyData[fromCurrency].rate;
    const toRate = currencyData[toCurrency].rate;
    return toRate / fromRate;
}

function saveConversion(amount, from, to, result) {
    const conversion = {
        id: Date.now(),
        amount: amount,
        from: from,
        to: to,
        result: result,
        date: new Date().toISOString()
    };
    
    conversionHistory.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    
    showMessage('Conversion saved to history!', 'success');
}

function deleteConversion(id) {
    conversionHistory = conversionHistory.filter(item => item.id !== id);
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    displayConversionHistory();
    showMessage('Conversion deleted', 'info');
}

function clearHistory() {
    conversionHistory = [];
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    displayConversionHistory();
    showMessage('History cleared', 'info');
}

function exportHistory() {
    if (conversionHistory.length === 0) {
        showMessage('No history to export', 'error');
        return;
    }
    
    const dataStr = JSON.stringify(conversionHistory, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'currency-history.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('History exported successfully!', 'success');
}

function filterHistory(currency) {
    const historyItems = document.querySelectorAll('.history-item');
    
    historyItems.forEach(item => {
        if (currency === 'all') {
            item.style.display = 'block';
        } else {
            const text = item.textContent;
            if (text.includes(currency)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

function populateCurrencyDropdowns() {
    const selects = document.querySelectorAll('select[data-currency]');
    
    selects.forEach(select => {
        // Clear existing options
        select.innerHTML = '';
        
        // Add currency options
        Object.keys(currencyData).forEach(code => {
            const currency = currencyData[code];
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${currency.flag} ${currency.name} (${code})`;
            select.appendChild(option);
        });
    });
}

function applyTheme(theme) {
    document.body.className = theme;
    currentTheme = theme;
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    
    // Insert at top of main content
    const main = document.querySelector('main') || document.body;
    main.insertBefore(messageEl, main.firstChild);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 3000);
}

function setupEventListeners() {
    // Add any global event listeners here
    console.log('Event listeners setup complete');
}

// Make functions available globally
window.deleteConversion = deleteConversion;
window.filterHistory = filterHistory;
