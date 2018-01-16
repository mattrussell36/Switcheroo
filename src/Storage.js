export function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}