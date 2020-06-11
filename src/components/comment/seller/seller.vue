<template>
  <div class="top" v-if="seller.data">
    <div class="topZuobian" ref="topZuobian">
      <div class="content1">
        <ul>
          <li
            @click="zuoTabe(i,$event)"
            class="zuobian-tabe"
            v-for="(item,i) in goods"
            :key="i"
            ref="zuobianTabe"
            :class="{'dongtaitianji': i === currentIndex||currentIndex1}"
          >
            <span class="tabe-font">
              <span class="tabe-icon" v-if="item.type>0" :class="[classMap[item.type]]"></span>
              <a href="#maodiandingwei">{{item.name}}</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="top-youbian" ref="topYoubian">
      <div class="youbianUl" ref="youbianUl">
        <ul>
          <li ref="liheight" class="ul-li" v-for="(item,i) in goods" :key="i">
            <div class="ul-li-div">
              <span class="ul-li-shuxian"></span>
              <span class="ul-li-span" id="maodiandingwei">{{item.name}}</span>
            </div>
            <div>
              <ul>
                <li
                  class="ul-li-ul-li"
                  v-for="(foodss,h) in item.foods"
                  :key="h"
                  @click="xianqingxianshiyincang(foodss)"
                >
                  <div class="ulliulli-center">
                    <div class="ulliulli-div">
                      <span class="center-img">
                        <img :src="foodss.image" alt />
                      </span>
                      <div class="center-center">
                        <span class="center-name">{{foodss.name}}</span>
                        <span class="center-description">{{foodss.description}}</span>
                        <span class="center-sellCount">月售{{foodss.sellCount}}份</span>
                        <span class="center-rating">好评率{{foodss.rating}}%</span>
                        <div class="center-jiage">
                          <span class="jiage-new">￥{{foodss.price}}</span>
                          <span v-if="foodss.oldPrice" class="jiage-old">￥{{foodss.oldPrice}}</span>
                        </div>
                      </div>
                    </div>
                    <!-- 加减号组件 -->
                    <jiajian class="jiajianhaozujian" :food="foodss"></jiajian>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车 -->
    <tapbuttom
      :selected-foods="jiajianzujian"
      :goods="goods"
      v-show="false"
    ></tapbuttom>
    <!-- 商品详情 -->
    <shangpinxiangqing v-show="shangpinxiangqing" @func="show" :foodd="food"></shangpinxiangqing>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import tapbuttom from "./../seller/buttom/topButtom.vue";
import jiajian from "./../jiajianzujian/jiajian.vue";
import shangpinxiangqing from "./../shangpinxiangqing/shangpinxiangqing.vue";
export default {
  name: "seller",
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      youUlHeight: 0,
      scrollY: 0,
      lisHeightArry: [],
      clickEvent: false,
      shangpinxiangqing: false,
      food: {},
      currentIndex1:0
    };
  },
  created() {
    this.$http.get("/api/goods").then(function(res) {
      // console.log(res);
      if (res.body.errno == 0) {
        this.goods = res.body.data;
        // console.log(this.goods)
      }

      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.topZuobian, { click: true });
          // console.log(this.$refs.topZuobian);
        }
        if (!this.scrollYoubian) {
          this.scrollYoubian = new BScroll(this.$refs.topYoubian, {
            click: true,
            probeType: 3
          });
          this.scrollYoubian.on("scroll", pos => {
            this.scrollY = Math.abs(Math.round(pos.y));
          });
          // console.log(this.scrollYoubian);
        } else {
          this.scrollYoubian.refresh();
        }
        this.getHeight();
      });
    });
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  components: {
    tapbuttom,
    jiajian,
    shangpinxiangqing
  },

  computed: {
    currentIndex() {
      for (let p = 0; p < this.lisHeightArry.length; p++) {
        let height = this.lisHeightArry[p];
        let height2 = this.lisHeightArry[p + 1];
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          if (this.clickEvent) {
            // console.log(p+1)
            return p;
          } else {
            // console.log(p)
            return p;
          }
        }
      }
      return 0;
    },
    jiajianzujian() {
      let result = [];
      // 像数组添加选中的商品
      this.goods.forEach(item => {
        item.foods.forEach(food => {
          if (food.count) {
            result.push(food);
          }
        });
      });
      this.$store.dispatch("selectedGoods",this.goods)
      this.$store.dispatch("selectedFoods",result)
      return result;
    }
  },

  beforeMount() {},
  beforeUpdate() {
   
  },

  methods: {
    zuoTabe: function(n, e) {
      for (let i = 0; i < this.$refs.zuobianTabe.length; i++) {
        this.$refs.zuobianTabe[i].classList.remove("dongtaitianji");
      }
      // 点击左边tap栏，添加白色背
      this.$refs.zuobianTabe[n].classList.add("dongtaitianji");
      this.clickEvent = true;
      //如果不存在这个属性,则为原生点击事件，不执行下面的函数
      if (!e._constructed) {
        return;
      } else {
        let rightItme = this.$refs.liheight;
        let el = rightItme[n];
        this.scrollYoubian.scrollToElement(el, 1000);
        // console.log(this.scrollYoubian);
      }
    },
    getHeight: function() {
      let height = 0;
      if (this.lisHeightArry.length == 0) {
        this.lisHeightArry.push(height);
      }
      // 被点击tap前面的所有的ul的高进行一个累加
      for (let k = 0; k < this.$refs.liheight.length; k++) {
        // 获取被点击tap和之前的所有的ul元素的高
        let lisheight = this.$refs.liheight[k].offsetHeight;
        height += lisheight;
        this.lisHeightArry.push(height);
      }
    },
    xianqingxianshiyincang(food) {
      this.shangpinxiangqing = true;
      this.food = food;
      // console.log(this.food)
    },
    show(data) {
      this.shangpinxiangqing = data;
    }
  },

  watch: {
    // goods:{
    //   handler:function(){
    //     console.log(123);
    //     // this.jiajianzujian;
    //   }
    // },
    // deep:true
  }
};
</script>
<style lang='less' scoped>
@import "../../../gongyong/less/mixi.less";
.top {
  display: flex;
  top: 174px;
  width: 100%;
  position: absolute;
  bottom: 46px;
  .topZuobian {
    flex: 0 0 80px;
    height: 100%;
    overflow: hidden;
    .content1 {
      height: 449px;
      background-color: #f3f5f7;
      .zuobian-tabe {
        height: 54px;
        width: 100%;
        background-color: #f3f5f7;
        box-sizing: border-box;
        margin-top: -1px;
        padding: 0px 12px;
        .tabe-icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          vertical-align: middle;
          background-repeat: no-repeat;
          background-size: 12px 12px;
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
        .tabe-font {
          height: 54px;
          width: 56px;
          // 文字垂直居中，可以折行
          display: table-cell;
          vertical-align: middle;
          font-size: 12px;
          font-weight: 200;
          .border-1px(rgba(7, 17, 27, 0.1));
        }
      }
      .dongtaitianji {
        background-color: white;
        position: relative;
        font-weight: 700;
        z-index: 2;
        .tabe-font {
          .border-1px(rgba(0, 0, 0, 0));
        }
      }
    }
  }
  .top-youbian {
    flex: 1;
    height: 100%;
    position: relative;
    overflow: hidden;
    .youbianUl {
      width: 100%;
      ul {
        position: relative;
        top: 0;
        .ul-li {
          .ul-li-div {
            font-size: 0;
            width: 100%;
            height: 26px;
            line-height: 26px;
            position: relative;
            background-color: #f3f5f7;
            .ul-li-span {
              display: inline-block;
              width: 90%;
              font-size: 12px;
              padding-left: 14px;
              position: absolute;
              top: 0;
              color: rgb(147, 153, 159);
            }
            .ul-li-shuxian {
              display: inline-block;
              width: 2px;
              height: 26px;
              background-color: #d9dde1;
            }
          }
          .ul-li-ul-li {
            position: relative;
            z-index: 0;
            &::after {
              display: block;
              position: absolute;
              left: 18px;
              right: 18px;
              bottom: 0;
              content: "";
              border-top: 1px solid rgba(7, 17, 27, 0.1);
            }
            .ulliulli-center {
              position: relative;
              padding: 18px;
              font-size: 0;

              .center-img {
                img {
                  display: inline-block;
                  width: 64px;
                  height: 64px;
                }
              }
              .center-center {
                height: 64px;
                margin-left: 10px;
                position: absolute;
                top: 18px;
                margin-top: 2px;
                display: inline-block;
                color: rgb(147, 153, 159);
                .center-name {
                  font-size: 14px;
                  line-height: 14px;
                  font-weight: 700;
                  color: rgb(7, 17, 27);
                }
                .center-description {
                  display: block;
                  font-size: 10px;
                  margin-top: 8px;
                  line-height: 10px;
                }
                .center-sellCount {
                  display: inline-block;
                  font-size: 10px;
                  margin-top: 8px;
                  line-height: 10px;
                }
                .center-rating {
                  font-size: 10px;
                  margin: 8px 0;
                  margin-left: 12px;
                  line-height: 10px;
                }
                .center-jiage {
                  display: flex;
                  .jiage-new {
                    font-size: 14px;
                    color: rgb(240, 20, 20);
                    font-weight: 700;
                    line-height: 24px;
                  }
                  .jiage-old {
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                    font-weight: normal;
                    line-height: 24px;
                    margin-left: 8px;
                    text-decoration: line-through;
                  }
                }
              }
            }
            .jiajianhaozujian {
              position: absolute;
              right: 18px;
              bottom: 5px;
            }
          }
        }
      }
    }
  }
}
</style>