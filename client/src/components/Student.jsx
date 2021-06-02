import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Student = () => {
  const [students, setStudents] = useState([]);

  const getStudents = () => {
    axios.get('/api/students')
      .then(results => setStudents(results.data))
      .catch(err => console.log(err));
  }
  getStudents();

  return (
    <div className="students">
      {students.map((student, index) => {
        return (
          <div className="student" key={index}>
            <img src={student.pic}></img>
            <span>{student.firstName}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Student;