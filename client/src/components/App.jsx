import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Students from './Students';

const App = () => {

  return (
    <div id="wrapper">
      <Students/>
    </div>
  );
}

export default App;