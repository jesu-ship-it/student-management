import React from 'react';
import { User, Mail, GraduationCap } from 'lucide-react';
import type { Student } from '../types/student';
import './StudentTable.css';

interface StudentTableProps {
  students: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <User className="empty-icon" />
        <p>No students found</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>
                <div className="name-cell">
                  <div className="avatar">
                    <User className="avatar-icon" />
                  </div>
                  <span>{student.name}</span>
                </div>
              </td>
              <td>
                <div className="email-cell">
                  <Mail className="email-icon" />
                  {student.email}
                </div>
              </td>
              <td>
                <span className="level-badge">
                  <GraduationCap className="level-icon" />
                  Level {student.level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;