import React from 'react';

const Tags = ({ id, tags, setTags, addTagInput, setAddTagInput }) => {
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
        {tags[id]
          ? tags[id].map((tag, index) => {
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
        value={addTagInput[id] || ''}
        name={id}
        onChange={e => setAddTagInput({...addTagInput, [id]: e.target.value})}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default Tags;