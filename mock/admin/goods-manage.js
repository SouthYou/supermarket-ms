const Mock = require('mockjs')

module.exports = [
  {
    url: '/goods/getAll',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            total: 5,
            tableData: [
              [{
                goodsId: 'test',
                goodsName: 'test',
                goodsType: 'test',
                goodsCost: 'test',
                goodsPrice: 'test',
                stock: 'test',
                productionDate: 'test',
                duration: 'test',
                expirationDate: 'test',
              }, {
                goodsId: 'test',
                goodsName: 'test',
                goodsType: 'test',
                goodsCost: 'test',
                goodsPrice: 'test',
                stock: 'test',
                productionDate: 'test',
                duration: 'test',
                expirationDate: 'test',
              }, {
                goodsId: 'test',
                goodsName: 'test',
                goodsType: 'test',
                goodsCost: 'test',
                goodsPrice: 'test',
                stock: 'test',
                productionDate: 'test',
                duration: 'test',
                expirationDate: 'test',
              }],

              [{
                goodsId: 'test',
                goodsName: 'test',
                goodsType: 'test',
                goodsCost: 'test',
                goodsPrice: 'test',
                stock: 'test',
                productionDate: 'test',
                duration: 'test',
                expirationDate: 'test',
              }, {
                goodsId: 'test',
                goodsName: 'test',
                goodsType: 'test',
                goodsCost: 'test',
                goodsPrice: 'test',
                stock: 'test',
                productionDate: 'test',
                duration: 'test',
                expirationDate: 'test',
              }]
            ]
          }
        )
      }
    }
  }
]