import {createAuthApiRequest} from '../../index'

export const addCooperation = (data) => {
    return createAuthApiRequest({
        url: `/api/cooperation/add`,
        method: 'post',
        data: data
    })
}

export const updateCooperation = (id, data) => {
    return createAuthApiRequest({
        url: `/api/cooperation/${id}`,
        method: 'put',
        data: data
    })
}

export const getCooperation = (id) => {
    return createAuthApiRequest({
        url: `/api/cooperation/${id}`,
        method: 'get'
    })
}

export const getAllPartnerCo = () => {
    return createAuthApiRequest({
        url: `/api/cooperation/partner/all`,
        method: 'get'
    })
}

export const getAllMemberCo = () => {
    return createAuthApiRequest({
        url: `/api/cooperation/faculty/all`,
        method: 'get'
    })
}

export const getAllMyCo = () => {
    return createAuthApiRequest({
        url: `/api/mycooperation/all`,
        method: 'get'
    })
}

export const getAllName = () => {
    return createAuthApiRequest({
        url: `/api/user/faculty/name/all`,
        method: 'get'
    })
}