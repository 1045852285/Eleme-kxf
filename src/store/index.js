import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        // 下边tab栏里面，选择的商品
        selectedFoods:[],
        // 添加商品之后的goods数据
        selectedGoods:[]
    },
    actions:{
        selectedFoods(ctx,my){
            ctx.commit('abc',my)
        },
        selectedGoods(ctx1,my1){
            ctx1.commit('abc1',my1)
        }
    },
    mutations:{
        abc(state,my){
            state.selectedFoods = my
        },
        abc1(state,my1){
            state.selectedGoods = my1
        }
    }
});
export default store;