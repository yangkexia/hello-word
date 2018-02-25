<template>
  <el-table
    :data="mydata"
    style="width: 100%"
    :row-class-name="tableRow"
    border>
    <el-table-column
      prop="orderId"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="180">
    </el-table-column>
    <el-table-column
      prop="buyer"
      label="买家">
    </el-table-column>
    <el-table-column
      prop="seller"
      label="卖家">
    </el-table-column>
    <el-table-column
      prop="sellerEmail"
      label="邮件">
    </el-table-column>
    <el-table-column
      prop="payment"
      label="付款">
    </el-table-column>
  </el-table>
</template>

<script type="text/ecmascript-6">
  //注册组建
  const ERR_OK=0;
  export default{
    props: {
      seller: {
        type:Object
      }
    },
    data() {
      return {
        mydata:[]
      };
    },
    created() {
      this.$http.get('/api/mydata').then((response) => {
        response=response.body;
        if(response.errno===ERR_OK){
          this.mydata=response.data;
        }
      });
    },
    methods: {
      tableRow({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'warning-row';
        } else if (rowIndex === 2) {
          return 'success-row';
        }
        return '';
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
.black{
  color: black;
}
.red{
  color: red;
}
.green{
  color: green;
}
</style>
