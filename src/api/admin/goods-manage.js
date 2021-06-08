import request from '@/utils/request'

export function getGoods(params) {
  return request({
    url: '/goods/getAll',
    method: 'get',
    params
  })
}

