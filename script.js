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
    const menu = document.getElementById('mobile-menu');

    content.classList.toggle('open');

    if (content.classList.contains('open')) {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";

        // FIX: use .open instead of .active
        if (menu.classList.contains('open')) {
            menu.style.maxHeight = menu.scrollHeight + content.scrollHeight + "px";
        }
    } else {
        content.style.maxHeight = "0";
        icon.style.transform = "rotate(0deg)";

        setTimeout(() => {
            menu.style.maxHeight = menu.scrollHeight + "px";
        }, 300);
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("open");

    if (menu.classList.contains("open")) {
        menu.style.maxHeight = menu.scrollHeight + "px";
    } else {
        menu.style.maxHeight = "0";
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

//This stops Formspree redirect
//Contact Form Submission Handling

setupForm("contactForm");
setupForm("volunteerForm");

function setupForm(formId) {
    const form = document.getElementById(formId);
    const popup = document.getElementById("formPopup");
    const popupMessage = document.getElementById("popupMessage");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                popupMessage.textContent = "✅ Submitted successfully!";
                form.reset();
            } else {
                popupMessage.textContent = "❌ Submission failed. Please try again.";
            }

        } catch (error) {
            popupMessage.textContent = "⚠️ Network error. Please try again later.";
        }

        popup.style.display = "flex";
    });
}

// Make this **global**, so the button can access it
function closePopup() {
    const popup = document.getElementById("formPopup");
    popup.style.display = "none";
}
