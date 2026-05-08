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

/**
 * Logger utility for debugging and error tracking
 */
class Logger {
    static log(message, data = null) {
        console.log(`[${CONFIG.APP_NAME}] ${message}`, data || '');
    }
    
    static error(message, error = null) {
        console.error(`[${CONFIG.APP_NAME}] ERROR: ${message}`, error || '');
        this.logErrorToStorage(message, error);
    }
    
    static warn(message) {
        console.warn(`[${CONFIG.APP_NAME}] WARNING: ${message}`);
    }
    
    static info(message) {
        console.info(`[${CONFIG.APP_NAME}] INFO: ${message}`);
    }
    
    static logErrorToStorage(message, error) {
        try {
            const errors = JSON.parse(localStorage.getItem('app_errors') || '[]');
            errors.push({
                timestamp: new Date().toISOString(),
                message,
                error: error?.toString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            });
            
            // Keep only last 50 errors
            if (errors.length > 50) {
                errors.splice(0, errors.length - 50);
            }
            
            localStorage.setItem('app_errors', JSON.stringify(errors));
        } catch (e) {
            console.warn('Could not log error to storage:', e);
        }
    }
}

/**
 * Validation utility class
 */
class Validator {
    static validateAmount(amount) {
        const numAmount = parseFloat(amount);
        
        if (isNaN(numAmount)) {
            return { valid: false, message: 'Please enter a valid number' };
        }
        
        if (numAmount <= 0) {
            return { valid: false, message: 'Amount must be greater than 0' };
        }
        
        if (numAmount > CONFIG.VALIDATION.MAX_AMOUNT) {
            return { valid: false, message: `Amount cannot exceed ${CONFIG.VALIDATION.MAX_AMOUNT.toLocaleString()}` };
        }
        
        return { valid: true, value: numAmount };
    }
    
    static validateCurrency(currency) {
        if (!currency || typeof currency !== 'string') {
            return { valid: false, message: 'Please select a currency' };
        }
        
        if (!CONFIG.VALIDATION.SUPPORTED_CURRENCIES.includes(currency.toUpperCase())) {
            return { valid: false, message: 'Unsupported currency selected' };
        }
        
        return { valid: true, value: currency.toUpperCase() };
    }
    
    static validateConversion(amount, fromCurrency, toCurrency) {
        const amountValidation = this.validateAmount(amount);
        if (!amountValidation.valid) {
            return amountValidation;
        }
        
        const fromValidation = this.validateCurrency(fromCurrency);
        if (!fromValidation.valid) {
            return fromValidation;
        }
        
        const toValidation = this.validateCurrency(toCurrency);
        if (!toValidation.valid) {
            return toValidation;
        }
        
        if (fromValidation.value === toValidation.value) {
            return { valid: false, message: 'Please select different currencies' };
        }
        
        return { 
            valid: true, 
            amount: amountValidation.value,
            fromCurrency: fromValidation.value,
            toCurrency: toValidation.value
        };
    }
}

/**
 * Storage utility class with error handling
 */
class StorageManager {
    static get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            Logger.error(`Failed to get storage item: ${key}`, error);
            return defaultValue;
        }
    }
    
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            Logger.error(`Failed to set storage item: ${key}`, error);
            return false;
        }
    }
    
    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            Logger.error(`Failed to remove storage item: ${key}`, error);
            return false;
        }
    }
    
    static clear() {
        try {
            const keysToKeep = Object.values(CONFIG.STORAGE_KEYS);
            const allKeys = Object.keys(localStorage);
            
            allKeys.forEach(key => {
                if (!keysToKeep.includes(key)) {
                    localStorage.removeItem(key);
                }
            });
            
            return true;
        } catch (error) {
            Logger.error('Failed to clear storage', error);
            return false;
        }
    }
}

/**
 * Enhanced Application State Management
 */
class AppState {
    constructor() {
        this.state = {
            theme: StorageManager.get(CONFIG.STORAGE_KEYS.THEME, 'light'),
            defaultFromCurrency: StorageManager.get(CONFIG.STORAGE_KEYS.DEFAULT_FROM, 'USD'),
            defaultToCurrency: StorageManager.get(CONFIG.STORAGE_KEYS.DEFAULT_TO, 'EUR'),
            conversionHistory: StorageManager.get(CONFIG.STORAGE_KEYS.HISTORY, []),
            settings: StorageManager.get(CONFIG.STORAGE_KEYS.SETTINGS, {}),
            lastRatesUpdate: StorageManager.get(CONFIG.STORAGE_KEYS.LAST_UPDATE, null),
            isLoading: false,
            currentConversion: null,
            errors: []
        };
        
        this.subscribers = [];
        this.initializeState();
    }
    
    initializeState() {
        // Validate and sanitize stored data
        this.state.conversionHistory = this.state.conversionHistory.filter(item => 
            item && 
            typeof item.id === 'number' && 
            typeof item.amount === 'number' && 
            item.from && 
            item.to && 
            typeof item.result === 'number'
        );
        
        // Validate default currencies
        if (!CONFIG.VALIDATION.SUPPORTED_CURRENCIES.includes(this.state.defaultFromCurrency)) {
            this.state.defaultFromCurrency = 'USD';
        }
        
        if (!CONFIG.VALIDATION.SUPPORTED_CURRENCIES.includes(this.state.defaultToCurrency)) {
            this.state.defaultToCurrency = 'EUR';
        }
        
        Logger.info('Application state initialized');
    }
    
    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }
    
    notify(change) {
        this.subscribers.forEach(callback => {
            try {
                callback(this.state, change);
            } catch (error) {
                Logger.error('Subscriber callback error', error);
            }
        });
    }
    
    setState(updates, persist = false) {
        const prevState = { ...this.state };
        this.state = { ...this.state, ...updates };
        
        if (persist) {
            Object.keys(updates).forEach(key => {
                const storageKey = CONFIG.STORAGE_KEYS[key.toUpperCase()];
                if (storageKey) {
                    StorageManager.set(storageKey, this.state[key]);
                }
            });
        }
        
        this.notify({ type: 'STATE_UPDATE', prevState, currentState: this.state, updates });
    }
    
    getState() {
        return { ...this.state };
    }
}

// Global app state instance
const appState = new AppState();

/**
 * Currency Conversion Service
 */
class CurrencyService {
    static convert(amount, fromCurrency, toCurrency) {
        try {
            const fromRate = currencyData[fromCurrency]?.rate || 1;
            const toRate = currencyData[toCurrency]?.rate || 1;
            
            // Convert to USD first, then to target currency
            const usdAmount = amount / fromRate;
            const result = usdAmount * toRate;
            
            // Round to appropriate decimal places
            const precision = currencyData[toCurrency]?.precision || 2;
            return Math.round(result * Math.pow(10, precision)) / Math.pow(10, precision);
        } catch (error) {
            Logger.error('Currency conversion error', error);
            throw new Error('Conversion failed');
        }
    }
    
    static getExchangeRate(fromCurrency, toCurrency) {
        try {
            const fromRate = currencyData[fromCurrency]?.rate || 1;
            const toRate = currencyData[toCurrency]?.rate || 1;
            return toRate / fromRate;
        } catch (error) {
            Logger.error('Exchange rate calculation error', error);
            return 1;
        }
    }
    
    static getCurrencyInfo(code) {
        return currencyData[code] || null;
    }
    
    static getPopularCurrencies() {
        return Object.entries(currencyData)
            .filter(([_, info]) => info.popular)
            .map(([code, info]) => ({ code, ...info }));
    }
    
    static getAllCurrencies() {
        return Object.entries(currencyData).map(([code, info]) => ({ code, ...info }));
    }
}

/**
 * UI Controller for managing user interface interactions
 */
class UIController {
    static showMessage(message, type = 'info', duration = CONFIG.ANIMATION.MESSAGE_TIMEOUT) {
        try {
            // Remove existing messages
            const existingMessage = document.querySelector('.message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Create message element
            const messageEl = document.createElement('div');
            messageEl.className = `message ${type} fade-in`;
            messageEl.textContent = message;
            messageEl.setAttribute('role', 'alert');
            messageEl.setAttribute('aria-live', 'polite');
            
            // Insert at top of main content
            const main = document.querySelector('main') || document.body;
            main.insertBefore(messageEl, main.firstChild);
            
            // Auto-remove after duration
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.classList.add('fade-out');
                    setTimeout(() => {
                        if (messageEl.parentNode) {
                            messageEl.remove();
                        }
                    }, CONFIG.ANIMATION.DURATION);
                }
            }, duration);
            
            Logger.info(`Message displayed: ${type} - ${message}`);
        } catch (error) {
            Logger.error('Failed to show message', error);
        }
    }
    
    static setLoading(element, isLoading) {
        try {
            if (!element) return;
            
            if (isLoading) {
                element.disabled = true;
                element.setAttribute('aria-busy', 'true');
                
                const btnText = element.querySelector('.btn-text');
                const spinner = element.querySelector('.loading-spinner');
                
                if (btnText) btnText.style.display = 'none';
                if (spinner) spinner.style.display = 'inline-block';
            } else {
                element.disabled = false;
                element.removeAttribute('aria-busy');
                
                const btnText = element.querySelector('.btn-text');
                const spinner = element.querySelector('.loading-spinner');
                
                if (btnText) btnText.style.display = 'inline';
                if (spinner) spinner.style.display = 'none';
            }
        } catch (error) {
            Logger.error('Failed to set loading state', error);
        }
    }
    
    static animateElement(element, animationClass) {
        try {
            if (!element) return;
            
            element.classList.remove(animationClass);
            void element.offsetWidth; // Trigger reflow
            element.classList.add(animationClass);
            
            setTimeout(() => {
                element.classList.remove(animationClass);
            }, CONFIG.ANIMATION.DURATION);
        } catch (error) {
            Logger.error('Failed to animate element', error);
        }
    }
}

/**
 * Application Initialization
 */
function initializeApp() {
    try {
        Logger.info('Initializing application...');
        
        // Apply saved theme
        applyTheme(appState.getState().theme);
        
        // Initialize navigation
        initializeNavigation();
        
        // Initialize page-specific functionality
        initializePage();
        
        // Setup event listeners
        setupEventListeners();
        
        // Populate currency dropdowns
        populateCurrencyDropdowns();
        
        // Setup error handling
        setupErrorHandling();
        
        // Check for service worker support
        registerServiceWorker();
        
        Logger.info('Application initialized successfully');
        UIController.showMessage('Application loaded successfully', 'success', 3000);
    } catch (error) {
        Logger.error('Application initialization failed', error);
        UIController.showMessage('Application failed to initialize properly', 'error');
    }
}

/**
 * Error Handling Setup
 */
function setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
        Logger.error('Global error caught', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        Logger.error('Unhandled promise rejection', event.reason);
        event.preventDefault();
    });
}

/**
 * Service Worker Registration
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                Logger.info('Service Worker registered successfully');
            })
            .catch(error => {
                Logger.warn('Service Worker registration failed', error);
            });
    }
}

/**
 * Enhanced Navigation functionality
 */
function initializeNavigation() {
    try {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                const isActive = navMenu.classList.toggle('active');
                this.setAttribute('aria-expanded', isActive);
                
                // Close menu when clicking outside
                if (isActive) {
                    setTimeout(() => {
                        document.addEventListener('click', closeNavOnOutsideClick);
                    }, 100);
                }
            });
        }
        
        // Set active navigation link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
        
        Logger.info('Navigation initialized');
    } catch (error) {
        Logger.error('Navigation initialization failed', error);
    }
}

function closeNavOnOutsideClick(event) {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeNavOnOutsideClick);
    }
}

/**
 * Page-specific initialization
 */
function initializePage() {
    const pageName = window.location.pathname.split('/').pop();
    
    try {
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
            default:
                Logger.warn('Unknown page:', pageName);
        }
        
        Logger.info(`Page initialized: ${pageName}`);
    } catch (error) {
        Logger.error(`Page initialization failed: ${pageName}`, error);
    }
}

/**
 * Enhanced Home page functionality
 */
function initializeHomePage() {
    const quickAmount = document.getElementById('quick-amount');
    const quickFrom = document.getElementById('quick-from');
    const quickTo = document.getElementById('quick-to');
    const quickConvertBtn = document.getElementById('quick-convert-btn');
    const quickResult = document.getElementById('quick-result');
    
    // Set default values
    const state = appState.getState();
    if (quickFrom) quickFrom.value = state.defaultFromCurrency;
    if (quickTo) quickTo.value = state.defaultToCurrency;
    
    if (quickConvertBtn) {
        quickConvertBtn.addEventListener('click', handleQuickConversion);
    }
    
    // Add enter key support
    if (quickAmount) {
        quickAmount.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleQuickConversion();
            }
        });
    }
}

function handleQuickConversion() {
    try {
        const quickAmount = document.getElementById('quick-amount');
        const quickFrom = document.getElementById('quick-from');
        const quickTo = document.getElementById('quick-to');
        const quickResult = document.getElementById('quick-result');
        
        const validation = Validator.validateConversion(
            quickAmount.value,
            quickFrom.value,
            quickTo.value
        );
        
        if (!validation.valid) {
            UIController.showMessage(validation.message, 'error');
            return;
        }
        
        const result = CurrencyService.convert(
            validation.amount,
            validation.fromCurrency,
            validation.toCurrency
        );
        
        const rate = CurrencyService.getExchangeRate(
            validation.fromCurrency,
            validation.toCurrency
        );
        
        quickResult.innerHTML = `
            <div class="quick-result-content">
                <strong>${validation.amount} ${validation.fromCurrency}</strong> = <strong>${result} ${validation.toCurrency}</strong><br>
                <small>Rate: 1 ${validation.fromCurrency} = ${rate.toFixed(4)} ${validation.toCurrency}</small>
            </div>
        `;
        
        quickResult.style.display = 'block';
        UIController.animateElement(quickResult, 'fade-in');
        
        Logger.info('Quick conversion completed', {
            amount: validation.amount,
            from: validation.fromCurrency,
            to: validation.toCurrency,
            result
        });
        
    } catch (error) {
        Logger.error('Quick conversion failed', error);
        UIController.showMessage('Conversion failed. Please try again.', 'error');
    }
}

// Converter page functionality
function initializeConverterPage() {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-btn');
    const saveBtn = document.getElementById('save-conversion-btn');
    
    // Set default values
    if (fromCurrency && toCurrency) {
        fromCurrency.value = appState.defaultFromCurrency;
        toCurrency.value = appState.defaultToCurrency;
    }
    
    // Convert button
    if (convertBtn) {
        convertBtn.addEventListener('click', performConversion);
    }
    
    // Swap button
    if (swapBtn) {
        swapBtn.addEventListener('click', function() {
            const temp = fromCurrency.value;
            fromCurrency.value = toCurrency.value;
            toCurrency.value = temp;
        });
    }
    
    // Save conversion button
    if (saveBtn) {
        saveBtn.addEventListener('click', saveConversion);
    }
    
    // Popular conversion buttons
    const popularBtns = document.querySelectorAll('.popular-btn');
    popularBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const from = this.dataset.from;
            const to = this.dataset.to;
            fromCurrency.value = from;
            toCurrency.value = to;
        });
    });
    
    // Search functionality
    setupCurrencySearch('from-search', 'from-currency');
    setupCurrencySearch('to-search', 'to-currency');
}

// Details page functionality
function initializeDetailsPage() {
    const detailCurrency = document.getElementById('detail-currency');
    
    if (detailCurrency) {
        detailCurrency.addEventListener('change', function() {
            const currency = this.value;
            if (currency) {
                displayCurrencyDetails(currency);
            }
        });
    }
    
    // Chart controls
    const chartBtns = document.querySelectorAll('.chart-btn');
    chartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            chartBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateChart(this.dataset.period);
        });
    });
}

// History page functionality
function initializeHistoryPage() {
    displayConversionHistory();
    updateHistoryStats();
    
    // Clear history button
    const clearBtn = document.getElementById('clear-history-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearHistory);
    }
    
    // Export buttons
    const exportJsonBtn = document.getElementById('export-json-btn');
    const exportCsvBtn = document.getElementById('export-csv-btn');
    
    if (exportJsonBtn) {
        exportJsonBtn.addEventListener('click', exportHistoryAsJSON);
    }
    
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', exportHistoryAsCSV);
    }
    
    // Currency filter
    const currencyFilter = document.getElementById('currency-filter');
    if (currencyFilter) {
        currencyFilter.addEventListener('change', filterHistory);
    }
}

// Settings page functionality
function initializeSettingsPage() {
    const themeToggle = document.getElementById('theme-toggle');
    const defaultFrom = document.getElementById('default-from');
    const defaultTo = document.getElementById('default-to');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const resetSettingsBtn = document.getElementById('reset-settings-btn');
    const clearDataBtn = document.getElementById('clear-data-btn');
    
    // Set current values
    if (themeToggle) {
        themeToggle.checked = appState.theme === 'dark';
    }
    
    if (defaultFrom) {
        defaultFrom.value = appState.defaultFromCurrency;
    }
    
    if (defaultTo) {
        defaultTo.value = appState.defaultToCurrency;
    }
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            toggleTheme(this.checked);
        });
    }
    
    // Save settings
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveSettings);
    }
    
    // Reset settings
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', resetSettings);
    }
    
    // Clear all data
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', clearAllData);
    }
}

// Currency conversion functions
function convertCurrency(amount, fromCurrency, toCurrency) {
    const fromRate = currencyData[fromCurrency]?.rate || 1;
    const toRate = currencyData[toCurrency]?.rate || 1;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / fromRate;
    return usdAmount * toRate;
}

function getExchangeRate(fromCurrency, toCurrency) {
    const fromRate = currencyData[fromCurrency]?.rate || 1;
    const toRate = currencyData[toCurrency]?.rate || 1;
    return toRate / fromRate;
}

function performConversion() {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const resultSection = document.getElementById('result-section');
    const convertBtn = document.getElementById('convert-btn');
    
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    // Validation
    if (isNaN(amount) || amount <= 0) {
        showMessage('Please enter a valid positive amount', 'error');
        return;
    }
    
    if (!from || !to) {
        showMessage('Please select both currencies', 'error');
        return;
    }
    
    if (from === to) {
        showMessage('Please select different currencies', 'error');
        return;
    }
    
    // Show loading state
    const btnText = convertBtn.querySelector('.btn-text');
    const spinner = convertBtn.querySelector('.loading-spinner');
    btnText.style.display = 'none';
    spinner.style.display = 'inline-block';
    
    // Simulate API call
    setTimeout(() => {
        const result = convertCurrency(amount, from, to);
        const rate = getExchangeRate(from, to);
        const timestamp = new Date().toLocaleString();
        
        // Display results
        document.getElementById('from-amount-display').textContent = amount.toFixed(2);
        document.getElementById('from-currency-display').textContent = from;
        document.getElementById('to-amount-display').textContent = result.toFixed(2);
        document.getElementById('to-currency-display').textContent = to;
        document.getElementById('exchange-rate').textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        document.getElementById('timestamp').textContent = timestamp;
        
        resultSection.style.display = 'block';
        resultSection.classList.add('fade-in');
        
        // Hide loading state
        btnText.style.display = 'inline';
        spinner.style.display = 'none';
        
        // Store conversion data for saving
        window.currentConversion = {
            amount: amount,
            from: from,
            to: to,
            result: result,
            rate: rate,
            timestamp: timestamp
        };
    }, 1000);
}

function saveConversion() {
    if (!window.currentConversion) {
        showMessage('No conversion to save', 'warning');
        return;
    }
    
    const conversion = {
        ...window.currentConversion,
        id: Date.now()
    };
    
    appState.conversionHistory.unshift(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(appState.conversionHistory));
    
    showMessage('Conversion saved to history', 'success');
    
    // Update history if on history page
    if (window.location.pathname.includes('history.html')) {
        displayConversionHistory();
        updateHistoryStats();
    }
}

// History management functions
function displayConversionHistory(filter = '') {
    const historyItems = document.getElementById('history-items');
    const emptyState = document.getElementById('history-empty');
    
    let history = appState.conversionHistory;
    
    // Apply filter
    if (filter) {
        history = history.filter(item => 
            item.from.includes(filter) || item.to.includes(filter)
        );
    }
    
    if (history.length === 0) {
        historyItems.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    historyItems.style.display = 'block';
    emptyState.style.display = 'none';
    
    historyItems.innerHTML = history.map(item => `
        <div class="history-item fade-in">
            <div class="history-item-content">
                <div class="history-item-amount">
                    ${item.amount} ${item.from} = ${item.result.toFixed(2)} ${item.to}
                </div>
                <div class="history-item-date">${item.timestamp}</div>
                <div class="history-item-rate">Rate: 1 ${item.from} = ${item.rate.toFixed(4)} ${item.to}</div>
            </div>
            <div class="history-item-actions">
                <button class="delete-btn" onclick="deleteConversion(${item.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function deleteConversion(id) {
    appState.conversionHistory = appState.conversionHistory.filter(item => item.id !== id);
    localStorage.setItem('conversionHistory', JSON.stringify(appState.conversionHistory));
    displayConversionHistory();
    updateHistoryStats();
    showMessage('Conversion deleted', 'success');
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all conversion history?')) {
        appState.conversionHistory = [];
        localStorage.setItem('conversionHistory', JSON.stringify(appState.conversionHistory));
        displayConversionHistory();
        updateHistoryStats();
        showMessage('History cleared', 'success');
    }
}

function filterHistory() {
    const filter = document.getElementById('currency-filter').value;
    displayConversionHistory(filter);
}

function updateHistoryStats() {
    const totalConversions = document.getElementById('total-conversions');
    const mostUsedCurrency = document.getElementById('most-used-currency');
    const firstConversion = document.getElementById('first-conversion');
    
    if (totalConversions) {
        totalConversions.textContent = appState.conversionHistory.length;
    }
    
    if (appState.conversionHistory.length > 0) {
        // Find most used currency
        const currencyCount = {};
        appState.conversionHistory.forEach(item => {
            currencyCount[item.from] = (currencyCount[item.from] || 0) + 1;
            currencyCount[item.to] = (currencyCount[item.to] || 0) + 1;
        });
        
        const mostUsed = Object.keys(currencyCount).reduce((a, b) => 
            currencyCount[a] > currencyCount[b] ? a : b
        );
        
        if (mostUsedCurrency) {
            mostUsedCurrency.textContent = mostUsed;
        }
        
        // First conversion
        const first = appState.conversionHistory[appState.conversionHistory.length - 1];
        if (firstConversion && first) {
            firstConversion.textContent = new Date(first.timestamp).toLocaleDateString();
        }
    } else {
        if (mostUsedCurrency) mostUsedCurrency.textContent = '-';
        if (firstConversion) firstConversion.textContent = '-';
    }
}

// Export functions
function exportHistoryAsJSON() {
    const dataStr = JSON.stringify(appState.conversionHistory, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `currency-history-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('History exported as JSON', 'success');
}

function exportHistoryAsCSV() {
    let csv = 'Date,From,To,Amount,Result,Rate\n';
    
    appState.conversionHistory.forEach(item => {
        csv += `"${item.timestamp}","${item.from}","${item.to}",${item.amount},${item.result.toFixed(2)},${item.rate}\n`;
    });
    
    const dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(csv);
    const exportFileDefaultName = `currency-history-${new Date().toISOString().split('T')[0]}.csv`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('History exported as CSV', 'success');
}

// Currency details functions
function displayCurrencyDetails(currency) {
    const currencyInfo = document.getElementById('currency-info');
    const currencyName = document.getElementById('currency-name');
    const currencyCode = document.getElementById('currency-code');
    const currencyFlag = document.getElementById('currency-flag');
    const currentRateUsd = document.getElementById('current-rate-usd');
    const change24h = document.getElementById('change-24h');
    const volume24h = document.getElementById('volume-24h');
    
    const currency = currencyData[currency];
    if (!currency) return;
    
    currencyName.textContent = currency.name;
    currencyCode.textContent = currency;
    currencyFlag.textContent = currency.flag;
    currentRateUsd.textContent = `1 ${currency} = ${(1/currency.rate).toFixed(4)} USD`;
    
    // Mock data for demonstration
    const change = (Math.random() - 0.5) * 5;
    const volume = Math.floor(Math.random() * 1000000000);
    
    change24h.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
    change24h.style.color = change >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
    volume24h.textContent = `$${(volume / 1000000).toFixed(0)}M`;
    
    // Display comparison grid
    displayComparisonGrid(currency);
    
    // Display historical data
    displayHistoricalData(currency);
    
    // Show currency info
    currencyInfo.style.display = 'block';
    currencyInfo.classList.add('fade-in');
    
    // Initialize chart
    initializeChart();
}

function displayComparisonGrid(selectedCurrency) {
    const comparisonGrid = document.getElementById('comparison-grid');
    const selectedRate = currencyData[selectedCurrency].rate;
    
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
    const comparisons = currencies.filter(curr => curr !== selectedCurrency);
    
    comparisonGrid.innerHTML = comparisons.map(curr => {
        const rate = currencyData[curr].rate;
        const conversion = selectedRate / rate;
        return `
            <div class="comparison-item">
                <div>${currencyData[curr].flag} ${curr}</div>
                <div><strong>1 ${selectedCurrency} = ${conversion.toFixed(4)} ${curr}</strong></div>
            </div>
        `;
    }).join('');
}

function displayHistoricalData(currency) {
    const historicalData = document.getElementById('historical-data');
    
    // Generate mock historical data
    const data = [];
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const rate = currencyData[currency].rate * (1 + (Math.random() - 0.5) * 0.1);
        data.push({
            date: date.toLocaleDateString(),
            rate: rate.toFixed(4),
            change: i === 30 ? '0.00%' : ((rate - data[data.length - 1].rate) / data[data.length - 1].rate * 100).toFixed(2) + '%'
        });
    }
    
    historicalData.innerHTML = data.slice(0, 10).reverse().map(item => `
        <tr>
            <td>${item.date}</td>
            <td>${item.rate}</td>
            <td style="color: ${item.change.startsWith('-') ? 'var(--danger-color)' : 'var(--success-color)'}">${item.change}</td>
        </tr>
    `).join('');
}

function initializeChart() {
    const canvas = document.getElementById('rate-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Generate mock chart data
    const labels = [];
    const data = [];
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString());
        data.push(Math.random() * 0.1 + 0.85);
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Exchange Rate (USD)',
                data: data,
                borderColor: 'rgb(37, 99, 235)',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function updateChart(period) {
    // Update chart based on selected period
    initializeChart();
}

// Settings functions
function saveSettings() {
    const defaultFrom = document.getElementById('default-from').value;
    const defaultTo = document.getElementById('default-to').value;
    
    appState.defaultFromCurrency = defaultFrom;
    appState.defaultToCurrency = defaultTo;
    
    localStorage.setItem('defaultFromCurrency', defaultFrom);
    localStorage.setItem('defaultToCurrency', defaultTo);
    
    showMessage('Settings saved successfully', 'success');
}

function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        localStorage.removeItem('defaultFromCurrency');
        localStorage.removeItem('defaultToCurrency');
        localStorage.removeItem('theme');
        localStorage.removeItem('settings');
        
        appState.defaultFromCurrency = 'USD';
        appState.defaultToCurrency = 'EUR';
        appState.theme = 'light';
        
        applyTheme('light');
        
        // Reset form values
        document.getElementById('default-from').value = 'USD';
        document.getElementById('default-to').value = 'EUR';
        document.getElementById('theme-toggle').checked = false;
        
        showMessage('Settings reset to default', 'success');
    }
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This will delete your conversion history and all settings.')) {
        localStorage.clear();
        appState = {
            theme: 'light',
            defaultFromCurrency: 'USD',
            defaultToCurrency: 'EUR',
            conversionHistory: [],
            settings: {}
        };
        
        applyTheme('light');
        showMessage('All data cleared successfully', 'success');
    }
}

// Theme functions
function toggleTheme(isDark) {
    const theme = isDark ? 'dark' : 'light';
    applyTheme(theme);
    localStorage.setItem('theme', theme);
    appState.theme = theme;
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update theme label
    const themeLabel = document.querySelector('.theme-label');
    if (themeLabel) {
        themeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }
}

// Utility functions
function populateCurrencyDropdowns() {
    const dropdowns = document.querySelectorAll('select[id*="currency"], #detail-currency');
    
    dropdowns.forEach(dropdown => {
        if (dropdown.id === 'detail-currency') {
            dropdown.innerHTML = '<option value="">Choose a currency</option>';
        }
        
        Object.keys(currencyData).forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${currencyData[code].flag} ${code} - ${currencyData[code].name}`;
            dropdown.appendChild(option);
        });
    });
    
    // Populate currency filter
    const currencyFilter = document.getElementById('currency-filter');
    if (currencyFilter) {
        Object.keys(currencyData).forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${code} - ${currencyData[code].name}`;
            currencyFilter.appendChild(option);
        });
    }
}

function setupCurrencySearch(searchId, selectId) {
    const searchInput = document.getElementById(searchId);
    const select = document.getElementById(selectId);
    
    if (!searchInput || !select) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const options = select.querySelectorAll('option');
        
        options.forEach(option => {
            const text = option.textContent.toLowerCase();
            option.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type} fade-in`;
    messageEl.textContent = message;
    
    // Insert at top of main content
    const main = document.querySelector('main') || document.body;
    main.insertBefore(messageEl, main.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}

function setupEventListeners() {
    // Add any global event listeners here
}

// Make deleteConversion globally accessible
window.deleteConversion = deleteConversion;
