<template>
  <div class="content">
      <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
      </nav-bar>
      <form class="box" action="http://localhost:3000/register" method="POST">
        <h1>用户注册</h1>
        <input type="email" name="email" placeholder="邮箱">
        <input type="text" name="nick_name" placeholder="昵称">
        <input type="password" name="password" placeholder="密码">
        <input type="password" name="re_password" placeholder="请再次输入密码"/>
        <input type="submit" name="" value="注册">
      </form>
      <div class="bottom"></div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
   export default {
   name:'Register',
   components: {
     NavBar
   },
   methods: {
      backClick() {
           this.$router.back()
       }
   }
}
</script>

<style scoped>
body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
        }
        .content {
           height: 100vh;
           background: var(--color-tint);
        }

        .box {
            width: 300px;
            padding: 30px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -45%);
            background: rgb(250, 187, 197);
            text-align: center;
        }

        .box h1 {
            color: #fff;
            /* text-transform: uppercase; */
            font-weight: 500;
        }

        .box input[type="text"],
        .box input[type="email"],
        .box input[type="password"] {
            border: 0;
            background: none;
            display: block;
            margin: 20px auto;
            text-align: center;
            border: 2px solid #3c98d6;
            padding: 14px 10px;
            width: 200px;
            outline: none;
            color: white;
            border-radius: 24px;
            /* transition: 0.25s; */
        }

        .box input[type="text"]:focus,
        .box input[type="email"]:focus,
        .box input[type="password"]:focus {
            /* width: 280px; */
            border-color: #2ecc71;
        }

        .box input[type="submit"] {
            border: 0;
            background: none;
            display: block;
            margin: 20px auto;
            text-align: center;
            border: 2px solid #39d67b;
            padding: 14px 40px;
            outline: none;
            color: white;
            border-radius: 24px;
            transition: 0.25s;
        }

        .box input[type="submit"]:hover {
            background: #2ecc71;
        }

        .bottom{
          border-top: 58px solid var(--color-tint);
          width: 100vw;
          position: fixed;
          bottom: 0;
          left: 0;
          height: 0;
          background-color: var(--color-tint);
          z-index: 9;
        }
        .back {
            padding-top: 6px;
            margin-left: -10px;
        }
</style>