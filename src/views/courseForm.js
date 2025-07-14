// En tu archivo /views/courseForm.js

import { getAllInstructors, getCourseById } from '../js/course.service.js';

// The function now accepts an optional course object for editing.
export async function renderCourseForm(courseId = null) {
    const isEditMode = courseId !== null;
    const course = isEditMode ? await getCourseById(courseId) : {};
    
    const instructors = await getAllInstructors();
    const instructorOptions = instructors.map(instructor => 
        // If in edit mode, mark the correct instructor as selected.
        `<option value="${instructor.id}" ${course.instructorId === instructor.id ? 'selected' : ''}>
            ${instructor.name}
        </option>`
    ).join('');

    return `
    <main class="form-container">
        <h2>${isEditMode ? 'Edit Course' : 'Create New Course'}</h2>
        <form id="course-form">
            <div>
                <label for="title" class="form-label">Title</label>
                <input type="text" id="title" name="title" class="form-input" value="${course.title || ''}" required>
            </div>
            <div>
                <label for="description" class="form-label">Description</label>
                <textarea id="description" name="description" class="form-input" required>${course.description || ''}</textarea>
            </div>
            <div>
                <label for="category" class="form-label">Category</label>
                <input type="text" id="category" name="category" class="form-input" value="${course.category || ''}" required>
            </div>
            <div>
                <label for="capacity" class="form-label">Capacity</label>
                <input type="number" id="capacity" name="capacity" class="form-input" value="${course.capacity || ''}" required>
            </div>
            <div>
                <label for="instructorId" class="form-label">Instructor</label>
                <select id="instructorId" name="instructorId" class="form-input" required>
                    ${instructorOptions}
                </select>
            </div>
            <button type="submit" class="btn">Save Course</button>
        </form>
    </main>
    `;
}