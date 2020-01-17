import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        addConter() {
            oldProduct.count += 1
        },
        addToCart(state, payLoad) {
            state.cartList.push(payLoad)
        }
    },
    actions: {
        addCart(context, payLoad) {
            let oldProduct = null
            for(let item of context.state.cartList) {
                if(item.iid == payLoad.iid){
                    oldProduct = item
                }
            }

            if(oldProduct) {
                // oldProduct.count += 1
                context.commit('addConter', oldProduct)
            }else {
                payLoad.count = 1
                payLoad.checked = true
                // state.cartList.push(payLoad)
                context.commit('addToCart', payLoad)
            }
        }
    }
})

export default store