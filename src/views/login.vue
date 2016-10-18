<template>
	<div class="container">
		<form  @submit.prevent class="form-signin" id="login-form">
			<div class="form-signin-heading text-center">
				<h1 class="sign-title">登录cups管理平台</h1>
				<img src="/static/img/logo.png" alt="cups" style="width:120px;" /> </div>
			<div class="login-wrap">
            <input type="text" v-model="account" class="form-control" name="username" placeholder="请填写用户名" autofocus>
            <input type="password" v-model="password1" class="form-control" name="password" placeholder="请填写密码">
            <button class="btn btn-lg btn-login btn-block" @click="sub()"> 登录</button>
			</div>
		</form>
	</div>
</template>

<script>
    import md5 from 'md5'
    import cookie from 'tiny-cookie'
    export default({
      data () {
        return {
          account: '',
          password1: ''
        }
      },
      computed: {
        password: function () {
          return md5(this.password1)
        }
      },
      methods: {
        sub: function () {
          this.$store.dispatch('login', {account: this.account, password: this.password})
            .then(() => {
              cookie.set('login', this.password, { expires: '20m' })
              window.location = '/#/'
            }, (err) => {
              this.$notify({title: '失败', message: '登录失败', type: 'error'})
              console.log('失败' + err)
            })
            .catch((err) => {
              console.log(err)
              this.$notify({title: '失败', message: '登录失败', type: 'error'})
            })
        }
      }
    })
</script>

<style>
    body {
        background: #424f63;
        font-family: "Telugu MN","Microsoft YaHei", "微软雅黑","Lantinghei SC", Helvetica, Tahoma, Arial, sans-serif,SimSun,"Hiragino Sans GB", "Hiragino Sans GB";
        color: #7a7676;
        font-size: 14px;
        overflow-x: hidden;
        line-height: 20px;
    }
    .app-color{
        background-color: #424f63 !important;
    }
    .container{
        width: 750px;
        margin-right: auto;
        margin-left: auto;
        padding-left: 15px;
        padding-right: 15px;
    }
    input{
        font-family: 'Open Sans', sans-serif;
        color: #767676;
        width:100%
    }
    .login-body {
        /*background: #65cea7 url("../img/login-bg.jpg") no-repeat fixed;*/
        background-size: cover;
        width: 100%;
        height: 100%;
    }

    .form-signin {
        max-width: 330px;
        margin: 100px auto;
        background: #fff;
        border-radius: 5px;
        -webkit-border-radius: 5px;
    }

    .form-signin .form-signin-heading {
        margin: 0;
        padding: 25px 15px 0;
        text-align: center;
        color: #fff;
        position: relative;
    }

    .sign-title {
        font-family: Telugu MN;
        font-size: 24px;
        color: #fff;
        position: absolute;
        top: -60px;
        left: 0;
        text-align: center;
        width: 100%;
        text-transform: uppercase;
    }

    .form-signin .checkbox {
        margin-bottom: 14px;
        font-size: 13px;
    }

    .form-signin .checkbox {
        font-weight: normal;
        color: #fff;
        font-weight: normal;
        font-family: 'Open Sans', sans-serif;
        position: absolute;
        bottom: -50px;
        width: 100%;
        left: 0;
    }

    .form-signin .checkbox a, .form-signin .checkbox a:hover {
        color: #fff;
    }

    .form-signin .form-control {
        position: relative;
        font-size: 16px;
        height: auto;
        padding: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="text"], .form-signin input[type="password"] {
        margin-bottom: 15px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        border: 1px solid #eaeaec;
        background: #eaeaec;
        box-shadow: none;
        font-size: 12px;
    }

    .form-signin .btn-login {
        background: #688ac2;
        color: #fff;
        text-transform: uppercase;
        font-weight: normal;
        font-family: 'Open Sans', sans-serif;
        margin: 20px 0 5px;
        padding: 5px;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        transition: all 0.3s;
        font-size: 30px;
    }

    .form-signin .btn-login:hover {
        background: #6bc5a4;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        transition: all 0.3s;
    }

    .form-signin p {
        text-align: left;
        color: #b6b6b6;
        font-size: 16px;
        font-weight: normal;
    }

    .form-signin a, .form-signin a:hover {
        color: #6bc5a4;
    }

    .form-signin a:hover {
        text-decoration: underline;
    }

    .login-wrap {
        padding: 20px;
        position: relative;
    }

    .registration {
        color: #c7c7c7;
        text-align: center;
        margin-top: 15px;
    }
    .btn-block {
        display: block;
        width: 100%;
        padding-left: 0;
        padding-right: 0;
        line-height: 1.33;
        border-radius: 6px;
    }
</style>