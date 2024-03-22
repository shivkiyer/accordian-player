import { configureStore } from '@reduxjs/toolkit';

import videoReducer from './videoReducer';

export default configureStore({
  reducer: {
    video: videoReducer,
  },
});
