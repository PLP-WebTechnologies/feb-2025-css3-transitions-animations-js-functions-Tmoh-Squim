const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const roleSelect = document.getElementById('role');
const savePreferenceButton = document.getElementById('save-preference');
const savedPreferencesDisplay = document.getElementById('saved-preferences');
const animationTriggerButton = document.getElementById('animation-trigger-button');
const animatedText = document.getElementById('animated-text');
let isTextVisible = false;

// Function to store and retrieve user preferences using localStorage
function manageUserPreferences() {
    const PREFERENCES_KEY = 'userPreferences';

    function savePreferences() {
        const preferences = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            role: roleSelect.value
        };
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
        savedPreferencesDisplay.textContent = `Saved preferences: Name - ${preferences.name}, Email - ${preferences.email}, Role - ${preferences.role}`;
    }

    function loadPreferences() {
        const storedPreferences = localStorage.getItem(PREFERENCES_KEY);
        if (storedPreferences) {
            const preferences = JSON.parse(storedPreferences);
            nameInput.value = preferences.name || '';
            emailInput.value = preferences.email || '';
            roleSelect.value = preferences.role || '';
            savedPreferencesDisplay.textContent = `Last saved preferences: Name - ${preferences.name}, Email - ${preferences.email}, Role - ${preferences.role}`;
        }
    }

    return {
        savePreferences: savePreferences,
        loadPreferences: loadPreferences
    };
}

const preferenceManager = manageUserPreferences();
preferenceManager.loadPreferences(); // Load preferences on page load

savePreferenceButton.addEventListener('click', preferenceManager.savePreferences);

// Function to trigger an animation based on user action
function triggerSlideAnimation() {
    if (!isTextVisible) {
        animatedText.classList.add('slide-in');
        animatedText.classList.remove('slide-out');
        animatedText.style.opacity = 1;
        isTextVisible = true;
        animationTriggerButton.textContent = 'Trigger Slide-Out Text';
    } else {
        animatedText.classList.remove('slide-in');
        animatedText.classList.add('slide-out');
        isTextVisible = false;
        animationTriggerButton.textContent = 'Trigger Slide-In Text';
        setTimeout(() => {
            animatedText.style.opacity = 0;
        }, 500); // Match the animation duration
    }
}

animationTriggerButton.addEventListener('click', triggerSlideAnimation);