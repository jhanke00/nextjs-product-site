import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('baye', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
};

export { sequelize, testConnection };
