const Sequelize = require('sequelize'); //import sequelize orm
const Op = Sequelize.Op;
// connect with psql db
var connection = new Sequelize('emd', 'postgres', 'motherisgod', {
  host: 'localhost',
  port: '5436',
  dialect: 'postgres'
});
//create a table;
var student = connection.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mobile: {
    type: Sequelize.BIGINT,
    unique: true,
    allowNull: false
  }
});
var admin = connection.define('admin', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  designation: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


var methods = {};


methods.signup = function (u_name, u_email, u_password, u_mobile) {
  return connection.sync().then(function () {
    return student.create({
      name: u_name,
      email: u_email,
      password: u_password,
      mobile: u_mobile
    })
  });
}
methods.login = function (email_id) {
  return connection.sync().then(function () {
    if (email_id === "admin@admin.com") {
      return admin.findOne({ where: { email: email_id } });
    } else {
      return student.findOne({ where: { email: email_id } });
    }
  }).then(result => {
    if (result != undefined && result.dataValues != undefined) {
      return Promise.resolve(result.dataValues)
    } else {
      return Promise.reject("Not found")
    }
  });
}

exports.fun = methods;
