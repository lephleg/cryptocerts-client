import { configureStore } from '@reduxjs/toolkit'
import connectionReducer from './connectionSlice';
import institutionsReducer from './institutionsSlice';
import certificatesReducer from './certificatesSlice';


export default configureStore({
  reducer: {
      connection: connectionReducer,
      institutions: institutionsReducer,
      certificates: certificatesReducer
  },
})
