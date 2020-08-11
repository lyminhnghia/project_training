import {createApiRequest, createAuthApiRequest} from '../index'

export const login = (data) => {
    return createApiRequest({
        url: '/api/login', 
        method: 'post',
        data: data
    })
}

export const changepassword = (data) => {
    return createAuthApiRequest({
        url: '/api/password/edit', 
        method: 'put',
        data: data
    })
}

export const getUserProfile = () => {
    return createAuthApiRequest({
        url: '/api/profile', 
        method: 'get'
    })
}