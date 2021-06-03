import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('/api/students')
      .then(results => setStudents(results.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="students-container">
      {students.map((student, index) => {
        let average = student.grades.reduce((a, b) => Number(a) + Number(b)) / student.grades.length;
        return (
          <div className="student" key={index}>
            <img src={student.pic} className="student-pic"></img>
            <div className="student-info">
              <div className="student-name">{student.firstName} {student.lastName}</div>
              <div className="student-details-container">
                <div className="student-details">Email: {student.email}</div>
                <div className="student-details">Company: {student.company}</div>
                <div className="student-details">Skill: {student.skill}</div>
                <div className="student-details">Average: {average}%</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Students;