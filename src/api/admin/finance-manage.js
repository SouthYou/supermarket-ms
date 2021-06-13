import request from '@/utils/request'

export function getFinanceSummary(params) {
  return request({
    url: '/finance/summary',
    method: 'get',
    params
  })
}