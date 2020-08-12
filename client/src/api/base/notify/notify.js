import {createAuthApiRequest} from '../../index'

export const notifyCooperation = () => {
    return createAuthApiRequest({
        url: '/api/notify/cooperation', 
        method: 'get'
    })
}