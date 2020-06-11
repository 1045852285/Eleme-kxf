<template>
  <div>
    <div class="zhezhao"></div>
    <div class="top-bottom">
      <div class="bottom-bottom" @click="taggleFn">
        <div class="bottom-zuobian">
          <div class="gouwuche-logo">
            <div class="log-log">
              <span class="icon-shopping_cart" :class="{'gouwuche-gaoliang':gouwuchexiaotubiao>0}"></span>
              <span :class="{'gouwuche-xiaotubiao':gouwuchexiaotubiao>0}">{{gouwuchexiaotubiao}}</span>
            </div>
          </div>
          <div class="gouwuche-zongjiaqian" :class="{'gaoliang':qisongjiage>0}">￥{{qisongjiage}}</div>
          <span class="gouwuche-shuxian"></span>
          <div class="gouwuche-peisongfei">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div
          class="bottom-youbian"
          :class="{'qisong-gaoliang':qisongjiage>=minPrice}"
          @click.stop="jiesuan"
        >{{gouwucheqisong}}</div>
      </div>
      <!-- 购物车弹出层 -->
      <transition>
        <div class="gouwuche-tanchu" v-show="toggle">
          <div class="tanchu-top">
            <span class="gouwuche-gwc">购物车</span>
            <span class="gouwuche-qingkong" @click="qingkong">清空</span>
          </div>
          <div class="tanchu-ul" ref="tanchuRef">
            <ul>
              <li v-for="(item,i) in selectedFoods" :key="i" class="tanchu-ul-li">
                {{item.name}}
                <!-- 加减按钮组件 -->
                <jiajianzujizn class="li-jiajianzujizn" :food="selectedFoods[i]"></jiajianzujizn>
                <span class="li-price">￥{{item.price}}</span>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import jiajianzujizn from "./../../jiajianzujian/jiajian.vue";
import BScroll from "better-scroll";
import Vue from "vue";
export default {
  name: "",
  props: {
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    selectedFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    goods: {
      type: Array
    }
  },
  data() {
    return {
      toggle: false
    };
  },

  components: {
    jiajianzujizn
  },

  computed: {
    qisongjiage() {
      // console.log(this.$store.state.selectedFoods);
      let zongjiaqian = 0;
      for (let i = 0; i < this.selectedFoods.length; i++) {
        // console.log(this.selectedFoods);
        if (this.selectedFoods[i].price) {
          zongjiaqian +=
            this.selectedFoods[i].price * this.selectedFoods[i].count;
        } else {
          this.selectedFoods[i].price = 0;
        }
      }
      return zongjiaqian;
    },
    gouwuchexiaotubiao() {
      let zongjiaqian = 0;
      for (let i = 0; i < this.selectedFoods.length; i++) {
        //   console.log(selectedFoods[i])
        zongjiaqian += this.selectedFoods[i].count;
      }
      return zongjiaqian;
    },
    gouwucheqisong() {
      //   console.log(this.qisongjiage);
      if (this.qisongjiage === 0) {
        let bb = `${this.minPrice}元起送`;
        return bb;
      } else if (this.qisongjiage < this.minPrice) {
        let cc = this.minPrice - this.qisongjiage;
        let bb = `还差￥${cc}起送`;
        return bb;
      } else {
        let bb = `去结算`;
        return bb;
      }
    },
    qingkongg() {
      // let goods = this.$store.state.selectedFoods;
      console.log(this.goods);
      
      this.goods.forEach(item => {
        item.foods.forEach(food => {
          if (food.count) {
            food.count = 0;
          }
        });
      });
      this.$store.dispatch("selectedFoods",[])
    }
  },

  beforeMount() {},

  mounted() {
    this.$nextTick(() => {
      this.scrool = new BScroll(this.$refs.tanchuRef, { click: true });
    });
  },

  methods: {
    taggleFn() {
      this.toggle = !this.toggle;
    },
    qingkong() {
      this.qingkongg;
      this.toggle = !this.toggle;
    },
    jiesuan() {
      console.log("结算");
    },
    // 自定义事件
    
  },

  watch: {
    selectedFoods: {
      immediate:true,
      handler: function(aa) {
        if (aa.length == 0) {
          this.toggle = false;
        } 
      },
      deep: true
    }
  }
};
</script>
<style lang='less' scoped>
.zhezhao {
  width: 100%;
  height: 100%;
  background-color: rgba(7, 17, 27, 0.6);
}
.top-bottom {
  position: fixed;
  width: 100%;
  height: 45px;
  bottom: 0px;
  left: 0px;
  z-index: 20;
  .bottom-bottom {
    display: flex;
    position: relative;
    z-index: 10;
    background-color: #141d27;
    .bottom-zuobian {
      flex: 1;
      .gouwuche-logo {
        padding: 0 12px;
        display: inline-block;
        .log-log {
          position: absolute;
          top: -8px;
          width: 54px;
          height: 54px;
          z-index: 10;
          background-color: #141d27;
          color: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          .icon-shopping_cart {
            position: relative;
            z-index: 10;
            line-height: 44px;
            text-align: center;
            display: inline-block;
            width: 44px;
            height: 44px;
            margin: 5px 5px;
            background-color: #2b343c;
            border-radius: 50%;
            font-size: 24px;
            &.gouwuche-gaoliang {
              background-color: rgb(0, 160, 220);
              color: rgb(255, 255, 255);
            }
          }
          .gouwuche-xiaotubiao {
            position: absolute;
            top: 0px;
            left: 30px;
            width: 20px;
            font-size: 12px;
            font-weight: 700;
            z-index: 10;
            background-color: rgb(240, 20, 20);
            border-radius: 10px 10px 10px 10px;
            text-align: center;
            color: rgb(255, 255, 255);
          }
        }
      }
      .gouwuche-zongjiaqian {
        display: inline-block;
        margin-left: 52px;
        font-size: 18px;
        font-weight: 700;
        line-height: 45px;
        color: rgba(255, 255, 255, 0.4);
        &.gaoliang {
          color: #fff;
        }
      }
      .gouwuche-shuxian {
        position: absolute;
        display: inline-block;
        top: 0;
        bottom: 0;
        margin: auto 10px;
        width: 1px;
        height: 30px;
        border-left: 0.5px gray solid;
        color: rgba(255, 255, 255, 0.4);
      }
      .gouwuche-peisongfei {
        display: inline-block;
        margin-left: 24px;
        font-size: 10px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .bottom-youbian {
      flex: 0 0 89px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
      font-weight: 700;
      background-color: #2b343c;
      text-align: center;
      line-height: 48px;
      &.qisong-gaoliang {
        background-color: #00b43c;
        color: white;
      }
    }
  }
  .v-enter,
  .v-leave-to {
    transform: translateY(100%);
    z-index: 0;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.8s ease;
  }
  .gouwuche-tanchu {
    position: absolute;
    z-index: 0;
    bottom: 45px;
    max-height: 283px;
    width: 100%;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background-color: #f3f5f7;
    overflow: hidden;
    .tanchu-top {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      .gouwuche-gwc {
        margin-left: 18px;
      }
      .gouwuche-qingkong {
        float: right;
        margin-right: 18px;
        color: rgb(0, 160, 220);
      }
    }
    .tanchu-ul {
      position: relative;
      max-height: 237px;
      overflow: hidden;
      .tanchu-ul-li {
        position: relative;
        height: 48px;
        padding-left: 18px;
        background-color: white;
        line-height: 48px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .li-jiajianzujizn {
          position: absolute;
          top: 12px;
          right: 18px;
        }
        .li-price {
          position: absolute;
          right: 108px;
          font-size: 10px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
