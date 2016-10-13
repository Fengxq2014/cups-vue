<template>
	<div id="menu">
		<div class="pure-menu pure-menu-open">
			<a class="pure-menu-heading" href="#">CUPS接口</a>

			<ul>
				<li v-for="(item,index) in jsonData" @click="menuClick(index)" :class="{'menu-item-divided pure-menu-selected':menuSelected==index}"><a href="#">{{item.description}}</a></li>
				<!--<li @click="menuClick(2)" :class="{'menu-item-divided pure-menu-selected':menuSelected==2}"><a href="#">user类</a></li>

                <li @click="menuClick(3)" :class="{'menu-item-divided pure-menu-selected':menuSelected==3}">
                    <a href="#">交易类</a>
                </li>

                <li @click="menuClick(4)" :class="{'menu-item-divided pure-menu-selected':menuSelected==4}"><a href="#">交易日志{{ menuSelected }}</a></li>{{jsonData}}-->
			</ul>
		</div>
	</div>
</template>

<style>
	@import "/static/css/pure-min.css";
	@import "/static/css/side-menu.css";
</style>

<script>
    import { mapGetters } from 'vuex'
    export default{
      computed: {
        ...mapGetters({
          menuSelected: 'getMenuSelected',
          jsonData: 'getJsonData'
        })
      },
      methods: {
        menuClick (selectedID) {
          this.$store.dispatch('changeMenuState', selectedID)
        }
      },
      created () {
        this.$store.dispatch('fetchJsonData')
      }
    }
</script>