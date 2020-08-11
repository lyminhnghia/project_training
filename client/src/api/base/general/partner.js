import {createAuthApiRequest} from '../../index'

export const addPartner = (data) => {
    return createAuthApiRequest({
        url: `/api/partner/add`,
        method: 'post',
        data: data
    })
}

export const updatePartner = (id, data) => {
    return createAuthApiRequest({
        url: `/api/partner/${id}`,
        method: 'put',
        data: data
    })
}

export const getAllPartner = (page) => {
    return createAuthApiRequest({
        url: `/api/partner/all`,
        method: 'get',
        params: {page}
    })
}

export const getAllNamePartner = () => {
    return createAuthApiRequest({
        url: `/api/partner/name/all`,
        method: 'get'
    })
}

export const getPartner = (id) => {
    return createAuthApiRequest({
        url: `/api/partner/${id}`,
        method: 'get'
    })
}

export const deletePartner = (id) => {
    return createAuthApiRequest({
        url: `/api/partner/${id}`,
        method: 'delete'
    })
}