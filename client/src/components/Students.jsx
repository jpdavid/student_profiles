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

  // const handleScroll = () => {
  //   console.log("Scrolling!");
  //   let studentsContainerStyles = document.getElementById("students-container").style;
  //   studentsContainerStyles.insertRule(`::-webkit-scrollbar {
  //     display: auto;
  //   }`)
  // }

  const handleExpandedView = (e) => {
    const index = e.target.getAttribute("name");
    if (!expandedView[index]) {
      setExpandedView({...expandedView, [index]: true});
    } else {
      setExpandedView({...expandedView, [index]: !expandedView[index]});
    }
  }

  const expandedViewMode = (index, grades) => {
    if (expandedView[index]) {
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

  const findTags = (id) => {
    if (tags[id] && tags[id].includes(searchTagInput)) {
      return id;
    }
  }

  return (
    <div id="students-container">
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
      {students.filter(student => {
        // let studentIndex = Number(student.id) - 1;
        // console.log(student.firstName, studentIndex, tags[studentIndex])
        // if (searchTagInput && student.id === JSON.stringify(studentIndex + 1) && tags[studentIndex] && (tags[studentIndex].includes(searchTagInput) || searchTagInput === '')) {
        //   return (
        //     (student.firstName.toLowerCase().includes(nameInput.toLowerCase()) || student.lastName.toLowerCase().includes(nameInput.toLowerCase()) || nameInput === '')
        //   )
        // }
        return (
          (student.firstName.toLowerCase().includes(nameInput.toLowerCase()) || student.lastName.toLowerCase().includes(nameInput.toLowerCase()) || nameInput === '')
        )
      }).filter(filteredStudents => {
        return (
          (tags[filteredStudents.id] && tags[filteredStudents.id].join(',').includes(searchTagInput) > 0) || searchTagInput === ''
        )
      })
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
                  {expandedViewMode(index, student.grades)}

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
                name={index}
                onClick={handleExpandedView}
              >
                {!expandedView[index]
                  ? <i className="fas fa-plus" name={index}/>
                  : <i className="fas fa-minus" name={index}/>
                }
              </button>

            </div>
          )
        })
      }
    </div>
  )
}

export default Students;