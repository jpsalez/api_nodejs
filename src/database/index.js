const Sequelize = require('sequelize');
const databaseConfig = require('../configs/db');
const userModel = require('../models/userModel');

const models = [userModel];

class Database {
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);

        models.map((model) => model.init(this.connection));
    }

}

module.exports = new Database();