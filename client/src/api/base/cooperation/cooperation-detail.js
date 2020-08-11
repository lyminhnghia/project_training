import {createAuthApiRequest} from '../../index'

export const updateCooMain = (id, data) => {
    return createAuthApiRequest({
        url: `/api/cooperation/main/${id}`,
        method: 'put',
        data: data
    })
}

export const getAllCoMain = (page) => {
    return createAuthApiRequest({
        url: `/api/cooperation/main/all`,
        method: 'get',
        params: {page}
    })
}

export const getCoMain = (id) => {
    return createAuthApiRequest({
        url: `/api/cooperation/main/${id}`,
        method: 'get'
    })
}