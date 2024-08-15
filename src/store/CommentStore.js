import {create} from 'zustand'

const useCommentStore = create((set) => ({

    comments: [],
    setComments: (comments) => set({comments}),
    addComment: (comment) => set(state => ({comments: [...state.comments, comment]})),
    deletePost: (postId) => set(state => ({comments: state.comments.filter((comment) => comment.postId !== postId)}))

}))

export default useCommentStore
