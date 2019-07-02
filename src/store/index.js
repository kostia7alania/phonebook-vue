import Vue from 'vue'
import Vuex from 'vuex'

import items from './mock'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    items: items,
    loading: false
  },
  getters: {
    items(state) {
      return state.items
    }
  },
  mutations: {
    SET_LOADING_ON(state) { state.loading = true },
    SET_LOADING_OFF(state) { state.loading = false },
    DELETE_ITEM(state, guid) {
      state.items = state.items.filter( item => item.guid != guid)
    },
    SET_ITEM(state, newItem) {
      const itemsArr = state.items.filter( item => item.guid == newItem.guid)
      if(itemsArr.length>0) {
        newItem.updated = +new Date
        itemsArr[0] = newItem
        console.log('saved!')
        return true
      }
      console.warn('can\'t find the guid!')
      return false
    }
  },
  actions: {

  }
})
