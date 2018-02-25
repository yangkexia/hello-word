<template>
<div class="header">
 <div class="content-wrapper">
    <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.avatar"/>
    </div>
    <div class="content">
        <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
        </div>
        <div v-if="seller.supports" class="support-count" v-on:click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
            <span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
        </div>
    </div>
 </div>
 <div class="bulletin-wrapper" v-on:click="showDetail">
   <span class="bulletin_icon"></span>
   <span class="bulletin_text">{{seller.bulletin}}</span>
   <i class="icon-keyboard_arrow_right"></i>
 </div>
 <div class="background">
   <img v-bind:src="seller.avatar" width="100%" height="100%"/>
 </div>
 <transition name="fade">
 <div class="detail" v-show="detailShow">
   <div class="detail-wrapper clearfix">
     <div class="detail-main">
       <h1 class="detail-name">{{seller.name}}</h1>
       <div class="star-wrapper">
         <v-star v-bind:size="48" v-bind:score="seller.score"></v-star>
       </div>
       <v-line message="优惠信息" class="detail-line"></v-line>
       <ul v-if="seller.supports" class="supports">
         <li v-for="item in seller.supports" class="item-support">
           <span class="icon" v-bind:class="classMap[item.type]"></span>
           <span class="text">{{item.description}}</span>
         </li>
       </ul>
       <v-line message="商家公告" class="detail-line"></v-line>
       <div class="bulletin">
         <p class="content">{{seller.bulletin}}</p>
       </div>
     </div>
   </div>
   <div class="detail-close" v-on:click="closeDetail">
     <i class="icon-close"></i>
   </div>
 </div>
 </transition>
</div>
</template>
<script type="text/ecmascript-6">

  import star from '../../components/star/star.vue';
  import line from '../../components/line/line.vue';
  export default{
    props: {
        seller: {
            type:Object
        }
    },
    data() {
      return{
        detailShow:false
      };
    },
    methods: {
      showDetail(){
        this.detailShow=true;
      },
      closeDetail(){
        this.detailShow=false;
      }
    },
    created() {
      this.classMap=['decrease','discount','special','invoice','guarantee'];
    },
    components: {
      'v-star':star,
      'v-line':line
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";

.header{
  position: relative;
  color:#ffffff;
  background:rgba(7,17,27,0.5);
  overflow: hidden;
}
.content-wrapper{
    padding:24px 12px 18px 24px;
    font-size:0;
    position: relative;
}
.avatar{
    display:inline-block;
  vertical-align: top;
}
.avatar img{
  border-radius: 2px;
}
.content-wrapper .content{
    display:inline-block;
    font-size:14px;
    margin-left:16px;
}
.content .title{
    margin:2px 45px 8px 0;
}
.brand{
    width:30px;
    height:18px;
    display:inline-block;
    bg-image('brand');
    background-size:30px 18px;
    background-repeat:no-repeat;
    vertical-align: text-top;
}
.name {
  margin-left: 6px;
  font-size: 16px;
  color: rgb(255, 255, 255);
  font-weight: bold;
  line-height: 18px;
}
.description{
  margin-top: 8px;
  margin-bottom: 10px;
  font-size: 12px;
  color: rgb(255, 255, 255);
  font-weight: 200;
  line-height: 12px;
}
.support{
  font-size: 0;
}
.icon{
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 4px;
  background-size: 14px 14px;
  background-repeat:no-repeat;
  vertical-align: top;
}
.decrease{
  bg-image('decrease_1');
}
.discount{
  bg-image('discount_1');
}
.guarantee{
  bg-image('guarantee_1');
}
.invoice{
  bg-image('invoice_1');
}
.special{
  bg-image('special_1');
}
.header .content-wrapper .content .support .text{
  font-size: 10px;
  color: rgb(255, 255, 255);
  font-weight: 200;
  line-height: 12px;
}
.support-count{
  position: absolute;
  right: 12px;
  bottom: 14px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: 14px;
  background: rgba(0,0,0,0.2);
  text-align: center;
}
.header .content-wrapper .content .count{
  font-size: 10px;
  color: rgb(255,255,255);
  font-weight: 200;
  line-height: 12px;
}
.support-count .icon-keyboard_arrow_right{
  font-size: 10px;
  line-height: 24px;
  margin-left: 2px;
}
.bulletin-wrapper{
  position: relative;
  height: 28px;
  padding: 0 12px 0 12px;
  background: rgba(7,17,27,0.2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bulletin_icon{
  display: inline-block;
  width: 22px;
  height: 12px;
  border-radius: 2px;
  margin-top: 8px;
  bg-image('bulletin');
  background-size: 22px 12px;
  background-repeat: no-repeat;
  vertical-align: text-top;
}
.bulletin_text{
  margin: 0 4px;
  font-size: 10px;
  color: rgb(255,255,255);
  font-weight: 200;
}
.bulletin-wrapper .icon-keyboard_arrow_right{
  position: absolute;
  font-size: 10px;
  right: 3px;
  top:3px;
}
.background{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}
.detail{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(7,17,27,0.8);
  transition: all 0.5s;
  z-index: 100;
}
.fade-enter-active{
  transition: all 0.8s ease;
}
.fade-leave-active{
  transition: all 0.8s;
}
.fade-enter, .fade-leave-to{
  transform: translateY(50px);
  opacity: 0;
}
.clearfix{
  display: inline-block;
}
.clearfix:after{
  display: block;
  content: ".";
  height: 0;
  line-height: 0;
  clear: both;
  visibility: hidden;
 }
.detail-wrapper{
  width: 100%;
  min-height: 100%;
}
.detail-main{
  margin-top: 64px;
  padding-bottom: 64px;
}
.detail-name{
  font-size: 16px;
  font-weight: 700;
  color: rgb(255,255,255);
  line-height: 16px;
  text-align: center;
}
.star-wrapper{
  margin-top: 16px;
  text-align: center;
}
.detail-line{
  margin: 28px auto 24px auto;
}
.detail-main .supports{
  width: 80%;
  margin: 0 auto;
}
.detail-main .supports .item-support{
  padding: 0 12px 0 12px;
  margin-bottom: 12px;
}
.detail-main .supports .item-support:last-child{
  margin-bottom: 0;
}
.detail-main .supports .item-support .icon{
  width: 16px;
  height: 16px;
  margin-right: 6px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
}
.detail-main .supports .item-support .decrease{
  bg-image('decrease_2');
}
.detail-main .supports .item-support .discount{
  bg-image('discount_2');
}
.detail-main .supports .item-support .guarantee{
  bg-image('guarantee_2');
}
.detail-main .supports .item-support .invoice{
  bg-image('invoice_2');
}
.detail-main .supports .item-support .special{
  bg-image('special_2');
}
.detail-main .supports .item-support .text{
  font-size: 12px;
  font-weight: 200;
  color: rgb(255,255,255);
  line-height: 16px;
}
.detail-main .bulletin{
  width: 80%;
  padding: 0 12px 0 12px;
  margin: 0 auto;
}
.detail-main .bulletin .content{
  font-size: 12px;
  font-weight: 200;
  color: rgb(255,255,255);
  line-height: 24px;
}
.detail-close{
  position: relative;
  width: 32px;
  height: 32px;
  margin:-64px auto 0 auto;
  clear: both;
  font-size: 32px;
}
</style>
