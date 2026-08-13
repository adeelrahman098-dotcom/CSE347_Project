export const ROLE_DASHBOARD_PATHS = {
    ADMIN: '/admin/dashboard',
    TEACHER: '/teacher/dashboard',
    STUDENT: '/student/dashboard',
    PARENT: '/parent/dashboard'
}

export const getDashboardPathForRole = (role) =>
    ROLE_DASHBOARD_PATHS[role] || '/'
