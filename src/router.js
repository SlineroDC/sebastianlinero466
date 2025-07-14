import { renderLanding } from "./views/landing.js";
import { renderLogin } from "./views/login.js";
import { renderRegister } from "./views/register.js";
import { renderDashboard } from "./views/dashboard.js";
import { renderCourseForm } from "./views/eventsForm.js";
import { renderEnrolledStudents } from "./views/enrolledUsers.js";
import { render404 } from "./views/404.js";

import { setupLoginForm, setupRegisterForm } from "./js/authHandlers.js";
import { setupDashboard, setupCourseForm } from "./js/dashboardHandlers.js";

// Defines all application routes, including dynamic routes with parameters.
const routes = {
    "/": {
        showView: renderLanding,
        afterRender: null,
        private: false
    },
    "/login": {
        showView: renderLogin,
        afterRender: setupLoginForm,
        private: false
    },
    "/register": {
        showView: renderRegister,
        afterRender: setupRegisterForm,
        private: false
    },
    "/dashboard": {
        showView: renderDashboard,
        afterRender: setupDashboard,
        private: true
    },
    "/admin/course/new": {
        showView: renderCourseForm,
        afterRender: setupCourseForm,
        private: true
    },
    "/admin/course/edit/:id": {
        showView: (params) => renderCourseForm(params.id),
        afterRender: setupCourseForm,
        private: true
    },
    "/admin/course/:id/students": {
        showView: (params) => renderEnrolledStudents(params.id),
        afterRender: null,
        private: true
    }
};

// Main router function, capable of handling dynamic routes.
export async function router() {
    const path = window.location.pathname || '/';
    const app = document.getElementById('app');
    const currentUser = localStorage.getItem('currentUser');

    // Finds a matching route, supporting both static and dynamic paths.
    let matchedRoute = null;
    let params = {};

    for (const route in routes) {
        const routeRegex = new RegExp("^" + route.replace(/:[^\s/]+/g, "([\\w-]+)") + "$");
        const match = path.match(routeRegex);

        if (match) {
            const keys = route.match(/:[^\s/]+/g) || [];
            params = keys.reduce((acc, key, i) => {
                acc[key.substring(1)] = match[i + 1];
                return acc;
            }, {});
            matchedRoute = routes[route];
            break;
        }
    }

    // Route protection logic.
    if (currentUser && (path === '/login' || path === '/register')) {
        history.pushState(null, null, '/dashboard');
        router();
        return;
    }
    if (matchedRoute && matchedRoute.private && !currentUser) {
        history.pushState(null, null, '/login');
        router();
        return;
    }

    // Page rendering logic.
    if (matchedRoute) {
        const viewHtml = await matchedRoute.showView(params);
        app.innerHTML = viewHtml;

        if (matchedRoute.afterRender) {
            setTimeout(() => matchedRoute.afterRender(params), 0);
        }
    } else {
        app.innerHTML = render404();
    }
}