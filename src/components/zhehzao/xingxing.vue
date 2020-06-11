<template>
  <div class="xingxing">
    <span v-for="(item,i) in pingfen" :key="i" class="xingxing-top" :class="[xingxingxing,pingfen[i]]"></span>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    seller: {
      type: Object
    },
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {
    xingxingxing() {
      return "star" + this.size;
    },
    pingfen: function() {
       const HALF = 'half';
       const ON = 'on';
       const OFF = 'off';
       const ARRYLENGTH = 5;
      let arry = [];
      let zhengshu = Math.floor(this.score * 2) / 2;
      let xiazheng = Math.floor(zhengshu);
      let xiaoshu = zhengshu % 1 == 0 ? false : true;
      for (let i = 0; i < xiazheng; i++) {
        arry.push(ON);
      }
      if (xiaoshu) {
        arry.push(HALF);
      }
      while (arry.length < ARRYLENGTH) {
        arry.push(OFF);
      }
      return arry;
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='less' scoped>
@import "../../gongyong/less/mixi.less";
.xingxing {
  text-align: center;
  margin-top: 16px;
  font-size: 0;
  .xingxing-top {
    display: inline-block;
    &.star48 {
      width: 20px;
      height: 20px;
      margin-right: 21px;
      background-size: 20px 19px;
      background-repeat: no-repeat;
      &.on {
        .bg-img("star48_on");
      }
      &.off {
        .bg-img("star48_off");
      }
      &.half {
        .bg-img("star48_half");
      }
    }
    &.star36 {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      background-repeat: no-repeat;
      &.on {
        .bg-img("star36_on");
      }
      &.off {
        .bg-img("star36_off");
      }
      &.half {
        .bg-img("star36_half");
      }
    }
    &.star24 {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      background-repeat: no-repeat;
      &.on {
        .bg-img("star24_on");
      }
      &.off {
        .bg-img("star24_off");
      }
      &.half {
        .bg-img("star24_half");
      }
    }
  }
  .xingxing-top:last-child {
    margin-right: 0;
  }
}
</style>