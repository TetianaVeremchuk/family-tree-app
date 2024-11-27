import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMemberRequest } from "../../redux/slices/familySlice";
import { RootState } from "../../redux/store";
import "./Modals.scss";

interface CreateMemberModalProps {
  parentId: number | null;
  onClose: () => void;
  onMemberAdded: (newMemberParentId: number | null) => void;
}

const CreateMemberModal: React.FC<CreateMemberModalProps> = ({
  parentId,
  onClose,
  onMemberAdded, 
}) => {
  const dispatch = useDispatch();
  const familyTree = useSelector((state: RootState) => state.family.familyTree);

  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [parentName, setParentName] = useState("");
  const [filteredParents, setFilteredParents] = useState<string[]>([]);
  const [errors, setErrors] = useState({ name: false, age: false });

  const findParentIdByName = (name: string): number | undefined => {
    const parent = familyTree.find(
      (member) => member.name.toLowerCase() === name.toLowerCase()
    );
    return parent ? parent.id : undefined;
  };

  const handleParentNameChange = (value: string) => {
    setParentName(value);

    if (value.trim() === "") {
      setFilteredParents([]);
      return;
    }

    const matches = familyTree
      .map((member) => member.name)
      .filter((parentName) =>
        parentName.toLowerCase().startsWith(value.trim().toLowerCase())
      );

    setFilteredParents(matches.slice(0, 5));
  };

  const handleCreate = () => {
    const hasErrors = {
      name: !name.trim(),
      age: !age,
    };

    setErrors(hasErrors);

    if (!hasErrors.name && !hasErrors.age) {
      const resolvedParentId = parentName
        ? findParentIdByName(parentName)
        : parentId;

      if (parentName && resolvedParentId === undefined) {
        alert(`Parent with name "${parentName}" not found.`);
        return;
      }

      const newMember = {
        id: Date.now(),
        name: name.trim(),
        age: Number(age),
        parentId: resolvedParentId || null,
      };

      dispatch(createMemberRequest(newMember));
      onMemberAdded(resolvedParentId || null); 
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Member</h2>
        <div className="form-group">
          <input
            className={`form-input ${errors.name ? "error" : ""}`}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <span className="error-message">Name is required</span>
          )}
        </div>
        <div className="form-group">
          <input
            className={`form-input ${errors.age ? "error" : ""}`}
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) =>
              setAge(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
          {errors.age && (
            <span className="error-message">Age is required</span>
          )}
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            placeholder="Parent's Name (optional)"
            value={parentName}
            onChange={(e) => handleParentNameChange(e.target.value)}
          />
          {filteredParents.length > 0 && (
            <ul className="autocomplete-list">
              {filteredParents.map((parent, index) => (
                <li
                  key={index}
                  className="autocomplete-item"
                  onClick={() => {
                    setParentName(parent);
                    setFilteredParents([]);
                  }}
                >
                  {parent}
                </li>
              ))}
            </ul>
          )}
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
