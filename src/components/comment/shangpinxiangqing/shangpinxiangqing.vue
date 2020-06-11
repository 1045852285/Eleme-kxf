<template>
  <transition name="move">
    <div class="food" ref="kxf">
      <div class="foodd">
        <div class="food-content">
          <div class="food-img">
            <img :src="foodd.image" alt />
            <div class="back" @click="yincang">
              <span class="icon-arrow_lift"></span>
            </div>
          </div>
          <div class="food-name">
            <h3>{{foodd.name}}</h3>
            <div class="food-market">
              <span class="left">月售{{foodd.sellCount}}份</span>
              <span class="right">好评率{{foodd.rating}}%</span>
            </div>
            <div class="food-manny">
              <span class="news">￥{{foodd.price}}</span>
              <span class="old" v-if="foodd.oldPrice">￥{{foodd.oldPrice}}</span>
            </div>
            <input
              class="shopping"
              type="button"
              v-show="foodd.count<1||foodd.count==undefined"
              value="加入购物车"
              @click="vulues"
            />
            <div v-show="foodd.count>=1">
              <jiajianzujizn class="jianjiazujian" :food="foodd"></jiajianzujizn>
            </div>
          </div>
        </div>
        <div class="food-shadow" v-if="foodd.info"></div>
        <div class="food-introduce" v-if="foodd.info">
          <h3>商品介绍</h3>
          <p>{{foodd.info}}</p>
        </div>
        <div class="food-shadow"></div>
        <div class="pingjia">
          <h3>商品评价</h3>
          <particulars
            :ratings="foodd.ratings"
            :desc="desc"
            :select-type="selectType"
            :only-content="onlyContent"
            @onlyContented="onlycontented"
            @selectTyped="selecttyped"
          ></particulars>
          <div class="particulars-bootom">
          <ul>
            <li v-show="taggle(item.rateType,item.text)" v-for="(item,i) in foodd.ratings" :key="i">
              <div class="particulars-ul-particulars">
                <div>
                  <span class="rateTime">{{item.rateTime | forrateTime}}</span>
                  <span
                    :class="{'icon-thumb_down':item.rateType===1,'icon-thumb_up':item.rateType===0}"
                  ></span>
                  <span class="text">{{item.text}}</span>
                </div>
                <div class="name">
                  <span class="username">{{item.username}}</span>
                  <span class="avatar">
                    <img :src="item.avatar" alt />
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import jiajianzujizn from "./../jiajianzujian/jiajian.vue";
import particulars from "./../../particulars/particulars.vue";
import Vue from "vue";
const ALL = 2;
const HOTLISTS = 0;
const ROAST = 1;
export default {
  name: "",
  props: {
    foodd: {
      type: Object
    }
  },
  data() {
    return {
      xqy: false,
      desc: {
        all: "全部",
        hotlists: "推荐",
        roast: "吐槽"
      },
      onlyContent: false,
      selectType: ALL
    };
  },

  components: {
    jiajianzujizn,
    particulars
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.$nextTick(() => {
      this.scrool = new BScroll(this.$refs.kxf, { click: true });
    });
  },

  methods: {
    yincang() {
      this.$emit("func", this.xqy);
    },
    vulues() {
      if (!this.foodd.count) {
        Vue.set(this.foodd, "count", 1);
      }
    },
    onlycontented(data) {
      this.onlyContent = data;
    },
    selecttyped(data) {
      this.selectType = data;
    },
    taggle(type, text) {
      if (this.onlyContent && !text) {
        return false;
      } else if (this.selectType === ALL) {
        return true;
      } else {
        return this.selectType === type;
      }
      return ALL;
    }
  },
  filters:{
    forrateTime(data){
      let da = new Date(data);
      let year = da.getFullYear();
      let mouth = da.getMonth()+1;
      let day = da.getDate();
      let hour = da.getHours();
      let minute = da.getMilliseconds();
      mouth=mouth<10?"0"+mouth:mouth;
      hour=hour<10?"0"+hour:hour;
      minute=minute<10?"0"+minute:minute;
      return year+ '-' +mouth+ '-' +day+ ' ' +hour+':'+ minute
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import "../../../gongyong/less/mixi.less";
.food {
  position: fixed;
  top: 0;
  width: 100%;
  bottom: 45px;
  z-index: 19;
  background-color: white;
  &.move.enter,
  &.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  &.move-leave-active,
  &.move-enter-active {
    transition: all 0.2s linear;
  }
  &.move-enter-to,
  &.move-leave {
    transform: translate3d(0, 0, 0);
  }
  .food-content {
    .food-img {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .back {
        position: absolute;
        left: 15px;
        top: 15px;
        color: white;
      }
    }
    .food-name {
      margin: 18px 0 18px 18px;
      position: relative;
      h3 {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .food-market {
        font-size: 0;
        margin-top: 8px;
        .left,
        .right {
          display: inline-block;
          line-height: 0;
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
        }
        .right {
          margin-left: 12px;
        }
      }
      .food-manny {
        font-size: 0;
        margin-top: 18px;
        .news {
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
          line-height: 24px;
        }
        .old {
          font-size: 10px;
          font-weight: 700;
          margin-left: 12px;
          color: rgb(147, 153, 159);
          text-decoration: line-through;
        }
      }
      .shopping {
        width: 74px;
        height: 24px;
        font-size: 10px;
        border-radius: 12px;
        color: rgb(255, 255, 255);
        outline: none;
        background-color: rgb(0, 160, 220);
        position: absolute;
        right: 18px;
        top: 48px;
      }
      .jianjiazujian {
        position: absolute;
        right: 18px;
        top: 48px;
      }
    }
  }
  .food-shadow {
    margin-top: -1px;
    width: 100%;
    height: 16px;
    background-color: #f3f5f7;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .food-introduce {
    margin: 18px 18px 0 18px;
    h3 {
      margin-bottom: 6px;
      font-size: 15px;
      color: rgb(7, 17, 27);
      font-weight: 500;
    }
    p {
      margin-left: 8px;
      margin-right: 8px;
      font-size: 12px;
      font-weight: 200;
      color: rgb(77, 85, 93);
      line-height: 24px;
    }
  }
  .pingjia {
    > h3 {
      margin: 18px 0 6px 18px;
      font-size: 15px;
      color: #07111b;
      font-weight: 500;
    }
  }
  .particulars-bootom {
    margin: 0 18px;
    .particulars-ul-particulars {
      position: relative;
      font-size: 0;
      padding-bottom: 18px;
      .border-1px(rgba(7, 17, 27, 0.1));
      .rateTime {
        display: block;
        margin-top: 16px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .icon-thumb_down,
      .icon-thumb_up {
        display: inline-block;
        font-size: 12px;
        color: rgb(147, 153, 159);
        margin-top: 6px;
        margin-right: 4px;
      }
      .icon-thumb_up {
        color: rgb(0, 160, 220);
      }
      .text {
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
      .name {
        position: absolute;
        right: 0;
        top: 18px;
        .username {
          font-size: 10px;
          vertical-align: top;
          color: rgb(147, 153, 159);
          margin-right: 6px;
        }
        img {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>