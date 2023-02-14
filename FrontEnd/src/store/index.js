import { createStore } from 'vuex';

const store = createStore({
    state: {
        logging: false
    },

    mutations: {
        logging(state) {
            state.logging = true
        },

        logOut(state) {
            state.logging = false
        }
    },

    actions: {
        setLogIn({ commit }) {
            commit('logging');
        },

        setLogOut({ commit }) {
            commit('logOut');
        }
    }
})

export default store;