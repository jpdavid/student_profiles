const router = require('express').Router();
const controllers = require('./controllers.js');

router
  .route('/students')
  .get(controllers.getStudents);

module.exports = router;