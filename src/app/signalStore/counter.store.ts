import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

export interface counterState {
  count:number
}

const initialCounterState: counterState={
  count:0
};

export const counterStore=signalStore(
  withState(initialCounterState),
  withMethods(({count, ...store})=>({

    increment(){
      patchState(store,{count:count() +1})
    },

    decrement(){
      patchState(store,{count:count() -1})
    },

    reset(){
      patchState(store,{count:0})
    }

  }))
)
