import { Highlight } from '../models';

export default {
  up: queryInterface => queryInterface.createTable(Highlight.tableName, Highlight.rawAttributes),
  down: queryInterface => queryInterface.dropTable('highlights'),
};
