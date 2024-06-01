const ApiError = require('../error/ApiError');
const { Order, OrderDetail, Guitar } = require('../models/models');

// Функція для обчислення знижки на основі суми покупок
function calculateDiscount(totalAmount) {
    let discount = 0;
    if (totalAmount > 1000) {
        discount = 0.05;
    }
    if (totalAmount > 2000) {
        discount = 0.1;
    }
    if (totalAmount > 3000) {
        discount = 0.15;
    }
    return discount;
}

// Функція для розрахунку кінцевої суми з урахуванням знижки
function calculateTotalPrice(totalAmount) {
    const discount = calculateDiscount(totalAmount);
    const discountedAmount = totalAmount * discount;
    const totalPrice = totalAmount - discountedAmount;
    return totalPrice;
}
class OrderController {
    async createOrder(req, res, next) {
        try {
            const { UserId, OrderDate, items } = req.body;

            if (!UserId || !OrderDate || !items || !Array.isArray(items) || items.length === 0) {
                return next(ApiError.badRequest('Невірні дані для створення замовлення'));
            }

            // Підрахунок загальної вартості покупок
            let totalAmount = 0;
            for (const item of items) {
                const guitar = await Guitar.findByPk(item.GuitarID);
                if (!guitar) {
                    return next(ApiError.badRequest('Гітара з ID ' + item.GuitarID + ' не знайдена'));
                }
                totalAmount += guitar.Price * item.Quantity;
            }

            const finalPrice = calculateTotalPrice(totalAmount);

            const order = await Order.create({ UserId, OrderDate, TotalAmount: finalPrice });

            for (const item of items) {
                const guitar = await Guitar.findByPk(item.GuitarID); // Отримання об'єкта гітари за ID
                if (!guitar) {
                    return next(ApiError.badRequest('Гітара з ID ' + item.GuitarID + ' не знайдена'));
                }
                await OrderDetail.create({ OrderID: order.OrderID, GuitarID: item.GuitarID, Quantity: item.Quantity, UnitPrice: guitar.Price });
            }

            return res.json(order);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Помилка при створенні замовлення', error));
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const orders = await Order.findAll({ include: [OrderDetail] });

            return res.json(orders);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Помилка при отриманні замовлень', error));
        }
    }
    async getOrderById(req, res, next) {
        try {
            const { id } = req.params;

            const order = await Order.findByPk(id, { include: [OrderDetail, Guitar] });

            if (!order) {
                return next(ApiError.badRequest(`Замовлення з id ${id} не знайдено`));
            }

            return res.json(order);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Помилка при отриманні замовлення за id', error));
        }
    }
}

module.exports = new OrderController();
