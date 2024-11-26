import axios from 'axios';
import { FamilyMember } from '../redux/slices/familySlice';

const API_URL = 'http://localhost:5000';

export const getFamilyTree = async () => {
  const response = await axios.get(`${API_URL}/api/members`);
  return response.data;
};

export const createMember = async (member: FamilyMember): Promise<FamilyMember> => {
  const response = await axios.post<FamilyMember>(`${API_URL}/api/members`, member);
  return response.data;
};

export const updateMember = async (member: FamilyMember): Promise<FamilyMember> => {
  const response = await axios.put<FamilyMember>(`${API_URL}/api/members/${member.id}`, member);
  return response.data;
};

export const deleteMember = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/api/members/${id}`);
};