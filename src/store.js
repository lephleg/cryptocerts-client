import { configureStore } from '@reduxjs/toolkit'
import connectionReducer from './features/connection/connectionSlice';
import institutionsReducer from './features/institutions/institutionsSlice';
import certificatesReducer from './features/certificates/certificatesSlice';


export default configureStore({
  reducer: {
      connection: connectionReducer,
      institutions: institutionsReducer,
      certificates: certificatesReducer
  },
})
