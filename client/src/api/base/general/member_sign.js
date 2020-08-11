import {createAuthApiRequest} from '../../index'

export const addMemberSign = (data) => {
    return createAuthApiRequest({
        url: `/api/member/sign/add`,
        method: 'post',
        data: data
    })
}

export const updateMemberSign = (id, data) => {
    return createAuthApiRequest({
        url: `/api/member/sign/${id}`,
        method: 'put',
        data: data
    })
}

export const getAllMemberSign = (page) => {
    return createAuthApiRequest({
        url: `/api/member/sign/all`,
        method: 'get',
        params: {page}
    })
}

export const getAllNameMemberSign = () => {
    return createAuthApiRequest({
        url: `/api/member/sign/name/all`,
        method: 'get'
    })
}

export const getMemberSign = (id) => {
    return createAuthApiRequest({
        url: `/api/member/sign/${id}`,
        method: 'get'
    })
}

export const deleteMemberSign = (id) => {
    return createAuthApiRequest({
        url: `/api/member/sign/${id}`,
        method: 'delete'
    })
}