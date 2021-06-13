<template>
  <div class="app-container">
    <!-- 标签 -->
    <div class="operate-container">
      <el-card shadow="never">
        <i class="el-icon-tickets"></i> 财务汇总
        <el-switch
          style="display: block"
          v-model="switch_day"
          class="query-type-switch"
          inactive-color="#13ce66"
          active-color="#409EFF"
          inactive-text="按天查询"
          active-text="按月查询"
          @change="switchStatusChanged">
        </el-switch>
      </el-card>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <el-table :data="showData" border style="width: 100%" :cell-style="cell_center" :header-cell-style="cell_center">
        <el-table-column prop="goodsBaseId" label="商品基础编号"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="goodsType" label="商品类型"></el-table-column>
        <el-table-column prop="totalNum" label="总销售量"></el-table-column>
        <el-table-column prop="totalPrice" label="总销售额"></el-table-column>
        <el-table-column prop="totalProfits" label="总利润"></el-table-column>
      </el-table>
    </div>

    <!-- 数据分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next"
        :current-page="pageNo"
        :page-size="pageSize"
        :total="total"
        @current-change="pageNoChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/admin/finance-manage'

export default {
  // inject: ['reload'],
  data() {
    return {
      cell_center: {
        "text-align": "center"
      },
      switch_day: false,
      tableData: [],
      showData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0
    }
  },

  created() {
    const pageSize = this.pageSize
    const params = { pageSize, type: "day" }
    api.getFinanceSummary(params).then(res => {
      const { data } = res
      this.total = data.total
      this.tableData = data.tableData
      this.showData = this.tableData[0]
    })
  },

  methods: {
    switchStatusChanged(status) {
      const queryType = status ? "month":"day"
      const params = {
        type: queryType,
        pageSize: this.pageSize
      }
      api.getFinanceSummary(params).then(res => {
        const { data } = res
        this.total = data.total
        this.tableData = data.tableData
        this.showData = this.tableData[0]
      })
    },
    pageNoChange(pageNo) {
      this.pageNo = pageNo
      this.showData = this.tableData[pageNo - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
.operate-container .query-type-switch {
  float: right;
}
.table-container {
  margin-top: 20px;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
