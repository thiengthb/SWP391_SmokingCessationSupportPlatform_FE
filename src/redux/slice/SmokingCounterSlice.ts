import { createSlice } from "@reduxjs/toolkit";

export interface SmokingCounterState {
    value: number;
}

const initialState : SmokingCounterState = {
    value: 0
}

const MAX_COUNTER_VALUE = 1000;
const MIN_COUNTER_VALUE = 0;

const SmokingCounterSlice = createSlice({
    name: "smokingCounter",
    initialState,
    reducers: {
        valueSubtract: (state) => {
            if (state.value > MIN_COUNTER_VALUE) {
                state.value--;
            }
        },
        valueAdd: (state) => {
            if (state.value < MAX_COUNTER_VALUE) {
                state.value++;
            }
        }
    }
})

export const {
    valueAdd,
    valueSubtract
} = SmokingCounterSlice.actions;

export default SmokingCounterSlice.reducer;