<template>
  <div>
    <div class="all" v-if="seller.data" ref="kxf">
      <div class="center">
        <div>
          <div class="center-top">
            <h1>{{seller.data.name}}</h1>
            <div class="xingxing">
              <xx class="xx" :size="36" :score="seller.data.score"></xx>
              <span class="aa">({{seller.data.ratingCount}})</span>
              <span class="onSale">月售{{seller.data.sellCount}}单</span>
            </div>
            <div class="collect" @click="aaa">
              <span class="icon-favorite" :class="{'ccc':ddd}"></span>
              <p>{{bbb}}</p>
            </div>
          </div>
          <div class="center-center">
            <div class="lefts">
              <span class="qisong">起送价</span>
              <p>
                <span>{{seller.data.minPrice}}</span>
                <span class="manny">元</span>
              </p>
            </div>
            <div class="centers">
              <span class="qisong">商家配送</span>
              <p>
                <span>{{seller.data.deliveryPrice}}</span>
                <span class="manny">元</span>
              </p>
            </div>
            <div class="right">
              <span class="qisong">平均配送时间</span>
              <p>
                <span>{{seller.data.deliveryTime}}</span>
                <span class="manny">分钟</span>
              </p>
            </div>
          </div>
          <div class="ratings-shadow"></div>
          <div class="character">
            <h1 class="name">公告与活动</h1>
            <div class="center">{{seller.data.bulletin}}</div>
          </div>
          <div class="uls">
            <ul>
              <li class="lis" v-for="(item,i) in seller.data.supports" :key="i">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="fonts">{{item.description}}</span>
              </li>
            </ul>
          </div>
          <div class="ratings-shadow"></div>
          <div class="image">
            <span>商家实景</span>
            <div class="clearfix" ref="imags">
              <ul class="image-ul">
                <li class="image-ul-li" v-for="(item,i) in seller.data.pics" :key="i">
                  <img :src="item" />
                </li>
              </ul>
            </div>
          </div>
          <div class="ratings-shadow"></div>
        </div>
        <div class="bottom">
          <h1>商家信息</h1>
          <ul>
            <li class="bottom-center" v-for="(item,i) in seller.data.infos" :key="i">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xx from "../../zhehzao/xingxing";
import BScroll from "better-scroll";
export default {
  name: "goods",
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
      goodss: [],
      bbb: "收藏",
      ddd: false
    };
  },
  components: {
    xx
  },
  computed: {
    
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    console.log(this.$store.state.selectedFoods)
  },
  beforeMount() {},

  mounted() {
    if (!this.$refs.kxf) {
      this.nextick()
      console.log(this.$refs.kxf)
    } else {
      this.nextick()
    }
  },

  methods: {
    aaa() {
      this.ddd = !this.ddd;
      if (this.ddd == true) {
        this.bbb = "已收藏";
      } else {
        this.bbb = "收藏";
      }
    },
    nextick() {
      this.$nextTick(() => {
        if (!this.scrool) {
          this.scrool = new BScroll(this.$refs.kxf, { click: true });
        }
        if (!this.imags) {
          this.imags = new BScroll(this.$refs.imags, {
            scrollX: true,
            eventPassthroungh: "vertical"
          });
          console.log(this.imags);
        }
      });
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import "../../../gongyong/less/mixi.less";
.all {
  width: 100%;
  position: fixed;
  top: 174px;
  bottom: 45px;
  overflow: hidden;
  .center {
    .center-top {
      position: relative;
      font-size: 0;
      margin: 18px 18px;
      padding-top: 18px;
      padding-bottom: 18px;
      .border-1px(rgba(7, 17, 27, 0.1));
      h1 {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }
      .xingxing {
        .xx {
          display: inline-block;
          margin-top: 0;
          text-align: left;
          padding: 8px 0 0 0;
        }
        .aa {
          display: inline-block;
          vertical-align: bottom;
          font-size: 10px;
          color: rgb(77, 85, 93);
          margin-left: 8px;
          line-height: 18px;
        }
        .onSale {
          display: inline-block;
          vertical-align: bottom;
          font-size: 10px;
          color: rgb(77, 85, 93);
          margin-left: 12px;
          line-height: 18px;
        }
      }
      .collect {
        font-size: 0;
        position: absolute;
        top: 18px;
        right: 8px;
        text-align: center;
        width: 50px;
        .icon-favorite {
          font-size: 24px;
          display: block;
          line-height: 24px;
          text-align: center;
          &.ccc {
            text-align: center;
            color: rgb(240, 20, 20);
          }
        }
        p {
          font-size: 10px;
          color: rgb(77, 85, 93);
          text-align: center;
          line-height: 10px;
          margin-top: 4px;
        }
      }
    }
    .center-center {
      display: flex;
      margin: 0 18px 0px 18px;
      padding-bottom: 18px;
      .lefts,
      .centers,
      .right {
        flex: 1;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 10px;
        &.right {
          border-right: none;
        }
        p {
          font-size: 0px;
          line-height: 20px;
          margin-top: 4px;
          color: rgb(7, 17, 27);
          span {
            font-size: 24px;
            text-align: right;
          }
          .manny {
            font-size: 10px;
          }
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
  .character {
    margin: 18px 18px 0;
    .name {
      font-weight: 700;
    }
    .center {
      font-size: 12px;
      font-weight: 200;
      color: rgb(240, 20, 20);
      line-height: 24px;
      padding: 8px 6px 16px 12px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
  }
  .uls {
    ul {
      .lis {
        margin: 16px 18px 0;
        padding-bottom: 12px;
        font-size: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          background-repeat: no-repeat;
          background-size: 16px 16px;
          &.decrease {
            .bg-img("decrease_3");
          }
          &.discount {
            .bg-img("discount_3");
          }
          &.guarantee {
            .bg-img("guarantee_3");
          }
          &.invoice {
            .bg-img("invoice_3");
          }
          &.special {
            .bg-img("special_3");
          }
        }
        .fonts {
          font-size: 12px;
          font-weight: 200;
          color: rgb(7, 17, 27);
          line-height: 16px;
          vertical-align: top;
        }
      }
    }
  }
  .image {
    span {
      display: block;
      font-weight: 700;
      margin: 18px 18px 12px 18px;
    }
    .clearfix {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      font-size: 0;
      margin-left: 18px;
      .image-ul {
        width: 150%;
        padding-bottom: 18px;
        .image-ul-li {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          img {
            width: 120px;
            height: 90px;
          }
        }
      }
    }
  }
  .bottom {
    h1 {
      font-weight: 700;
      margin: 18px 18px 0px;
      padding-bottom: 12px;
      .border-1px(rgba(7, 17, 27, 0.1));
    }
    ul {
      margin: 0 18px;
      .bottom-center {
        padding: 16px 12px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(7, 17, 27);
        line-height: 16px;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          .border-1px(rgba(7, 17, 27, 0));
        }
      }
    }
  }
}
</style>