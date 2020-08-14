// import { getEnv } from '../helper/env/getEnv'
import { getCookie } from './storage/cookies'
import axios from 'axios'
import { COOKIE_KEY } from './storage/sessionStorage'
import { logout } from './auth/auth'

// const baseUrl = getEnv("BACKEND")

export const createApiRequest = async ({ url, method, data, params }) => {
    try {
        const { data: resp } = await axios({
            method,
            url: `${url}`,
            data,
            params,
        })
        return {
            success: true,
            data: resp,
        }
    } catch (e) {
        const { response } = e
        console.log(response)
        const message = response ? response.data.message : e.message || e

        return {
            success: false,
            data: message,
        }
    }
}

export const createAuthApiRequest = async ({ url, method, data, params, isFormData, props }) => {
    try {
        const token = getCookie(COOKIE_KEY.TOKEN)
        if (token) {
            const { data: resp } = await axios({
                method,
                url: `${url}`,
                data,
                params,
                headers: {
                    'x-access-token': `${token}`,
                    ...isFormData && { 'Content-Type': 'multipart/form-data' },
                }
            })

            return {
                success: true,
                data: resp,
            }
        }
    } catch (e) {
        const { response } = e
        const errorMessage = response ? response.data.message : e.message || e
        if (response.status && [401, 403].includes(response.status)) {
            logout()
        }

        return {
            success: false,
            message: errorMessage,
        }
    }
}

export const uploadFile = async (url, data, filename, file) => {
    const formData = new FormData();
    const token = getCookie(COOKIE_KEY.TOKEN)
    if (!token) {
        return
    }
    try {
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
        }
        formData.append("file", file);
        const { data: resp } = await axios.post(
            `${url}`,
            formData,
            {
                headers: {
                    'x-access-token': `${token}`
                }
            })
        return {
            success: true,
            data: resp,
        }
    } catch (e) {
        const { response } = e
        const errorMessage = response ? response.data.message : e.message || e
        if (response.status && [401, 403].includes(response.status)) {
            logout()
        }

        return {
            success: false,
            message: errorMessage,
        }
    }
}