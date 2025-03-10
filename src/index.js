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
    // await userRepository.remove(user);
    // logger.info('User has been removed: %o', user);

    // findOne
    // const findUser = await userRepository.findOneBy({ age: 31 });
    const findUser = await userRepository.findOne({
        select: {
            name: true,
        },
        where: { id: 4 },
    });

    console.log('findOne', findUser);

    // find
    const userList = await userRepository.find({
        select: {
            name: true,
            id: true,
        },
        where: { age: 31 },
        order: {
            name: 'ASC',
            id: 'DESC',
        },
        skip: 0,
        take: 3,
        cache: true,
    });

    console.log('userList-----------', userList);

    await AppDataSource.destroy();
}

main().catch((error) => logger.error(error));
