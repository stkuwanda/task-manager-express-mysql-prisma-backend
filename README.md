# Task Manager API

This is a task manager backend API built with Express.js, MySQL, and Prisma ORM.

## Database Migration

To create and apply the database migrations, follow these steps:

1. Make sure you have all dependencies installed:
   ```bash
   npm install
   ```

2. Run the following command to create and apply the Users table migration:
   ```bash
   npx prisma migrate dev --name "create Users table"
   ```

   This command will:
   - Create a new migration file for the Users table
   - Apply the migration to your database
   - Generate the Prisma Client based on your schema

3. Verify that the migration was successful by checking the `prisma/migrations` directory for the new migration file.

## Note
- Make sure your database connection string is properly configured in your `.env` file before running migrations
- Running migrations will modify your database schema, so make sure to backup your data if needed