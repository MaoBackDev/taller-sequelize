import 'dotenv/config';
import { sequelize } from './database/DBConnection.js';
// import { User } from './models/User.js';
// import { Skill } from './models/Skill.js';

import app from './app.js';
const port = 3000 || process.env.PORT;


(async () => {
  try {
    await sequelize.sync({ force: false});
    app.listen(port, () => console.log(`Server is running on port ${port}`))
  } catch (error) {
    console.error(error);
  }
})()



