const Sequelize = require('sequelize');
const { Model } = require('sequelize');


class Users extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            user_name: Sequelize.STRING,
            age: Sequelize.INTEGER,
            email: Sequelize.STRING,
            avatar: Sequelize.STRING,
            password : Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            bio: Sequelize.STRING,
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
            gender: Sequelize.STRING
        },
        {sequelize})
        return this;
    }
}

module.exports = Users;