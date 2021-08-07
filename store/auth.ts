import { GetterTree, ActionTree, MutationTree } from 'vuex'
export const state = () => ({
  loggedIn: false
})
export type RootState = ReturnType<typeof state>
export const getters: GetterTree<RootState, RootState> = {
  isLoggedIn: state => state.loggedIn
}
export const mutations: MutationTree<RootState> = {
  LOGGED_IN: (state, newVal: boolean) => (state.loggedIn = newVal)
}
export const actions: ActionTree<RootState, RootState> = {
  login({ commit }) {
    // Some async code
    commit('LOGGED_IN', true)
  },
  logout({ commit }) {
    // Some async code
    commit('LOGGED_IN', false)
  }
}