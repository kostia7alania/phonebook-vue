import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import items from './mock'
const { getGuid, compare, convertToCSV } = require('@/common/functions');
import { saveAs } from 'file-saver';

import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
  plugins: [createPersistedState()],
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
    COUNT_FILTERED_ITEMS(state, getters) {
      return getters.FILTERED_ITEMS.length
    },
    FILTERED_ITEMS(state) {
      let items = state.items
      if(state.filterItemsByName) {
        items = state.items.filter( item => item.name.match(new RegExp(state.filterItemsByName, 'gim')) )
      }
      if(!items.length) return []
      return items.sort(compare);
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
      //state.items = state.items.filter( item => item.guid != guid)
      state.items.some((item,index)=> {
        if(item.guid === guid) {
          return Vue.delete( state.items, index)
        }
      })
      
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
    IMPORT_SET_ITEM(state, newItem) {
      state.items.push(newItem)
    },
    IMPORT_NEW_ITEM(state, {item, newItem}) {
      Object.assign(item, newItem)
    },
    SET_SNACK_MSG(state, msg) {
      state.snackMsg = msg
    }
  },
  actions: {
    SAVE_CONTACTS({state}) { 
      const str = JSON.stringify(state.items)
      const blob = new Blob([str], {type: "text/plain;charset=utf-8"});
      saveAs.saveAs(blob, `Contacts backup ${new Date().toLocaleString()}.json`);
    },
    SAVE_CONTACTS_CSV({state}) { 
      const csv = convertToCSV(state.items)
      const blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
      saveAs.saveAs(blob, `Contacts backup ${new Date().toLocaleString()}.csv`);
    },


    IMPORT_ITEMS({state, commit}, newItems) {
      let created = 0
      let merged = 0

      for(const newItem of newItems) {
        newItem.importedAt = +new Date
        let isSeted
        for(const item of state.items) {
          if(item.guid === newItem.guid) {
            commit('IMPORT_NEW_ITEM', {item, newItem} ) 
            isSeted = true
            merged++
            break;
          }
        }
        if(!isSeted) {
          commit('IMPORT_SET_ITEM',  newItem) 
          created++
        }
      }

      return { created, merged }
    },

  },
})
