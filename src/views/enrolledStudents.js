import { getEnrollmentsForCourse, getCourseById } from '../js/course.service.js';

export async function renderEnrolledStudents(courseId) {
    // ADDED: A try...catch block to handle potential errors
    try {
        const [course, enrollments] = await Promise.all([
            getCourseById(courseId),
            getEnrollmentsForCourse(courseId)
        ]);
        
        let studentListItems = '<li class="no-students">No students enrolled yet.</li>';

        if (enrollments.length > 0) {
            studentListItems = enrollments.map(enrollment => 
                `<li class="student-item">
                    <strong>${enrollment.user.name}</strong>
                    <span>${enrollment.user.email}</span>
                 </li>`
            ).join('');
        }

        return `
        <main class="dashboard-container">
            <div class="dashboard-header">
                <h2>Students in "${course.title}"</h2>
                <a href="/dashboard" class="btn" data-link>Back to Dashboard</a>
            </div>
            <ul class="student-list">
                ${studentListItems}
            </ul>
        </main>
        `;
    } catch (error) {
        // If anything fails, log the error and show a message to the user.
        console.error('Failed to render enrolled students:', error);
        return `<main class="dashboard-container"><h2>Error</h2><p>Could not load student data. Please try again later.</p></main>`;
    }
}