'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id : {
        allowNull : false,
        autoIncrement : true,
        type : Sequelize.INTEGER
      },
      name: {
        allowNull : false,
        type : Sequelize.STRING
      },
      user_name : {
      allowNull : false,
        type : Sequelize.STRING,
        unique : true
      },
      age:{
        allowNull : false,
        type : Sequelize.INTEGER
      },
      email: {
        allowNull : false,
        type : Sequelize.STRING,
        unique : true
      },
      avatar : {
        type : Sequelize.STRING
      },
      password_hash : {
        allowNull : false,
        type : Sequelize.STRING
      },
       bio : {
         allowNull :  false,
        type : Sequelize.STRING
      },
      created_at : {
        allowNull : false,
        type : Sequelize.DATE
      },
      updated_at : { 
          allowNull : false,
        type : Sequelize.DATE
      },
      gender : {
          allowNull : false,
        type : Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Users');
  }
};
