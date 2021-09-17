import { createStore } from "vuex";

export default createStore({
  state: {
    error: false
  },
  getters: {
    getError:(state:any) => state.error
  },
  mutations: {
    changeError(state:any, val:any) {
      state.error = val;
    }
  },
  actions: {
    changeErrorAction(context:any, val:any) {
      context.commit("changeError", val);
    }
  },
  modules: {}
});
