import {configureStore} from '@reduxjs/toolkit';
import SmokingCounterSlice from '../slice/SmokingCounterSlice';

const store = configureStore({
  reducer: {    
    counter: SmokingCounterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;    
export default store;