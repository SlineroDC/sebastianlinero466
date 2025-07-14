// The base URL for the API. All requests will be made to this domain.
const BASE_URL = 'http://localhost:3000';

/**
 * A reusable fetch function to handle all API requests.
 * @param {string} endpoint - The specific API endpoint to call (e.g., '/users').
 * @param {string} method - The HTTP method to use (e.g., 'GET', 'POST').
 * @param {object} [body=null] - The data to send in the request body.
 * @returns {Promise<any>} A promise that resolves with the JSON response.
 */
async function apiFetch(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // If a body is provided, stringify it for the request.
    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(BASE_URL + endpoint, options);

    // Handles HTTP errors like 404 or 500, throwing a descriptive error.
    if (!response.ok) {
        const errorInfo = await response.json().catch(() => ({}));
        throw new Error(errorInfo.message || `API Error: ${response.status} ${response.statusText}`);
    }

    // Handles successful requests that don't return content, like a DELETE.
    if (response.status === 204) {
        return null;
    }

    // Parses and returns the JSON body for successful requests.
    return response.json();
}

export default apiFetch;