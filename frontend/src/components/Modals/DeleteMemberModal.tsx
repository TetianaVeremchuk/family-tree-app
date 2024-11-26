import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMemberRequest } from '../../redux/slices/familySlice';
import './Modals.scss';


interface DeleteMemberModalProps {
  memberId: number;
  onClose: () => void;
}

const DeleteMemberModal: React.FC<DeleteMemberModalProps> = ({ memberId, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteMemberRequest(memberId));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Are you sure you want to delete this member?</h2>
        <div className="modal-actions">
          <button className="primary" onClick={handleDelete}>
            Delete
          </button>
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMemberModal;
