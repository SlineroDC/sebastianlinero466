/**
 * Renders the complete HTML string for the 404 Not Found page view.
 */
export function render404() {
    return `
    <main class="form-container">
        <div class="notfound-container">
            <h1 class="notfound-title">404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist or has been moved.</p>
            <a href="/" class="btn" data-link>Back to Home</a>
        </div>
    </main>
    `;
}