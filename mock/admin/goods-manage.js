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
                goodsId: 'goodsId',
                goodsName: 'goodsName',
                goodsType: 'goodsType',
                goodsCost: 'goodsCost',
                goodsPrice: 'goodsPrice',
                stock: 'stock',
                productionDate: 'productionDate',
                duration: 'duration',
                expirationDate: 'expirationDate',
              }, {
                goodsId: 'goodsId',
                goodsName: 'goodsName',
                goodsType: 'goodsType',
                goodsCost: 'goodsCost',
                goodsPrice: 'goodsPrice',
                stock: 'stock',
                productionDate: 'productionDate',
                duration: 'duration',
                expirationDate: 'expirationDate',
              }, {
                goodsId: 'goodsId',
                goodsName: 'goodsName',
                goodsType: 'goodsType',
                goodsCost: 'goodsCost',
                goodsPrice: 'goodsPrice',
                stock: 'stock',
                productionDate: 'productionDate',
                duration: 'duration',
                expirationDate: 'expirationDate',
              }],

              [{
                goodsId: 'goodsId',
                goodsName: 'goodsName',
                goodsType: 'goodsType',
                goodsCost: 'goodsCost',
                goodsPrice: 'goodsPrice',
                stock: 'stock',
                productionDate: 'productionDate',
                duration: 'duration',
                expirationDate: 'expirationDate',
              }, {
                goodsId: 'goodsId',
                goodsName: 'goodsName',
                goodsType: 'goodsType',
                goodsCost: 'goodsCost',
                goodsPrice: 'goodsPrice',
                stock: 'stock',
                productionDate: 'productionDate',
                duration: 'duration',
                expirationDate: 'expirationDate',
              }]
            ]
          }
        )
      }
    }
  },

  {
    url: '/goods/modify',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },
]