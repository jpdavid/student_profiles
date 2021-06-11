import React from 'react';
import Students from './Students';

const App = () => {
  const handleScroll = (e) => {
    if (e.target.classList.contains("on-scrollbar") === false) {
      e.target.classList.add("on-scrollbar");
    } else {
      setTimeout(() => e.target.classList.remove("on-scrollbar"), 2000);
    }
  }

  window.addEventListener('scroll', handleScroll, true);

  return (
    <div id="wrapper">
      <Students/>
    </div>
  );
}

export default App;