import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import Web3 from 'web3';
import { abi as CryptoCertsAbi } from '../../contracts/CryptoCerts.json';
import { CRYPTOCERTS_CONTRACT_ADDRESS } from '../../config';

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CryptoCertsAbi, CRYPTOCERTS_CONTRACT_ADDRESS);

const institutionsAdapter = createEntityAdapter();

const initialState = institutionsAdapter.getInitialState({
    status: 'idle',
    error: null,
})

export const fetchInstitutions = createAsyncThunk('institutions/fetchInstitutions', async (_, thunkAPI) => {
    const activeAccount = thunkAPI.getState().connection.activeAccount;
    const count = await contract.methods.getInstitutionsCount().call({ from: activeAccount })
    let promises = [];
    for (let i = 0; i < count; i++) {
        let prom = contract.methods.institutions(i).call({ from: activeAccount }).then((payload) => {
            return {
                id: i + 1, // increment id in order to skip zero and match the contract institution id
                name: payload.name,
                location: payload.location,
                isValid: payload.isValid
            }
        });
        promises.push(prom);
    }
    return Promise.all(promises);
})

export function saveNewInstitution(name,location, address) {
    return async function saveNewInstitutionThunk(dispatch, getState) {
        const activeAccount = getState().connection.activeAccount;
        await contract.methods.createInstitution(name, location, address).send({ from: activeAccount });
    }
}

const institutionsSlice = createSlice({
    name: 'institutions',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchInstitutions.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchInstitutions.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            institutionsAdapter.upsertMany(state, action.payload)
        },
        [fetchInstitutions.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        }
    },
});

export const { institutionCreated } = institutionsSlice.actions;

export default institutionsSlice.reducer;

export const {
    selectAll: selectAllInstitutions,
    selectById: selectInstitutionsById,
    selectIds: selectInstitutionIds,
} = institutionsAdapter.getSelectors((state) => state.institutions)

//   export const selectPostsByUser = createSelector(
//     [selectAllPosts, (state, userId) => userId],
//     (posts, userId) => posts.filter((post) => post.user === userId)
//   )