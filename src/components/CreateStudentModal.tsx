import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Student } from '../types/student';
import './CreateStudentModal.css';

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<Student, 'id'>) => void;
}

const CreateStudentModal: React.FC<CreateStudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: '4' as '4' | '5' | '6' | '7',
  });
  const [errors, setErrors] = useState({ name: '', email: '' });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const newErrors = { name: '', email: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (newErrors.name || newErrors.email) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name: formData.name,
      email: formData.email,
      level: parseInt(formData.level) as 4 | 5 | 6 | 7,
    });

    setFormData({ name: '', email: '', level: '4' });
    setErrors({ name: '', email: '' });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Student</h2>
          <button onClick={onClose} className="close-button">
            <X />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.name ? 'input-error' : ''}
              placeholder="Enter student name"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.email ? 'input-error' : ''}
              placeholder="student@university.edu"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>
              Level <span className="required">*</span>
            </label>
            <select
              value={formData.level}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  level: e.target.value as '4' | '5' | '6' | '7',
                })
              }
            >
              <option value="4">Level 4</option>
              <option value="5">Level 5</option>
              <option value="6">Level 6</option>
              <option value="7">Level 7</option>
            </select>
          </div>

          <div className="modal-actions">
            <button onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button onClick={handleSubmit} className="btn-submit">
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentModal;