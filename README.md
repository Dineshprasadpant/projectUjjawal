# 🏥 Hospital Locator

A modern full-stack web application that helps users find nearby hospitals using geospatial data and an interactive map interface.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | ASP.NET Core Web API (.NET 10) |
| **ORM** | Dapper (Micro ORM) |
| **Database** | SQL Server |
| **Frontend** | Next.js (App Router) + TypeScript |
| **Maps** | Leaflet.js |

---

## ⚙️ Prerequisites

Make sure the following are installed before you begin:

- [.NET SDK 10.0](https://dotnet.microsoft.com/download)
- [Node.js v18+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express or Developer Edition)
- [SQL Server Management Studio (SSMS)](https://aka.ms/ssmsfullsetup)
- [Git](https://git-scm.com/)

---

## 📦 Clone the Repository

```bash
git clone  https://github.com/Dineshprasadpant/projectUjjawal.git
cd projectUjjawal
```

---

## 🗄️ Step 1 — Database Setup (SQL Server)

1. Open **SQL Server Management Studio (SSMS)** and connect to your local SQL Server instance.
2. Open a new query window and run the following script:

```sql
-- Create the database
CREATE DATABASE HosDB;
GO

USE HosDB;
GO

-- Create Hospitals table with geospatial support
CREATE TABLE Hospitals (
    Id       INT PRIMARY KEY IDENTITY,
    Name     NVARCHAR(200) NOT NULL,
    Address  NVARCHAR(500),
    Location GEOGRAPHY NOT NULL
);
GO

-- Create spatial index for efficient nearest-location queries
CREATE SPATIAL INDEX SIndex_Hospital_Location
ON Hospitals(Location);
GO

INSERT INTO Hospitals (Name, Address, Location)
VALUES 
    ('Norvic International Hospital', 'Thapathali, Kathmandu', geography::Point(27.7172, 85.3240, 4326)),
    ('Tribhuvan University Teaching Hospital (TUTH)', 'Maharajgunj, Kathmandu', geography::Point(27.7360, 85.3301, 4326)),
    ('Grande International Hospital', 'Dhapasi, Kathmandu', geography::Point(27.7513, 85.3267, 4326)),
    ('Nepal Mediciti Hospital', 'Bhaisepati, Lalitpur', geography::Point(27.6534, 85.3041, 4326)),
    ('Patan Hospital', 'Lagankhel, Lalitpur', geography::Point(27.6685, 85.3206, 4326)),
    ('Bir Hospital', 'Kanti Path, Kathmandu', geography::Point(27.7056, 85.3128, 4326)),
    ('HAMS Hospital', 'Dhumbarahi, Kathmandu', geography::Point(27.7288, 85.3431, 4326)),
    ('Om Hospital & Research Centre', 'Chabahil, Kathmandu', geography::Point(27.7176, 85.3468, 4326)),
    ('B&B Hospital', 'Gwarko, Lalitpur', geography::Point(27.6672, 85.3340, 4326)),
    ('Kanti Children''s Hospital', 'Maharajgunj, Kathmandu', geography::Point(27.7371, 85.3323, 4326));
    GO
```

3. Verify the `HosDB` database and `Hospitals` table appear in the Object Explorer.

---

## 🧠 Step 2 — Backend Setup (.NET API)

### 2.1 Configure the Connection String

Open `Backend/appsettings.json` and update the connection string to match your SQL Server instance:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=HosDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

> If your SQL Server runs on a named instance (e.g., `.\SQLEXPRESS`), update `Server` accordingly:
> ```
> "Server=localhost\\SQLEXPRESS;..."
> ```

### 2.2 Restore and Run the Backend

```bash
cd Backend
dotnet restore
dotnet run
```

Once running, note the port displayed in the terminal output. It will look like:

```
Now listening on: https://localhost:7123
```

### 2.3 Verify the Backend

Open your browser and navigate to:

```
https://localhost:<port>/swagger
```

You should see the Swagger UI with all available API endpoints listed.

---

## 🎨 Step 3 — Frontend Setup (Next.js)

### 3.1 Install Dependencies

```bash
cd Frontend/frontend
npm install
```

### 3.2 Configure Environment Variables

Create a `.env.local` file inside `Frontend/frontend/`:

```bash
# Frontend/frontend/.env.local
NEXT_PUBLIC_API_URL=https://localhost:<backend-port>
```

> Replace `<backend-port>` with the actual port your backend is running on (e.g., `7123`).

> ⚠️ **Never commit `.env.local` to version control.** Add it to `.gitignore` if it isn't already.

### 3.3 Start the Frontend

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:3000
```

---

## ▶️ Step 4 — Running the Full Application

Follow this order every time you start the project:

**1. Start SQL Server**

Ensure your SQL Server service is running. You can verify in SSMS or via Windows Services.

**2. Start the Backend**

```bash
cd Backend
dotnet run
```

**3. Start the Frontend** (in a separate terminal)

```bash
cd Frontend/frontend
npm run dev
```

**4. Open the App**

```
http://localhost:3000
```

---

## 🔗 Frontend ↔ Backend Connection

The frontend reads the API URL from the environment variable set in `.env.local`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const response = await fetch(`${API_URL}/api/hospitals`);
const data = await response.json();
```

---

## ✅ Quick Checklist

| Step | Status |
|---|---|
| SQL Server is running | ☐ |
| `HosDB` database and `Hospitals` table created | ☐ |
| `appsettings.json` connection string updated | ☐ |
| Backend running (`dotnet run`) | ☐ |
| Swagger UI accessible at `/swagger` | ☐ |
| `.env.local` created with correct backend port | ☐ |
| Frontend running (`npm run dev`) | ☐ |
| App accessible at `http://localhost:3000` | ☐ |

---

## 🚀 Future Improvements

- [ ] JWT Authentication
- [ ] Clean Architecture (Repository + Service layers)
- [ ] Global error handling & logging (Serilog)
- [ ] Dockerization
- [ ] Deployment (IIS / Azure / Vercel)

---

## 👨‍💻 Author

**Dinesh Prasad Pant**