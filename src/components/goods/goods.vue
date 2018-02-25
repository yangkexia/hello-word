<template>
<div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li v-for="(item ,index) in goods" class="menu-item" v-bind:class="{current:currentIndex===index}" v-on:click="selectMenu(index)">
        <span class="menu-text border-1px">
          <span v-show="item.type>0" class="icon" v-bind:class="classMap[item.type]"></span>
          {{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodsWrapper">
    <ul>
      <li v-for="item in goods" class="food-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" class="food-item border-1px" v-on:click="selectFood(food,$event)">
            <v-food v-bind:food="food"></v-food>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <v-shopcart
    v-bind:delivery-price="seller.deliveryPrice"
    v-bind:min-price="seller.minPrice"
    v-bind:select-foods="selectFoods"
  ></v-shopcart>
  <v-productDetails v-bind:food="selectedFood" ref="productDetails"></v-productDetails>
</div>
</template>

<script type="text/ecmascript-6">
  import food from '../../components/foods-wrapper/foods-wrapper.vue';
  import BScroll from 'better-scroll';
  import shopcart from '../../components/shopcart/shopcart.vue';
  import productDetails from '../../components/product-details/product-details.vue';
const ERR_OK = 0;
export default{
  props: {
    seller: {
      type:Object
    }
  },
	data() {
    return {
      goods:[],
      ListHeight:[],
      scrollY:0,
      selectedFood:{}
    };
  },
  computed: {
    currentIndex() {
      for(let i=0;i<this.ListHeight.length;i++){
        let height1=this.ListHeight[i];
        let height2=this.ListHeight[i+1];
       // console.log('height1:'+height1+','+'height2:'+height2)
        if(!height2 || (this.scrollY>=height1&&this.scrollY<height2)){
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods=[];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count){
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      response=response.body;
      if(response.errno===ERR_OK) {
        this.goods=response.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
    this.classMap=['decrease','discount','special','invoice','guarantee'];
  },
  components: {
    'v-food':food,
    'v-shopcart':shopcart,
    'v-productDetails':productDetails
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper,{
        click:true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
        click:true,
        probeType:3
      });
      this.foodsScroll.on('scroll',(pos) => {
        this.scrollY=Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height=0;
      this.ListHeight.push(height);
      for(let i=0;i<foodList.length;i++) {
        let item=foodList[i];
        height+=item.clientHeight;
        this.ListHeight.push(height);
      }
    },
    selectMenu(index,event) {
      //console.log(index);
      let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el=foodList[index];
      this.foodsScroll.scrollToElement(el,300);
    },
    selectFood(food,event) {
      this.selectedFood=food;
      this.$refs.productDetails.show();//调用子组件方法控制商品详情页是否显示
    }
//    drop(target) {
//      this.$refs.shopcart.drop(target)
//    }
  }
//  events: {
//    'cart.add'(target){
//      this.drop()
//    }
//  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
}
.menu-wrapper{
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
}
.menu-item{
  display: table;
  height: 54px;
  width: 56px;
  padding: 0 12px;
  line-height: 14px;
}
.menu-item .icon{
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 2px;
  background-size: 14px 14px;
  background-repeat:no-repeat;
}
.menu-wrapper .current{
  position: relative;
  margin-top: -1px;
  z-index: 10;
  background: #fff;
  font-weight: 700;
}

.decrease{
bg-image('decrease_3');
}
.discount{
bg-image('discount_3');
}
.guarantee{
bg-image('guarantee_3');
}
.invoice{
bg-image('invoice_3');
}
.special{
bg-image('special_3');
}
.menu-item .menu-text{
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  border-1px(rgba(7,17,27,0.1))
  font-size: 12px;
}
.foods-wrapper{
  flex: 1;
}
.food-list .title{
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147,153,159);
  background: #f3f5f7;
  width: 100%;
}
.goods .foods-wrapper .food-item{
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  border-1px(rgba(7,17,27,0.1))
}
.goods .foods-wrapper .food-item:last-child{
  border-none();
  margin-bottom: 0;
}
</style>
