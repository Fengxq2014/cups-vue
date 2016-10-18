<template>
	<div id="menu">
		<div class="pure-menu pure-menu-open">
			<a class="pure-menu-heading" href="#">CUPS接口</a>

			<ul>
				<li :class="{'menu-item-divided pure-menu-selected':menuSelected==0}"><router-link to="card">卡信息</router-link>
        </li>
        <li :class="{'menu-item-divided pure-menu-selected':menuSelected==1}"><router-link to="user">用户信息</router-link>
        </li>
        <li :class="{'menu-item-divided pure-menu-selected':menuSelected==2}"><router-link to="trans">交易日志</router-link>
        </li>
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
          menuSelected: 'getMenuSelected'
        })
      }
    }
</script>