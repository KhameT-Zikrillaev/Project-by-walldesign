import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (userData) => set({ user: userData, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  shopId: null,
  setShopId: (shopId) => set({ shopId }),
}));

export default useUserStore;
