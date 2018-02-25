<template>
<div class="rating-select">
  <div class="rating-type border-1px">
    <span @click="select(2)" class="block positive" :class="{'active1':selectType===2}">{{desc.all}}<span class="rating-count">{{ratings.length}}</span></span>
    <span @click="select(0)" class="block positive" :class="{'active1':selectType===0}">{{desc.positive}}<span class="rating-count">{{positives.length}}</span></span>
    <span @click="select(1)" class="block negative" :class="{'active2':selectType===1}">{{desc.negative}}<span class="rating-count">{{negatives.length}}</span></span>
  </div>
  <div @click="toggleContent()" class="rating-switch">
    <span class="icon-check_circle" :class="{'on':onlyContent}"></span>
    <span class="rating-switch-text">只看内容的评价</span>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
    //注册组建

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default{
      props: {
        ratings: {
          type:Array,
          default() {
            return [];
          }
        },
        selectType: {
          type:Number,
          default:ALL
        },
        onlyContent: {
          type:Boolean,
          default:false
        },
        desc: {
          type:Object,
          default() {
            return {
              all:'全部',
              positive:'满意',
              negative:'不满意'
            }
          }
        }
      },
      methods: {
        select(type) {
          this.selectType=type;
          //this.$emit('ratingtype.select',type);
        },
        toggleContent() {
          this.onlyContent=!this.onlyContent;
          //this.$emit('content.toggle',this.onlyContent);
        }
      },
      computed: {
        positives() {
          return this.ratings.filter((item) => {//数组的filter方法遍历数组,将遍历到的每个元素传给回调函数中的item接收
            // ，在data数据文件中每个rating数组的元素有一个rateType属性，当rateType===0时为满意评价，对应我们的POSITIVE，
            // 最后在dom元素中取到positives.length即为满意的评价条数
            return item.rateType===POSITIVE;
          })
        },
        negatives() {
          return this.ratings.filter((item) => {
            //数组的filter方法遍历数组,将遍历到的每个元素传给回调函数中的item接收
            // ，在data数据文件中每个rating数组的元素有一个rateType属性，当rateType===1时为满意评价，对应我们的NEGATIVE，
            // 最后在dom元素中取到negatives.length即为不满意的评价条数
            return item.rateType===NEGATIVE;
          })
        }
      }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
.rating-select{

}
.rating-select .rating-type{
  padding: 18px 0;
  margin: 0 18px;
  border-1px(rgba(7,17,27,0.1));
  font-size: 0;
}
  .rating-select .rating-type .block{
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    font-size: 12px;
    line-height: 16px;
  }
  .rating-select .rating-type .positive{
    background: rgba(0,160,220,0.2);
  }
  .rating-select .rating-type .negative{
    background: rgba(77,85,93,0.2);
  }
  .rating-select .rating-type .active1{
    color: #fff;
    background: rgb(0,160,220);
  }
  .rating-select .rating-type .active2{
    color: #fff;
    background: rgb(77,85,93);
  }
  .rating-select .rating-type .block .rating-count{
    font-size: 8px;
    margin-left: 2px;
  }
.rating-select .rating-switch{
  padding: 12px 18px;
  line-height: 24px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  color: rgb(147,153,159);
  font-size: 0;
}
  .rating-select .rating-switch .icon-check_circle{
    font-size: 24px;
    margin-right: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .rating-select .rating-switch .rating-switch-text{
    font-size: 12px;
  }
  .rating-select .rating-switch .on{
    color: #00c850;
  }
</style>
