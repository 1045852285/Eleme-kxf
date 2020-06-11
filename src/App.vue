<template>
  <div id="app" v-if="seller.data">
    <div class="header">
      <headers :seller="seller"></headers>
    </div>
    <div class="nav">
      <navs></navs>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller" :ratings="ratings"></router-view>
      </keep-alive>
    </div>
    <buttom
      :min-price="seller.data.minPrice"
      :delivery-price="seller.data.deliveryPrice"
      :selected-foods="this.$store.state.selectedFoods"
      :goods="this.$store.state.selectedGoods"
    ></buttom>
  </div>
</template>

<script>
import headers from "./components/header/header";
import navs from "./components/nav/nav";
import buttom from "./components/comment/seller/buttom/topButtom";
export default {
  name: "App",
  data() {
    return {
      seller: {},
      ratings: [],
      goods: []
    };
  },
  components: {
    headers,
    navs,
    buttom
  },
  created() {
    const ERR_OK = 0;
    this.$http.get("/api/seller").then(function(res) {
      if (res.body.errno == ERR_OK) {
        this.seller = res.body;
      }
    });
    this.$http.get("/api/ratings").then(function(res) {
      if (res.data.errno == ERR_OK) {
        this.ratings = res.data.data;
      }
    });
    this.$http.get("/api/goods").then(function(res) {
      if (res.data.errno == ERR_OK) {
        this.goods = res.data.data;
      }
    });
    //  console.log(this.seller)
  }
};
</script>

<style lang='less' scoped>
</style>
