import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [input, setInput] = useState('');
  const [expandedView, setExpandedView] = useState({});

  useEffect(() => {
    axios.get('/api/students')
      .then(results => {
        localStorage.setItem('students', JSON.stringify(results.data));
        setStudents(JSON.parse(localStorage['students']));
      })
      .catch(err => console.log(err));
  }, []);

  // const handleScroll = () => {
  //   console.log("Scrolling!");
  //   let studentsContainerStyles = document.getElementById("students-container").style;
  //   studentsContainerStyles.insertRule(`::-webkit-scrollbar {
  //     display: auto;
  //   }`)
  // }

  const handleExpandedView = (e) => {
    const index = e.target.getAttribute('name');
    if (!expandedView[index]) {
      setExpandedView({...expandedView, [index]: true});
    } else {
      setExpandedView({...expandedView, [index]: !expandedView[index]});
    }
  }

  const expandedViewMode = (index) => {
    if (expandedView[index]) {
      return (
        <div>
          Hellooooooo
        </div>
      )
    }
  }

  return (
    <div id="students-container">
      <input
        type="text"
        placeholder="Search by name"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      {students.filter(student => student.firstName.toLowerCase().includes(input.toLowerCase()) ||student.lastName.toLowerCase().includes(input.toLowerCase()) || input === '')
        .map((student, index) => {
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
                  {expandedViewMode(index)}
                </div>
              </div>

              <button
                type="button"
                name={index}
                onClick={handleExpandedView}
              >
                <i className="fas fa-plus" name={index}/>
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Students;