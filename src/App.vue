<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab">
      <div class="tabitem"><router-link to="/goods">商品</router-link></div>
      <div class="tabitem"><router-link to="/ratings">评论</router-link></div>
      <div class="tabitem"><router-link to="/seller">商家</router-link></div>
      <div class="tabitem"><router-link to="/mydata">测试</router-link></div>
    </div>
    <router-view v-bind:seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  //引用组件地址
import header from './components/header/header.vue';

const ERR_OK = 0;

  //注册组建
  export default{
    data() {
      return{
        seller:{}
      }
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response=response.body;
        if(response.errno===ERR_OK){
          this.seller=response.data;
        }
      });
    },
    components: {
      'v-header':header
    }
  };
</script>

<style>
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
  .tabitem{
    flex: 1;
    text-align: center;
  }
  a{
    display: block;
    font-size: 14px;
    color: rgb(77,85,93);
  }
  a.active{
    color: rgb(240,20,20);
  }
</style>
