<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{$store.state.cartList.length}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './ChildComp/CartList'
import CartBottomBar from './ChildComp/CartBottomBar'
   export default {
   name:'shopcart',
   components: {
     NavBar,
     CartList,
     CartBottomBar
   }
}
</script>

<style scoped>
.nav-bar {
  color: #fff;
  background-color: var(--color-tint);
}
</style>