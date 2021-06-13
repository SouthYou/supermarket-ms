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
          active-text="按月查询">
        </el-switch>
      </el-card>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <el-table :data="showData" border style="width: 100%" cell-style="text-align: center;" header-cell-style="text-align: center;">
        <el-table-column prop="recordId" label="记录编号"></el-table-column>
        <el-table-column prop="importId" label="进货编号"></el-table-column>
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
// import * as api from '@/api/edu/enroll'

export default {
  // inject: ['reload'],
  data() {
    return {
      switch_day: false,
      tableData: [],
      showData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0
    }
  },

  mounted() {
    
  },

  methods: {
    
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
