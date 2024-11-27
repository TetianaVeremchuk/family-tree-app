import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMemberRequest } from '../../redux/slices/familySlice';
import './Modals.scss';
const CreateMemberModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [parentId, setParentId] = useState();
    const [errors, setErrors] = useState({ name: false, age: false });
    const handleCreate = () => {
        const hasErrors = {
            name: !name.trim(),
            age: !age,
        };
        setErrors(hasErrors);
        if (!hasErrors.name && !hasErrors.age) {
            const newMember = {
                id: Date.now(),
                name: name.trim(),
                age: Number(age),
                parentId: parentId || undefined,
            };
            console.log('Dispatching createMemberRequest:', newMember);
            dispatch(createMemberRequest(newMember));
            onClose();
        }
    };
    return (React.createElement("div", { className: "modal-overlay" },
        React.createElement("div", { className: "modal" },
            React.createElement("h2", null, "Create Member"),
            React.createElement("div", { className: "form-group" },
                React.createElement("input", { className: `form-input ${errors.name ? 'error' : ''}`, type: "text", placeholder: "Name", value: name, onChange: (e) => setName(e.target.value) }),
                errors.name && React.createElement("span", { className: "error-message" }, "Name is required")),
            React.createElement("div", { className: "form-group" },
                React.createElement("input", { className: `form-input ${errors.age ? 'error' : ''}`, type: "number", placeholder: "Age", value: age, onChange: (e) => setAge(e.target.value === '' ? '' : Number(e.target.value)) }),
                errors.age && React.createElement("span", { className: "error-message" }, "Age is required")),
            React.createElement("div", { className: "form-group" },
                React.createElement("input", { className: "form-input", type: "number", placeholder: "Parent ID (optional)", value: parentId || '', onChange: (e) => setParentId(e.target.value === '' ? undefined : Number(e.target.value)) })),
            React.createElement("div", { className: "modal-actions" },
                React.createElement("button", { className: "primary", onClick: handleCreate }, "Create"),
                React.createElement("button", { className: "secondary", onClick: onClose }, "Cancel")))));
};
export default CreateMemberModal;
