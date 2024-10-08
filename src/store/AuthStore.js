import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    persist((set) => ({
        user: null,
        login: (user) => set({user}),
        logout: () => set({ user: null}),
        setUser: (user) => set({user})
    }),

    {
        name: 'user-data',
        partialize: (state) => ({ user: state.user })   
    })
)

export default useAuthStore
