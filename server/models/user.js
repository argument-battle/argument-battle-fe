module.exports = (sequelize, DataTypes) => {
    const { STRING } = DataTypes;
    const User = sequelize.define('User', {
        username: {
            type: STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: STRING,
            allowNull: false
        }
    });

    User.associate = () => {};

    return User;
};
