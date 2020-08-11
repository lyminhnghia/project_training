export const getSessionStorage = (name) => {
    let strObj = window.sessionStorage.getItem(name)
    if (strObj) return JSON.parse(strObj)
    else return null
}

export const setSessionStorage = (name, value) => {
    return window.sessionStorage.setItem(name, JSON.stringify(value))
}

export const removeSessionStorage = (name) => {
    return window.sessionStorage.removeItem(name)
}

export const COOKIE_KEY = {
    TOKEN: 'TOKEN',
    ROLE: 'ROLE'
}