import {createAuthApiRequest} from '../../index'

export const addCountry = (data) => {
    return createAuthApiRequest({
        url: `/api/country/add`,
        method: 'post',
        data: data
    })
}

export const updateCountry = (id, data) => {
    return createAuthApiRequest({
        url: `/api/country/${id}`,
        method: 'put',
        data: data
    })
}

export const getAllCountry = (page) => {
    return createAuthApiRequest({
        url: `/api/country/all`,
        method: 'get',
        params: {page}
    })
}

export const getAllNameCountry = () => {
    return createAuthApiRequest({
        url: `/api/country/name/all`,
        method: 'get'
    })
}

export const getCountry = (id) => {
    return createAuthApiRequest({
        url: `/api/country/${id}`,
        method: 'get'
    })
}

export const deleteCountry = (id) => {
    return createAuthApiRequest({
        url: `/api/country/${id}`,
        method: 'delete'
    })
}