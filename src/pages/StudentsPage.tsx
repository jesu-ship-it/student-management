import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Student } from '../types/student';
import { mockStudents } from '../data/students';
import StudentTable from '../components/StudentTable';
import SearchBar from '../components/SearchBar';
import CreateStudentModal from '../components/CreateStudentModal';
import './StudentsPage.css';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
    const maxId = students.length > 0 ? Math.max(...students.map((s) => s.id)) : 0;
    const studentWithId: Student = {
      ...newStudent,
      id: maxId + 1,
    };
    setStudents([...students, studentWithId]);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <h1>Student Management</h1>
          <p>Manage and track student information</p>
        </div>

        <div className="toolbar">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <button onClick={() => setIsModalOpen(true)} className="add-button">
            <Plus className="button-icon" />
            Add Student
          </button>
        </div>

        <div className="student-count">
          Showing {filteredStudents.length} of {students.length} students
        </div>

        <StudentTable students={filteredStudents} />

        <CreateStudentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddStudent}
        />
      </div>
    </div>
  );
};

export default StudentsPage;