<template>
  <div>
      <swiper class="detail-swiper">
          <swiper-item v-for="item in swiperImg" :key="item.iid">
              <img :src="item" alt="">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'
   export default {
   name:'DetailSwiper',
   components: {
       Swiper,
       SwiperItem
   },
   props: {
       swiperImg: {
           type: Array,
           default: []
       }
   }
}
</script>

<style scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
</style>