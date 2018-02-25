<template>
<div class="cartcontrol">
  <transition name="move">
  <div class="cart-decrease icon-remove_circle_outline"
       v-show="food.count>0"
       v-on:click.stop="decreaseCart">
  </div>
  </transition>
  <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
  <div class="cart-add icon-add_circle"
       v-on:click.stop="addCart">
  </div>
</div>
</template>

<script type="text/ecmascript-6">
    //注册组建
    import Vue from 'vue';
    export default{
      props: {
        food: {
          type:Object
        }
      },
      methods: {
        addCart() {
          if(!this.food.count){
            Vue.set(this.food,'count',1);
          }else {
            this.food.count++;
          }
//          this.$dispatch('cart.add',event.target);
          //console.log(this.food.count);
        },
        decreaseCart() {
          this.food.count--;
          //console.log(this.food.count);
        }
      }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol{
  font-size: 0;
}
.cartcontrol .cart-decrease{
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0,160,220);
}
.move-enter-active,.move-leave-active{
  animation: move-in 0.4s;
  transition: all 0.4s ease;
}
.move-enter,.move-leave-to{
  opacity: 0;
  transform: translate(24px);
}
@keyframes move-in {
  from{transform: rotate(0deg)}
  to{transform: rotate(180deg)}
}
.cartcontrol .cart-count{
  display: inline-block;
  vertical-align: top;
  width: 12px;
  padding-top: 6px;
  line-height: 24px;
  text-align: center;
  font-size: 10px;
  color: rgb(147,153,159);
}
.cartcontrol .cart-add{
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0,160,220);
}
</style>
