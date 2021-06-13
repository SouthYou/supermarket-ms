const Mock = require('mockjs')

module.exports = [
  {
    url: '/finance/day',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            total: 3,
            tableData: [
              [{
                goodsId: 'goodsId',
                goodsName: 'goodsName',
                goodsType: 'goodsType',
                totalNum: 'totalNum',
                totalPrice: 'totalPrice',
                totalProfits: 'totalProfits'
              }, {
                goodsId: 'goodsId',
                goodsName: 'goodsName',
                goodsType: 'goodsType',
                totalNum: 'totalNum',
                totalPrice: 'totalPrice',
                totalProfits: 'totalProfits'
              }, {
                goodsId: 'goodsId',
                goodsName: 'goodsName',
                goodsType: 'goodsType',
                totalNum: 'totalNum',
                totalPrice: 'totalPrice',
                totalProfits: 'totalProfits'
              }]
            ]
          }
        )
      }
    }
  },
  {
    url: '/finance/month',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            total: 2,
            tableData: [
              [{
                goodsId: 'goodsId',
                goodsName: 'goodsName',
                goodsType: 'goodsType',
                totalNum: 'totalNum',
                totalPrice: 'totalPrice',
                totalProfits: 'totalProfits'
              }, {
                goodsId: 'goodsId',
                goodsName: 'goodsName',
                goodsType: 'goodsType',
                totalNum: 'totalNum',
                totalPrice: 'totalPrice',
                totalProfits: 'totalProfits'
              }]
            ]
          }
        )
      }
    }
  }
]