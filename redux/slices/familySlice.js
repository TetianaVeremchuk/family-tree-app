import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    familyTree: [],
    loading: false,
    error: null,
};
const familySlice = createSlice({
    name: 'family',
    initialState,
    reducers: {
        fetchFamilyTreeRequest(state) {
            state.loading = true;
        },
        fetchFamilyTreeSuccess(state, action) {
            state.familyTree = action.payload;
            state.loading = false;
        },
        fetchFamilyTreeFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        createMemberRequest(state, action) {
            console.log('Reducer received createMemberRequest:', action.payload);
            state.familyTree.push(action.payload);
        },
        updateMemberRequest(state, action) {
            const index = state.familyTree.findIndex((member) => member.id === action.payload.id);
            if (index !== -1) {
                state.familyTree[index] = Object.assign(Object.assign({}, state.familyTree[index]), action.payload);
            }
        },
        deleteMemberRequest(state, action) {
            state.familyTree = state.familyTree.filter((member) => member.id !== action.payload);
        },
    },
});
export const { fetchFamilyTreeRequest, fetchFamilyTreeSuccess, fetchFamilyTreeFailure, createMemberRequest, updateMemberRequest, deleteMemberRequest, } = familySlice.actions;
export default familySlice.reducer;
