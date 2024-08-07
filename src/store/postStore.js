import {create} from 'zustand'

const usePostStore = create((set) => ({
    posts: [],
    createPost: (post) => set(state => ({posts: [post, ...state.posts]})),
    setPosts: (posts) => set({posts}),
    deletePost: (id) => set(state => ({posts: state.posts.filter((post) => post.id !== id)})),
    addCommentToPost: (id, comment) => set(state => ({posts: state.posts.map((post) => {
        
        if (post.id === id) {

            return {...post, comments: [...post.comments, comment]}
        } 

        return post
    })})),

    likePostStore: (postId, uid) => (state => ({posts: state.posts.map((post) => {
        
        if(post.id === postId) {
            return {...post, likes: [...post.likes, uid]}
        }
    })})),

    unlikePostStore: (postId, uid) => (state => ({posts: state.posts.map((post) => {
        
        if(post.id === postId) {
            return {...post, likes: post.likes.filter((userId) => userId !== uid)}
        }
    })}))
}))
    

export default usePostStore