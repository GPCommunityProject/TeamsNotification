import request from '../utils/request'

export function submitForm(params) {
    return request('post', '/api/notification', params)
}