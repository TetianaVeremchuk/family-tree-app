import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMemberRequest } from '../../redux/slices/familySlice';
import './Modals.scss';
const UpdateMemberModal = ({ member, onClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(member.name);
    const [age, setAge] = useState(member.age);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isAgeValid, setIsAgeValid] = useState(true);
    const handleUpdate = () => {
        const validName = name.trim() !== '';
        const validAge = age !== '' && Number(age) > 0;
        setIsNameValid(validName);
        setIsAgeValid(validAge);
        if (validName && validAge) {
            dispatch(updateMemberRequest({ id: member.id, name, age: Number(age) }));
            onClose();
        }
    };
    return (React.createElement("div", { className: "modal-overlay" },
        React.createElement("div", { className: "modal" },
            React.createElement("h2", null, "Update Member"),
            React.createElement("div", { className: "form-group" },
                React.createElement("input", { type: "text", placeholder: "Name", value: name, onChange: (e) => setName(e.target.value), className: `form-input ${!isNameValid ? 'error' : ''}` }),
                !isNameValid && React.createElement("div", { className: "error-message" }, "Name is required")),
            React.createElement("div", { className: "form-group" },
                React.createElement("input", { type: "number", placeholder: "Age", value: age, onChange: (e) => setAge(e.target.value === '' ? '' : Number(e.target.value)), className: `form-input ${!isAgeValid ? 'error' : ''}` }),
                !isAgeValid && React.createElement("div", { className: "error-message" }, "Age must be greater than 0")),
            React.createElement("div", { className: "modal-actions" },
                React.createElement("button", { className: "primary", onClick: handleUpdate }, "Update"),
                React.createElement("button", { className: "secondary", onClick: onClose }, "Cancel")))));
};
export default UpdateMemberModal;
