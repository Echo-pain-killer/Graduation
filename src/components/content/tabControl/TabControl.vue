<template>
  <div class="tab-control">
      <div class="tab-control-item"
           v-for="(item,index) in titles" 
           :key="item.id" 
           :class="{active: currentIndex === index}"
           @click="itemClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
   export default {
   name:'TabControl',
   props: {
       titles: {
           type: Array,
           default: []
       }
   },
   data() {
       return {
           currentIndex: 0
       }
   },
   methods: {
       itemClick(index) {
           this.currentIndex = index
           this.$emit('tabClick',index)
       }
   }
}
</script>

<style scoped>
.tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
}
.tab-control-item {
    flex: 1;
    text-align: center;
}

.active {
    color: var(--color-high-text);
}
.active span {
    border-bottom: 2px solid var(--color-high-text);
    padding: 5px;
}
</style>