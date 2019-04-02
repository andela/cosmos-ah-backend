export default (sequelize, DataTypes) => {
  const TestTable = sequelize.define(
    'TestTable',
    {
      title: DataTypes.STRING,
      id: DataTypes.STRING,
    },
    {}
  );
  return TestTable;
};
