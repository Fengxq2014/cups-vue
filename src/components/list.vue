<template>
    <div id="list">
    <el-input placeholder="请输入内容" icon="search" v-model="queryString"></el-input>
    <el-button type="primary"  @click.native="newDialogVisible = true" :plain="true" icon="plus">增加</el-button>
    <el-button type="primary"  @click.native="editDialogVisible = true" :plain="true" icon="edit">修改</el-button>
    <el-button type="primary"  @click.native="deleteCard" :plain="true" icon="delete">删除</el-button>
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
        width="200">
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
    <el-dialog title="新建卡" v-model="newDialogVisible" size="small">
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
            <el-button type="primary" @click.native="addCard">确 定</el-button>
            <el-button @click.native="newDialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
    <el-dialog title="修改" v-model="editDialogVisible" size="small">
        <el-form :model="editCard" label-position="top">
            <el-form-item label="卡号">
                <el-input v-model="editCard.AccNo" readonly auto-complete="off"></el-input>
                <el-input v-model="updateCardData.AccNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密  码">
                <el-input v-model="editCard.AccPwd" readonly auto-complete="off"></el-input>
                <el-input v-model="updateCardData.AccPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="金额">
                <el-input v-model="editCard.Balance" readonly auto-complete="off"></el-input>
                <el-input v-model="updateCardData.Balance" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="IC数据">
                <el-input type="textarea" readonly v-model="editCard.EmvData" auto-complete="off"></el-input>
                <el-input type="textarea" v-model="updateCardData.EmvData" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="开卡行号">
                <el-input v-model="editCard.OpenCardBankId" readonly auto-complete="off"></el-input>
                <el-input v-model="updateCardData.OpenCardBankId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="开卡省号">
                <el-input v-model="editCard.OpenCardProvId" readonly auto-complete="off"></el-input>
                <el-input v-model="updateCardData.OpenCardProvId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Track2">
                <el-input type="textarea" readonly v-model="editCard.Track2" auto-complete="off"></el-input>
                <el-input type="textarea" v-model="updateCardData.Track2" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Track3">
                <el-input type="textarea" readonly v-model="editCard.Track3" auto-complete="off"></el-input>
                <el-input type="textarea" v-model="updateCardData.Track3" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="updateCard">确 定</el-button>
            <el-button @click.native="editDialogVisible = false">取 消</el-button>
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
    import _ from 'lodash/fp/object'
    import Lang from 'lodash/fp/lang'
    export default({
      data () {
        return {
          queryString: '',
          newDialogVisible: false,
          editDialogVisible: false,
          editCard: {},
          updateCardData: {},
          newCard: {}
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
        addCard () {
          this.newCard = this.omitBy(this.newCard)
          this.postCard(JSON.stringify(this.newCard))
            .then(() => {
              this.showNotify()
              this.newDialogVisible = false
              this.obClean(this.newCard)
              this.$store.dispatch('fetchCardList')
            }, (ret) => {
              this.showError(ret)
            })
            .catch((e) => {
              this.showError(e)
              console.log(e)
            })
        },
        deleteCard () {
          this.$confirm('此操作将删除' + this.editCard.AccNo + '，是否继续?', '提示', {type: 'warning'})
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          })
          .catch(() => {
            this.showInfo('取消删除')
          })
        },
        updateCard: function () {
          this.updateCardData = this.omitBy(this.updateCardData)
          let data = _.assign(this.editCard, this.updateCardData)
          console.log(data)
          this.putCard(JSON.stringify(data))
          .then(() => {
            this.showNotify()
            this.editDialogVisible = false
            this.obClean(this.updateCardData)
            this.$store.dispatch('fetchCardList')
          }, (ret) => {
            this.showError(ret)
          })
          .catch((e) => {
            this.showError(e)
            console.log(e)
          })
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
        editable: function (e, field, item) {
          var that = this
          that.$editable(e, function (value) {
            that.putCard(JSON.stringify(item))
            .then(() => {
              that.showNotify()
            })
            .catch((e) => {
              this.showError(e)
            })
          })
        },
        showNotify: function () {
          this.$notify({title: '成功', message: '', type: this.ajaxState})
        },
        showInfo: function (msg) {
          this.$notify({title: '消息', message: msg, type: 'info'})
        },
        showError: function (e) {
          this.$notify({title: '失败', message: e, type: 'error'})
        },
        ...mapActions([
          'putCard',
          'postCard'
        ])
      },
      created () {
        this.$store.dispatch('fetchCardList')
        this.$store.dispatch('showMenu')
      },
      components: {
      }
    })
</script>
