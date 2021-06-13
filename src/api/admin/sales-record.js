import request from '@/utils/request'

export function getSalesRecord(params) {
  return request({
    url: '/sales/getAll',
    method: 'get',
    params
  })
}

export function refund(data) {
  return request({
    url: '/sales/refund',
    method: 'post',
    data
  })
}