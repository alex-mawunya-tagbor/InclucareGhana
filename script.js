// script.js - Updated for Clean HTML

lucide.createIcons();

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
    
    // Switch between max-h-0 and max-h-screen logic is handled in CSS via .active
    if (menu.classList.contains('active')) {
        menu.style.maxHeight = menu.scrollHeight + "px";
    } else {
        menu.style.maxHeight = "0";
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.remove('active');
    menu.style.maxHeight = "0";
}

// Mobile Dropdown Toggle
function toggleMobileDropdown() {
    const content = document.getElementById('mobile-dropdown-content');
    const icon = document.getElementById('mobile-dropdown-icon');

    content.classList.toggle('open');
    if (content.classList.contains('open')) {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
    } else {
        content.style.maxHeight = "0";
        icon.style.transform = "rotate(0deg)";
    }
}

// Modal Logic
function showPlaceholderModal(type) {
    const modal = document.getElementById('messageModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');

    modal.classList.remove('hidden');
    modal.classList.add('flex'); // Uses flex to center

    if (type === 'advocacyModal') {
        title.innerText = "Advocacy Campaigns";
        body.innerText = "Our latest policy guidance on mental health inclusion is currently being updated.";
    } else if (type === 'research') {
        title.innerText = "Research Library";
        body.innerText = "Our disability data audit for the Volta Region will be published here shortly.";
    } else if (type === 'publications') {
        title.innerText = "Publications";
        body.innerText = "Annual reports and newsletters are being uploaded.";
    }
}

function closeModal() {
    const modal = document.getElementById('messageModal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('messageModal');
    if (event.target === modal) {
        closeModal();
    }
}





/*====== SIGNUP FOR PAYMENT MODAL ======*/
let currentMode = 'signup';

function showAuth(mode) {
    currentMode = mode;
    const title = document.getElementById('formTitle');
    const nameGroup = document.getElementById('nameGroup');
    const btn = document.querySelector('.submit-donation');
    
    // Toggle active classes
    document.getElementById('signupToggle').classList.toggle('active', mode === 'signup');
    document.getElementById('loginToggle').classList.toggle('active', mode === 'login');

    if (mode === 'login') {
        title.innerText = "Login to Your Account";
        nameGroup.style.display = 'none';
        btn.innerHTML = 'Login & Donate <i data-lucide="arrow-right"></i>';
    } else {
        title.innerText = "Create Your Account";
        nameGroup.style.display = 'block';
        btn.innerHTML = 'Sign Up & Donate <i data-lucide="arrow-right"></i>';
    }
    lucide.createIcons();
}

function handleDonationFlow() {
    const email = document.getElementById('donorEmail').value;
    const amount = document.getElementById('otherAmount').value;

    if (!email) {
        alert("Please enter your email to continue.");
        return;
    }
    if (!amount || amount <= 0) {
        alert("Please select a donation amount.");
        return;
    }

    // Success logic
    const action = currentMode === 'signup' ? "creating your account" : "logging you in";
    alert(`Success! We are ${action} and redirecting you to pay GHS ${amount}. Your receipt will be sent to ${email}.`);
}