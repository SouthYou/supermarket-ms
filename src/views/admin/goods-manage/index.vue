<template>
  <div class="app-container">
    <!-- 标签 -->
    <div class="operate-container">
      <el-card shadow="never">
        <i class="el-icon-tickets"></i> 商品列表
        <div class="btn-container">
          <el-button type="success" size="small" @click="showImportFormDialog()">进货</el-button>
          <el-button type="success" size="small" @click="showAddFormDialog()">添加新商品</el-button>
          <el-button type="danger" size="small" @click="showRefundFormDialog()">退款</el-button>
        </div>
      </el-card>
    </div>

    <!-- 商品列表 -->
    <div class="table-container">
      <el-table :data="showData" border style="width: 100%">
        <el-table-column prop="goodsId" label="商品编号" width="150"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="goodsType" label="商品类型"></el-table-column>
        <el-table-column prop="goodsCost" label="商品进货价"></el-table-column>
        <el-table-column prop="goodsPrice" label="商品销售价">
          <template slot-scope="scope">
            <span v-if="scope.row.isEditPropertyShow">
              <el-input v-model="scope.row.goodsPrice" size="small" placeholder="请输入内容" />
            </span>
            <span v-else>{{ scope.row.goodsPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存">
          <template slot-scope="scope">
            <span v-if="scope.row.isEditPropertyShow">
              <el-input v-model="scope.row.stock" size="small" placeholder="请输入内容" />
            </span>
            <span v-else>{{ scope.row.stock }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productionDate" label="生产日期"></el-table-column>
        <el-table-column prop="duration" label="保质期（天）"></el-table-column>
        <el-table-column prop="expirationDate" label="过期时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div v-if="!scope.row.isEditPropertyShow">
              <el-button type="primary" size="small" @click="editProperty(scope.row,scope.$index)">编辑</el-button>
              <el-button type="warning" size="small" @click="showSellFormDialog(scope.row)">销售</el-button>
            </div>
            <div v-else>
              <el-button type="primary" plain size="small" @click="saveProperty(scope.row,scope.$index)">保存</el-button>
              <el-button size="small" @click="cancelProperty(scope.row,scope.$index)">取消</el-button>
            </div>
            <!-- <el-button type="danger" size="small" @click="handleNewsRemove(scope.row.newsId)">删除</el-button> -->
          </template>
        </el-table-column>
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

    <!-- 进货dialog -->
    <el-dialog title="进货" :visible.sync="importFormDialogVisible" width="550px" :before-close="closeImportFormDialog" style="margin-top: -10vh;">
      <el-form :model="importForm" label-position="left" label-width="100px" ref="importForm">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="importForm.goodsName"></el-input>
        </el-form-item>

        <el-form-item label="商品类型" prop="goodsType">
          <el-select v-model="importForm.goodsType" placeholder="请选择商品类型">
            <el-option label="食品" value="食品"></el-option>
            <el-option label="日用品" value="日用品"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品进货价" prop="goodsCost">
          <el-input v-model="importForm.goodsCost" style="width:100px"></el-input>&nbsp;&nbsp;元
        </el-form-item>

        <el-form-item label="商品销售价" prop="goodsPrice">
          <el-input v-model="importForm.goodsPrice" style="width:100px"></el-input>&nbsp;&nbsp;元
        </el-form-item>

        <el-form-item label="进货数量" prop="importGoodsSum">
          <el-input v-model="importForm.importGoodsSum" style="width:200px"></el-input>
        </el-form-item>

        <el-form-item label="生产日期" prop="productionDate">
          <el-date-picker
            v-model="importForm.productionDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="保质期" prop="duration">
          <el-input v-model="importForm.duration" style="width:100px"></el-input>&nbsp;&nbsp;个月
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeImportFormDialog()">取 消</el-button>
        <el-button type="primary" @click="submitImportFormDialog()">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 添加新商品dialog -->
    <el-dialog title="添加新商品" :visible.sync="addFormDialogVisible" width="550px" :before-close="closeAddFormDialog">
      <el-form :model="addForm" label-position="left" label-width="100px" ref="sellForm">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="addForm.goodsName"></el-input>
        </el-form-item>

        <el-form-item label="商品类型" prop="goodsType">
          <el-select v-model="addForm.goodsType" placeholder="请选择商品类型">
            <el-option label="食品" value="食品"></el-option>
            <el-option label="日用品" value="日用品"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddFormDialog()">取 消</el-button>
        <el-button type="primary" @click="submitAddFormDialog()">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 销售商品dialog -->
    <el-dialog title="销售商品" :visible.sync="sellFormDialogVisible" width="550px" :before-close="closeSellFormDialog">
      <el-form :model="sellForm" label-position="left" label-width="100px" ref="sellForm">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="sellForm.goodsName" disabled style="width:350px"></el-input>
        </el-form-item>
        <el-form-item label="销售数量" prop="goodsNum">
          <el-input-number v-model="sellForm.goodsNum" :min="1"></el-input-number>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSellFormDialog()">取 消</el-button>
        <el-button type="primary" @click="submitSellFormDialog()">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 退款dialog -->
    <el-dialog title="退款" :visible.sync="refundFormDialogVisible" width="550px" :before-close="closeRefundFormDialog">
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
  </div>
</template>

<script>
import * as api from '@/api/admin/goods-manage'

export default {
  inject: ['reload'],
  data() {
    return {
      // 表单dialog (进货)--------------------------------------------
      importFormDialogVisible: false,
      importForm: {
        goodsName: '',
        goodsType: '',
        goodsCost: '',
        goodsPrice: '',
        importGoodsSum: '',
        productionDate: '',
        duration: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      // 添加新商品dialog -----------------------------------------------
      addFormDialogVisible: false,
      addForm: {
        goodsName: '',
        goodsType: ''
      },
      // 销售商品dialog --------------------------------------------------
      sellFormDialogVisible: false,
      sellForm: {
        goodsName: '',
        goodsNum: 1
      },
      // 退款dialog--------------------------------------------------------
      refundFormDialogVisible: false,
      refundForm: {
        goodsId: '',
        goodsNum: 1
      },
      // 商品列表 (表格分页)------------------------------------------------
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
    api.getGoods(params).then(res => {
      const { data } = res
      this.total = data.total
      this.tableData = data.tableData
      this.showData = this.tableData[0]
    })
  },

  methods: {
    /**
     * @method 更改商品属性
     */
    editProperty(row, index) {
      sessionStorage.setItem('oldPropertyValue', JSON.stringify(row))
      this.$set(this.showData[index], 'isEditPropertyShow', true)         // this.$set(obj, key, value)
    },

    /**
     * @method 保存对商品属性的更改
     */
    saveProperty(row, index) {
      const goodsId = this.showData[index].goodsId
      const goodsPrice = this.showData[index].goodsPrice
      const stock = this.showData[index].stock
      const params = { goodsId, goodsPrice, stock }
      if (goodsPrice <= 0) {
        this.$message.error('销售价应当大于0')
        return false
      }
      if (stock < 0) {
        this.$message.error('库存不能小于0')
        return false
      }
      sessionStorage.removeItem('oldPropertyValue')
      this.$set(this.showData[index], 'isEditPropertyShow', false)
      api.modifyGoods(params).then(res => {
        const { data } = res
        this.reload()
        this.$message.success('更新成功')
      })
    },

    /**
     * @method 取消对商品属性的编辑
     */
    cancelProperty(row, index) {
      let oldPropertyValue = sessionStorage.getItem('oldPropertyValue')
      if (sessionStorage.getItem('oldPropertyValue') !== 'null') {
        let oldPropertyValue_json = JSON.parse(oldPropertyValue)
        this.$set(this.showData[index], 'goodsPrice', oldPropertyValue_json.goodsPrice)
        this.$set(this.showData[index], 'stock', oldPropertyValue_json.stock)
      } else {
        console.error('sessionStorage未正常设置')
      }
      sessionStorage.removeItem('oldPropertyValue')
      this.$set(this.showData[index], 'isEditPropertyShow', false)
    },

    /**
     * @method 弹出进货dialog
     */
    showImportFormDialog() {
      this.importFormDialogVisible = true
    },

    /**
     * @method 关闭进货dialog
     */
    closeImportFormDialog() {
      this.importFormDialogVisible = false
    },

    /**
     * @method 提交进货dialog内的表单信息
     */
    submitImportFormDialog() {
      const goodsName = this.importForm.goodsName
      const goodsType = this.importForm.goodsType
      const goodsCost = parseInt(this.importForm.goodsCost)
      const goodsPrice = parseInt(this.importForm.goodsPrice)
      const importGoodsSum = parseInt(this.importForm.importGoodsSum)
      const productionDate = this.importForm.productionDate
      const duration = parseInt(this.importForm.duration) * 30
      const data = { goodsName, goodsType, goodsCost, goodsPrice, importGoodsSum, productionDate, duration }
      api.importGoods(data).then(res => {
        const { data } = res
        for (const key in this.importForm) {
          this.importForm[key] = ''
        }
        this.closeImportFormDialog()
        this.reload()
        this.$message.success('进货成功')
      })
    },

    /**
     * @method 弹出添加新商品dialog
     */
    showAddFormDialog() {
      this.addFormDialogVisible = true
    },

    /**
     * @method 关闭添加新商品dialog
     */
    closeAddFormDialog() {
      this.addFormDialogVisible = false
    },

    /**
     * @method 提交添加新商品dialog内的表单信息
     */
    submitAddFormDialog() {
      const name = this.addForm.goodsName
      const type = this.addForm.goodsType
      const data = { name, type }
      api.addGoods(data).then(res => {
        const { data } = res
        for (const key in this.addForm) {
          this.addForm[key] = ''
        }
        this.closeAddFormDialog()
        this.reload()
        this.$message.success('添加成功')
      })
    },

    /**
     * @method 弹出销售商品dialog
     */
    showSellFormDialog(row) {
      // 在表单显示选中的商品名称
      this.sellForm.goodsName = row.goodsName
      // 将选中的 goodsId 保存至 sessionStorage
      const selectedGoodsId = row.goodsId
      sessionStorage.setItem("selectedGoodsId", selectedGoodsId)
      this.sellFormDialogVisible = true
    },

    /**
     * @method 关闭销售商品dialog
     */
    closeSellFormDialog() {
      // 将选中的 goodsId 从 sessionStorage 里删除
      sessionStorage.removeItem("selectedGoodsId")
      this.sellFormDialogVisible = false
    },

    /**
     * @method 提交销售商品dialog内的表单信息
     */
    // TODO 销售价和销售数量为负时
    submitSellFormDialog() {
      const goodsId = sessionStorage.getItem("selectedGoodsId")
      const goodsNum = this.sellForm.goodsNum
      const data = { goodsId, goodsNum }
      api.sellGoods(data).then(res => {
        const { data } = res
        for (const key in this.sellForm) {
          this.sellForm[key] = ''
        }
        this.closeSellFormDialog()
        this.reload()
        this.$message.success('销售成功')
      })
    },

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

    // /**
    //  * @method 删除新闻
    //  * @param newsId
    //  */
    // handleNewsRemove(newsId) {
    //   console.log(newsId)
    //   this.$confirm('此操作将删除该新闻, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     const params = { newsId }
    //     oldApi.delNews(params).then(res => {
    //       const { data } = res
    //       this.reload()
    //       this.$message.success('删除成功')
    //     })
    //   }).catch(() => {
    //     this.$message.info('取消删除')
    //   })
    // },

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
.operate-container .btn-container {
  float: right;
}

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
</style>
