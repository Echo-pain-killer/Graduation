<template>
  <div id="detail">
     <detail-nav-bar 
     class="detail-nav-bar" 
     @titleClick="titleClick" 
     ref="detailNav"/>
     <scroll ref="scroll" class="content" @scroll="contentScroll" :probe-type="3">
        <detail-swiper :swiper-img="swiperImg"/>
        <base-info :goods="goods"/>
        <DetailShopInfo :shop="shop"/>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
        <detail-params-info :paramInfo="paramInfo" ref="params"/>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
        <GoodsList ref="recommend" :goods="recommendList"/>
     </scroll>
     <detail-bottom-bar @addCart="addToCart"/>
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
import DetailBottomBar from './childComp/detailBottomBar'

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
       GoodsList,
       DetailBottomBar
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
           recommendList: [],
           themeTopY: [],
           getThemeTop: null,
           currentIndex: 0
       }
   },
   methods: {
       imageLoad() {
           this.$refs.scroll.refresh()
           this.getThemeTop()
       },
       titleClick(index) {
           this.$refs.scroll.scrollTo(0 , -this.themeTopY[index]+44 , 500)
       },
       contentScroll(position) {
           const positionY = -position.y
            /**
             * 让positionY与每个themeY[0, 5092, 5768, 6057]作判断
             * 如果  positionY  大于 0 小于 5092，则index = 0
             * 如果  positionY  大于 5092 小于 5768，则index = 1
             * 如果  positionY  大于 5768 小于 6057，则index = 2
             * 
             * 如果  positionY  大于 6057，则index = 3
             */
           for(let i=0 ; i < this.themeTopY.length - 1 ; i++){
               const length = this.themeTopY.length
               if(this.currentIndex !==i && (i < length - 1 && positionY < this.themeTopY[i+1] && positionY >= this.themeTopY[i])){
            //    if(this.currentIndex !==i && ((i < length - 1 && positionY < this.themeTopY[i+1] && positionY >= this.themeTopY[i])
            //     || (i === length-1 && positionY >= this.themeTopY[i]))){
                    this.currentIndex = i
                    this.$refs.detailNav.currentIndex = this.currentIndex
                }
           }
       },
       addToCart() {
           const product = {}
           product.iid = this.iid
           product.img = this.swiperImg[0]
           product.title = this.goods.title
           product.desc = this.goods.desc
           product.price = this.goods.realPrice

           this.$store.dispatch('addCart', product)
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
            console.log(res)
            this.recommendList = res.data.list
        })

        this.getThemeTop = debounce(() => {
            //将导航栏每个模块的高度保存到themeTopY
                this.themeTopY = []
                this.themeTopY.push(0)
                this.themeTopY.push(this.$refs.params.$el.offsetTop)
                this.themeTopY.push(this.$refs.comment.$el.offsetTop)
                this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
                //完成滚动内容显示对应标题时为了简化IF判断而添加JS中能编译的最大值
                this.themeTopY.push(Number.MAX_VALUE)
                //console.log(this.themeTopY)
        })
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