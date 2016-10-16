<template>
    <div id="list">
    <el-input placeholder="请输入内容" icon="search" v-model="queryString"></el-input>
    <el-button type="primary"  @click.native="newDialogVisible = true" :plain="true" icon="plus">增加</el-button>
    <el-button type="primary"  @click.native="dialogVisible = true" :plain="true" icon="document">查看</el-button>
    <el-button type="primary"  @click.native="dialogVisible = true" :plain="true" icon="edit">修改</el-button>
    <el-button type="primary"  @click.native="dialogVisible = true" :plain="true" icon="delete">删除</el-button>
	<table class="pure-table">
		<thead>
			<tr>
				<th v-for="(value, key) in cardList[0]">{{key}}</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(card, index) in filteredData" :class="{'pure-table-odd':index%2==1}">
				<td @dblclick="editable($event,'AccNo',card)">{{card.AccNo}}</td>
				<td @dblclick="editable($event,'AccPwd',card)">{{card.AccPwd}}</td>
				<td @dblclick="editable($event,'Track2',card)">{{card.Track2}}</td>
				<td @dblclick="editable($event,'Track3',card)">{{card.Track3}}</td>
				<td @dblclick="editable($event,'EmvData',card)">{{card.EmvData}}</td>
				<td @dblclick="editable($event,'Balance',card)">{{card.Balance}}</td>
				<td @dblclick="editable($event,'OpenCardBankId',card)">{{card.OpenCardBankId}}</td>
				<td @dblclick="editable($event,'OpenCardProvId',card)">{{card.OpenCardProvId}}</td>
			</tr>
		</tbody>
	</table>
    <template>
    <el-table
        :data="filteredData"
        selection-mode="single"
        style="width: 100%"
        border
        @selectionchange="handleSelectionChange"
        allow-no-selection>
        <el-table-column
        property="AccNo"
        label="卡号"
        width="120">
        </el-table-column>
        <el-table-column
        property="AccPwd"
        label="密码">
        </el-table-column>
        <el-table-column
        property="Balance"
        label="金额">
        </el-table-column>
        <el-table-column
        property="Track2"
        label="二磁">
        </el-table-column>
        <el-table-column
        property="Track3"
        label="三磁">
        </el-table-column>
        <el-table-column
        property="EmvData"
        label="IC数据">
        </el-table-column>
        <el-table-column
        property="OpenCardBankId"
        label="开卡行号">
        </el-table-column>
        <el-table-column
        property="OpenCardProvId"
        label="开卡省号">
        </el-table-column>
    </el-table>
    </template>
    <el-dialog title="newDialogVisible" v-model="newDialogVisible" size="small">
        <el-form :model="newCard" label-position="top">
            <el-form-item label="卡号">
                <el-input v-model="newCard.AccNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密  码">
                <el-input v-model="newCard.AccPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="金额">
                <el-input v-model="newCard.Balance" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="IC数据">
                <el-input type="textarea" v-model="newCard.EmvData" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="开卡行号">
                <el-input v-model="newCard.OpenCardBankId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="开卡省号">
                <el-input v-model="newCard.OpenCardProvId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Track2">
                <el-input type="textarea" v-model="newCard.Track2" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Track3">
                <el-input type="textarea" v-model="newCard.Track3" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="handleSubmit">确 定</el-button>
            <el-button @click.native="newDialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
    <el-dialog title="查看卡" v-model="dialogVisible" size="small">
        <el-form :model="newCard" label-position="top">
            <el-form-item label="卡号">
                <el-input v-model="newCard.AccNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密  码">
                <el-input v-model="newCard.AccPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="金额">
                <el-input v-model="newCard.Balance" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="IC数据">
                <el-input type="textarea" v-model="newCard.EmvData" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="开卡行号">
                <el-input v-model="newCard.OpenCardBankId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="开卡省号">
                <el-input v-model="newCard.OpenCardProvId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Track2">
                <el-input type="textarea" v-model="newCard.Track2" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Track3">
                <el-input type="textarea" v-model="newCard.Track3" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="handleSubmit">确 定</el-button>
            <el-button @click.native="dialogVisible = false">取 消</el-button>
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
    import { mapGetters, mapActions } from 'vuex'
    export default({
      data () {
        return {
          queryString: '',
          newDialogVisible: false,
          editCard: {},
          newCard: {
            AccNo: '',
            AccPwd: null,
            Balance: null,
            EmvData: '',
            OpenCardBankId: '',
            OpenCardProvId: '',
            Track2: '',
            Track3: ''
          },
          rules: {
            name: [
              {required: true, message: '请输入内容', trigger: 'blur'}
            ]
          }
        }
      },
      computed: {
        ...mapGetters({
          cardList: 'getCardList',
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
          this.editCard = value
        },
        handleReset () {
        },
        handleSubmit (ev) {
        },
        editable: function (e, field, item) {
          var that = this
          that.$editable(e, function (value) {
            that.putCard(JSON.stringify(item)).then(console.log(12))
          })
        },
        showNotify: function () {
          this.$notify({title: '成功', message: '这是一条成功的提示消息', type: this.ajaxState})
        },
        ...mapActions([
          'putCard',
          'changeListQueryString'
        ])
      },
      created () {
        this.$store.dispatch('fetchCardList')
      },
      components: {
      }
    })
</script>
