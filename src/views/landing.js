/**
 * Renders the complete HTML string for the landing/welcome page view.
 */
export function renderLanding() {
    return `
    <main class="form-container">
        <div class="welcome-container">
            <h1 class="welcome-title">Welcome</h1>
            <p>Your trusted application. Log in to your account or register to get started.</p>
            <div class="welcome-actions">
                <a href="/login" class="btn" data-link>Login</a>
                <a href="/register" class="btn btn-secondary" data-link>Register</a>
            </div>
        </div>
    </main>
    `;
}