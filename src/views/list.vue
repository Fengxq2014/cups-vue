<template>
    <div id="list">
	<table class="pure-table">
		<thead>
			<tr>
				<th v-for="(value, key) in cardList[0]">{{key}}</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(card, index) in cardList" :class="{'pure-table-odd':index%2==1}">
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
    <ui-alert type="success">
                Okilly dokilly, your account was updated successfully.
            </ui-alert>
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
        position: fixed;
        overflow-x: auto;
        margin-left: 150px;
        background-color: #ffffff;
    }
    .pure-table {
        width: 100%;
        table-layout: fixed;
    }
    .pure-table td {
        text-overflow: ellipsis;
        overflow: hidden;
        min-width: 100px;
    }
</style>
<script>
    import { mapGetters } from 'vuex'
    import {UiAlert} from 'keen-ui'
    export default({
      computed: mapGetters({
        cardList: 'getCardList'
      }),
      methods: {
        editable: function (e, field, item) {
          var that = this
          that.$editable(e, function (value) {
            that.$store.dispatch('putCard', JSON.stringify(item))
            console.log(value, field, JSON.stringify(item))
            that.$Notification.success('编辑成功', '', 500)
          })
        }
      },
      created () {
        console.log(UiAlert)
        this.$store.dispatch('fetchCardList')
      },
      components: {
        UiAlert
      }
    })
</script>
