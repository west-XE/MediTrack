// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = { /* Your Firebase config */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// GSAP Animations
gsap.from(".medi-card", { duration: 0.5, opacity: 0, y: 20, stagger: 0.1, ease: "power2.out" });
gsap.from(".header", { duration: 0.5, opacity: 0, y: -20, ease: "power2.out" });

// Reward Popup Animation
function showRewardPopup() {
  gsap.to("#reward-popup", { duration: 0.3, opacity: 1, display: "block", ease: "power2.out" });
  setTimeout(() => gsap.to("#reward-popup", { duration: 0.3, opacity: 0, display: "none" }), 3000);
}

// MetaMask & Token Reward
if (window.ethereum) {
  const web3 = new Web3(window.ethereum);
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  async function rewardTokens(walletAddress) {
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    await contract.methods.transfer(walletAddress, 10).send({ from: OWNER_ADDRESS });
    showRewardPopup();
  }
}

// Log Dose Button
function logDose(button) {
  const card = button.closest(".card");
  const progressFill = card.querySelector(".progress-fill");
  gsap.to(progressFill, { width: `${Math.min(parseInt(progressFill.style.width || 0) + 33, 100)}%`, duration: 0.5 });
  // Update Firebase (add logic to store dose)
}