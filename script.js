// Tab Switching Logic
function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-links button').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    document.getElementById(`btn-${tabId}`).classList.add('active');
}

// Currency Formatter
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        maximumFractionDigits: 0
    }).format(value);
};

// Compound Interest Calculation
function calculateCompound() {
    const P = parseFloat(document.getElementById('c-amount').value);
    const r = parseFloat(document.getElementById('c-rate').value) / 100;
    const t = parseFloat(document.getElementById('c-years').value);
    const n = parseFloat(document.getElementById('c-freq').value);

    if (isNaN(P) || isNaN(r) || isNaN(t)) return;

    // A = P(1 + r/n)^(nt)
    const A = P * Math.pow(1 + (r / n), n * t);
    const profit = A - P;
    const growthPercent = (profit / P) * 100;

    document.getElementById('c-res-final').innerText = formatCurrency(A);
    document.getElementById('c-res-profit').innerText = formatCurrency(profit);
    document.getElementById('c-res-growth').innerText = growthPercent.toFixed(2) + '%';
}

// Savings Goal Calculation
function calculateSavings() {
    const FV = parseFloat(document.getElementById('s-goal').value);
    const r_annual = parseFloat(document.getElementById('s-rate').value) / 100;
    const t = parseFloat(document.getElementById('s-years').value);
    const n = parseFloat(document.getElementById('s-freq').value);

    if (isNaN(FV) || isNaN(r_annual) || isNaN(t)) return;

    const r_period = r_annual / n;
    const total_periods = n * t;

    // PMT = (FV * r) / ((1 + r)^n - 1)
    let PMT = 0;
    if (r_annual === 0) {
        PMT = FV / total_periods;
    } else {
        PMT = (FV * r_period) / (Math.pow(1 + r_period, total_periods) - 1);
    }

    const total_contributions = PMT * total_periods;
    const profit_earned = FV - total_contributions;

    document.getElementById('s-res-payment').innerText = formatCurrency(PMT);
    document.getElementById('s-res-principal').innerText = formatCurrency(total_contributions);
    document.getElementById('s-res-profit').innerText = formatCurrency(profit_earned);
}

// Initialize calculators on load
window.onload = () => {
    calculateCompound();
    calculateSavings();
};