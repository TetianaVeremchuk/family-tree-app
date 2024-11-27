import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFamilyTreeRequest } from '../../redux/slices/familySlice';
import CreateMemberModal from '../Modals/CreateMemberModal';
import UpdateMemberModal from '../Modals/UpdateMemberModal';
import DeleteMemberModal from '../Modals/DeleteMemberModal';
import './FamilyTree.scss';
const FamilyTree = () => {
    const dispatch = useDispatch();
    const { familyTree, loading, error } = useSelector((state) => state.family);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    useEffect(() => {
        dispatch(fetchFamilyTreeRequest());
    }, [dispatch]);
    const renderTree = (tree) => tree.map((member) => (React.createElement("div", { key: member.id, className: "family-member" },
        React.createElement("div", { className: "member-info" },
            React.createElement("span", { className: "member-name" }, member.name),
            React.createElement("span", { className: "member-age" },
                "(",
                member.age,
                " years)"),
            React.createElement("div", { className: "action-buttons" },
                React.createElement("button", { className: "update-button", onClick: () => {
                        setSelectedMember(member);
                        setShowUpdateModal(true);
                    } }, "Update"),
                React.createElement("button", { className: "delete-button", onClick: () => {
                        setSelectedMember(member.id);
                        setShowDeleteModal(true);
                    } }, "Delete"))),
        member.children && React.createElement("div", { className: "children" }, renderTree(member.children)))));
    return (React.createElement("div", { className: "family-tree" },
        React.createElement("h2", null, "Family Tree"),
        React.createElement("button", { className: "add-member-button", onClick: () => setShowCreateModal(true) }, "Add Member"),
        loading && React.createElement("p", null, "Loading..."),
        error && React.createElement("p", { style: { color: 'red' } }, error),
        !loading && !error && renderTree(familyTree),
        showCreateModal && React.createElement(CreateMemberModal, { onClose: () => setShowCreateModal(false) }),
        showUpdateModal && (React.createElement(UpdateMemberModal, { member: selectedMember, onClose: () => setShowUpdateModal(false) })),
        showDeleteModal && (React.createElement(DeleteMemberModal, { memberId: selectedMember, onClose: () => setShowDeleteModal(false) }))));
};
export default FamilyTree;
