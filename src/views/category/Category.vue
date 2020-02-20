<template>
    <div id="category">
      <nav-bar class="categoryNav"><div slot="center">商品分类</div></nav-bar>
      <div class="content">
        <tab-menu :categories='categories'/>
      </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childComp/TabMenu'
import Scroll from 'components/common/scroll/Scroll'

import {getCategory} from 'network/category'

   export default {
   name:'Category',
   components: {
     NavBar,
     TabMenu,
     Scroll
   },
   data() {
     return {
       categories: []
    }
   },
   created () {
     this._getCategory()
   },
   methods: {
     _getCategory() {
       getCategory().then((res) => {
         this.categories = res.data.category.list
         console.log(res)
       })
     }
    },
   }
</script>

<style scoped>
#category{
  height: 100vh;
}
.categoryNav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}

.content{
  position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
    overflow: hidden;
}
</style>