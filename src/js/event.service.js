// Este es el contenido correcto para /js/course.service.js

import apiFetch from './api.service.js';

/**
 * Fetches all available courses from the API.
 */
export function getAllCourses() {
    return apiFetch('/courses');
}

/**
 * Deletes a specific course by its ID.
 */
export function deleteCourse(courseId) {
    return apiFetch(`/courses/${courseId}`, 'DELETE');
}

/**
 * Creates a new course with the provided data.
 */
export function createCourse(courseData) {
    return apiFetch('/courses', 'POST', courseData);
}

/**
 * Fetches a single course by its ID.
 */
export function getCourseById(courseId) {
    return apiFetch(`/courses/${courseId}`);
}

/**
 * Updates an existing course with new data.
 */
export function updateCourse(courseId, courseData) {
    return apiFetch(`/courses/${courseId}`, 'PATCH', courseData);
}

/**
 * Fetches all instructors.
 */
export function getAllInstructors() {
    return apiFetch('/instructors');
}

/**
 * Fetches all enrollments for a specific course, including student details.
 * @param {string|number} courseId The ID of the course.
 * @returns {Promise<Array>} A promise that resolves with an array of enrollments.
 */
export function getEnrollmentsForCourse(courseId) {
    // This will fetch the course and embed all related enrollments,
    // and for each enrollment, it will expand the user (student) details.
    return apiFetch(`/courses/${courseId}?_embed=enrollments&_expand=user`);
}

// This function checks if a specific enrollment already exists.
export function checkEnrollment(studentId, courseId) {
    return apiFetch(`/enrollments?studentId=${studentId}&courseId=${courseId}`);
}

// This function creates a new enrollment record.
export function createEnrollment(studentId, courseId) {
    const enrollmentData = {
        studentId: parseInt(studentId, 10),
        courseId: parseInt(courseId, 10)
    };
    return apiFetch('/enrollments', 'POST', enrollmentData);
}