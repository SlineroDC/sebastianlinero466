// This file connects the HTML forms to the authentication service logic.

import { login, register } from './auth.service.js';

/**
 * Attaches the submit event listener to the login form.
 */
export function setupLoginForm() {
    const loginForm = document.getElementById('form-login');
    // Exit if the form isn't on the current page.
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (event) => {
        // Prevent the browser's default page reload.
        event.preventDefault();
        
        // Capture form data into a simple object.
        const data = Object.fromEntries(new FormData(loginForm).entries());

        try {
            // Call the login service with the captured credentials.
            const user = await login(data.email, data.password);
            
            // On success, save user session to localStorage.
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Dispatch a navigate event to trigger a view change without a full reload.
            document.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/dashboard' } }));

        } catch (error) {
            // If login fails, display the error message.
            alert(error.message); 
        }
    });
}

/**
 * Attaches the submit event listener to the register form.
 */
export function setupRegisterForm() {
    const registerForm = document.getElementById('form-register');
    // Exit if the form isn't on the current page.
    if (!registerForm) return;

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(registerForm).entries());

        // Perform client-side validation for password confirmation.
        if (data.password !== data['confirm-password']) {
            alert('Passwords do not match');
            return; // Stop the submission if passwords don't match.
        }

        try {
            // Prepare user data for registration.
            const userData = { name: data.name, email: data.email, password: data.password };
            await register(userData);
            
            // On success, notify the user.
            alert('Registration successful! Please log in.');

            // Trigger navigation to the login page.
            document.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/login' } }));

        } catch (error) {
            // If registration fails, display the error message.
            alert(error.message);
        }
    });
}