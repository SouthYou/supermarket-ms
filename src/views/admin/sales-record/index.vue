<template>
  <div class="app-container">
    <!-- 标签 -->
    <div class="tickets-container">
      <el-card shadow="never">
        <i class="el-icon-tickets"></i> 销售记录
        <el-button class="btn-refund" type="danger" size="small" @click="showRefundFormDialog()">退款</el-button>
      </el-card>
    </div>

    <!-- 记录列表 -->
    <div class="table-container">
      <el-table :data="showData" border style="width: 100%">
        <el-table-column prop="recordId" label="记录编号"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="goodsType" label="商品类型"></el-table-column>
        <el-table-column prop="goodsPrice" label="商品销售价"></el-table-column>
        <el-table-column prop="goodsNum" label="销售数量"></el-table-column>
        <el-table-column prop="time" label="销售时间"></el-table-column>
      </el-table>
    </div>

    <!-- 退款dialog -->
    <el-dialog title="销售商品" :visible.sync="refundFormDialogVisible" width="550px" :before-close="closeRefundFormDialog">
      <el-form :model="refundForm" label-position="left" label-width="100px" ref="refundForm">
        <el-form-item label="商品编号" prop="goodsId">
          <el-input v-model="refundForm.goodsName" style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="退款数量" prop="goodsNum">
          <el-input-number v-model="refundForm.goodsNum" :min="1"></el-input-number>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeRefundFormDialog()">取 消</el-button>
        <el-button type="primary" @click="submitRefundFormDialog()">提 交</el-button>
      </span>
    </el-dialog>

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
      // 退款dialog-----------------------------------------------------------
      refundFormDialogVisible: false,
      refundForm: {
        goodsId: '',
        goodsNum: 1
      },
      // 销售记录列表 (表格分页)------------------------------------------------
      tableData: [],
      showData: [],
      pageNo: 1,
      pageSize: 3,
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
     * @method 弹出退款dialog
     */
    showRefundFormDialog() {
      this.refundFormDialogVisible = true
    },

    /**
     * @method 关闭退款dialog
     */
    closeRefundFormDialog() {
      this.refundFormDialogVisible = false
    },

    /**
     * @method 提交退款dialog内的表单信息
     */
    submitRefundFormDialog() {
      const name = this.refundForm.goodsId
      const type = this.refundForm.goodsNum
      const data = { name, type }
      api.refund(data).then(res => {
        const { data } = res
        for (const key in this.refundForm) {
          this.refundForm[key] = ''
        }
        this.closeRefundFormDialog()
        this.$message.success('退款成功')
      })
    },
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
