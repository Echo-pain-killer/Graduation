<template>
  <div id="home">
    <nav-bar id="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners='banners'/>
    <recommend-view :recommends='recommends'/>
    <FeatureView/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComp/HomeSwiper'
import RecommendView from './childComp/RecommendView'
import FeatureView from './childComp/FeatureView'

import {getHomeMultidata} from '../../network/home'

   export default {
   name:'home',
   components: {
     NavBar,
     RecommendView,
     FeatureView,
     HomeSwiper
   },
   data() {
     return {
       banners: [],
       recommends: []
     }
   },
   created() {
     getHomeMultidata().then(res => {
       this.banners = res.data.banner.list
       this.recommends = res.data.recommend.list
     })
   }
}
</script>

<style scoped>
#home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>