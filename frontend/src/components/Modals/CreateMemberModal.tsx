import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMemberRequest } from '../../redux/slices/familySlice';
import './Modals.scss';

interface CreateMemberModalProps {
  onClose: () => void;
}

const CreateMemberModal: React.FC<CreateMemberModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [parentId, setParentId] = useState<number | undefined>();
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

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Member</h2>
        <div className="form-group">
          <input
            className={`form-input ${errors.name ? 'error' : ''}`}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error-message">Name is required</span>}
        </div>
        <div className="form-group">
          <input
            className={`form-input ${errors.age ? 'error' : ''}`}
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
          />
          {errors.age && <span className="error-message">Age is required</span>}
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="number"
            placeholder="Parent ID (optional)"
            value={parentId || ''}
            onChange={(e) => setParentId(e.target.value === '' ? undefined : Number(e.target.value))}
          />
        </div>
        <div className="modal-actions">
          <button className="primary" onClick={handleCreate}>
            Create
          </button>
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMemberModal;
