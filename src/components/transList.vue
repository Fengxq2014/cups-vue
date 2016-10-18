<template>
    <div id="list">
    <el-input placeholder="请输入内容" icon="search" v-model="queryString"></el-input>
    <el-button type="primary"  @click.native="editDialogVisible = true" :plain="true" icon="edit">查看</el-button>
    <template>
    <el-table
        :data="filteredData"
        selection-mode="single"
        style="width: 100%"
        border
        @selectionchange="handleSelectionChange"
        allow-no-selection>
        <el-table-column
        property="Cardin"
        width="200"
        label="转入卡">
        </el-table-column>
        <el-table-column
        property="Cardout"
        width="200"
        label="转出卡">
        </el-table-column>
        <el-table-column
        property="Amt"
        width="100"
        label="交易金额">
        </el-table-column>
        <el-table-column
        property="Fee"
        width="80"
        label="手续费">
        </el-table-column>
        <el-table-column
        property="Cardinbeforebalance"
        width="160"
        label="转入卡交易前金额">
        </el-table-column>
        <el-table-column
        property="Cardinafterbalance"
        width="160"
        label="转入卡交易后金额">
        </el-table-column>
        <el-table-column
        property="Cardoutbeforebalance"
        width="160"
        label="转出卡交易前金额">
        </el-table-column>
        <el-table-column
        property="Cardoutafterbalance"
        width="160"
        label="转出卡交易后金额">
        </el-table-column>
        <el-table-column
        property="Error"
        width="120"
        label="错误信息">
        </el-table-column>
        <el-table-column
        property="Jiontime"
        label="记录时间">
        </el-table-column>
    </el-table>
    </template>
    <el-dialog title="查看" v-model="editDialogVisible" size="small">
        <el-form :model="editTrans" label-position="top">
            <el-form-item label="转入卡">
                <el-input v-model="editTrans.Cardin" readonly auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="转出卡">
                <el-input v-model="editTrans.Cardout" readonly auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="交易金额">
                <el-input v-model="editTrans.Amt" readonly auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手续费">
                <el-input readonly v-model="editTrans.Fee" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="转入卡交易前金额">
                <el-input readonly v-model="editTrans.Cardinbeforebalance" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="转入卡交易后金额">
                <el-input readonly v-model="editTrans.Cardinafterbalance" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="转出卡交易前金额">
                <el-input readonly v-model="editTrans.Cardoutbeforebalance" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="转出卡交易后金额">
                <el-input readonly v-model="editTrans.Cardoutafterbalance" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="错误信息">
                <el-input readonly v-model="editTrans.Error" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="记录时间">
                <el-input readonly v-model="editTrans.Jiontime" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click.native="editDialogVisible = false">关闭</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<style>
	@import "/static/css/pure-min.css";
    #list {
        padding: 20px;
        bottom: 0;
        top: 0px;
        left: 0;
        right: 0;
        overflow-x: auto;
        margin-left: 150px;
        background-color: #ffffff;
    }
    .pure-table {
        width: 100%;
        table-layout: fixed;
        margin-top: 10px
    }
    .pure-table td {
        text-overflow: ellipsis;
        overflow: hidden;
        min-width: 100px;
    }
    .el-input {
        float: left;
        margin-right: 30px
    }
</style>
<script>
    import { mapGetters } from 'vuex'
    import Lang from 'lodash/fp/lang'
    export default({
      data () {
        return {
          queryString: '',
          editDialogVisible: false,
          editTrans: {}
        }
      },
      computed: {
        ...mapGetters({
          cardList: 'getTransList',
          ajaxState: 'getAjaxState'
        }),
        filteredData: function () {
          var filterKey = this.queryString && this.queryString.toLowerCase()
          var data = this.cardList
          if (filterKey) {
            data = data.filter(function (row) {
              return Object.keys(row).some(function (key) {
                return String(row[key]).toLowerCase().indexOf(filterKey) > -1
              })
            })
          }
          return data
        }
      },
      methods: {
        handleSelectionChange (value) {
          this.editTrans = value
          if (value === null) {
            this.editTrans = {}
          }
        },
        omitBy: function (ob) {
          var result = {}
          for (let x in ob) {
            if (!Lang.isNull(ob[x]) && ob[x] !== '') {
              result[x] = ob[x]
              if (x === 'AccPwd') {
                result[x] = ~~ob[x]
              }
              if (x === 'Balance') {
                result[x] = 1 * ob[x]
              }
            }
          }
          return result
        },
        obClean: function (ob) {
          for (let x in ob) {
            ob[x] = null
          }
        },
        showNotify: function () {
          this.$notify({title: '成功', message: '', type: this.ajaxState})
        },
        showInfo: function (msg) {
          this.$notify({title: '消息', message: msg, type: 'info'})
        },
        showError: function (e) {
          this.$notify({title: '失败', message: e, type: 'error'})
        }
      },
      created () {
        this.$store.dispatch('fetchTransList')
        this.$store.dispatch('changeMenuState', 2)
      }
    })
</script>
