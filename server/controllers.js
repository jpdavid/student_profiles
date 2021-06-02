const axios = require('axios');

const controllers = {
  getStudents: (req, res) => {
    axios.get('https://api.hatchways.io/assessment/students')
      .then(data => res.status(200).send(data.data))
      .catch(err => res.send(err));
  }
}

module.exports = controllers;