import React from 'react'
import { create } from 'zustand';

const useAuthStore = create((set) => ({
        user: JSON.parse(localStorage.getItem('user_info')) || null,
        login: (user) => set({user}),
        logout: () => set({ user: null}),
        setUser: (user) => set({user})
    }))


export default useAuthStore
