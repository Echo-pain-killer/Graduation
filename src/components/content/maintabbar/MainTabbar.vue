<template>
  <tab-bar>
      <tab-bar-item class="logo">
          <img slot="item-icon" src="~assets/img/common/web-logo.png">
      </tab-bar-item>
      <tab-bar-item path='/home'>
          <img slot="item-icon" src="~assets/img/tabbar/home.svg">
          <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
          <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category'>
          <img slot="item-icon" src="~assets/img/tabbar/category.svg">
          <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
          <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path='/shopcart'>
          <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg">
          <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
          <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/profile'>
          <img slot="item-icon" src="~assets/img/tabbar/profile.svg">
          <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
          <div slot="item-text">我的</div>
      </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar"
import TabBarItem from "components/common/tabbar/TabBarItem"

   export default {
   name:'maintabbar',
   components: {
       TabBar,
       TabBarItem
   }
}
</script>

<style scoped>
.logo img{
    width: 49px;
    height: 25px;
    margin-top: 10px;
}
</style>