import { createSlice } from '@reduxjs/toolkit'

export const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        web3Capable: false,
        connected: false,
        activeAccount: '',
        admin: '',
        role: ''
    },
    reducers: {
        setWeb3Capable: (state, action) => {
            state.web3Capable = action.payload;
        },
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        setActiveAccount: (state, action) => {
            state.activeAccount = action.payload;
        },
        setAdminAccount: (state, action) => {
            state.admin = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
    }
})

export const {
    setWeb3Capable,
    setConnected,
    setActiveAccount,
    setAdminAccount,
    setRole
} = connectionSlice.actions

export default connectionSlice.reducer;
