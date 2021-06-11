import request from '@/utils/request'

export function getGoods(params) {
  return request({
    url: '/goods/getAll',
    method: 'get',
    params
  })
}

export function addGoods(data) {
  return request({
    url: '/goods/add',
    method: 'post',
    data
  })
}

export function modifyGoods(data) {
  return request({
    url: '/goods/modify',
    method: 'post',
    data
  })
}

export function sellGoods(data) {
  return request({
    url: '/goods/sell',
    method: 'post',
    data
  })
}