/**
 * Renders the complete HTML string for the user registration form view.
 */
export function renderRegister() {
    return `
    <main class="form-container">
        <h2>Register</h2>
        <form id="form-register">
            <div>
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" class="form-input" name="name" placeholder="Enter your full name" autocomplete="name" required>
            </div>
            <div>
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-input" name="email" placeholder="example@email.com" autocomplete="email" required>
            </div>
            <div>
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-input" name="password" placeholder="Create a password" autocomplete="new-password" required>
            </div>
            <div>
                <label for="confirm-password" class="form-label">Confirm Password</label>
                <input type="password" id="confirm-password" class="form-input" name="confirm-password" placeholder="Confirm your password" autocomplete="new-password" required>
            </div>
            <button type="submit" class="btn">Register</button>
        </form>
        <section class="form-links">
            <a href="/login" data-link>Already have an account? Login</a>
        </section>
    </main>
    `;
}