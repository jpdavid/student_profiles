import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Student from './Student';

const App = () => {

  return (
    <div>
      Hello from React App
      <Student/>
    </div>
  );
}

export default App;