require("dotenv/config")
const { db } = require('./db/index')
const { usersTable } = require("./drizzle/schema")

async function getAllUsers() {
    const users = await db.select().from(usersTable);
    console.log('users in DB', users);
    return users;
}

async function createUsers({id, name, email}) {
    await db.insert(usersTable).values({
        id, 
        name, 
        email
    });
}

(async () => {
    try {
        await db.delete(usersTable);
        await createUsers({ id: 1, name: "Anubhav", email: "abc@gmail.com" });
        await createUsers({ id: 2, name: "Sumit", email: "sumit@gmail.com" });
        await createUsers({ id: 3, name: "TOM", email: "tom@gmail.com" });
        await createUsers({ id: 4, name: "JERRY", email: "jerry@gmail.com" });
        await createUsers({ id: 5, name: "Harry", email: "harry@gmail.com" });
        await createUsers({ id: 6, name: "Krishna", email: "krishna@gmail.com" });
        await getAllUsers();
    } catch (err) {
        console.error(err);
    }
})();
