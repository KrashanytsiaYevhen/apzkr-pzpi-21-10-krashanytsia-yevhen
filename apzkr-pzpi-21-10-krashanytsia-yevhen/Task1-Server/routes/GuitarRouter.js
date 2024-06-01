const Router = require('express');
const router = new Router();
const guitarController = require('../controllers/GuitarController');

router.post('/create', guitarController.createGuitar);
router.post('/createcat', guitarController.createCategory);
router.get('/all', guitarController.getAllGuitars);
router.get('/:id', guitarController.getGuitarById);

module.exports = router;