import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ id, tags, setTags, addTagInput, setAddTagInput }) => {
  const handleKeyDown = (e) => {
    const { key } = e;
    if (key === 'Enter') {
      e.preventDefault();
      const tagKey = e.target.getAttribute("name");
      if (!tags[tagKey]) {
        localStorage.setItem("tags", JSON.stringify({...tags, [tagKey]: [addTagInput[tagKey]]}));
        setTags(JSON.parse(localStorage.tags));
        // setTags({...tags, [tagKey]: [addTagInput[tagKey]]});
      } else {
        localStorage.setItem("tags", JSON.stringify({...tags, [tagKey]: [...tags[tagKey], addTagInput[tagKey]]}));
        setTags(JSON.parse(localStorage.tags));
        // setTags({...tags, [tagKey]: [...tags[tagKey], addTagInput[tagKey]]});
      }
      setAddTagInput({});
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

Tags.propTypes = {
  id: PropTypes.number,
  tags: PropTypes.object,
  setTags: PropTypes.func,
  addTagInput: PropTypes.object || PropTypes.string,
  setAddTagInput: PropTypes.func
}

export default Tags;