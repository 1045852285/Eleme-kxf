<template>
  <div class="nav">
    <div class="nav-item">
      <router-link to="/seller">商品</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/ratings">评价</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/goods">商家</router-link>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "navs"
};
</script>

<style lang='less' scoped>
@import '../../gongyong/less/mixi.less';
.nav {
  width: 100%;
  height: 40px;
  display: flex;
  background-color: white;
  // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  .border-1px(rgba(7, 17, 27, 0.1));
  .nav-item {
    flex: 1;
    height: 40px;
    text-align: center;
    line-height: 40px;
    a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
    }
    a.router-link-active {
      color: rgb(240, 20, 20)
    }
  }
}
</style>