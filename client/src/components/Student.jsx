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

export default Student;