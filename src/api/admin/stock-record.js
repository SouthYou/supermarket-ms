import request from '@/utils/request'

export function getAllStockRecord(params) {
  return request({
    url: '/stock/getAll',
    method: 'get',
    params
  })
}