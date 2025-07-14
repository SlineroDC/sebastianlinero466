/**
 * Renders the complete HTML string for the login form view.
 */
export function renderLogin() {
    return `
    <main class="form-container">
        <h2>Login</h2>
        <form id="form-login">
            <div>
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-input" name="email" placeholder="example@email.com" autocomplete="email" required>
            </div>
            <div>
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-input" name="password" placeholder="Enter your password" autocomplete="current-password" required>
            </div>
            <button type="submit" class="btn">Login</button>
        </form>
        <section class="form-links">
            <a href="/register" data-link>New user? Register</a>
        </section>
    </main>
    `;
}