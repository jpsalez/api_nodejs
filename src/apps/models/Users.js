const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const bcryptjs = require('bcryptjs');


class Users extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            user_name: Sequelize.STRING,
            age: Sequelize.INTEGER,
            email: Sequelize.STRING,
            avatar: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            bio: Sequelize.STRING,
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
            gender: Sequelize.STRING,
            password: Sequelize.VIRTUAL
        },
            { sequelize });

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 8); //hasheando senha -> com salt 8     
            };
        },
        );
        return this;
    }
     compareHash(password) {
        return bcryptjs.compare(password, this.password_hash);
    };
}

module.exports = Users;