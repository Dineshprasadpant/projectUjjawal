# 🏥 Hospital Locator – Full Stack Project

A modern full-stack application designed to help users find nearby hospitals using **geospatial data**.

---

## 🚀 Tech Stack

**Backend**
- ASP.NET Core Web API (.NET 10)
- Dapper (Micro ORM)
- SQL Server

**Frontend**
- Next.js (App Router)
- TypeScript
- Leaflet.js (Maps)

---

## ⚙️ Prerequisites

- .NET SDK 10.0  
- Node.js (v18 or higher)  
- SQL Server (Express / Developer Edition)  
- SQL Server Management Studio (SSMS)  
- Git  

---

## 🗄️ Database Setup (SQL Server)

Open SSMS and run the following script:

```sql
-- Create database
CREATE DATABASE HosDB;
GO

USE HosDB;
GO

-- Create Hospitals table with geospatial support
CREATE TABLE Hospitals (
    Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(200) NOT NULL,
    Address NVARCHAR(500),
    Location GEOGRAPHY NOT NULL
);

-- Create spatial index for efficient nearest-location queries
CREATE SPATIAL INDEX SIndex_Hospital_Location 
ON Hospitals(Location);
GO