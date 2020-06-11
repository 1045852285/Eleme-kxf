<template>
  <div class="one" v-if="seller.data">
    <div class="header">
      <!-- 商家图片 -->
      <div class="header-avatar">
        <img :src="seller.data.avatar" alt />
      </div>
      <!-- 商家log和名字,详情 -->
      <div class="header-conter">
        <div class="conter-top">
          <!-- log -->
          <span class="brand"></span>
          <!-- 名字 -->
          <span class="namess">{{seller.data.name}}</span>
        </div>
        <!-- 外卖，时间 -->
        <div class="conter-center">
          <span class="two">{{seller.data.description}}/{{seller.data.deliveryTime}}分钟送达</span>
        </div>
        <div class="conter-bootoom">
          <!-- 活动详情 -->
          <span class="decrease_2" :class="classMap[seller.data.supports[0].type]"></span>
          <span class="xianqing">{{seller.data.supports[0].description}}</span>
        </div>
      </div>
      <div class="header-button" @click="kxf">
        <input type="button" :value="seller.data.supports.length + '个 >' " />
      </div>
    </div>

    <!-- 公告部分 -->
    <div class="header-bootom" @click="kxf">
      <span class="bootom-top"></span>
      <span>{{seller.data.bulletin}}</span>
      <span class="jiantou">></span>
    </div>
    <!-- 头部下面模糊的背景 -->
    <div class="bj">
      <img :src="seller.data.avatar" alt width="100%" height="100%" />
    </div>
    <!-- 弹出来的遮罩 -->
    <transition>
      <div class="zhezhao" v-if="zhezhao">
        <div class="zhezhao-top"></div>
        <div class="zhezhao-header">
          <!-- 遮罩里面的商家名字 -->
          <div class="header-top">
            <span class="top-top">{{seller.data.name}}</span>
          </div>
          <div class="top-xingxing">
            <xingxing :size="48" :score="seller.data.score" class="xingzujian"></xingxing>
          </div>
          <div class="top-youhui">
            <!-- 优惠信息 -->
            <div class="youhui-xian1"></div>
            <span class="youhui-span">优惠信息</span>
            <div class="youhui-xian2"></div>
          </div>
          <!-- 打折信息 -->
          <div class="top-dazhediv">
            <div class="top-dazhe" v-for="(item,i) in seller.data.supports" :key="item[i]">
              <span class="top-dazhe-tupian" :class="classMap[seller.data.supports[i].type]"></span>
              <span class="top-dazhe-miaoshu">{{seller.data.supports[i].description}}</span>
            </div>
          </div>
          <!-- 商家公告 -->
          <div class="top-youhui">
            <div class="youhui-xian1"></div>
            <span class="youhui-span">商家公告</span>
            <div class="youhui-xian2"></div>
          </div>
          <div class="shangjia-neirong">{{seller.data.bulletin}}</div>
        </div>

        <!-- 遮罩层的X -->
        <div class="zhezhao-bottom">
          <span class="icon-close" @click="kxf"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import xingxing from "../zhehzao/xingxing";
export default {
  name: "headers",
  components: {
    xingxing
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      zhezhao: false
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    kxf: function() {
      this.zhezhao = !this.zhezhao;
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import "../../gongyong/less/mixi.less";

.one {
  position: relative;
  .header {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    color: rgb(255, 255, 255);
    background-color: rgba(7, 17, 27, 0.5);
    .header-avatar {
      height: 64px;
      margin: 24px 0px 18px 24px;
      img {
        width: 64px;
        height: 64px;
        border-radius: 2px;
        margin: 0;
      }
    }
    .header-conter {
      height: 64px;
      width: 100%;
      font-size: 0;
      margin: 24px 12px 18px 16px;
      .conter-top {
        height: 18px;
        margin: 2px 0 8px 0;
        position: relative;
        .brand {
          display: block;
          margin: 0 6px 0px 0;
          width: 30px;
          height: 18px;
          .bg-img("brand");
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .namess {
          display: inline-block;
          height: 18px;
          width: 162px;
          font-size: 18px;
          font-weight: bold;
          position: absolute;
          top: -1px;
          left: 36px;
        }
      }
      .conter-center {
        margin: 0 0 10px 0;
        .two {
          font-size: 12px;
          font-weight: 200;
          line-height: 12px;
        }
      }
      .conter-bootoom {
        height: 16px;
        position: relative;
        .decrease_2 {
          display: inline-block;
          width: 12px;
          height: 12px;
          // .bg-img('decrease_1');
          background-size: 12px 12px;
          background-repeat: no-repeat;
          margin-right: 4px;
          margin-bottom: 2px;
          &.decrease {
            .bg-img("decrease_1");
          }
          &.discount {
            .bg-img("discount_1");
          }
          &.guarantee {
            .bg-img("guarantee_1");
          }
          &.invoice {
            .bg-img("invoice_1");
          }
          &.special {
            .bg-img("special_1");
          }
        }
        .xianqing {
          height: 16px;
          position: absolute;
          top: -2px;
          font-size: 10px;
          line-height: 16px;
          font-weight: 200;
        }
      }
    }
    .header-button {
      position: absolute;
      right: 12px;
      bottom: 16px;
      input {
        font-size: 10px;
        border-radius: 20px;
        font-weight: 200;
        line-height: 12px;
        padding: 7px 8px;
        outline: none;
        color: rgb(255, 255, 255);
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
  .header-bootom {
    height: 28px;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: rgba(7, 17, 27, 0.2);
    .bootom-top {
      display: block;
      width: 27px;
      height: 12px;
      .bg-img("bulletin");
      background-size: 22px 12px;
      background-repeat: no-repeat;
      margin: 0 4px 0 12px;
    }
    span {
      display: block;
      height: 12px;
      width: 100%;
      line-height: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 10px;
      white-space: nowrap;
      color: rgb(255, 255, 255);
    }
    .jiantou {
      display: block;
      width: 8px;
      margin: 0 12px 0 4px;
    }
  }
  .bj {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -100;
    filter: blur(10px);
  }

  // 遮罩的动画
  .v-enter,.v-leave-to{
    opacity: 0;
  }
  .v-enter-active,.v-leave-active{
    transition: all 1s;
  }
  .v-enter-to,.v-leave{
    opacity: 1;
  }
  // 遮罩
  .zhezhao {
    width: 100%;
    height: 100%;
    display: flex;
    color: rgb(255, 255, 255);
    flex-flow: column;
    min-height: 100px;
    position: fixed;
    background-color: rgba(7, 17, 28, 0.8);
    overflow: auto;
    z-index: 100;
    top: 0;
    left: 0;
    .zhezhao-top {
      margin-top: 64px;
    }
    .zhezhao-header {
      flex: 1;
      .header-top {
        text-align: center;
        height: 16px;
        width: 100%;
        display: block;
        line-height: 16px;
        // color: rgb(255, 255, 255);
        .top-top {
          font-size: 16px;
          font-weight: 700;
        }
      }
      .top-xingxing {
        display: block;
        height: 24px;
        margin-top: 16px;
        .xingzujian {
          margin-top: 2px;
        }
      }
      .top-youhui {
        margin: 28px 32px;
        height: 16px;
        .youhui-xian1 {
          position: relative;
          top: 8px;
          &:after {
            display: block;
            width: 112px;
            position: absolute;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            left: 0;
            bottom: 0;
            content: "";
          }
        }
        .youhui-xian2 {
          position: relative;
          top: 8px;
          &:after {
            display: block;
            width: 112px;
            position: absolute;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            right: 0;
            bottom: 0;
            content: "";
          }
        }
        .youhui-span {
          display: inline-block;
          position: absolute;
          left: 50%;
          font-weight: 700;
          padding: 0 12px;
          transform: translate(-50%, 0);
          // color: rgb(255, 255, 255);
        }
      }
      .top-dazhediv {
        margin: 24px 32px 0 32px;
        .top-dazhe {
          width: 100%;
          font-size: 0;
          display: flex;
          align-items: center;
          margin-left: 12px;
          margin-bottom: 12px;
          .top-dazhe-tupian {
            display: inline-block;
            width: 16px;
            height: 16px;
            padding-right: 6px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            &.decrease {
              .bg-img("decrease_2");
            }
            &.discount {
              .bg-img("discount_2");
            }
            &.guarantee {
              .bg-img("guarantee_2");
            }
            &.invoice {
              .bg-img("invoice_2");
            }
            &.special {
              .bg-img("special_2");
            }
          }
          .top-dazhe-miaoshu {
            font-size: 12px;
            font-weight: 200;
            // color: rgb(255, 255, 255);
            line-height: 12px;
          }
        }
        .top-dazhe:last-child {
          margin-bottom: 0;
        }
      }
      .shangjia-neirong {
        margin: 0 32px 0 32px;
        font-size: 12px;
        font-weight: 200;
        // color: rgb(255, 255, 255);
        line-height: 24px;
      }
    }
    .zhezhao-bottom {
      height: 64px;
      margin: 0 auto;
      .icon-close {
        display: block;
        width: 32px;
        height: 32px;
        color: rgba(255, 255, 255, 0.5);
        margin-bottom: 32px;
        &.icon-close:before {
          font-size: 32px;
        }
      }
    }
  }
}
</style>