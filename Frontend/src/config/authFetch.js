import { apiUrl } from './api'

export const authFetch = (path, options = {}) => {
    const token = localStorage.getItem('iccmsToken')
    return fetch(apiUrl(path), {
        ...options,
        headers: {
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    })
}
