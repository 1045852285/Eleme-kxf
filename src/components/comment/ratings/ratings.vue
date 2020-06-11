<template>
  <div class="ratings" v-if="seller.data" ref="kxfFxk">
    <div class="kxf">
      <div class="entirety">
        <div class="ratings-left">
          <span class="ratings-score">{{seller.data.score}}</span>
          <span class="ratings-ratings">综合评分</span>
          <span class="ratings-rankRate">高于周边商家{{seller.data.rankRate}}</span>
        </div>
        <div class="ratings-right">
          <span class="ratings-serviceScore back">
            <span class="spann">服务态度</span>
            <xingxing class="xingzujian" :size="36" :score="seller.data.serviceScore"></xingxing>
            <span class="serviceScore">{{seller.data.serviceScore}}</span>
          </span>
          <span class="ratings-foodScore back">
            <span class="spann">商品评分</span>
            <xingxing class="xingzujian" :size="36" :score="seller.data.foodScore"></xingxing>
            <span class="foodScore">{{seller.data.foodScore}}</span>
          </span>
          <span class="ratings-deliveryTime back">
            <span class="spann">送达时间</span>
            <span class="deliveryTime">{{seller.data.deliveryTime}}分钟</span>
          </span>
        </div>
      </div>
      <div class="ratings-shadow"></div>
      <div>
        <xiangqing
          :ratings="ratings"
          :onlyContent="onlyContented"
          :selectType="selectType"
          :desc="this.desc"
          @selectTyped="se"
          @onlyContented="on"
        ></xiangqing>
        <div class="particulars-bootom">
          <ul>
            <li v-show="taggle(item.rateType,item.text)" v-for="(item,j) in ratings" :key="j">
              <div class="particulars-ul-particulars">
                <div class="top-left">
                  <span class="imgs">
                    <img :src="item.avatar" width="28" height="28" alt />
                  </span>
                  <span class="names">{{item.username}}</span>
                  <div class="xingtiem">
                    <span class="xingxing">
                      <xingxing :size="24" :score="item.score"></xingxing>
                    </span>
                    <span class="time" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                  </div>
                  <div class="datas">
                    <span class="datas-data">{{item.rateTime | forrateTime}}</span>
                  </div>
                  <div class="center" v-if="item.text">
                    <span class="center-font">{{item.text}}</span>
                  </div>
                  <div class="bootom">
                    <ul>
                      <span
                      :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"
                    ></span>
                      <li
                        class="recommends"
                        v-for="(recommends, index) in item.recommend"
                        :key="index"
                      >{{recommends}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xingxing from "./../../zhehzao/xingxing.vue";
import xiangqing from "./../../particulars/particulars.vue";
import BScroll from "better-scroll";
const ALL = 2;
const HOTLISTS = 0;
const ROAST = 1;
export default {
  name: "ratings",
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    },
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      onlyContented: false,
      selectType: ALL,
      desc: {
        all: "全部",
        hotlists: "满意",
        roast: "不满意"
      }
    };
  },

  components: {
    xingxing,
    xiangqing
  },

  computed: {
    
  },

  beforeMount() {},

  mounted() {
    this.$nextTick(() => {
      if (!this.scrool) {
        this.scrool = new BScroll(this.$refs.kxfFxk, { click: true });
      }
    });
  },
  methods: {
    se(data) {
      this.selectType = data;
    },
    on(data) {
      this.onlyContented = data;
    },
    taggle(type, text) {
      if (this.onlyContented && !text) {
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
.ratings {
  position: fixed;
  overflow: hidden;
  bottom: 45px;
  top: 174px;
  width: 100%;
  .kxf {
    .entirety {
      padding-top: 15px;
      margin: 15px 24px;
      margin-left: 0;
      display: flex;
      .ratings-left {
        font-size: 0;
        width: 137px;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        padding: 6px 0;
        .ratings-score {
          display: block;
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }
        .ratings-ratings {
          display: block;
          line-height: 12px;
          font-size: 12px;
          margin-top: 6px;
          color: rgb(7, 17, 27);
        }
        .ratings-rankRate {
          display: block;
          line-height: 10px;
          font-size: 10px;
          margin-top: 8px;
          color: rgba(7, 17, 27, 0.5);
        }
      }
      .ratings-right {
        margin-left: 24px;
        .back {
          width: 100%;
          display: block;
          position: relative;
          font-size: 0px;
          color: rgb(7, 17, 27);
          line-height: 18px;
          margin-bottom: 8px;
          .spann {
            display: inline-block;
            font-size: 12px;
          }
          .xingzujian {
            width: 100px;
            position: absolute;
            margin-left: 60px;
            top: -15px;
          }
          .serviceScore,
          .foodScore {
            color: rgb(255, 153, 0);
            font-size: 12px;
            line-height: 18px;
            margin-left: 124px;
          }
          .deliveryTime {
            font-size: 12px;
            margin-left: 12px;
            color: rgb(147, 153, 159);
          }
        }
        .ratings-serviceScore {
          margin-top: 6px;
        }
        .ratings-deliveryTime {
          margin-bottom: 0;
        }
      }
    }
  }

  .ratings-shadow {
    margin-top: -1px;
    width: 100%;
    height: 16px;
    background-color: #f3f5f7;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .particulars-bootom {
    .particulars-ul-particulars {
      position: relative;
      margin: 18px 18px 0 18px;
      .border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;
      .top-left {
        .imgs img {
          display: inline-block;
          border-radius: 50%;
          margin-right: 12px;
        }
        .names {
          display: inline-block;
          font-size: 10px;
          color: rgb(7, 17, 27);
          line-height: 12px;
          margin-top: 2px;
          vertical-align: top;
        }
        .xingtiem {
          position: relative;
          top: -12px;
          left: 80px;
          .xingxing {
            width: 50%;
            height: 100%;
            display: inline-block;
            text-align: left;
            margin-top: 0;
            margin-left: -21px;
          }
          .time {
            display: inline-block;
            font-size: 10px;
            font-weight: 200;
            color: rgb(147, 153, 159);
            line-height: 12px;
            margin-left: -122px;
            vertical-align: top;
          }
        }
      }
      .datas-data {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 10px;
        font-weight: 200;
        color: rgb(147, 153, 159);
        line-height: 12px;
      }
      .center-font {
        display: inline-block;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 18px;
        padding: 0 0 6px 0;
        margin-left: 40px;
        margin-top: -10px;
      }
      .bootom {
        display: inline-block;
        margin-left: 40px;
        .icon-thumb_up,
        .icon-thumb_down {
          margin-right: 8px;
          display: inline-block;
          font-size: 12px;
          color: rgb(183, 187, 191);
          line-height: 16px;
        }
        .icon-thumb_up {
          color: rgb(0, 160, 220);
        }
        ul {
          display: inline-block;
          padding: 0 0 18px 0;
          .recommends {
            display: inline-block;
            font-size: 9px;
            padding: 2px 6px;
            color: rgb(147, 153, 159);
            margin-right: 8px;
            margin-bottom: 8px;
            border: 1px solid rgba(7, 17, 27, 0.1);
          }
        }
      }
    }
  }
}
</style>