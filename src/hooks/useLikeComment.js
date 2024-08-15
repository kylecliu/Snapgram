// import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore'
// import { useState } from 'react'
// import { firestore } from '../firebase/firebase'
// import usePostStore from '../store/postStore'

// const useLikeComment = (comment) => {

//     const [isUpdating, setIsUpdating] = useState(false)
//     const authUser = useAuthStore(state => state.user)
//     const [isLiked, setIsLiked] = useState(comment.likedBy.includes(authUser.uid)) 
//     const likeComment = async(postId) => {

//         if(isUpdating) return
    
//         try {

//             const postRef = doc(firestore, "posts", postId)
//             const docSnap = await getDoc(postRef)

//             const postToUpdate = docSnap.data()

//             if(postToUpdate.comments.likedBy.includes(authUser.uid)){
//                 //To unlike
//                 await updateDoc(postRef, {

//                     "comments.likes": arrayRemove(authUser.uid)
//                 })

//                 setIsLikedComment(false)

//             } else {
//                 //To like
//                 await updateDoc(postRef, {

//                     "comments.likes": arrayUnion(authUser.uid)
//                 })

//                 setIsLikedComment(true)
//             }

            
//         } catch (error) {

//             toast("Error", error.message, "error")
            
//         } finally {

//             setIsUpdating(false)
//         }

//     }

//     return { isLikedComment, likeComment }
    
// }

// export default useLikeComment
