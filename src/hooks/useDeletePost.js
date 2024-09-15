import { arrayRemove, collection, deleteDoc, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useState } from 'react';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/AuthStore';
import useCommentStore from '../store/CommentStore';
import usePostStore from '../store/postStore';
import useUserProfileStore from '../store/ProfileStore';
import useDisplayToast from './useDisplayToast';

const useDeletePost = () => {

    const [isDeleting, SetIsDeleting] = useState(false)
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)
    const {userProfile, deletePostInUserProfile} = useUserProfileStore()
    const {posts, deletePost} = usePostStore() 
    const {deletePost: deletePostCommentStore} = useCommentStore()

    const deletePostHandler = async(postId) => {

        SetIsDeleting(true)

        try{

            // Delete image in storage

            const storage = getStorage();

            const desertRef = ref(storage, `photos/${postId}`);

            await deleteObject(desertRef)


            //Delete post ID in the user document 

            const userRef = doc(firestore, "users", authUser.uid);

            await updateDoc(userRef, {
                posts: arrayRemove(postId)
              });

            //Delete the post inside the posts collection

            await deleteDoc(doc(firestore, "posts", postId));

            //Delete all the comments that are associated with this post
            
            const q = query(collection(firestore, "comments"), where("postId", "==", postId))

            const querySnapshot = await getDocs(q)

            let commentsToDelete = []

            querySnapshot.forEach((doc) => {

                commentsToDelete.push(doc.id)

            })

            const batch = writeBatch(firestore)

            commentsToDelete.forEach((commentId) => {

                const commentRef = doc(firestore, "comments", commentId)

                batch.delete(commentRef)

            })

            await batch.commit()

            //updating post, comment and userProfile stores

            deletePost(postId);

            deletePostCommentStore(postId)

            deletePostInUserProfile(postId)


            toast("Success", "Post deleted!", "success")


        } catch(error) {

            toast("Error", error.message, "error")

        } finally {

            SetIsDeleting(false)
        }

    }

    return {isDeleting, deletePostHandler}

}

export default useDeletePost
