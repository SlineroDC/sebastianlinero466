import apiFetch from './api.service.js';

/**
 * Authenticates a user by finding them by email and then verifying their password.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise<object>} The authenticated user object.
 */
export async function login(email, password) {
    // Validates that both email and password are provided.
    if (!email || !password) {
        throw new Error('Email and password are required.');
    }

    // Fetches user by email to avoid exposing the password in a GET request.
    const users = await apiFetch(`/users?email=${email}`);

    // Checks if a user with the provided email exists.
    if (users.length === 0) {
        throw new Error('Invalid email or password.');
    }

    const user = users[0];

    // Verifies the password on the client-side for this simulation.
    if (user.password !== password) {
        throw new Error('Invalid email or password.');
    }

    return user;
}

/**
 * Registers a new user after validating the provided data.
 * @param {object} userData - Contains name, email, and password.
 * @returns {Promise<object>} The new created user object.
 */
export async function register(userData) {
    const { name, email, password } = userData;

    // Performs basic client-side validation for required fields.
    if (!name || !email || !password) {
        throw new Error('Name, email, and password are required.');
    }

    // Checks with the server to see if the email is already in use.
    const existingUsers = await apiFetch(`/users?email=${email}`);
    if (existingUsers.length > 0) {
        throw new Error('This email is already in use.');
    }

    // Creates the new user with a default role of 'student'.
    return apiFetch('/users', 'POST', {
        name,
        email,
        password,
        role: 'student'
    });
}