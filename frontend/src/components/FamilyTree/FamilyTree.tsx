import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFamilyTreeRequest } from '../../redux/slices/familySlice';
import { RootState } from '../../redux/store';
import CreateMemberModal from '../Modals/CreateMemberModal';
import UpdateMemberModal from '../Modals/UpdateMemberModal';
import DeleteMemberModal from '../Modals/DeleteMemberModal';
import './FamilyTree.scss';

const FamilyTree: React.FC = () => {
  const dispatch = useDispatch();
  const { familyTree, loading, error } = useSelector((state: RootState) => state.family);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchFamilyTreeRequest());
  }, [dispatch]);

  const renderTree = (tree: any) =>
    tree.map((member: any) => (
      <div key={member.id} className="family-member">
        <div className="member-info">
          <span className="member-name">{member.name}</span>
          <span className="member-age">({member.age} years)</span>
          <div className="action-buttons">
            <button
              className="update-button"
              onClick={() => {
                setSelectedMember(member);
                setShowUpdateModal(true);
              }}
            >
              Update
            </button>
            <button
              className="delete-button"
              onClick={() => {
                setSelectedMember(member.id);
                setShowDeleteModal(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        {member.children && <div className="children">{renderTree(member.children)}</div>}
      </div>
    ));

  return (
    <div className="family-tree">
      <h2>Family Tree</h2>
      <button className="add-member-button" onClick={() => setShowCreateModal(true)}>
        Add Member
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && renderTree(familyTree)}

      {showCreateModal && <CreateMemberModal onClose={() => setShowCreateModal(false)} />}
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