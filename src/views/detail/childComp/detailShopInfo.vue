<template>
  <div class="shop-info">
      <div class="shop-top">
          <img :src="shop.logo" alt="">
          <span>{{shop.name}}</span>
      </div>

      <div class="shop-middle"> 
           <div class="shop-middle-item shop-middle-left">
               <div class="info-sells">
                   <div class="sells-count">
                       {{shop.sells}}
                   </div>
                   <div class="sells-text">
                       <span>总销量</span>
                   </div>
               </div>
               <div class="info-goods">
                   <div class="goods-count"> 
                       {{shop.goodsCount}}
                   </div>
                   <div class="goods-text">
                       全部宝贝
                   </div>
               </div>
           </div>

           <div class="shop-middle-item shop-middle-right">
               <table>
                   <tr v-for="(item , index) in shop.score" :key="index" >
                       <td>{{item.name}}</td>
                       <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
                       <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高' : '低'}}</span></td>
                   </tr>
               </table>
           </div> 
      </div>

      <div class="shop-bottom">
            <div class="enter-shop">进店逛逛</div>
      </div>
  </div>

  
</template>

<script>
   export default {
   name:'detailShopInfo',
   props: {
       shop: {
           type: Object,
           default(){
               return {}
           }
       },
   }
}
</script>

<style scoped>
.shop-top{
    line-height: 45px;
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
    padding-top: 18px;
    padding-bottom: 15px;
}

.shop-top span{
     margin-left: 10px;
     vertical-align: center;
}

.shop-top img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
}

.shop-middle{
    display: flex;
    margin-top: 15px;
}

.shop-middle-item {
    flex: 1;
}

.shop-middle-right .score {
    color: #5ea732;
  }

  .shop-middle-right .score-better{
    color: #f13e3a;
}

.shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
}

.goods-text , .sells-text {
    font-size: 12px;
    margin-top: 8px;
}

.goods-count , .sells-count {
    font-size: 18px;
    margin-top: 8px;
}

.shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  } 

.shop-middle-right {
    font-size: 13px;
}

.shop-middle-right table {
    width: 120px;
    margin-left: 25px;    
}

.shop-middle-right table td {
    padding: 5px 0;
}

.shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>