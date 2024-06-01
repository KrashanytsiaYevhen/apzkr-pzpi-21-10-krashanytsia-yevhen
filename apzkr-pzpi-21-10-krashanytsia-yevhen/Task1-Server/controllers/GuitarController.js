const ApiError = require('../error/ApiError');
const { Guitar, Category } = require('../models/models');

class GuitarController {
    async createGuitar(req, res, next) {
        try {
            const { Name, Brand, Description, Price, Stock, CategoryCategoryID } = req.body;

            if (!Name || !Brand || !Price || !Stock || !CategoryCategoryID) {
                return next(ApiError.badRequest('Невірні дані для створення гітари'));
            }

            const guitar = await Guitar.create({ Name, Brand, Description, Price, Stock, CategoryCategoryID });

            return res.json(guitar);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Помилка при створенні гітари', error));
        }
    }

    async getAllGuitars(req, res, next) {
        try {
            const guitars = await Guitar.findAll({ include: Category });

            return res.json(guitars);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Помилка при отриманні гітар', error));
        }
    }

    async createCategory(req, res, next) {
        try {
            const { CategoryName } = req.body;

            if (!CategoryName) {
                return next(ApiError.badRequest('Назва категорії не вказана'));
            }

            const category = await Category.create({ CategoryName });

            return res.json(category);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Помилка при створенні категорії', error));
        }
    }
    async getGuitarById(req, res, next) {
        try {
            const { id } = req.params;

            const guitar = await Guitar.findByPk(id, { include: Category });

            if (!guitar) {
                return next(ApiError.badRequest(`Гітара не знайдена`));
            }

            return res.json(guitar);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Помилка при отриманні гітари', error));
        }
    }
}

module.exports = new GuitarController();
