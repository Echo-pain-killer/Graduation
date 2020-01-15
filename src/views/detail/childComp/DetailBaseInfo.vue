<template>
<!-- vue渲染机制中：
异步数据先显示初始数据，再显示带数据的数据
所以上来加载services时候还是一个空对象,当渲染完成后，才加载异步数据
所以在渲染时，出现的三层表达式在services中数组还不存在,length自然也不存在
再在这个对象中取其他值自然会报错
但是渲染完成后，services中的值加载好了，自然可以取到，这也就解释了为什么界面正常显示，但开发者工具会报错的原因。
解决方案： 在上面一个div中添加v-if判断条件，如果goods中的length不为0，则证明数据已经加载，再执行下列语句
 -->
  <div class="Base-Info" v-if="Object.keys(goods).length !== 0">
      <div class="Info-title">{{goods.title}}</div>

      <div class="Info-price">
          <span class="goods-price">{{goods.price}}</span>
          <span class="goods-oldprice">{{goods.oldprice}}</span>
          <span class="goods-discount" v-if="goods.discountDesc">{{goods.discountDesc}}</span>
      </div>

      <div class="Info-other">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>

      <div class="Info-service">
          <span v-for="index in goods.services.length-1" :key="index">
              <img :src="goods.services[index-1].icon">
             <span>{{goods.services[index-1].name}}</span>
          </span>
      </div>
  </div>
</template>

<script>
   export default {
   name:'detailBaseInfo',
   props: {
       goods: {
           type: Object,
           default(){
              return {}
       }
       }
   }
}
</script>

<style scoped>
.Info-title{
    text-align: center;
    font-size: 16px;
    padding: 10px 0;
    color: #222;
}

.Info-price{
    margin-bottom: 20px;
}

.goods-price{
    font-size: 24px;
    color: var(--color-high-text)
}

.goods-oldprice{
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
    color: #999

}

.goods-discount{
    font-size: 12px;
    color: #fff;
    background-color: var(--color-high-text);
    padding: 2px 5px;
    border-radius: 8px;
    margin-left: 10px;

    position: relative;
    top: -8px;
}

.Info-other{
    font-size: 13px;
    display: flex;
    border-bottom: 1px solid rgba(100,100,100,.2);
    justify-content: space-between;
}

.Info-other span{
    color: #999;
    margin-bottom: 8px;
}

.Info-service{
    margin: 10px 0;
    font-size: 13px;
    display: flex;
    justify-content: space-between;

    border-bottom:  5px solid rgba(100,100,100,.1);
    padding-bottom: 10px;
}

.Info-service span{
    margin: 10px 0;
    
}

.Info-service img {
    height: 10px;
    width: 10px;
}

</style>