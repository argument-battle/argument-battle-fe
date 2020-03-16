module.exports = (sequelize, DataTypes) => {
    const { STRING } = DataTypes;
    const User = sequelize.define('User', {
        username: {
            type: STRING,
            allowNull: false,
            unique: 'username'
        },
        password: {
            type: STRING,
            allowNull: false
        }
    });

    User.associate = () => {};

    return User;
};
