<template>
  <div class="recommend">
      <div class="recommend-item" v-for="item in recommends" :key="item.id">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div class="title">{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
   export default {
   name:'RecommendView',
   props: {
       recommends: {
           type: Array,
           default() {
               return []
           }
       }
   }
}
</script>

<style scoped>
.recommend{
    display: flex;
    text-align: center;
    margin-top: 10px;

    border-bottom: 10px solid #eee
}
.recommend-item {
    flex: 1;
    margin-bottom: 25px;
}
.recommend-item img {
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
}
.title {
    font-size: 14px;
}

</style>