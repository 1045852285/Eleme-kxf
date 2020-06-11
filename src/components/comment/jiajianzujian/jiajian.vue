<template>
  <div class="jiajian">
    <div class="jian icon-remove_circle_outline" v-show="food.count" @click.stop="jia"></div>
    <div class="shuzi" v-show="food.count">{{food.count}}</div>
    <div class="jia icon-add_circle" @click.stop="jian"></div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "",
  props: {
    food: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
  },

  methods: {
    jia() {
      if (this.food.count) {
        this.food.count--;
      }
    },
    jian() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.jiajian {
  font-size: 0;
  color: rgb(0, 160, 220);
  .jian {
    font-size: 24px;
    display: inline-block;
  }
  .shuzi {
    width: 24px;
    vertical-align: top;
    display: inline-block;
    font-size: 10px;
    text-align: center;
    color: rgb(39, 153, 159);
    line-height: 24px;
  }
  .jia {
    font-size: 24px;
    display: inline-block;
  }
}
</style>