import { createStore, Getter, GetterTree } from "vuex";

export interface IInventoryState {
  [productId: string]: number;
}

const inventoryState: IInventoryState = {};

export default createStore({
  state: {
    actions: new Set<string>(),
    inventory: inventoryState,
  },
  mutations: {
    INCREMENT_INVENTORY_ITEM_BY(
      state,
      change: { item: string; amount: number }
    ) {
      state.inventory[change.item] =
        (state.inventory[change.item] || 0) + change.amount;
    },
    STOP_ACTION(state, action) {
      state.actions.delete(action);
    },
    START_ACTION(state, action) {
      state.actions.add(action);
    },
  },
  actions: {
    incrementInventoryItemBy(
      { commit },
      value: { item: string; amount: number }
    ) {
      commit("INCREMENT_INVENTORY_ITEM_BY", value);
    },
    startAction({ commit }, action: string) {
      commit("START_ACTION", action);
    },
    stopAction({ commit }, action: string) {
      commit("STOP_ACTION", action);
    },
  },
  modules: {},
  getters: {
    woodCount: (state) => {
      return state.inventory["wood"] || 0;
    },
    isCuttingWood: (state) => {
      return state.actions.has("CUTTING_WOOD");
    },
  },
});
