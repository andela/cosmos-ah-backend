'use strict';
module.exports = (sequelize, DataTypes) => {
  const TestTable = sequelize.define('TestTable', {
    title: DataTypes.STRING
  }, {});
  TestTable.associate = function(models) {
    // associations can be defined here
  };
  return TestTable;
};