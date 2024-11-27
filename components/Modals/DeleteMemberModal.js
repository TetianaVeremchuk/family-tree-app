import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMemberRequest } from '../../redux/slices/familySlice';
import './Modals.scss';
const DeleteMemberModal = ({ memberId, onClose }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteMemberRequest(memberId));
        onClose();
    };
    return (React.createElement("div", { className: "modal-overlay" },
        React.createElement("div", { className: "modal" },
            React.createElement("h2", null, "Are you sure you want to delete this member?"),
            React.createElement("div", { className: "modal-actions" },
                React.createElement("button", { className: "primary", onClick: handleDelete }, "Delete"),
                React.createElement("button", { className: "secondary", onClick: onClose }, "Cancel")))));
};
export default DeleteMemberModal;
