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
            <img src={student.pic}></img>
            <br/>
            <br/>
            <div style={{fontWeight: "bold"}}>{student.firstName} {student.lastName}</div>
            <br/>
            <div>Email: {student.email}</div>
            <br/>
            <div>Company: {student.company}</div>
            <br/>
            <div>Skill: {student.skill}</div>
            <br/>
            <div>Average: {average}%</div>
            <br/>
          </div>
        )
      })}
    </div>
  )
}

export default Students;