import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tags from './Tags.jsx';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [searchTagInput, setSearchTagInput] = useState('');
  const [addTagInput, setAddTagInput] = useState({});
  const [tags, setTags] = useState({});
  const [expandedView, setExpandedView] = useState({});

  useEffect(() => {
    axios.get('/api/students')
      .then(results => {
        localStorage.setItem('students', JSON.stringify(results.data));
        setStudents(JSON.parse(localStorage['students']));
      })
      .catch(err => console.log(err));
  }, []);

  const handleExpandedView = (e) => {
    const id = e.target.getAttribute("name");
    if (!expandedView[id]) {
      setExpandedView({...expandedView, [id]: true});
    } else {
      setExpandedView({...expandedView, [id]: !expandedView[id]});
    }
  }

  const expandedViewMode = (id, grades) => {
    if (expandedView[id]) {
      return (
        <div className="grades">
          <br/>
          {grades.map((grade, index) => {
            const testNum = index + 1;
            return (
              <div key={index}>Test {testNum}: <span style={{marginLeft:"25px"}}>{grade}%</span></div>
            )
          })}
        </div>
      )
    }
  }

  return (
    <div id="students-wrapper">
      <input
        type="text"
        placeholder="Search by name"
        value={nameInput}
        onChange={e => setNameInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by tag"
        value={searchTagInput}
        onChange={e => setSearchTagInput(e.target.value)}
      />
      <div id="students-container">
        {students.filter(student => {
          const fullName = `${student.firstName} ${student.lastName}`;
          return (
            (student.firstName.toLowerCase().includes(nameInput.toLowerCase()) || student.lastName.toLowerCase().includes(nameInput.toLowerCase()) || fullName.toLowerCase().includes(nameInput.toLowerCase()) || nameInput === '')
          )
        })
          .filter(filteredStudents => {
            return (
              (tags[filteredStudents.id] && tags[filteredStudents.id].join(',').includes(searchTagInput) > 0) || searchTagInput === ''
            )
          })
          .map((student, index) => {
            const average = student.grades.reduce((a, b) => Number(a) + Number(b)) / student.grades.length;
            return (
              <div className="student" key={index}>
                <img src={student.pic} alt="profile-photo" className="student-pic"></img>

                <div className="student-info">
                  <div className="student-name">{student.firstName} {student.lastName}</div>
                  <div className="student-details-container">
                    <div className="student-details">Email: {student.email}</div>
                    <div className="student-details">Company: {student.company}</div>
                    <div className="student-details">Skill: {student.skill}</div>
                    <div className="student-details">Average: {average}%</div>
                    {expandedViewMode(student.id, student.grades)}

                    <Tags
                      id={Number(student.id)}
                      tags={tags}
                      setTags={setTags}
                      addTagInput={addTagInput}
                      setAddTagInput={setAddTagInput}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  name={student.id}
                  onClick={handleExpandedView}
                >
                  {!expandedView[student.id]
                    ? <i className="fas fa-plus" name={student.id}/>
                    : <i className="fas fa-minus" name={student.id}/>
                  }
                </button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Students;