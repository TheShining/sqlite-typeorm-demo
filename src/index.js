const { DataSource } = require('typeorm');
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
    console.log('User has been saved:', user);

    // Read users
    const users = await userRepository.find();
    console.log('All users:', users);

    // Update a user
    user.age = 31;
    await userRepository.save(user);
    console.log('User has been updated:', user);

    // Delete a user
    await userRepository.remove(user);
    console.log('User has been removed:', user);

    await AppDataSource.destroy();
}

main().catch((error) => console.log(error));
