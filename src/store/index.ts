import {
  ACTION_GATHER_STONE,
  ACTION_GATHER_WOOD,
  RESOURCE_ID_STONE,
  RESOURCE_ID_WOOD,
  TICKS_PER_SECOND,
} from "./../constants";
import { createStore, GetterTree } from "vuex";

export interface IInventoryState {
  [productId: string]: number;
}

export interface IProgressTowardsState {
  [productId: string]: { value: number; progressPerItem: number };
}

const inventoryState: IInventoryState = {};
const progressTowards: IProgressTowardsState = {};

const generateResourceGetters: (
  productIds: string[]
) => GetterTree<IState, IState> = (productIds: string[]) => {
  var getters: GetterTree<IState, IState> = {};

  productIds.forEach((productId) => {
    getters[`${productId}Count`] = (state) => {
      return state.inventory[productId] || 0;
    };

    getters[`${productId}ProgressToNext`] = (state: IState) => {
      const progress = state.progressTowards[productId];
      if (!progress) return 0;

      return (
        (progress.value % progress.progressPerItem) / progress.progressPerItem
      );
    };

    getters[`${productId}SecondsPer`] = (state: IState) => {
      const progress = state.progressTowards[productId];
      if (!progress) return 0;

      return progress.progressPerItem / TICKS_PER_SECOND;
    };
  });

  return getters;
};

const generateActionGetters: (
  actions: string[]
) => GetterTree<IState, IState> = (actions: string[]) => {
  var getters: GetterTree<IState, IState> = {};

  actions.forEach((action) => {
    getters[`IS_${action}`] = (state) => {
      return state.actions.has(action);
    };
  });

  return getters;
};

const generatedResourceGetters: GetterTree<
  IState,
  IState
> = generateResourceGetters([RESOURCE_ID_STONE, RESOURCE_ID_WOOD]);

const generatedActionGetters: GetterTree<
  IState,
  IState
> = generateActionGetters([ACTION_GATHER_STONE, ACTION_GATHER_WOOD]);

interface IState {
  actions: Set<string>;
  inventory: IInventoryState;
  progressTowards: IProgressTowardsState;
}

const initialState: IState = {
  actions: new Set<string>(),
  inventory: inventoryState,
  progressTowards: progressTowards,
};

export default createStore({
  state: initialState,
  mutations: {
    INCREMENT_INVENTORY_ITEM_BY(
      state,
      change: { item: string; amount: number }
    ) {
      state.inventory[change.item] =
        (state.inventory[change.item] || 0) + change.amount;
    },
    INCREMENT_PROGRESS_TOWARDS_BY(
      state,
      change: { item: string; amount: number; progressPerItem: number }
    ) {
      let object = state.progressTowards[change.item] || {
        value: 0,
        progressPerItem: change.progressPerItem,
      };
      object.progressPerItem = change.progressPerItem;

      let newProgress = object.value + change.amount;
      if (newProgress >= object.progressPerItem) {
        // Create new items
        let newItemsToCreate = Math.floor(newProgress / object.progressPerItem);
        state.inventory[change.item] =
          (state.inventory[change.item] || 0) + newItemsToCreate;

        // Set remaining progress
        let remainder = newProgress % object.progressPerItem;
        object.value = remainder;
      } else {
        object.value = newProgress;
      }

      state.progressTowards[change.item] = object;
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
    incrementProgressTowardsBy(
      { commit },
      value: { item: string; amount: number; progressPerItem: number }
    ) {
      commit("INCREMENT_PROGRESS_TOWARDS_BY", value);
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
    ...generatedResourceGetters,
    ...generatedActionGetters,
  },
});
