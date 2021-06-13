import request from '@/utils/request'

export function getSalesRecord(params) {
  return request({
    url: '/sales/getAll',
    method: 'get',
    params
  })
}
