const Router = require('express');
const router = new Router();
const orderController = require('../controllers/OrderController');

router.post('/create', orderController.createOrder);
router.get('/all', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);

module.exports = router;