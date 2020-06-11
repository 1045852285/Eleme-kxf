<template>
  <div class="particulars">
    <div class="particulars-top">
      <span
        class="all"
        :class="{'active':selectType===2}"
        @click="selecttype(2)"
      >{{desc.all}}{{allll.length}}</span>
      <span
        class="hotlists"
        :class="{'active':selectType===0}"
        @click="selecttype(0)"
      >{{desc.hotlists}}{{hotlistsss.length}}</span>
      <span
        class="roast"
        :class="{'active':selectType===1}"
        @click="selecttype(1)"
      >{{desc.roast}}{{roasttt.length}}</span>
    </div>
    <div class="particulars-center" @click="onlycontent">
      <span class="icon-check_circle" :class="{'on':onlyContent}"></span>
      <span class="particulars-center-txt">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const ALL = 2;
const HOTLISTS = 0;
const ROAST = 1;
export default {
  name: "",
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          hotlists: "推荐",
          roast: "吐槽"
        };
      }
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {
    allll() {
      let aa = [];
      for (let i = 0; i < this.ratings.length; i++) {
        if (!(this.ratings[i].rateType == ALL)) {
          aa.push(this.ratings[i]);
        }
      }
      return aa;
    },
    hotlistsss() {
      return this.ratings.filter(function(e) {
        // console.log(e.rateType);
        return e.rateType == HOTLISTS;
      });
    },
    roasttt() {
      return this.ratings.filter(function(e) {
        return e.rateType == ROAST;
      });
    }
  },

  beforeMount() {},

  mounted() {
      
  },

  methods: {
    selecttype(aa) {
      this.$emit("selectTyped", aa);
    },
    onlycontent() {
      this.$emit("onlyContented", !this.onlyContent);
    },
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import "../../gongyong/less/mixi.less";
.particulars {
  .particulars-top {
    margin-left: 18px;
    margin-top: 18px;
    margin-right: 18px;
    padding-bottom: 18px;
    .border-1px(rgba(7, 17, 27, 0.1));
    .all,
    .hotlists,
    .roast {
      padding: 8px 12px;
      font-size: 12px;
      display: inline-block;
      margin-right: 8px;
      border-radius: 2px;
      color: rgb(10, 10, 10);
    }
    .all {
      background-color: rgba(0, 160, 220, 0.5);
    }
    .hotlists {
      background-color: rgba(0, 160, 220, 0.2);
    }
    .roast {
      background-color: rgba(77, 85, 93, 0.2);
    }
    .active {
      background-color: rgb(0, 160, 220);
      color: rgb(255, 255, 255);
    }
  }
  .particulars-center {
    color: rgb(147, 153, 159);
    margin: 12px 0 0 0;
    padding-left: 18px;
    padding-bottom: 12px;
    width: 100%;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .icon-check_circel {
      font-size: 24px;
    }
    .on {
      color: #00c850;
    }
    .particulars-center-txt {
      font-size: 12px;
      vertical-align: top;
      line-height: 16px;
    }
  }
}
</style>