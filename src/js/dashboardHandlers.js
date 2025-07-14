import {
    createCourse,
    deleteCourse,
    updateCourse,
    getCourseById,
    checkEnrollment,
    getEnrollmentsForCourse,
    createEnrollment
} from './course.service.js';

/**
 * Attaches all event listeners for the main dashboard view.
 * This function is separated by user role.
 */
export function setupDashboard() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return; // Exit if no user is logged in.

    // --- Logic for ALL Users ---
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            document.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/login' } }));
        });
    }

    // --- Role-Specific Logic ---
    if (user.role === 'admin') {
        setupAdminDashboardListeners();
    } else if (user.role === 'student') {
        setupStudentDashboardListeners();
    }
}

/**
 * Attaches event listeners for admin-specific actions like CRUD operations.
 */
function setupAdminDashboardListeners() {
    const createButton = document.getElementById('create-course-btn');
    if (createButton) {
        createButton.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/admin/course/new' } }));
        });
    }

    const courseList = document.querySelector('.course-list');
    if (courseList) {
        courseList.addEventListener('click', async (event) => {
            const target = event.target;

            // Handles the delete button action.
            if (target.matches('.delete-btn')) {
                const courseId = target.dataset.id;
                if (confirm('Are you sure you want to delete this course?')) {
                    try {
                        await deleteCourse(courseId);
                        document.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/dashboard' } }));
                    } catch (error) {
                        alert('Failed to delete course: ' + error.message);
                    }
                }
            }

            // Handles the edit button action.
            if (target.matches('.edit-btn')) {
                const courseId = target.dataset.id;
                document.dispatchEvent(new CustomEvent('navigate', { detail: { path: `/admin/course/edit/${courseId}` } }));
            }

            // Handles the "View Students" button action.
            if (target.matches('.view-students-btn')) {
                const courseId = target.dataset.id;
                document.dispatchEvent(new CustomEvent('navigate', { detail: { path: `/admin/course/${courseId}/students` } }));
            }
        });
    }
}

/**
 * Attaches event listeners for student-specific actions like enrolling in a course.
 */
function setupStudentDashboardListeners() {
    const courseList = document.querySelector('.course-list');
    if (courseList) {
        courseList.addEventListener('click', async (event) => {
            const target = event.target;
            if (target.matches('.enroll-btn')) {
                const courseId = target.dataset.id;
                const user = JSON.parse(localStorage.getItem('currentUser'));

                target.disabled = true;
                target.textContent = 'Enrolling...';

                try {
                    // 1. Check if already enrolled.
                    const existing = await checkEnrollment(user.id, courseId);
                    if (existing.length > 0) {
                        throw new Error('You are already enrolled in this course.');
                    }

                    // 2. Check for course capacity.
                    const course = await getCourseById(courseId);
                    const enrollments = await getEnrollmentsForCourse(courseId);
                    if (enrollments.length >= course.capacity) {
                        throw new Error('Sorry, this course is full.');
                    }

                    // 3. If all checks pass, enroll the student.
                    await createEnrollment(user.id, courseId);
                    alert('Enrollment successful!');
                    target.textContent = 'Enrolled!';

                } catch (error) {
                    alert(`Error: ${error.message}`);
                    target.disabled = false;
                    target.textContent = 'Enroll';
                }
            }
        });
    }
}

/**
 * Attaches the submit event listener for the course form (create and edit).
 */
export function setupCourseForm() {
    const courseForm = document.getElementById('course-form');
    if (!courseForm) return;

    // Detects if the form is in 'edit mode' by checking the URL for an ID.
    const pathParts = window.location.pathname.split('/');
    const courseId = pathParts[3] === 'edit' ? pathParts[4] : null;
    const isEditMode = courseId !== null;

    courseForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(courseForm).entries());

        // Converts form string values to numbers where necessary.
        formData.capacity = parseInt(formData.capacity, 10);
        formData.instructorId = parseInt(formData.instructorId, 10);

        try {
            if (isEditMode) {
                // If in edit mode, call the update service function.
                await updateCourse(courseId, formData);
                alert('Course updated successfully!');
            } else {
                // Otherwise, call the create service function.
                await createCourse(formData);
                alert('Course created successfully!');
            }
            // Navigates back to the dashboard upon successful save.
            document.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/dashboard' } }));
        } catch (error) {
            alert('Error saving course: ' + error.message);
        }
    });
}