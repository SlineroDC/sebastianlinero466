import { router } from "./router.js";

// Listens for the browser's back and forward button clicks.
window.addEventListener('popstate', router);

// Handles the initial page load when the user first visits the site.
window.addEventListener('load', router);

// Uses event delegation to handle clicks on all internal SPA links.
document.addEventListener('click', function (event) {
    if (event.target.matches('[data-link]')) {
        // Prevents the browser from doing a full page reload.
        event.preventDefault();
        // Updates the URL in the browser's address bar.
        history.pushState(null, null, event.target.href);
        // Calls the router to render the new view.
        router();
    }
});

// Listens for custom 'navigate' events dispatched from other parts of the app.
// This allows components to trigger navigation programmatically.
document.addEventListener('navigate', (event) => {
    const { path } = event.detail;
    history.pushState(null, null, path);
    router();
});