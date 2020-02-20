<template>
    <div id="category">
      <nav-bar class="categoryNav"><div slot="center">商品分类</div></nav-bar>
      <div class="content">
        <tab-menu :categories='categories'
                  @selectItem="selectItem"/>
        <scroll id="tab-content">
          <div>
            <tab-content-category :subcategories='showSubCategory'/>
            <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"/>
            <tab-content-detail :category-detail='showDetailCategory'/>
          </div>
        </scroll>
        
      </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childComp/TabMenu'
import TabContentCategory from './childComp/TabContentCategory'
import TabControl from 'components/content/tabControl/TabControl'
import TabContentDetail from './childComp/TabContentDetail'
import Scroll from 'components/common/scroll/Scroll'


import {getCategory, getSubCategory, getCategoryDetail} from 'network/category'

   export default {
   name:'Category',
   components: {
     NavBar,
     TabMenu,
     TabContentCategory,
     TabControl,
     TabContentDetail,
     Scroll,
   },
   data() {
     return {
       categories: [],
       categoryData: {},
       currentIndex: -1,
       currentType: 'pop'
    }
   },
   created () {
     this._getCategory()
   },
   computed: {
     showSubCategory() {
       if(this.currentIndex == -1) return {}
       return this.categoryData[this.currentIndex].subcategories
     },

     showDetailCategory() {
       if(this.currentIndex == -1) return {}
       return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
     }
   },
   methods: {
     tabClick(index) {
       switch(index){
         case 0:
           this.currentType = 'pop'
           break
         case 1:
           this.currentType = 'new'
           break
         case 2:
           this.currentType = 'sell'
           break
       }
       console.log(this.currentType)
     },
     _getCategory() {
       getCategory().then((res) => {
         this.categories = res.data.category.list
         //console.log(res)
         for(let i = 0; i < this.categories.length; i++) {
           this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
           }
         }
        }
        this._getSubCategories(0)
       })
     },

     _getSubCategories(index) {
       this.currentIndex = index
       const maitKey = this.categories[index].maitKey
       getSubCategory(maitKey).then((res) => {
         //console.log(res)
         this.categoryData[index].subcategories = res.data
         this.categoryData = {...this.categoryData}
         this._getCategoryDetail('pop')
         this._getCategoryDetail('sell')
         this._getCategoryDetail('new')
       })
     },

     _getCategoryDetail(type) {
       const miniWallkey = this.categories[this.currentIndex].miniWallkey
       getCategoryDetail(miniWallkey, type).then(res => {
          //console.log(res)
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
          //console.log(this.categoryData)
       })
     },

     selectItem(index) {
       this._getSubCategories(index)
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

#tab-content{
  flex: 1;
  height: 100%;
}
</style>