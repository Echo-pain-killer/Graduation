<template>
  <div class="cart-list">
      <scroll class="content" ref="scroll">
           <cart-list-item 
           v-for="(item,index) in $store.state.cartList" 
           :key="index" 
           :product="item"/>
      </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
import Scroll from 'components/common/scroll/Scroll'
   export default {
   name:'CartList',
   components: {
       Scroll,
       CartListItem
   },
}
</script>

<style scoped>
.cart-list {
    height: calc(100vh - 44px - 49px);
}

.content {
    height: 100%;
    overflow: hidden;
}
</style>