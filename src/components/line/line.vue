<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{message}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
    //注册组建
    export default{
      props: ['message']
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.title{
    display: flex;
    width: 80%;
  }
.title .text{
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }
.line{
    flex: 1;
    position: relative;
    top:-4px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
</style>
