<template>
  <transition name="product-move">
<div class="product-details" v-show="showFlag" ref="productWrapper">
  <div class="product-content">
    <div class="image-header">
      <img v-bind:src="food.image">
      <div class="back" v-on:click="hide">
      <i class="icon-arrow_lift"></i>
      </div>
    </div>
    <div class="cont">
      <h1 class="product-title">{{food.name}}</h1>
      <div class="product-detail">
        <span class="product-sell-count">月售{{food.sellCount}}份</span>
        <span class="product-rating">好评率{{food.rating}}</span>
      </div>
      <div class="product-price">
        <span class="product-now">￥{{food.price}}</span>
        <span class="product-old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
      </div>
      <div class="cartcontrol-wrapper">
        <v-cartcontrol v-bind:food="food"></v-cartcontrol>
      </div>
      <transition name="product-fade">
        <div v-on:click="addFirst($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
      </transition>
    </div>
    <v-split v-show="food.info"></v-split>
    <div class="info" v-show="food.info">
      <h1 class="info-title">商品信息</h1>
      <p class="info-text">{{food.info}}</p>
    </div>
    <v-split v-show="food.info"></v-split>
    <div class="rating">
      <h1 class="rating-title">商品评价</h1>
      <v-ratingselect
        :selectType="selectType"
        :onlyContent="onlyContent"
        :desc="desc"
        :ratings="food.ratings">
      </v-ratingselect>
      <div class="rating-wrapper">
        <ul v-show="food.ratings && food.ratings.length">
          <li v-for="rating in food.ratings" class="rating-item">
            <div class="user">
              <span class="user-name">{{rating.username}}</span>
              <img class="user-avatar" width="12" height="12" :src="rating.avatar">
            </div>
            <div class="time">{{rating.rateTime}}</div>
            <p class="user-text">
              <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
              {{rating.text}}
            </p>
          </li>
        </ul>
        <div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div>
      </div>
    </div>
  </div>
</div>
  </transition>
</template>

<script type="text/ecmascript-6">
    //注册组建
    import  Vue from 'vue';
    import BScroll from 'better-scroll';
    import split from '../../components/split/split.vue';
    import ratingselect from '../../components/ratingselect/ratingselect.vue';
    import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default{
      props: {
        food: {
          type:Object
        }
      },
      data() {
        return {
          showFlag:false,
          selectType:ALL,
          onlyContent:true,
          desc: {
            all:'全部',
            positive:'推荐',
            negative:'吐槽'
          }
        };
      },
      created() {
        //初始化better-scroll，首先进行判断，避免每次都重新new
        this.$nextTick(() => {
          if(!this.scroll){
            this._initScroll();
          }else {
            this.scroll.refresh();
          }
        })
      },
      methods: {
        show() {
          this.showFlag=true;
          this.selectType=ALL;
          this.onlyContent=false;
        },
        hide() {
          this.showFlag=false;
        },
        _initScroll() {
          this.scroll=new BScroll(this.$refs.productWrapper,{
            click:true
          });
        },
        addFirst(event) {
            Vue.set(this.food,'count',1);
        }
      },
      components:{
        'v-cartcontrol':cartcontrol,
        'v-split':split,
        'v-ratingselect':ratingselect
      }

    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
.product-details{
  position: fixed;
  left: 0;
  top:0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
}
.product-move-enter-active,.product-move-leave-active{
  transition:all 0.5s;
}
.product-move-enter,.product-move-leave-to{
  opacity: 0;
  transform: translate3d(100%,0,0);
}
.image-header{
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}
.image-header img{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
}
.image-header .back{
  position: absolute;
  top:10px;
  left: 0;
}
.image-header .back .icon-arrow_lift{
  display: block;
  padding:15px;
  font-size: 20px;
  color: #fff;
}

.product-content .cont{
  position: relative;
  padding: 18px;
}
.product-content .cont .product-title{
  line-height: 14px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(7,17,27);
}
.product-content .cont .product-detail{
  margin-bottom: 18px;
  line-height: 10px;
  height: 10px;
  font-size: 0;
}
.product-content .cont .product-detail .product-sell-count{
  font-size: 10px;
  color: rgb(147,153,159);
  margin-right: 12px;
}
.product-content .cont .product-detail .product-rating{
  font-size: 10px;
  color: rgb(147,153,159);
}
.product-content .cont .product-price{
  font-weight: 700;
  line-height: 24px;
}
.product-content .cont .product-price .product-now{
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240,20,20);
}
.product-content .cont .product-price .product-old{
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147,153,159);
}
.product-details .cartcontrol-wrapper{
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.product-details .buy{
  position: absolute;
  right: 18px;
  bottom: 18px;z-index: 10;
  height: 24px;
  line-height: 24px;
  padding:0 12px;
  box-sizing: border-box;
  font-size: 10px;
  border-radius: 12px;
  color: #fff;
  background: rgb(0,160,220);
}
.product-fade-enter-active,.product-fade-leave-active{
  transition: all 0.5s;
}
.product-fade-enter,.product-fade-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
.product-content .info{
  padding: 18px;
}
.product-content .info .info-title{
  line-height: 14px;
  margin-bottom: 6px;
  font-size: 14px;
  color: rgb(7,17,27);
}
.product-content .info .info-text{
  line-height: 24px;
  padding: 0 8px;
  font-size: 12px;
  color: rgb(77,85,93);
}
.product-content .rating{
  padding-top: 18px;
}
.product-content .rating .rating-title{
  line-height: 14px;
  margin-left: 18px;
  font-size: 14px;
  color: rgb(77,85,93);
}
.product-content .rating .rating-wrapper{
  padding: 0 18px;
}
.product-content .rating .rating-wrapper .rating-item{
  position: relative;
  padding: 16px 0;
  border-1px(rgba(7,17,27,0.1));
}
  .product-content .rating .rating-wrapper .rating-item .user{
    position: absolute;
    right: 0;
    top:16px;
    font-size: 0;
    line-height: 12px;
  }
  .product-content .rating .rating-wrapper .rating-item .user .user-name{
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .product-content .rating .rating-wrapper .rating-item .user .user-avatar{
    border-radius: 50%;
  }
  .product-content .rating .rating-wrapper .rating-item .time{
    line-height: 12px;
    font-size: 10px;
    margin-bottom: 6px;
    color: rgb(147,153,159);
  }
  .product-content .rating .rating-wrapper .rating-item .user-text{
    line-height: 16px;
    font-size: 12px;
    color: rgb(7,17,27);
  }
  .product-content .rating .rating-wrapper .rating-item .user-text .icon-thumb_up{
    line-height: 16px;
    margin-right: 4px;
    font-size: 12px;
    color: rgb(0,160,220);
  }
  .product-content .rating .rating-wrapper .rating-item .user-text .icon-thumb_down{
    line-height: 24px;
    margin-right: 4px;
    font-size: 12px;
    color: rgb(147,153,159);
  }
</style>
