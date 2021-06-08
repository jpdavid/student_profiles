import React, { useState } from 'react';

const Tags = ({ index }) => {
  const [addTagInput, setAddTagInput] = useState({});
  const [tags, setTags] = useState({});

  const handleKeyDown = (e) => {
    const { key } = e;
    if (key === 'Enter') {
      e.preventDefault();
      const indexTag = e.target.getAttribute("name");
      if (!tags[indexTag]) {
        setTags({...tags, [indexTag]: [addTagInput[indexTag]]});
      } else {
        setTags({...tags, [indexTag]: [...tags[indexTag], addTagInput[indexTag]]});
      }
      setAddTagInput('');
    }
  }
  return (
    <div>
      <div id="tag-container">
        {tags[index]
          ? tags[index].map((tag, index) => {
              return (
                <div className="tags" key={index}>{tag}</div>
              )
            })
          : null
        }
      </div>
      <input
        type="text"
        className="tag-input"
        placeholder="Add a tag"
        value={addTagInput[index] || ''}
        name={index}
        onChange={e => setAddTagInput({...addTagInput, [index]: e.target.value})}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default Tags;