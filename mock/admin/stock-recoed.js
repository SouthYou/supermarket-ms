const Mock = require('mockjs')

module.exports = [
  {
    url: '/stock/getAll',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            total: 5,
            tableData: [
              [{
                recordId: "recordId",
                importId: "importId",
                goodsId: "goodsId",
                effectNum: "effectNum",
                effectType: "effectType",
                effectTime: "time"
              }, {
                recordId: "recordId",
                importId: "importId",
                goodsId: "goodsId",
                effectNum: "effectNum",
                effectType: "effectType",
                effectTime: "time"
              }, {
                recordId: "recordId",
                importId: "importId",
                goodsId: "goodsId",
                effectNum: "effectNum",
                effectType: "effectType",
                effectTime: "time"
              }],

              [{
                recordId: "recordId",
                importId: "importId",
                goodsId: "goodsId",
                effectNum: "effectNum",
                effectType: "effectType",
                effectTime: "time"
              }, {
                recordId: "recordId",
                importId: "importId",
                goodsId: "goodsId",
                effectNum: "effectNum",
                effectType: "effectType",
                effectTime: "time"
              }]
            ]
          }
        )
      }
    }
  }
]