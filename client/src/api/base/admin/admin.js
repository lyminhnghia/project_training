import {createAuthApiRequest} from '../../index'

export const addFaculty = (data) => {
    return createAuthApiRequest({
        url: `/api/faculty/add`,
        method: 'post',
        data: data
    })
} 

export const getTableFaculty = (page) => {
    return createAuthApiRequest({
        url: `/api/faculty/all`,
        method: 'get',
        params: {page}
    })
}

export const addAccount = (data) => {
    return createAuthApiRequest({
        url: `/api/user/faculty/add`,
        method: 'post',
        data: data
    })
} 

export const getTableAccount = (page) => {
    return createAuthApiRequest({
        url: `/api/user/faculty/all`,
        method: 'get',
        params: {page}
    })
}

export const getAllNameFaculty = () => {
    return createAuthApiRequest({
        url: `/api/faculty/name/all`,
        method: 'get'
    })
}

export const getAccount = (id) => {
    return createAuthApiRequest({
        url: `/api/user/faculty/${id}`,
        method: 'get'
    })
}

export const updateAccount = (id, data) => {
    return createAuthApiRequest({
        url: `/api/user/faculty/${id}`,
        method: 'put',
        data: data
    })
}

export const deleteAccount = (id) => {
    return createAuthApiRequest({
        url: `/api/user/faculty/${id}`,
        method: 'delete'
    })
}

export const getFaculty = (id) => {
    return createAuthApiRequest({
        url: `/api/faculty/${id}`,
        method: 'get'
    })
}

export const updateFaculty = (id, data) => {
    return createAuthApiRequest({
        url: `/api/faculty/${id}`,
        method: 'put',
        data: data
    })
}

export const deleteFaculty = (id) => {
    return createAuthApiRequest({
        url: `/api/faculty/${id}`,
        method: 'delete'
    })
}