import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FamilyMember {
  id: number;
  name: string;
  age: number;
  parentId?: number;
}

interface FamilyState {
  familyTree: FamilyMember[];
  loading: boolean;
  error: string | null;
}

const initialState: FamilyState = {
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
    fetchFamilyTreeSuccess(state, action: PayloadAction<FamilyMember[]>) {
      state.familyTree = action.payload;
      state.loading = false;
    },
    fetchFamilyTreeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createMemberRequest(state, action: PayloadAction<FamilyMember>) {
      console.log('Reducer received createMemberRequest:', action.payload);
      state.familyTree.push(action.payload);
    },
    updateMemberRequest(state, action: PayloadAction<FamilyMember>) {
      const index = state.familyTree.findIndex((member) => member.id === action.payload.id);
      if (index !== -1) {
        state.familyTree[index] = { ...state.familyTree[index], ...action.payload };
      }
    },
    deleteMemberRequest(state, action: PayloadAction<number>) {
      state.familyTree = state.familyTree.filter((member) => member.id !== action.payload);
    },
  },
});

export const {
  fetchFamilyTreeRequest,
  fetchFamilyTreeSuccess,
  fetchFamilyTreeFailure,
  createMemberRequest,
  updateMemberRequest,
  deleteMemberRequest,
} = familySlice.actions;

export default familySlice.reducer;