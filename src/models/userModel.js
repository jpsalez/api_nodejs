const { Model } = require('sequelize');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const { password } = require('pg/lib/defaults');


class UserModel extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            user_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.VIRTUAL
            },
            password_hash: {
                type: Sequelize.STRING,
                allowNull: false
            },
            avatar: {
                allowNull: true,
                type: Sequelize.STRING
            },
            bio: {
                type: Sequelize.STRING,
                allowNull: true
            },
            created_at: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: true,
                type: Sequelize.DATE
            },
            gender: {
                allowNull: true,
                type: Sequelize.STRING
            }
        },
            {
                sequelize,
                tableName: 'Users'
            },
        );

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

     async checkPassword(password){
        return await bcrypt.compare(password, this.password_hash);
    }


}


module.exports = UserModel;
