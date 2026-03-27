 Hospital Locator - Full Stack Project
A modern full-stack application designed to help patients find the nearest hospitals using Geospatial data.

Backend: ASP.NET Core Web API (.NET 10) + Dapper + SQL Server

Frontend: Next.js (App Router) + TypeScript + Leaflet.js Maps

📂 Project Structure
Plaintext
/
├── Backend/               # ASP.NET Core Web API (.NET 10)
│   ├── Controllers/       # API Endpoints (HospitalsController)
│   ├── Models/            # Dapper Entities
│   └── appsettings.json   # DB Connection Strings
├── Frontend/
│   └── frontend/          # Next.js Application
└── README.md              # Project Documentation

⚙️ Prerequisites
.NET SDK 10.0

Node.js (v18 or higher)

SQL Server (Express or Developer Edition)

SSMS (SQL Server Management Studio)

🗄️ Database Setup (SQL Server)
Open SSMS and connect to your local server.

Run the following script to create the database and the spatial table:

SQL
-- 1. Create the Database
CREATE DATABASE HosDB;
GO

USE HosDB;
GO

-- 2. Create the Table with GEOGRAPHY support
CREATE TABLE Hospitals (
    Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(200) NOT NULL,
    Address NVARCHAR(500),
    Location GEOGRAPHY NOT NULL -- Stores Lat/Long for distance math
);

-- 3. Create a Spatial Index for high-speed "nearest" searches
CREATE SPATIAL INDEX SIndex_Hospital_Location ON Hospitals(Location);
GO


Backend Setup (.NET API)
Configure Connection:
Update Backend/appsettings.json with your SQL Server credentials:

JSON
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=HosDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
Run the API:

Bash
cd Backend
dotnet restore
dotnet run
Note: Note the URL (e.g., https://localhost:7123) for the frontend setup.

🎨 Frontend Setup (Next.js)
Install Dependencies:

Bash
cd Frontend/frontend
npm install
Configure Environment:
Update your .env.local file with your actual Backend URL:

Plaintext
NEXT_PUBLIC_API_URL=https://localhost:7123
Run the Frontend:

Bash
npm run dev
The app will be available at http://localhost:3000.
