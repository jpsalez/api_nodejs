const { Model } = require('sequelize');
const { Sequelize } = require('sequelize');



class UserModel extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            user_name : Sequelize.STRING,
            email : Sequelize.STRING,
            password : Sequelize.VIRTUAL
        },
            { sequelize }
        );
        return this;
    }
}


module.exports = UserModel;
