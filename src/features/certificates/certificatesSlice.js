import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import Web3 from 'web3';
import { abi as CryptoCertsAbi } from '../../contracts/CryptoCerts.json';
import { CRYPTOCERTS_CONTRACT_ADDRESS } from '../../config';
import { getBytes32FromMultihash } from '../../utils/multihash';

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CryptoCertsAbi, CRYPTOCERTS_CONTRACT_ADDRESS);

const certificatesAdapter = createEntityAdapter();

const initialState = certificatesAdapter.getInitialState({
    status: 'idle',
    error: null,
})

export const fetchCertificates = createAsyncThunk('certificates/fetchCertificates', async (_, thunkAPI) => {
    const activeAccount = thunkAPI.getState().connection.activeAccount;
    let count = await contract.methods.getCertificatesCount().call({ from: activeAccount })
    let promises = [];
    for (let i = 0; i < count; i++) {
        promises.push(fetchCertificate(i, activeAccount));
    }
    return Promise.all(promises);
})

async function fetchCertificate(index, account = null) {
    // increment index in order to match the contract certificate id
    let certId = parseInt(index) + 1;
    let institutionAddress = await contract.methods.certificateToInstitution(certId).call({ from: account });
    let studentAddress = await contract.methods.certificateToStudent(certId).call({ from: account });

    return contract.methods.certificates(index).call({ from: account }).then((payload) => {
        return {
            id: certId,
            title: payload.title,
            student: studentAddress,
            institution: institutionAddress,
            digest: payload.digest,
            hashFunction: payload.hashFunction,
            size: payload.size,
            createdAt: payload.created_at,
        }
    })
}

export function saveNewCertificate(title, studentAddress, cid) {
    return async function saveNewCertificateThunk(dispatch, getState) {
        let activeAccount = getState().connection.activeAccount;
        let { digest, hashFunction, size } = getBytes32FromMultihash(cid);
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