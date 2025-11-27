// script.js

// Initialize Lucide Icons and attach listeners after the window loads
window.onload = () => {
    // Ensures all Lucide icons are rendered after the page loads
    lucide.createIcons();
    
    // Attach event listeners for donation buttons
    document.querySelectorAll('.donation-btn').forEach(button => {
        button.addEventListener('click', (e) => selectDonation(e.target.dataset.amount));
    });
};

// --- Navigation and Utility Functions ---

// Mobile Menu Toggle (Modified to handle dropdown close state)
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    const isClosed = menu.classList.contains('max-h-0'); 

    if (isClosed) {
        menu.classList.remove('max-h-0');
        menu.classList.add('max-h-[500px]'); // Open
        icon.setAttribute('data-lucide', 'x');
    } else {
        menu.classList.remove('max-h-[500px]'); // Close
        menu.classList.add('max-h-0');
        icon.setAttribute('data-lucide', 'menu');
        
        // Also ensure the nested dropdown is closed when the main menu closes
        const dropdownContent = document.getElementById('mobile-dropdown-content');
        dropdownContent.classList.remove('max-h-[160px]'); 
        dropdownContent.classList.add('max-h-0');
        document.getElementById('mobile-dropdown-icon').classList.remove('rotate-180');
    }
    // Re-render lucide icons to display the correct menu/close icon
    lucide.createIcons(); 
}

// Closes both the main menu and the nested dropdown
function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    const dropdownContent = document.getElementById('mobile-dropdown-content');
    
    // Only close if it's open
    if (!menu.classList.contains('max-h-0')) {
        menu.classList.remove('max-h-[500px]');
        menu.classList.add('max-h-0');
        icon.setAttribute('data-lucide', 'menu');
    
        // Collapse the nested dropdown
        dropdownContent.classList.remove('max-h-[160px]'); 
        dropdownContent.classList.add('max-h-0');
        document.getElementById('mobile-dropdown-icon').classList.remove('rotate-180');
    
        lucide.createIcons();
    }
}

// New function to handle the click expansion of the 'More' items on mobile
function toggleMobileDropdown() {
    const dropdownContent = document.getElementById('mobile-dropdown-content');
    const icon = document.getElementById('mobile-dropdown-icon');
    const isOpen = dropdownContent.classList.contains('max-h-[160px]'); // Generous height for 4 items

    if (isOpen) {
        dropdownContent.classList.remove('max-h-[160px]');
        dropdownContent.classList.add('max-h-0');
        icon.classList.remove('rotate-180');
    } else {
        dropdownContent.classList.remove('max-h-0');
        dropdownContent.classList.add('max-h-[160px]'); // Approx height for 4 links * 40px each
        icon.classList.add('rotate-180');
    }
}

// Scroll to Section with smooth behavior
function scrollToSection(id) {
    const element = document.getElementById(id); 
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close mobile menu if open after navigation
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('max-h-0')) {
        closeMobileMenu();
    }
}

// --- Modal/Message Functions (Replaces alert/confirm) ---

const modal = document.getElementById('messageModal');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

function showModal(title, body) {
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Trigger animation for smooth appearance (using the CSS @keyframes bounceIn)
    setTimeout(() => {
        modalContent.classList.remove('opacity-0');
        modalContent.classList.add('opacity-100');
    }, 10);
}

function closeModal() {
    modalContent.classList.remove('opacity-100');
    modalContent.classList.add('opacity-0');

    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }, 300);
}

function showPlaceholderModal(action) {
    let title, body;
    if (action === 'advocacyModal') {
        title = 'Advocacy Campaigns';
        body = 'This section will be updated with links to our latest petitions, social media campaigns, and local inclusion events soon. Check back often to get involved!';
    } else if (action === 'eventModal') {
        title = 'Events Calendar';
        body = 'Our full events calendar, featuring upcoming outreach and workshops, will be available here soon!';
    } else {
        title = 'Information';
        body = 'This feature is a placeholder and functionality will be implemented soon.';
    }
    showModal(title, body);
}

// --- Donation Logic ---

function selectDonation(amount) {
    document.getElementById('otherAmount').value = amount;
    // Highlight selected button
    document.querySelectorAll('.donation-btn').forEach(btn => {
        if (btn.dataset.amount === amount) {
            // Apply Tailwind classes for highlighting (ring-2, ring-violet-500, bg-violet-100)
            btn.classList.add('ring-2', 'ring-violet-500', 'bg-violet-100');
        } else {
            btn.classList.remove('ring-2', 'ring-violet-500', 'bg-violet-100');
        }
    });
}

function processDonation() {
    const amountInput = document.getElementById('otherAmount');
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        showModal('Donation Error', 'Please enter a valid donation amount greater than zero (GHS).');
        return;
    }

    showModal(
        'Processing Donation', 
        `Thank you for your generous contribution of GHS ${amount.toFixed(2)}! You will be redirected to our secure payment gateway (Mobile Money/Bank Transfer) shortly.`
    );
    // In a production environment, this is where you would call a payment API.
}

// --- Contact Form Logic ---

function handleContactForm(event) {
    event.preventDefault(); // Stop the form from submitting normally
    
    // Get form values for the confirmation message
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    showModal(
        'Inquiry Sent!', 
        `Thank you, ${name}! We have received your message and will respond to ${email} within 48 hours.`
    );

    // Clear the form after simulated successful submission
    event.target.reset();
}