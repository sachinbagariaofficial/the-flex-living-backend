Got it ✅
Here’s a **professional README.md** for your **Flex Living Reviews API** (Node.js + Express + MongoDB). You can drop this into your GitHub repo directly.

---

# 🏠 Flex Living Reviews API

A **Node.js + Express + MongoDB** REST API that powers the **Flex Living Reviews Dashboard**.
This service manages property reviews, approval status, and property details fetched from **Hostaway**.

---

## 🚀 Features

* Fetch all property reviews with property details
* Approve / make reviews private (`show` toggle)
* Pagination and filtering support
* Built with **Express.js**, **MongoDB Atlas**, and **TypeScript (optional)**
* Deployed on **Render**

---

## 📡 API Endpoints

### **1️⃣ Get All Reviews**

```http
GET https://the-flex-living-backend.onrender.com/api/reviews/hostaway
```

#### Response Example

```json
{
  "status": "success",
  "result": [
    {
      "property": {
        "propertyId": 155613,
        "listingName": "The Bromley Collection",
        "mainImage": "https://hostaway-platform.s3...",
        "location": {
          "city": "London",
          "country": "United Kingdom"
        },
        "propertyDetails": {
          "personCapacity": 5,
          "bedroomsNumber": 2,
          "bathroomsNumber": 2,
          "price": 400
        }
      },
      "reviews": {
        "id": 155613,
        "type": "host-to-guest",
        "status": "published",
        "rating": 9,
        "publicReview": "Nice apartment, but check-in was confusing.",
        "guestName": "Emma Smith",
        "submittedAt": "2022-08-21T22:45:14.000Z",
        "channel": "Hostaway"
      }
    }
  ]
}
```

---

### **2️⃣ Approve or Hide Review**

```http
PATCH https://the-flex-living-backend.onrender.com/api/reviews/:id/approve?show=false
```

* `:id` → review ID
* `show=true` → publish review
* `show=false` → hide (make private)

#### Request Example

```http
PATCH /api/reviews/155615/approve?show=false
```

#### Response Example

```json
{
  "status": "success",
  "result": {
    "id": 155615,
    "guestName": "Olivia Brown",
    "publicReview": "Cozy apartment, but could be cleaner.",
    "rating": 6,
    "status": "private",
    "submittedAt": "2024-08-21T22:45:14.000Z",
    "channel": "Hostaway"
  }
}
```

---

## 🛠️ Tech Stack

* **Backend Framework**: [Express.js](https://expressjs.com/)
* **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
* **Language**: JavaScript / TypeScript
* **Hosting**: [Render](https://render.com/)

---

## ⚙️ Setup & Installation

Clone repo and install dependencies:

```bash
git clone https://github.com/sachinbagariaofficial/flex-living-backend.git
cd flex-living-backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your-mongodb-atlas-uri
```

Run development server:

```bash
npm run dev
```

Build & run production:

```bash
npm run build
npm start
```

---


## 📊 Future Improvements

* 🔍 Advanced filtering & search
* 🛡️ JWT authentication for admin routes
* 📈 Analytics endpoints

---

## 📜 License

MIT License © 2025 \sachin

---
