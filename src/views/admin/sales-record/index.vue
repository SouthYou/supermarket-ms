<template>
  <div class="app-container">
    <!-- 标签 -->
    <div class="tickets-container">
      <el-card shadow="never">
        <i class="el-icon-tickets"></i> 销售记录
      </el-card>
    </div>

    <!-- 记录列表 -->
    <div class="table-container">
      <el-table :data="showData" border style="width: 100%">
        <el-table-column prop="recordId" label="记录编号"></el-table-column>
        <el-table-column prop="goodsId" label="商品编号"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="goodsType" label="商品类型"></el-table-column>
        <el-table-column prop="goodsPrice" label="商品销售价"></el-table-column>
        <el-table-column prop="goodsNum" label="销售数量"></el-table-column>
        <el-table-column prop="time" label="销售时间"></el-table-column>
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
import * as api from '@/api/admin/sales-record'

export default {
  // inject: ['reload'],
  data() {
    return {
      // 销售记录列表 (表格分页)------------------------------------------------
      tableData: [],
      showData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0
    }
  },

  created() {
    const pageSize = this.pageSize
    const params = { pageSize }
    api.getSalesRecord(params).then(res => {
      const { data } = res
      this.total = data.total
      this.tableData = data.tableData
      this.showData = this.tableData[0]
    })
  },

  methods: {
    /**
     * @method 页码改变
     */
    pageNoChange(pageNo) {
      this.pageNo = pageNo
      this.showData = this.tableData[pageNo - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container .btn-refund {
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
