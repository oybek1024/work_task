import axiosInit from "@/utils/axiosInit";

export default {
    state: {
        posts: []
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload
        },
        addPost(state, payload) {
            state.posts.push(payload)
        }
    },
    actions: {
        async fetchPosts({commit}, payload) {
            const posts = await axiosInit.get('/posts', payload)
            commit('setPosts', posts)
        },
        async addPost({commit}, payload) {
            const newPost = await axiosInit.post('/posts', payload)
            commit('addPost', newPost)
        },
        async removePost({commit, dispatch}, postId) {
            await axiosInit.remove(`/posts/${postId}`)
            dispatch('fetchPosts')
        }
    },
    getters: {
        postsData: state => state.posts
    }
}