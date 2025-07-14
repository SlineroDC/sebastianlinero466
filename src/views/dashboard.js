import { getAllCourses } from '../js/course.service';

/**
 * Renders the HTML for a single course card.
 * It displays different action buttons based on the user's role.
 * @param {object} course - The course data object.
 * @param {string} role - The role of the current user ('admin' or 'student').
 * @returns {string} The HTML string for the course card.
 */
function renderCourseCard(course, role) {
    // Defines the set of buttons for an administrator.
    const adminButtons = `
        <button class="btn edit-btn" data-id="${course.id}">Edit</button>
        <button class="btn delete-btn" data-id="${course.id}">Delete</button>
        <button class="btn view-students-btn" data-id="${course.id}">View Students</button>
    `;

    // Defines the button for a student.
    const studentButtons = `<button class="btn enroll-btn" data-id="${course.id}">Enroll</button>`;

    return `
    <div class="course-card">
        <h3>${course.title}</h3>
        <span class="category">${course.category}</span>
        <p>${course.description}</p>
        <div class="card-actions">
            ${role === 'admin' ? adminButtons : studentButtons}
        </div>
    </div>
    `;
}

/**
 * Asynchronously renders the entire dashboard view.
 * It fetches course data and tailors the view for either an admin or a student.
 * @returns {Promise<string>} A promise that resolves with the complete HTML for the dashboard.
 */
export async function renderDashboard() {
    // Get the current user's session data from localStorage.
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return '<h2>Please log in to see the dashboard.</h2>';

    // Fetch all courses from the API before rendering.
    const courses = await getAllCourses();

    // Dynamically create the header based on the user's role.
    const header = `
    <div class="dashboard-header">
        <h2>${user.role === 'admin' ? 'Admin Dashboard' : 'Available Courses'}</h2>
        <div>
            ${user.role === 'admin' ? '<button id="create-course-btn" class="btn">Create New Course</button>' : ''}
            <button id="logout-btn" class="btn btn-secondary">Logout</button>
        </div>
    </div>
    `;

    // Generate the list of course cards by mapping over the fetched data.
    const courseList = courses.map(course => renderCourseCard(course, user.role)).join('');

    // Assemble and return the final HTML structure.
    return `
    <div class="dashboard-container">
        ${header}
        <div class="course-list">
            ${courseList}
        </div>
    </div>
    `;
}