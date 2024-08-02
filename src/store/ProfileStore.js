import React from 'react';
import { create } from 'zustand';

const useUserProfileStore = create((set) => ({
    userProfile: null, 
    setUserProfile: (userProfile) => set({userProfile}),
    addPost: (post) => set(state => ({userProfile: {...state.userProfile, posts: [post.id, ...state.userProfile.posts]}}))//to update profile page's number of posts 

}))     

export default useUserProfileStore