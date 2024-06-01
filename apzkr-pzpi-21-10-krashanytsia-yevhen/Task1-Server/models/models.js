const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_name: {type: DataTypes.STRING, allowNull: false, defaultValue: "USER"},
    user_login: {type: DataTypes.STRING, allowNull: false},
    user_password: {type: DataTypes.STRING, allowNull: false},
    user_phone: {type: DataTypes.STRING, allowNull: false, defaultValue: "NONE"},
    user_mail: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('Category', {
    CategoryID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    CategoryName: { type: DataTypes.STRING, allowNull: false }
});

const Guitar = sequelize.define('Guitar', {
    GuitarID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    Brand: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.TEXT },
    Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    Stock: { type: DataTypes.INTEGER, allowNull: false }
});

const Order = sequelize.define('Order', {
    OrderID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    OrderDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    TotalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

const OrderDetail = sequelize.define('OrderDetail', {
    OrderDetailID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Quantity: { type: DataTypes.INTEGER, allowNull: false },
    UnitPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);

Guitar.belongsTo(Category);
Category.hasMany(Guitar);

OrderDetail.belongsTo(Guitar);
Guitar.hasMany(OrderDetail);

module.exports = {
    User,
    Category,
    Guitar,
    Order,
    OrderDetail
};
