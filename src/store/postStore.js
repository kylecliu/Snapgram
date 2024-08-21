import {create} from 'zustand'

const usePostStore = create((set) => ({
    posts: [],
    createPost: (post) => set(state => ({posts: [post, ...state.posts]})),
    setPosts: (posts) => set({posts}),
    deletePost: (id) => set(state => ({posts: state.posts.filter((post) => post.id !== id)})),
    addCommentToPost: (postId, commentId) => set(state => ({posts: state.posts.map((post) => {
        
        if (post.id === postId) {

            return {...post, comments: [...post.comments, commentId]}
        } 

        return post
    })})),

    likePostStore: (postId, uid) => set(state => ({posts: state.posts.map((post) => {
        
        if(post.id === postId) {

            return {...post, likes: [...post.likes, uid]}
        }

        return post
    })})),

    unlikePostStore: (postId, uid) => set(state => ({posts: state.posts.map((post) => {
        
        if(post.id === postId) {

            return {...post, likes: post.likes.filter((userId) => userId !== uid)}
        }

        return post

    })})),

    deleteCommentInPost: (commentInput) => set(state => ({ posts: 

         state.posts.map((post) => {

            console.log('deleteCommentInPost fired')

            if (post.id === commentInput.postId) {

                console.log("Found comment to delete")

                console.log(`post: ${JSON.stringify(post)} comments: ${post.comments}` )

               return { ...post, comments: post.comments.filter((comment) => comment !== commentInput.commentId)}
            }

            return post      
 
         })       

        })) 

}))
    

export default usePostStore