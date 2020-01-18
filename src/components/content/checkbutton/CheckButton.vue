<template>
  <div class="check-button">
      <img src="~assets/img/cart/tick.svg" :class="{check: isChecked}">
  </div>
</template>

<script>
   export default {
   name:'CheckButton',
   props: {
       isChecked: {
           type: Boolean,
           default(){
               return false
           }
       }
   }
}
</script>

<style scoped>
.check-button {
    border-radius: 50%;
    border: var(--color-tint) solid 2px;
}

.check {
     border-radius: 50%;
     background-color: var(--color-tint);
}
</style>