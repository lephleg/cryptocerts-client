import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import Web3 from 'web3';
import { abi as CryptoCertsAbi } from '../../contracts/CryptoCerts.json';
import { CRYPTOCERTS_CONTRACT_ADDRESS } from '../../config';
import { getBytes32FromMultiash } from '../../utils/multihash';

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CryptoCertsAbi, CRYPTOCERTS_CONTRACT_ADDRESS);

const certificatesAdapter = createEntityAdapter();

const initialState = certificatesAdapter.getInitialState({
    status: 'idle',
    error: null,
})

export const fetchCertificates = createAsyncThunk('certificates/fetchCertificates', async (_, thunkAPI) => {
    const activeAccount = thunkAPI.getState().connection.activeAccount;
    const role = thunkAPI.getState().connection.role;
    let certificateIds;

    if (role === 'institution') {
        certificateIds = await contract.methods.getCertificatesByInstitution(activeAccount).call({ from: activeAccount });
    } else if (role === 'student') {
        certificateIds = await contract.methods.getCertificatesByStudent(activeAccount).call({ from: activeAccount });
    }

    let promises = [];
    for (let i = 0; i < certificateIds.length; i++) {
        let prom = contract.methods.certificates(certificateIds[i]).call({ from: activeAccount }).then((payload) => {
            return {
                id: parseInt(certificateIds[i]) + 1, // increment id in order to skip zero and match the contract certificate id
                title: payload.title,
                digest: payload.digest,
                hashFunction: payload.hashFunction,
                size: payload.size,
                createdAt: payload.created_at,
            }
        });
        promises.push(prom);
    }
    return Promise.all(promises);
})

export function saveNewCertificate(title, studentAddress, cid) {
    return async function saveNewCertificateThunk(dispatch, getState) {
        let activeAccount = getState().connection.activeAccount;
        let { digest, hashFunction, size } = getBytes32FromMultiash(cid);
        await contract.methods.createCertificate(title, digest, hashFunction, size, studentAddress).send({ from: activeAccount });
    }
}

const certificatesSlice = createSlice({
    name: 'certificates',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCertificates.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchCertificates.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            certificatesAdapter.upsertMany(state, action.payload)
        },
        [fetchCertificates.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action
            console.error(action);
        }
    },
});

export const { certificateCreated } = certificatesSlice.actions;

export default certificatesSlice.reducer;

export const {
    selectAll: selectAllCertificates,
    selectById: selectCertificateById,
    selectIds: selectCertificateIds,
} = certificatesAdapter.getSelectors((state) => state.certificates)