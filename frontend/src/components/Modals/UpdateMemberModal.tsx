import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMemberRequest } from '../../redux/slices/familySlice';
import './Modals.scss';

interface UpdateMemberModalProps {
  member: {
    id: number;
    name: string;
    age: number;
  };
  onClose: () => void;
}

const UpdateMemberModal: React.FC<UpdateMemberModalProps> = ({ member, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(member.name);
  const [age, setAge] = useState<number | ''>(member.age);
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

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Update Member</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-input ${!isNameValid ? 'error' : ''}`}
          />
          {!isNameValid && <div className="error-message">Name is required</div>}
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
            className={`form-input ${!isAgeValid ? 'error' : ''}`}
          />
          {!isAgeValid && <div className="error-message">Age must be greater than 0</div>}
        </div>
        <div className="modal-actions">
          <button className="primary" onClick={handleUpdate}>Update</button>
          <button className="secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMemberModal;