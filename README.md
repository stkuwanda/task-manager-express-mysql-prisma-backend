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

### Applying Existing Migrations

If you want to apply existing migrations without creating new ones (typically in production or when pulling changes from other developers), use:
```bash
npx prisma migrate deploy
```

This command will:
- Apply any pending migrations that haven't been run yet
- Never create new migrations
- Never reset the database
- Never modify the schema.prisma file
- Never regenerate the Prisma Client

Use this command when:
- Deploying to production
- Setting up a new development environment
- Pulling changes from other developers that include new migrations

## Note
- Make sure your database connection string is properly configured in your `.env` file before running migrations
- Running migrations will modify your database schema, so make sure to backup your data if needed

## Seeding the Database

A seeder script is provided to populate the database with sample data (4 users, 10 tasks per user).

1. Make sure dependencies are installed and your `.env` is configured:
```bash
npm install
```

2. Run the seed script directly with npm:
```bash
npm run seed
```

Or use the Prisma seeding command (Prisma will run the script configured in package.json):
```bash
npx prisma db seed
```

The seed is idempotent: re-running it will not create duplicate users and will only add missing tasks up to 10 per user.