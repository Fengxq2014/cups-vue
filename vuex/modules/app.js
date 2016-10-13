import {
  START_LOADING,
  FINISH_LOADING
} from '../mutation-type'

const state = {
  leftNavState: false,
  loading: false,
  menuSelected: 1,
  jsonData: {},
  cardList: []
}

export const mutations = {
  [START_LOADING] (state) {
    state.loading = true
  },
  [FINISH_LOADING] (state) {
    state.loading = false
  },
  CHANGE_MENU_SELECTED (state, selectedID) {
    state.menuSelected = selectedID
  },
  FETCH_JSON_DATA (state, data) {
    state.jsonData = data
  },
  FETCH_CARD_LIST (state, data) {
    state.cardList = data
  }
}

export default{
  state,
  mutations
}
