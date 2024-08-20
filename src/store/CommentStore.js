import {create} from 'zustand'

const useCommentStore = create((set) => ({

    comments: [],
    setComments: (comments) => set({comments}),
    addComment: (comment) => set(state => ({comments: [...state.comments, comment]})),
    deleteComment: (commentInput) => set(state => ({comments: state.comments.filter((comment) => comment.commentId !== commentInput.commentId)})), 
    deletePost: (postId) => set(state => ({comments: state.comments.filter((comment) => comment.postId !== postId)})),
    likeComment: (commentInput, uid) => set(state => ({comments: state.comments.map((comment) => {

        if(comment.commentId === commentInput.commentId) {

            return [...state.comments, {...comment, likedBy: comment.likedBy.push(uid)}]
            
        } else {return}
    })})),

    unlikeComment: (commentInput, uid) => set(state => ({comments: state.comments.map((comment) => {

        if(comment.commentId === commentInput.commentId) {

            return [...state.comments, {...comment, likeBy: comment.likedBy.filter((like) => like !== uid)}]
            
        } else {return}
    })}))

}))

export default useCommentStore
