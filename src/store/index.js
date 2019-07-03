import Vue from 'vue'
import Vuex from 'vuex'

import items from './mock'

Vue.use(Vuex)

const { getGuid } = require('@/common/functions');

export default new Vuex.Store({
  state: {
    items: items,
    loading: false,
    isSearchMode: false,
    filterItemsByName: false,
    snackMsg: false
  },
  getters: {
    items(state) {
      return state.items
    },
    FILTER_ITEMS_BY_NAME(state) {
      return state.filterItemsByName
    },
    IS_SEARCH_MODE(state) {
      return state.isSearchMode
    },
    FILTERED_ITEMS(state) {
      if(state.filterItemsByName) {
        return state.items.filter( item => item.name.match(new RegExp(state.filterItemsByName, 'gim')) )
      }
      return state.items
    },
    SNACK_MSG(state) {
      return state.snackMsg
    }
  },
  mutations: {
    SET_LOADING_ON(state) { state.loading = true },
    SET_LOADING_OFF(state) { state.loading = false },
    SET_IS_SEARCH_MODE(state, mode) {state.isSearchMode = mode}, 
    DELETE_ITEM(state, guid) {
      state.items = state.items.filter( item => item.guid != guid)
    },
    SET_FILTER_BY_NAME(state, name) {
      state.filterItemsByName = name
    },
    SET_ITEM(state, newItem) {
      newItem.updatedAt = +new Date
      for(const item of state.items) { 
        if(item.guid === newItem.guid) {
          Object.assign(item, newItem)
          break;
        }
      }
    },
    NEW_ITEM(state, newItem) {
      newItem.createdAt = +new Date
      newItem.guid = getGuid()
      state.items.push(newItem)

    },
    SET_SNACK_MSG(state, msg) {
      state.snackMsg = msg
    }
  },
  actions: {

  }
})
