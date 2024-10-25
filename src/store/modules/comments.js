import axiosInit from "@/utils/axiosInit";

export default {
    state: {
        comments: []
    },
    mutations: {
        setComments(state, comments) {
            state.comments = comments
        },
        addComment(state, comment) {
            state['comments'].push(comment)
        }
    },
    actions: {
        async fetchComments({commit}, postId) {
            const comments = await axiosInit.get('/comments', { postId })
            commit('setComments', comments)
        },
        async addComment({commit}, comment) {
            const newComment = await axiosInit.post('/comments', comment)
            commit('setComments', newComment)
        }
    },
    getters: {}
}