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
    const menu = document.getElementById('mobile-menu'); // The parent container

    content.classList.toggle('open');
    
    if (content.classList.contains('open')) {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
        
        // ADD THIS: Update the parent menu height to include the new dropdown space
        if (menu.classList.contains('active')) {
            menu.style.maxHeight = (menu.scrollHeight + content.scrollHeight) + "px";
        }
    } else {
        // When closing, subtract the height or reset to the main menu's scrollHeight
        content.style.maxHeight = "0";
        icon.style.transform = "rotate(0deg)";
        
        // Reset parent to its natural height
        setTimeout(() => {
            menu.style.maxHeight = menu.scrollHeight + "px";
        }, 300); // Wait for child transition to finish
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