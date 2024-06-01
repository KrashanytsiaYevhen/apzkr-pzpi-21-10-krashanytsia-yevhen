const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJwt = (id, user_login, user_mail, role) => {
    return jwt.sign(
        { id, user_login, user_mail, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class UserController {
    async registration(req, res, next) {
        try {
            const {user_name, user_login, user_password, user_phone, user_mail, role } = req.body;

            if (!user_name || !user_login || !user_password || !user_phone || !user_mail || !role) {
                return next(ApiError.badRequest('Невірні дані'));
            }

            const candidate = await User.findOne({ where: { user_login } });

            if (candidate) {
                return next(ApiError.badRequest('Користувач з таким іменем вже існує'));
            }


            const hashPassword = await bcrypt.hash(user_password, 5);

            if (!hashPassword) {
                return next(ApiError.internal('Помилка при хешуванні паролю'));
            }

            const user = await User.create({user_name, user_login, user_mail, role,user_phone, user_password: hashPassword }, );
            const token = generateJwt(user.id,user.user_name, user.user_login, user.user_mail, user.role, user.user_phone);

            return res.json({ token });
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Помилка при реєстрації користувача', error));
        }
    }

    async login(req, res, next) {
        try {
            const { user_login, user_password } = req.body;

            const user = await User.findOne({ where: { user_login } });

            if (!user) {
                return next(ApiError.internal('Користувач не знайден'));
            }

            const comparePassword = await bcrypt.compare(user_password, user.user_password);

            if (!comparePassword) {
                return next(ApiError.internal('Вказан невірний пароль'));
            }

            const role = user.role;

            if (role === 'admin') {
                const token = generateJwt(user.id, user.user_login, user.user_mail, role);
                return res.json({ token, role: 'admin' });
            }

            const token = generateJwt(user.id, user.user_login, user.user_mail);
            return res.json({ token });
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Помилка при вході користувача', error));
        }
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController();
