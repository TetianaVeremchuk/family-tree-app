import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFamilyTreeRequest } from "../../redux/slices/familySlice";
import { RootState } from "../../redux/store";
import CreateMemberModal from "../Modals/CreateMemberModal";
import UpdateMemberModal from "../Modals/UpdateMemberModal";
import DeleteMemberModal from "../Modals/DeleteMemberModal";
import "./FamilyTree.scss";

const FamilyTree: React.FC = () => {
  const dispatch = useDispatch();
  const { familyTree, loading, error } = useSelector(
    (state: RootState) => state.family
  );

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());

  useEffect(() => {
    dispatch(fetchFamilyTreeRequest());
  }, [dispatch]);

  const toggleMember = (memberId: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(memberId)) {
        newSet.delete(memberId);
      } else {
        newSet.add(memberId);
      }
      return newSet;
    });
  };

  const handleCreateMember = (parentId: number | null) => {
    setSelectedParent(parentId);
    setShowCreateModal(true);
  };

  const renderTree = (tree: any) =>
    tree.map((member: any) => (
      <div key={member.id} className="family-member">
        <div
          className="member-info"
          onClick={() => toggleMember(member.id)}
        >
          <span className="member-name">{member.name}</span>
          <span className="member-age">({member.age} years)</span>
          <div className="action-buttons">
            <button
              className="update-button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMember(member);
                setShowUpdateModal(true);
              }}
            >
              Update
            </button>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMember(member.id);
                setShowDeleteModal(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        {member.children && member.children.length > 0 && (
          <div
            id={`children-${member.id}`}
            className={`children ${
              expandedNodes.has(member.id) ? "" : "hidden"
            }`}
          >
            {renderTree(member.children)}
          </div>
        )}
      </div>
    ));

  const handleNewMemberAdded = (newMemberParentId: number | null) => {
    if (newMemberParentId !== null) {
      setExpandedNodes((prev) => {
        const newSet = new Set(prev);
        newSet.add(newMemberParentId);
        return newSet;
      });
    }
    setShowCreateModal(false);
  };

  return (
    <div className="family-tree">
      <h2>Family Tree</h2>
      <button
        className="add-member-button"
        onClick={() => handleCreateMember(null)}
      >
        Add Member
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && renderTree(familyTree)}

      {showCreateModal && (
        <CreateMemberModal
          parentId={selectedParent}
          onClose={() => setShowCreateModal(false)}
          onMemberAdded={handleNewMemberAdded}
        />
      )}

      {showUpdateModal && (
        <UpdateMemberModal
          member={selectedMember}
          onClose={() => setShowUpdateModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteMemberModal
          memberId={selectedMember}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default FamilyTree;
