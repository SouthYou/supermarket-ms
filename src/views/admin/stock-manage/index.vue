<template>
  <div class="app-container">
    <!-- 标签 -->
    <div class="operate-container">
      <el-card shadow="never">
        <i class="el-icon-tickets"></i> 库存记录
        <!-- <el-button class="btn-sell" type="success" size="small" @click="showAddFormDialog()">添加</el-button> -->
      </el-card>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <el-table :data="showData" border style="width: 100%" :cell-style="cell_center" :header-cell-style="cell_center">
        <el-table-column prop="recordId" label="记录编号"></el-table-column>
        <el-table-column prop="importId" label="进货编号">
          <template slot-scope="scope">
            <span v-if="scope.row.importId">
              {{scope.row.importId}}
            </span>
            <span v-else>---</span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsId" label="商品编号"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="effectNum" label="变更数量"></el-table-column>
        <el-table-column prop="effectType" label="变更类型"></el-table-column>
        <el-table-column prop="effectTime" label="变更时间"></el-table-column>
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
import * as api from '@/api/admin/stock-record'

export default {
  // inject: ['reload'],
  data() {
    return {
      cell_center: {
        "text-align": "center"
      },
      tableData: [],
      showData: [],
      pageNo: 1,
      pageSize: 5,
      total: 0
    }
  },

  created() {
    const pageSize = this.pageSize
    const params = { pageSize }
    api.getAllStockRecord(params).then(res => {
      const { data } = res
      this.total = data.total
      this.tableData = data.tableData
      this.showData = this.tableData[0]
    })
  },

  methods: {
    pageNoChange(pageNo) {
      this.pageNo = pageNo
      this.showData = this.tableData[pageNo - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
// .operate-container .btn-sell {
//   float: right;
// }

.table-container {
  margin-top: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.single-row {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cell-center {
  text-align: center;
}
</style>
