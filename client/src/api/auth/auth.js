import Paths from '../../routes/Paths'
import {getCookie, removeCookie, setCookie} from '../storage/cookies'
import {COOKIE_KEY} from '../storage/sessionStorage'
import { getUserProfile } from '../base/auth'

export const logout = () => {
    removeCookie(COOKIE_KEY.TOKEN)
    removeCookie(COOKIE_KEY.ROLE)
    window.location.href = Paths.Login
}

export const getUser = async () => {
    var token = getCookie(COOKIE_KEY.TOKEN)
    var user = {}
    if (token) {
        const result = await getUserProfile()
        if (result.success) {
            user = result.data.message
        } else {
            return null
        }
    }
    return token ? user : null
}

export const checkAuth = () => {
    return getCookie(COOKIE_KEY.TOKEN) ? true : false
}

export const setUserCookies = (token, role) => {
    setCookie(COOKIE_KEY.TOKEN, token)
    setCookie(COOKIE_KEY.ROLE, role)
}

