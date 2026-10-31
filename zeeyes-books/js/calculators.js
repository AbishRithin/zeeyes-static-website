/**
 * ZEEYES Books - Interactive Calculators
 * 1. ROI & Financial Health Savings Calculator
 * 2. Dynamic Pricing Billing Switcher & Expense Estimator
 * 3. Startup Cash Runway & Burn Rate Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initSavingsCalculator();
  initPricingSwitcher();
  initPricingQuoteSlider();
  initRunwayCalculator();
});

// 1. Savings & ROI Calculator
function initSavingsCalculator() {
  const expenseSlider = document.getElementById('calc-expenses');
  const invoiceSlider = document.getElementById('calc-invoices');
  const industrySelect = document.getElementById('calc-industry');

  const expenseVal = document.getElementById('calc-expenses-val');
  const invoiceVal = document.getElementById('calc-invoices-val');

  const hoursOutput = document.getElementById('calc-result-hours');
  const taxSavingsOutput = document.getElementById('calc-result-tax');
  const planOutput = document.getElementById('calc-result-plan');
  const roiOutput = document.getElementById('calc-result-roi');

  if (!expenseSlider || !invoiceSlider) return;

  function updateCalculations() {
    const expenses = parseInt(expenseSlider.value, 10);
    const invoices = parseInt(invoiceSlider.value, 10);
    const industry = industrySelect ? industrySelect.value : 'saas';

    // Update labels
    if (expenseVal) expenseVal.textContent = `$${expenses.toLocaleString()}`;
    if (invoiceVal) invoiceVal.textContent = `${invoices.toLocaleString()} txs`;

    // Calculation formulas
    // Average 1 hour of manual bookkeeping saved per 18 transactions + 4 base hours
    const hoursSaved = Math.round(4 + (invoices / 22));

    // Tax deductions missed estimate: approx 4.5% to 7% of expenses
    let industryMult = 0.052;
    if (industry === 'ecommerce') industryMult = 0.065;
    if (industry === 'agency') industryMult = 0.058;
    if (industry === 'healthcare') industryMult = 0.048;

    const estimatedTaxSaved = Math.round(expenses * industryMult * 12);

    // Plan recommendation
    let recommendedPlan = 'Starter ($199/mo)';
    let planCost = 199 * 12;
    if (expenses > 25000 || invoices > 150) {
      recommendedPlan = 'Growth ($449/mo)';
      planCost = 449 * 12;
    }
    if (expenses > 80000 || invoices > 500) {
      recommendedPlan = 'Scale ($799/mo)';
      planCost = 799 * 12;
    }

    // ROI calculation: (Hours * $75/hr founder rate * 12 + Tax Savings) / Plan Cost
    const founderTimeValue = hoursSaved * 75 * 12;
    const totalBenefit = founderTimeValue + estimatedTaxSaved;
    const roiMultiplier = (totalBenefit / planCost).toFixed(1);

    // Render outputs
    if (hoursOutput) hoursOutput.textContent = `${hoursSaved} hrs/mo`;
    if (taxSavingsOutput) taxSavingsOutput.textContent = `$${estimatedTaxSaved.toLocaleString()}/yr`;
    if (planOutput) planOutput.textContent = recommendedPlan;
    if (roiOutput) roiOutput.textContent = `${roiMultiplier}x ROI`;
  }

  expenseSlider.addEventListener('input', updateCalculations);
  invoiceSlider.addEventListener('input', updateCalculations);
  if (industrySelect) industrySelect.addEventListener('change', updateCalculations);

  // Initial run
  updateCalculations();
}

// 2. Pricing Page Billing Switcher (Monthly vs Annual - 20% OFF)
function initPricingSwitcher() {
  const toggle = document.getElementById('billing-toggle');
  const monthlyLabel = document.getElementById('label-monthly');
  const annualLabel = document.getElementById('label-annual');
  const priceElements = document.querySelectorAll('[data-monthly-price]');

  if (!toggle) return;

  function setBilling(isAnnual) {
    if (isAnnual) {
      toggle.classList.add('active');
      if (annualLabel) annualLabel.classList.add('active');
      if (monthlyLabel) monthlyLabel.classList.remove('active');

      priceElements.forEach(el => {
        const annualPrice = el.getAttribute('data-annual-price');
        if (annualPrice) el.textContent = annualPrice;
      });
    } else {
      toggle.classList.remove('active');
      if (monthlyLabel) monthlyLabel.classList.add('active');
      if (annualLabel) annualLabel.classList.remove('active');

      priceElements.forEach(el => {
        const monthlyPrice = el.getAttribute('data-monthly-price');
        if (monthlyPrice) el.textContent = monthlyPrice;
      });
    }
  }

  toggle.addEventListener('click', () => {
    const isNowAnnual = !toggle.classList.contains('active');
    setBilling(isNowAnnual);
  });

  if (monthlyLabel) {
    monthlyLabel.addEventListener('click', () => setBilling(false));
  }
  if (annualLabel) {
    annualLabel.addEventListener('click', () => setBilling(true));
  }
}

// 3. Dynamic Pricing Quote Slider (For Pricing Page)
function initPricingQuoteSlider() {
  const quoteSlider = document.getElementById('pricing-quote-slider');
  const quoteExpenseText = document.getElementById('quote-expense-display');
  const quoteEstimatedPrice = document.getElementById('quote-estimated-price');
  const quoteRecTier = document.getElementById('quote-rec-tier');

  if (!quoteSlider) return;

  function updateQuote() {
    const val = parseInt(quoteSlider.value, 10);
    if (quoteExpenseText) quoteExpenseText.textContent = `$${val.toLocaleString()}/month`;

    let price = 199;
    let tier = 'Starter Tier';

    if (val <= 15000) {
      price = 199;
      tier = 'Starter Tier (Up to $15k monthly expenses)';
    } else if (val <= 50000) {
      price = 349;
      tier = 'Growth Tier ($15k - $50k monthly expenses)';
    } else if (val <= 100000) {
      price = 499;
      tier = 'Growth Plus ($50k - $100k monthly expenses)';
    } else if (val <= 200000) {
      price = 749;
      tier = 'Scale Tier ($100k - $200k monthly expenses)';
    } else {
      price = 999;
      tier = 'Enterprise Custom Tier ($200k+ monthly expenses)';
    }

    if (quoteEstimatedPrice) quoteEstimatedPrice.textContent = `$${price}`;
    if (quoteRecTier) quoteRecTier.textContent = tier;
  }

  quoteSlider.addEventListener('input', updateQuote);
  updateQuote();
}

// 4. Cash Runway Calculator (For Resources Page)
function initRunwayCalculator() {
  const cashInput = document.getElementById('runway-cash');
  const burnInput = document.getElementById('runway-burn');
  const revenueInput = document.getElementById('runway-revenue');
  const calculateBtn = document.getElementById('runway-calc-btn');

  const monthsOutput = document.getElementById('runway-result-months');
  const statusOutput = document.getElementById('runway-result-status');
  const tipOutput = document.getElementById('runway-result-tip');

  if (!cashInput || !burnInput || !calculateBtn) return;

  calculateBtn.addEventListener('click', () => {
    const cash = parseFloat(cashInput.value) || 0;
    const burn = parseFloat(burnInput.value) || 0;
    const revenue = parseFloat(revenueInput ? revenueInput.value : 0) || 0;

    const netBurn = Math.max(0, burn - revenue);

    if (netBurn === 0) {
      if (monthsOutput) monthsOutput.textContent = '∞ Profitable';
      if (statusOutput) {
        statusOutput.textContent = 'Net Cash-Flow Positive';
        statusOutput.style.color = '#10b981';
      }
      if (tipOutput) tipOutput.textContent = 'Congratulations! Your revenue exceeds your burn. Focus on reinvesting in growth.';
      return;
    }

    const months = (cash / netBurn).toFixed(1);

    if (monthsOutput) monthsOutput.textContent = `${months} Months`;

    if (statusOutput && tipOutput) {
      if (months < 6) {
        statusOutput.textContent = 'Critical (Under 6 Months)';
        statusOutput.style.color = '#ef4444';
        tipOutput.textContent = 'Urgent: You should immediately review discretionary vendor spend, accelerate receivables, or prepare fundraising.';
      } else if (months < 12) {
        statusOutput.textContent = 'Moderate (6 to 12 Months)';
        statusOutput.style.color = '#f59e0b';
        tipOutput.textContent = 'Healthy buffer, but begin fundraising or pathway to profitability preparations now.';
      } else {
        statusOutput.textContent = 'Very Healthy (12+ Months)';
        statusOutput.style.color = '#10b981';
        tipOutput.textContent = 'Strong financial position. You have ample room to invest in product and aggressive hiring.';
      }
    }
  });
}
