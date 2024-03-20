-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE Users(
    UserID INT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL
);
