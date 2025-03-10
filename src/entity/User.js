const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        age: {
            type: 'int',
        },
        hobbies: {
            type: 'text',
        },
        grade: {
            type: 'int',
        },
    },
});
