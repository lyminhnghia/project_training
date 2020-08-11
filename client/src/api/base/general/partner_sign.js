import {createAuthApiRequest} from '../../index'

export const addPartnerSign = (data) => {
    return createAuthApiRequest({
        url: `/api/partner/sign/add`,
        method: 'post',
        data: data
    })
}

export const updatePartnerSign = (id, data) => {
    return createAuthApiRequest({
        url: `/api/partner/sign/${id}`,
        method: 'put',
        data: data
    })
}

export const getAllPartnerSign = (page) => {
    return createAuthApiRequest({
        url: `/api/partner/sign/all`,
        method: 'get',
        params: {page}
    })
}

export const getPartnerSign = (id) => {
    return createAuthApiRequest({
        url: `/api/partner/sign/${id}`,
        method: 'get'
    })
}

export const deletePartnerSign = (id) => {
    return createAuthApiRequest({
        url: `/api/partner/sign/${id}`,
        method: 'delete'
    })
}