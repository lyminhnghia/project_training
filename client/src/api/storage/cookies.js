import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export function getCookie(name) {
    return cookies.get(name) || null
}

export function setCookie(name, value, options) {
    return cookies.set(name, value, options)
}

export function removeCookie(name) {
    return cookies.remove(name)
}