<template>
  <div id="home">
      <nav-bar id="home-nav"><div slot="center">购物街</div></nav-bar>
       <tab-control :titles='titles'
        @tabClick="tabClick"
        ref="tabControl"
        class="tab-control"
        v-show="showTabControl"/>
    <scroll 
      class="content"  
      ref="scroll" 
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="LoadMore">
      <home-swiper :banners='banners' @swiperImgLoad='swiperImgLoad'/>
      <recommend-view :recommends='recommends'/>
      <FeatureView/>
      <tab-control :titles='titles'
        @tabClick="tabClick"
        ref="tabControl"/>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
      <back-top @click.native="backTopClick" v-show="showBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComp/HomeSwiper'
import RecommendView from './childComp/RecommendView'
import FeatureView from './childComp/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import {getHomeMultidata,getGoodsData} from 'network/home'
import {debounce} from 'common/utile'

   export default {
   name:'home',
   components: {
     NavBar,
     RecommendView,
     FeatureView,
     HomeSwiper,
     TabControl,
     GoodsList,
     Scroll,
     BackTop
   },
   data() {
     return {
       banners: [],
       recommends: [],
       titles: ['流行' , '新款' , '精选'],
       goods: {
         'pop': {page: 0 , list: []},
         'new': {page: 0 , list: []},
         'sell': {page: 0 , list: []},
       },
       currentType: 'pop',
       showBackTop: false,
       tabOffsetTop:0,
       showTabControl:false
     }
   },
   created() {
     this.getHomeMultidata()
     this.getGoodsData('pop')
     this.getGoodsData('new')
     this.getGoodsData('sell')
   },
   mounted() {
     const refresh = debounce(this.$refs.scroll.refresh,500)
     this.$bus.$on('itemImgLoad', () => {
       refresh()
     })
   },
   methods: {
     getHomeMultidata () {
       getHomeMultidata().then(res => {
       this.banners = res.data.banner.list
       this.recommends = res.data.recommend.list
      })
     },
     getGoodsData (type) {
       const page = this.goods[type].page + 1
       getGoodsData(type,page).then(res => {
         this.goods[type].list.push(...res.data.list)
         this.goods[page] += 1
         this.$refs.scroll.finishPullUp()
       })
     },

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
     },

     backTopClick() {
       this.$refs.scroll.scrollTo(0, 0, 500)
     },

     contentScroll(position) {
       this.showBackTop = position.y <= -1000

       this.showTabControl = position.y <= -this.tabOffsetTop
     },

     LoadMore() {
       this.getGoodsData(this.currentType)
     },

     swiperImgLoad() {
       this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
     }
   },
}
</script>

<style scoped>
#home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: relative;
  z-index: 9; */
}

#home {
  height:  100vh;
  position: relative;
}

.content{
  position: absolute;
  top: 44px;
  bottom:  49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>