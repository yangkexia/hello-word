<template>
  <div>
  <div class="shopcart">
    <div class="content" v-on:click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" v-bind:class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart" v-bind:class="{'highlight':totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" v-bind:class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" v-on:click.stop.prevent="pay">
        <div class="pay" v-bind:class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listshow">
        <div class="list-header">
          <div class="title">购物车</div>
          <div class="empty" v-on:click="empty">清空</div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <v-cartcontrol v-bind:food="food"></v-cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="list-fade">
  <div class="list-mask" v-show="listshow" v-on:click="hidelist"></div>
  </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  //注册组建
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  export default{
    props: {
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      },
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true,
        showheader:true
      }
    },
    computed: {
      totalPrice() {
        let tatal = 0;
        this.selectFoods.forEach((food) => {
          tatal += food.price * food.count;
        });
        return tatal;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listshow() {
        let show=!this.fold;
        if(show) {//当this.fold为faulse（列表展开显示）时执行
          this.$nextTick(() => {//异步初始化better-scroll，当dom完全生成后再执行
            if(!this.scroll){//当this.scroll不存在时
              this._initScroll();//new一个新的scroll
            }else {//否则，当this.scroll存在
              this.scroll.refresh();//调用this.scroll的refresh方法重新启动,重新计算高度差决定是否启动滚动
            }
          });
        }
        return show;
        }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      _initScroll() {
        this.scroll = new BScroll(this.$refs.listContent,{
          click:true
        });
      },
      empty() {
        this.selectFoods.forEach(function(food) {
          food.count=0;
      });
        this.fold = !this.fold;
      },
      hidelist() {
        this.fold=true;
      },
      pay() {
        if(this.totalPrice<this.minPeice){
          return;
        }
        window.alert(`需要支付${this.totalPrice}元`)
      }
    },
    components: {
      'v-cartcontrol': cartcontrol
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
  }

  .shopcart .content {
    display: flex;
    background: #141d27;
    font-size: 0;
  }

  .shopcart .content .content-left {
    flex: 1;
  }

  .shopcart .content .content-left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  }

  .shopcart .content .content-left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
  }

  .shopcart .content .content-left .logo-wrapper .highlight {
    background: rgb(0, 160, 220);
  }

  .shopcart .content .content-left .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  }

  .shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart {
    font-size: 24px;
    color: #80858a;
    line-height: 44px;
  }

  .shopcart .content .content-left .logo-wrapper .logo .highlight {
    color: #fff;
  }

  .shopcart .content .content-left .price {
    display: inline-block;
    margin-top: 12px;
    padding-right: 12px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.4);
    vertical-align: top;
  }

  .shopcart .content .content-left .highlight {
    color: #fff;
  }

  .shopcart .content .content-left .desc {
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
  }

  .shopcart .content .content-right {
    flex: 0 0 105px;
    width: 105px;
  }

  .shopcart .content .content-right .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 700;
    background: #2b333b;
  }

  .shopcart .content .content-right .not-enough {
    background: #2b333b;
  }

  .shopcart .content .content-right .enough {
    background: #00b43c;
    color: #fff;
  }

  /*.shopcart .ball-container{*/

  /*}*/
  /*.shopcart .ball-container .ball{*/
  /*position: fixed;*/
  /*left: 32px;*/
  /*bottom: 22px;*/
  /*z-index: 200;*/
  /*}*/
  /*.shopcart .ball-container .ball .drop-transition{*/
  /*transition: all 0.4s;*/
  /*}*/
  /*.shopcart .ball-container .ball .inner{*/
  /*width: 16px;*/
  /*height: 16px;*/
  /*border-radius: 50%;*/
  /*background: rgb(0,160,220);*/
  /*transition: all 0.4s;*/
  /*}*/
  .shopcart .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
  }

  .fold-enter-active {
    animation: fold-in 0.5s;
  }
  .fold-leave-active{
    animation: fold-out 0.5s;
  }
  @keyframes fold-in {
    0%{opacity: 0}
    100%{opacity: 1}
  }
  @keyframes fold-out {
    0%{opacity: 1}
    100%{opacity: 0}
  }
  .shopcart .shopcart-list .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 2px solid rgba(7, 17, 27, 0.1);
  }

  .shopcart .shopcart-list .list-header .title {
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .shopcart .shopcart-list .list-header .empty {
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
  }

  .shopcart .shopcart-list .list-content {
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background: #fff;
  }

  .shopcart .shopcart-list .list-content .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
  border-1px(rgba(7, 17, 27, 0.1));
  }

  .shopcart .shopcart-list .list-content .food .name {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .shopcart .shopcart-list .list-content .food .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
  }
  .shopcart .shopcart-list .list-content .food .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  .list-mask{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    -webkit-backdrop-filter: blur(10px);
    background: rgba(7,17,27,0.6);
  }
  .list-fade-enter-active,.list-fade-leave-active{
    transition: all 0.5s;
  }
  .list-fade-enter,.list-fade-leave-to{
    opacity: 0;
    transform: translateY(20px);
  }
</style>
