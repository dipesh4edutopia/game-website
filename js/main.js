/**
 * GAME & GAMES AMUSEMENT - CORE CONTROLLER & INTERACTIVE WIDGETS
 * Powers Lucide Icon hydration, Interactive ROI Calculator, and Global Hooks.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Interactive Business ROI Calculator
  initRoiCalculator();

  // 3. Global Callback Modal Trigger
  initCallbackTriggers();
});

// Interactive Business ROI Calculator (business-opportunities.html & homepage)
function initRoiCalculator() {
  const machineSlider = document.getElementById('roi-machines-slider');
  const machineCountDisplay = document.getElementById('roi-machines-count');
  const venueTypeSelect = document.getElementById('roi-venue-type');
  const pricePerPlaySelect = document.getElementById('roi-price-per-play');

  const grossMonthlyEl = document.getElementById('roi-gross-monthly');
  const toyExpenseEl = document.getElementById('roi-toy-expense');
  const netEstimatedEl = document.getElementById('roi-net-estimated');

  if (!machineSlider || !grossMonthlyEl) return;

  function recalculate() {
    const machines = parseInt(machineSlider.value, 10) || 1;
    if (machineCountDisplay) machineCountDisplay.textContent = machines;

    // Venue baseline plays/day/machine
    let venueMultiplier = 35; // Default modest
    const venue = venueTypeSelect ? venueTypeSelect.value : 'cafe';
    if (venue === 'sweet-shop') venueMultiplier = 30;
    if (venue === 'cafe') venueMultiplier = 40;
    if (venue === 'hotel') venueMultiplier = 50;
    if (venue === 'mall') venueMultiplier = 85;
    if (venue === 'multiplex') venueMultiplier = 110;

    const playPrice = pricePerPlaySelect ? parseInt(pricePerPlaySelect.value, 10) : 30;

    // Daily gross per machine = plays * price
    const dailyGross = machines * venueMultiplier * playPrice;
    const monthlyGross = dailyGross * 30;

    // Toy refill cost ~ 25% of gross revenue (Plush O Soft wholesale efficiency)
    const monthlyToyCost = Math.round(monthlyGross * 0.25);

    // Approximate venue share or space rent ~ 20%
    const spaceProvision = Math.round(monthlyGross * 0.20);

    // Net operating estimate before taxes & power
    const estimatedNet = monthlyGross - monthlyToyCost - spaceProvision;

    if (grossMonthlyEl) grossMonthlyEl.textContent = GGUtils.formatCurrency(monthlyGross);
    if (toyExpenseEl) toyExpenseEl.textContent = GGUtils.formatCurrency(monthlyToyCost);
    if (netEstimatedEl) netEstimatedEl.textContent = GGUtils.formatCurrency(estimatedNet);
  }

  machineSlider.addEventListener('input', recalculate);
  if (venueTypeSelect) venueTypeSelect.addEventListener('change', recalculate);
  if (pricePerPlaySelect) pricePerPlaySelect.addEventListener('change', recalculate);

  recalculate();
}

// Global Callback Triggers
function initCallbackTriggers() {
  const triggerButtons = document.querySelectorAll('[data-open-callback]');
  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      GGUtils.openModal('callback-request-modal');
    });
  });
}
