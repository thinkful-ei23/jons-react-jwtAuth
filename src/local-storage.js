// localStorage is a store in your browser which persists even if 
// you close a tab or exit your browser window

export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

// In the saveAuthToken method, we call the localStorage.setItem method, using authToken as the key, 
// and setting the JWT as the value. 
// In Safari's incognito mode, attempting to save a value to localStorage will throw an exception, 
// so we wrap the call in a try statement.
export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('authToken', authToken);
    } catch (e) {}
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {}
};
