// script.js — Handles UI interactivity for Daniwest WiFi portal

// 🔁 Toggle active class for payment method buttons
const paymentButtons = document.querySelectorAll(".payment-options button");
paymentButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    paymentButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// ✅ Plan card selection highlighting
const planCards = document.querySelectorAll(".plan-card input[type=radio]");
planCards.forEach((radio) => {
  radio.addEventListener("change", () => {
    document.querySelectorAll(".plan-card").forEach((card) => {
      card.classList.remove("selected");
    });
    radio.closest(".plan-card").classList.add("selected");
  });
});

// 🔄 Tab switching (Standard, Premium, Business)
function switchTab(tabId) {
  const tabs = document.querySelectorAll(".plan-tab");
  const tabButtons = document.querySelectorAll(".tab");
  tabs.forEach((tab) => tab.classList.add("hidden"));
  tabButtons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabId)?.classList.remove("hidden");
  document.querySelector(`.tab[onclick*='${tabId}']`)?.classList.add("active");
}

// 🕒 Timer that tracks connection time
let timerInterval;
function startConnectionTimer() {
  let seconds = 0;
  const display = document.getElementById("connectionTimer");
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    seconds++;
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    display.textContent = `${hrs}:${mins}:${secs}`;
  }, 1000);
}
startConnectionTimer();

// ✨ Show notification
function showNotification(message, color = 'green') {
  const notif = document.getElementById("notification");
  notif.textContent = message;
  notif.className = `notification fixed top-4 right-4 bg-${color}-600 text-white px-4 py-2 rounded shadow-md z-50`;
  notif.classList.remove("hidden");
  setTimeout(() => notif.classList.add("hidden"), 4000);
}

// 🎟️ Apply voucher code handler
document.getElementById("applyVoucher")?.addEventListener("click", () => {
  const code = document.getElementById("voucherCode").value.trim();
  if (code.length < 5) {
    showNotification("Invalid voucher code", "red");
  } else {
    showNotification("Voucher applied: " + code, "green");
  }
});

// 🧾 QR Code hover effect
const qr = document.querySelector(".qr-container");
qr?.addEventListener("mouseenter", () => qr.classList.add("hovered"));
qr?.addEventListener("mouseleave", () => qr.classList.remove("hovered"));

// 🛠️ Admin toggle & modal
const adminToggle = document.getElementById("adminToggle");
const adminModal = document.getElementById("adminModal");
const closeAdminModal = document.getElementById("closeAdminModal");

adminToggle?.addEventListener("click", () => {
  adminModal.classList.toggle("hidden");
});
closeAdminModal?.addEventListener("click", () => {
  adminModal.classList.add("hidden");
});

// 🧪 Example: If user is Daniwest, reveal admin toggle
const userPhone = "0790293895";
if (userPhone === "0790293895") {
  adminToggle?.classList.remove("hidden");
}

// 📲 Handle Pay button
const payBtn = document.querySelector(".pay-btn");
payBtn?.addEventListener("click", () => {
  const selectedPlan = document.querySelector(".plan-card input:checked");
  const paymentMethod = document.querySelector(".payment-options .active")?.textContent.trim();
  const phoneInput = document.querySelector("input[type='text']");

  if (!selectedPlan) {
    return showNotification("Select a WiFi plan", "red");
  }
  if (!phoneInput || phoneInput.value.length < 10) {
    return showNotification("Enter valid M-Pesa number", "red");
  }

  // Fake process
  showNotification(`Processing ${selectedPlan.value} KES via ${paymentMethod}...`, "blue");

  // TODO: Send to backend API via fetch or axios here
});