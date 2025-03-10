const { DataSource } = require('typeorm');
const logger = require('./logger');
const User = require('./entity/User');

const AppDataSource = new DataSource({
    type: 'better-sqlite3',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});

async function main() {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);

    // Create a new user
    const user = userRepository.create({
        name: 'John Doe',
        age: 30,
        hobbies: 'Reading, Traveling',
        grade: 90,
    });
    await userRepository.save(user);
    logger.info('User has been saved: %o', user);

    // Read users
    const users = await userRepository.find();
    logger.info('All users: %o', users);

    // Update a user
    user.age = 31;
    await userRepository.save(user);
    logger.info('User has been updated: %o', user);

    // Delete a user
    await userRepository.remove(user);
    logger.info('User has been removed: %o', user);

    await AppDataSource.destroy();
}

main().catch((error) => logger.error(error));
