const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env.local" });

async function initializeDatabase() {
  console.log("🚀 Initializing PintuUniv Database...\n");

  try {
    // Connect to MySQL server (without database)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      port: parseInt(process.env.DB_PORT) || 3306,
    });

    console.log("✅ Connected to MySQL server");

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || "pintuuniv";
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' created/verified`);

    // Close initial connection
    await connection.end();

    // Connect to the specific database
    const dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: dbName,
      port: parseInt(process.env.DB_PORT) || 3306,
    });

    console.log(`✅ Connected to database '${dbName}'`);

    // Read and execute schema
    const fs = require("fs");
    const path = require("path");
    const schemaPath = path.join(__dirname, "database", "schema.sql");

    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, "utf8");

      // Split by semicolons and execute each statement
      const statements = schema
        .split(";")
        .filter((stmt) => stmt.trim().length > 0);

      for (const statement of statements) {
        if (statement.trim()) {
          await dbConnection.execute(statement);
        }
      }

      console.log("✅ Database schema created successfully");
    } else {
      console.log("⚠️  Schema file not found at:", schemaPath);
    }

    // Verify tables were created
    const [tables] = await dbConnection.execute("SHOW TABLES");
    console.log("✅ Tables created:");
    tables.forEach((table) => {
      console.log(`   - ${Object.values(table)[0]}`);
    });

    await dbConnection.end();
    console.log("\n🎉 Database initialization completed successfully!");
    console.log("\n📋 Next steps:");
    console.log("1. Update your .env.local file with your MySQL credentials");
    console.log('2. Run "npm run dev" to start the development server');
    console.log("3. Visit http://localhost:3000/register to test registration");
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Make sure MySQL is running");
    console.log("2. Check your database credentials in .env.local");
    console.log("3. Ensure your MySQL user has CREATE DATABASE privileges");
  }
}

initializeDatabase();
