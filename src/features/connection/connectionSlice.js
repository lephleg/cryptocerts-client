import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Web3 from 'web3';
import { abi as CryptoCertsAbi } from '../../contracts/CryptoCerts.json';
import { CRYPTOCERTS_CONTRACT_ADDRESS } from '../../config';

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CryptoCertsAbi, CRYPTOCERTS_CONTRACT_ADDRESS);

export const determineRole = createAsyncThunk('connection/determineRole', async (_, { getState }) => {
    const { activeAccount, admin } = getState().connection;

    if (activeAccount) {
        if (activeAccount === admin) {
            return Promise.resolve('admin');
        }

        let institutionId = await contract.methods.ownerToInstitution(activeAccount).call();
        if (institutionId > 0) {
            return Promise.resolve('institution');
        }

        let certificateCount = await contract.methods.studentCertificatesCount(activeAccount).call();
        if (certificateCount > 0) {
            return Promise.resolve('student');
        }
    }

    return Promise.resolve('');
})

export const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        web3Capable: false,
        connected: false,
        activeAccount: '',
        admin: '',
        role: '',
        roleStatus: 'idle'
    },
    reducers: {
        setWeb3Capable: (state, action) => {
            state.web3Capable = action.payload;
        },
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        setActiveAccount: (state, action) => {
            let activeAccount = '';
            if (action.payload.length) {
                activeAccount = action.payload[0];
            }
            state.activeAccount = activeAccount;
        },
        setAdminAccount: (state, action) => {
            state.admin = action.payload;
        },
    },
    extraReducers: {
        [determineRole.pending]: (state, action) => {
            state.roleStatus = 'loading'
        },
        [determineRole.fulfilled]: (state, action) => {
            state.role = action.payload;
            state.roleStatus = 'succeeded'
        },
        [determineRole.rejected]: (state, action) => {
            state.roleStatus = 'failed'
        }
    }
})

export const {
    setWeb3Capable,
    setConnected,
    setActiveAccount,
    setAdminAccount,
} = connectionSlice.actions

export default connectionSlice.reducer;
