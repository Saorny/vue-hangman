import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  word: ''
}

const mutations = {
  FETCH_WORD (state, word) {
    state.word = word
  }
}

export default new Vuex.Store({
  state,
  mutations
})
