import api from '~api'

const state = {
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    }
}

const actions = {
    async ['global/getCommentList']({commit, rootState: {route: { path, params: { id } }}}, config) {
        const { data: { data, code} } = await api.get('frontend/comment/list', { id, ...config })
        if (data && code === 200) {
            commit('global/recevieCommentList', {
                ...config,
                ...data,
                path
            })
        }
    }
}

const mutations = {
    ['global/recevieCommentList'](state, {list, hasNext, hasPrev, page, path}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        state.lists = {
            data: list, hasNext, hasPrev, page, path
        }
    },
    ['global/insertCommentItem'](state, data) {
        state.lists.data = [data].concat(state.lists.data)
    },
    ['global/deleteComment'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        obj.is_delete = 1
    },
    ['global/recoverComment'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        obj.is_delete = 0
    }
}

const getters = {
    ['global/getCommentList'](state) {
        return state.lists
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
