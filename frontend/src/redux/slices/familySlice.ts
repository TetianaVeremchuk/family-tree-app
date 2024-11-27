import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FamilyMember {
  id: number;
  name: string;
  age: number;
  parentId?: number | null;
  children?: FamilyMember[];
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

const buildTree = (members: FamilyMember[]): FamilyMember[] => {
  const memberMap: Record<number, FamilyMember> = {};
  const tree: FamilyMember[] = [];

  members.forEach((member) => {
    memberMap[member.id] = { ...member, children: [] };
  });

  members.forEach((member) => {
    if (member.parentId) {
      const parent = memberMap[member.parentId];
      if (parent) {
        parent.children?.push(memberMap[member.id]);
      }
    } else {
      tree.push(memberMap[member.id]);
    }
  });

  return tree;
};

const familySlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    fetchFamilyTreeRequest(state) {
      state.loading = true;
    },
    fetchFamilyTreeSuccess(state, action: PayloadAction<FamilyMember[]>) {
      state.familyTree = buildTree(action.payload);
      state.loading = false;
    },
    fetchFamilyTreeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createMemberRequest(state, action: PayloadAction<FamilyMember>) {
      const newMember = action.payload;

      const findAndAddChild = (tree: FamilyMember[]): boolean => {
        for (const member of tree) {
          if (member.id === newMember.parentId) {
            if (!member.children) {
              member.children = [];
            }
            member.children.push(newMember);
            return true;
          }
          if (member.children && findAndAddChild(member.children)) {
            return true;
          }
        }
        return false;
      };

      if (newMember.parentId) {
        const added = findAndAddChild(state.familyTree);
        if (!added) {
          console.error(`Parent with ID ${newMember.parentId} not found.`);
        }
      } else {

        state.familyTree.push(newMember);
      }
    },
    updateMemberRequest(state, action: PayloadAction<FamilyMember>) {
      const updateMember = (tree: FamilyMember[]): boolean => {
        for (const member of tree) {
          if (member.id === action.payload.id) {
            member.name = action.payload.name;
            member.age = action.payload.age;
            return true;
          }
          if (member.children && updateMember(member.children)) {
            return true;
          }
        }
        return false;
      };

      const updated = updateMember(state.familyTree);
      if (!updated) {
        console.error(`Member with ID ${action.payload.id} not found.`);
      }
    },
    deleteMemberRequest(state, action: PayloadAction<number>) {
      const deleteMember = (tree: FamilyMember[]): FamilyMember[] =>
        tree.filter((member) => {
          if (member.id === action.payload) {
            return false;
          }
          if (member.children) {
            member.children = deleteMember(member.children);
          }
          return true;
        });

      state.familyTree = deleteMember(state.familyTree);
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
