import vue from 'vue'
import {config} from '../static/config'
/**
 * Created by zhengguorong on 16/6/22.
 */
/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
const _get = ({ url, query }, commit) => {
  if (commit) commit('START_LOADING')
  let _url
  if (query) {
    _url = `${config.apiurl}/${url}?${query}`
  } else {
    _url = `${config.apiurl}/${url}`
  }

  return vue.http.get(_url)
    .then((res) => {
      if (commit) commit('FINISH_LOADING')
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    }, (err) => {
      if (commit) commit('FINISH_LOADING')
      console.log(err)
    })
}

const _put = ({ url, data }, commit) => {
  if (commit) commit('START_LOADING')
  let _url = `${config.apiurl}/${url}`
  return vue.http.put(_url, data)
    .then((res) => {
      if (commit) commit('FINISH_LOADING')
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    }, (err) => {
      if (commit) commit('FINISH_LOADING')
      console.log(err)
    })
}

const _post = ({ url, data }, commit) => {
  if (commit) commit('START_LOADING')
  let _url = `${config.apiurl}/${url}`
  return vue.http.post(_url, data)
    .then((res) => {
      if (commit) commit('FINISH_LOADING')
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    }, (err) => {
      if (commit) commit('FINISH_LOADING')
      console.log(err)
    })
}

const _delete = ({ url, data }, commit) => {
  if (commit) commit('START_LOADING')
  let _url = `${config.apiurl}/${url}/${data}`
  return vue.http.delete(_url)
    .then((res) => {
      if (commit) commit('FINISH_LOADING')
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(new Error(res.status))
    }, (err) => {
      if (commit) commit('FINISH_LOADING')
      console.log(err)
    })
}

/**
 * 获取即将开始电影列表
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {Number} page             页数
 * @param  {Number} count             每页数量
 * @return {Promise}                  Promise
 */
export const fetchComingSoonLists = ({ commit }, page, count) => {
  const url = '/film/coming-soon'
  const query = `count=${count}&page=${page}&_t=` + new Date().getTime()
  return _get({url, query}, commit)
    .then((json) => {
      if (json.status === 0) {
        return commit('FETCH_COMING_SOON_SUCCESS', json.data)
      }
      return Promise.reject(new Error('fetchFilmsLists failure'))
    })
    .catch((error) => {
      // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
      return Promise.reject(error)
    })
}
/**
 * 获取正在热映电影列表
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {Number} page             页数
 * @param  {Number} count             每页数量
 * @return {Promise}                  Promise
 */
export const fetchNowPlayingLists = ({ commit }, page, count) => {
  const url = '/film/now-playing'
  const query = `count=${count}&page=${page}&_t=` + new Date().getTime()
  return _get({ url, query }, commit)
    .then((json) => {
      if (json.status === 0) {
        return commit('FETCH_NOW_PLAYING_SUCCESS', json.data)
      }
      return Promise.reject(new Error('FETCH_NOW_PLAYING failure'))
    })
    .catch((error) => {
      // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
      return Promise.reject(error)
    })
}
/**
 * 获取电影详情
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {Number} id             电影id
 * @return {Promise}                  Promise
 */
export const fetchFilmDetail = ({commit}, id) => {
  const url = '/film/' + id
  const query = '_t=' + new Date().getTime()
  return _get({ url, query }, commit)
    .then((json) => {
      if (json.status === 0) {
        return commit('FETCH_DETAIL_SUCCESS', json.data)
      }
      return Promise.reject(new Error('FETCH_DETAIL failure'))
    })
    .catch((error) => {
      // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
      return Promise.reject(error)
    })
}
/**
 * 获取广告
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {Number} id             电影id
 * @return {Promise}                  Promise
 */
export const fetchBillboards = ({commit}) => {
  const url = '/billboard/home'
  const query = '_t=' + new Date().getTime()
  return _get({ url, query }, commit)
    .then((json) => {
      if (json.status === 0) {
        return commit('FETCH_BANNER_SUCCESS', json.data)
      }
      return Promise.reject(new Error('FETCH_BANNER_SUCCESS failure'))
    })
    .catch((error) => {
      // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
      return Promise.reject(error)
    })
}

export const changeMenuState = ({commit}, selectedID) => {
  commit('CHANGE_MENU_SELECTED', selectedID)
}

export const showMenu = ({commit}) => {
  commit('SHOW_MENU')
}

export const hideMenu = ({commit}) => {
  commit('HIDE_MENU')
}

export const fetchJsonData = ({commit}) => {
  const url = 'swagger/swagger.json'
  return _get({ url }, commit)
    .then((json) => {
      if (json) {
        return commit('FETCH_JSON_DATA', json.tags)
      }
      return Promise.reject(new Error('FETCH_JSON_DATA failure'))
    })
    .catch((error) => {
      console.log(error)
      // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
      return Promise.reject(error)
    })
}

export const fetchCardList = ({commit}) => {
  const url = 'cups/card/getcard'
  return _get({ url }, commit)
    .then((json) => {
      if (json) {
        return commit('FETCH_CARD_LIST', json.CardList)
      }
      return Promise.reject(new Error('FETCH_JSON_DATA failure'))
    })
    .catch((error) => {
      // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
      return Promise.reject(error)
    })
}

export const fetchUserList = ({commit}) => {
  const url = 'cups/user'
  return _get({ url }, commit)
    .then((json) => {
      if (json) {
        return commit('FETCH_USER_LIST', json)
      }
      return Promise.reject(new Error('FETCH_JSON_DATA failure'))
    })
    .catch((error) => {
      // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
      return Promise.reject(error)
    })
}

export const fetchTransList = ({commit}) => {
  const url = 'cups/trans'
  return _get({ url }, commit)
    .then((json) => {
      if (json) {
        return commit('FETCH_TRANS_LIST', json)
      }
      return Promise.reject(new Error('FETCH_JSON_DATA failure'))
    })
    .catch((error) => {
      // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
      return Promise.reject(error)
    })
}

export const putCard = ({commit}, data) => {
  const url = `cups/card/`
  return _put({ url, data }, commit)
    .then((json) => {
      if (json && json.retCode === '0000') {
        commit('CHANGE_AJAXSTATE', 'success')
        return Promise.resolve()
      }
      return Promise.reject(json.retMsg)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export const putUser = ({commit}, data) => {
  const url = `cups/user/`
  return _put({ url, data }, commit)
    .then((json) => {
      if (json && json.retCode === '0000') {
        commit('CHANGE_AJAXSTATE', 'success')
        return Promise.resolve()
      }
      return Promise.reject(json.retMsg)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export const postCard = ({commit}, data) => {
  const url = `cups/card/`
  return _post({ url, data }, commit)
    .then((json) => {
      if (json && json.retCode === '0000') {
        commit('CHANGE_AJAXSTATE', 'success')
        return Promise.resolve()
      }
      return Promise.reject(json.retMsg)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export const postUser = ({commit}, data) => {
  const url = `cups/user`
  return _post({ url, data }, commit)
    .then((json) => {
      if (json && json.retCode === '0000') {
        commit('CHANGE_AJAXSTATE', 'success')
        return Promise.resolve()
      }
      return Promise.reject(json.retMsg)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export const deleteCard = ({commit}, data) => {
  const url = `cups/card`
  return _delete({ url, data }, commit)
    .then((json) => {
      if (json && json.retCode === '0000') {
        commit('CHANGE_AJAXSTATE', 'success')
        return Promise.resolve()
      }
      return Promise.reject(json.retMsg)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

export const deleteUser = ({commit}, data) => {
  const url = `cups/user`
  return _delete({ url, data }, commit)
    .then((json) => {
      if (json && json.retCode === '0000') {
        commit('CHANGE_AJAXSTATE', 'success')
        return Promise.resolve()
      }
      return Promise.reject(json.retMsg)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

export const login = ({commit}, data) => {
  const url = `https://kpi.seuic.info/api/login`
  return vue.http.post(url, data, {headers: {'Custom-Auth-Name': data.account}})
    .then((json) => {
      if (json && json.data && json.data.result === true) {
        commit('CHANGE_AJAXSTATE', 'success')
        return Promise.resolve()
      }
      return Promise.reject(json)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
