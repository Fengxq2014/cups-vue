<template>
    <div id="list">
    <el-input placeholder="请输入内容" icon="search" v-model="queryString"></el-input>
    <el-button type="primary"  @click.native="newDialogVisible = true" :plain="true" icon="plus">增加</el-button>
    <el-button type="primary"  @click.native="editDialogVisible = true" :plain="true" icon="edit">修改</el-button>
    <el-button type="primary"  @click.native="deleteUser" :plain="true" icon="delete">删除</el-button>
    <template>
    <el-table
        :data="filteredData"
        selection-mode="single"
        style="width: 100%"
        border
        @selectionchange="handleSelectionChange"
        allow-no-selection>
        <el-table-column
        property="Card"
        label="卡号"
        width="200">
        </el-table-column>
        <el-table-column
        property="Address"
        label="地址">
        </el-table-column>
        <el-table-column
        property="Name"
        label="姓名">
        </el-table-column>
        <el-table-column
        property="Phone"
        label="电话">
        </el-table-column>
    </el-table>
    </template>
    <el-dialog title="新建用户" v-model="newDialogVisible" size="small">
        <el-form :model="newUser" label-position="top">
            <el-form-item label="卡号">
                <el-input v-model="newUser.Card" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="newUser.Name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="newUser.Address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="newUser.Phone" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="addUser">确 定</el-button>
            <el-button @click.native="newDialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
    <el-dialog title="修改" v-model="editDialogVisible" size="small">
        <el-form :model="editUser" label-position="top">
            <el-form-item label="卡号">
                <el-input v-model="editUser.Card" readonly auto-complete="off"></el-input>
                <el-input v-model="updateUserData.Card" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="editUser.Name" readonly auto-complete="off"></el-input>
                <el-input v-model="updateUserData.Name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="editUser.Address" readonly auto-complete="off"></el-input>
                <el-input v-model="updateUserData.Address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input readonly v-model="editUser.Phone" auto-complete="off"></el-input>
                <el-input v-model="updateUserData.Phone" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="updateUser">确 定</el-button>
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
          editUser: {},
          updateUserData: {},
          newUser: {}
        }
      },
      computed: {
        ...mapGetters({
          userList: 'getUserList',
          ajaxState: 'getAjaxState'
        }),
        filteredData: function () {
          var filterKey = this.queryString && this.queryString.toLowerCase()
          var data = this.userList
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
          this.editUser = value
        },
        handleReset () {
        },
        addUser () {
          this.postUser(JSON.stringify(this.newUser))
            .then(() => {
              this.showNotify()
              this.newDialogVisible = false
              this.obClean(this.newUser)
              this.$store.dispatch('fetchUserList')
            }, (ret) => {
              this.showError(ret)
            })
            .catch((e) => {
              this.showError(e)
              console.log(e)
            })
        },
        deleteUser () {
          this.$confirm('此操作将删除' + this.editUser.AccNo + '，是否继续?', '提示', {type: 'warning'})
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
        updateUser: function () {
          this.updateCardData = this.omitBy(this.updateCardData)
          let data = _.assign(this.editUser, this.updateCardData)
          console.log(data)
          this.putUser(JSON.stringify(data))
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
          'putUser',
          'postUser'
        ])
      },
      created () {
        this.$store.dispatch('fetchUserList')
      },
      components: {
      }
    })
</script>
