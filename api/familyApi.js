var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const API_URL = 'http://localhost:5000';
export const getFamilyTree = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get(`${API_URL}/api/members`);
    return response.data;
});
export const createMember = (member) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.post(`${API_URL}/api/members`, member);
    return response.data;
});
export const updateMember = (member) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.put(`${API_URL}/api/members/${member.id}`, member);
    return response.data;
});
export const deleteMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios.delete(`${API_URL}/api/members/${id}`);
});
