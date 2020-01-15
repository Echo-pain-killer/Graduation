<template>
  <div id="detail">
     <detail-nav-bar class="detail-nav-bar"/>
     <scroll ref="scroll" class="content">
        <detail-swiper :swiper-img="swiperImg"/>
        <base-info :goods="goods"/>
        <DetailShopInfo :shop="shop"/>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
        <detail-params-info :paramInfo="paramInfo"/>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
        <GoodsList ref="recommend" :goods="recommendList"/>
     </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComp/DeatailNavBar'
import DetailSwiper from './childComp/DetailSwiper'
import BaseInfo from './childComp/DetailBaseInfo'
import DetailShopInfo from './childComp/detailShopInfo'
import DetailGoodsInfo from './childComp/detailGoodsInfo'
import DetailParamsInfo from './childComp/detailParamsInfo'
import DetailCommentInfo from './childComp/detailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail , Goods , Shop , GoodsParam , getRecommend} from 'network/detail'
import {debounce} from 'common/utile'
   export default {
   name:'Detail',
   components: {
       DetailNavBar,
       DetailSwiper,
       BaseInfo,
       DetailShopInfo,
       Scroll,
       DetailGoodsInfo,
       DetailParamsInfo,
       DetailCommentInfo,
       GoodsList
   },
   data() {
       return {
           iid: null,
           swiperImg: [],
           goods: {},
           shop: {},
           detailInfo: {},
           getThemeTop: null,
           paramInfo: {},
           commentInfo: {},
           recommendList: []
       }
   },
   methods: {
       imageLoad() {
           this.$refs.scroll.refresh()
        //    this.getThemeTop()
       }
   },
   created() {
       this.iid = this.$route.params.iid

       getDetail(this.iid).then(res => {
           console.log(res)
           const data = res.result
           //请求轮播图数据
           this.swiperImg = data.itemInfo.topImages
           //请求商品信息数据
            this.goods = new Goods(data.itemInfo , data.columns , data.shopInfo.services)
            //请求店铺信息
            this.shop = new Shop(data.shopInfo)
             //请求商品详情数据
            this.detailInfo = data.detailInfo
            //请求参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info , data.itemParams.rule)
            //请求评论数据
            if(data.rate.cRate !==0){
                this.commentInfo = data.rate.list[0]
            }
       })

        getRecommend().then(res => {
            this.recommendList = res.data.list
        })

        // this.getThemeTop = debounce(() => {
        //     //将导航栏每个模块的高度保存到themeTopY
        //         this.themeTopY = []
        //         this.themeTopY.push(0)
        //         this.themeTopY.push(this.$refs.params.$el.offsetTop)
        //         this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        //         this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        //         //完成滚动内容显示对应标题时为了简化IF判断而添加JS中能编译的最大值
        //         this.themeTopY.push(Number.MAX_VALUE)
        //         //console.log(this.themeTopY)
        // })
   }
}
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
}

.content {
    height: calc(100% - 44px)
}

.detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
}
</style>