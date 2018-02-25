<template>
  <div id="foods">
    <div class="food-icon">
      <img width="57" height="57" :src="food.icon"/>
    </div>
    <div class="food-content">
      <h2 class="food-name">{{food.name}}</h2>
      <p class="food-desc">{{food.description}}</p>
      <div class="food-extra">
        <span class="food-count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
      </div>
      <div class="food-price">
        <span class="food-now">￥{{food.price}}</span><span class="food-old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
      </div>
      <div class="cartcontrol-wrapper">
        <v-cartcontrol v-bind:food="food"></v-cartcontrol>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    //注册组建
    import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
    export default{
      props: {
        food: {
          type:Object
        }
      },
      components: {
        'v-cartcontrol':cartcontrol
      }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
#foods{
  display: flex;
}
.food-icon{
    flex: 0 0 57px;
    margin-right: 10px;
  }
.food-content{
    flex: 1;
  }
.food-name{
    margin: 2px 0 8px 0;
    line-height: 14px;
    height: 14px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
.food-desc , .food-extra{
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
.food-desc{
    line-height: 12px;
    margin-bottom: 8px;
  }
.food-count{
    margin-right: 12px;
  }
.food-price{
    font-weight: 700;
    line-height: 24px;
  }
.food-now{
    margin-right: 18px;
    font-size: 14px;
    color: rgb(240,20,20);
  }
.food-old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147,153,159);
  }
.food-content .cartcontrol-wrapper{
  position: absolute;
  right: 0;
  bottom: 12px;
}
</style>
