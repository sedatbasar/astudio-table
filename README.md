# Astudio Table Project

This project is a **Next.js** application built with **TypeScript**, **Redux Toolkit**, **Axios**, and **Tailwind CSS**. It features a reusable **DataTable** component that supports **dynamic filters, pagination, search and API integration** for both Users and Products pages.

The application is deployed on **[Vercel](https://astudio-table.vercel.app/)** and can be tested live.

---

## 🚀 Features

- **Next.js 15 with TypeScript** – Modern app structure
- **Redux Toolkit** – State management for table filters, pagination, and search
- **Axios** – Centralized API handling with a global base URL
- **Tailwind CSS** – Clean and responsive styling
- **Reusable DataTable Component** – Supports dynamic columns & filtering
- **GitHub Actions CI/CD** – Automated linting, formatting, and type checking

---

## 📦 Project Setup

### **1️⃣ Install Dependencies**

```sh
npm install
```

### **2️⃣ Run the Development Server**

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ **Implementation Details**

### **🔹 Users Page (`/users`)**

- Fetches data from `https://dummyjson.com/users`
- Filters: **Name (text), Email (text), Age (select), Gender (select)**
- Uses `/users/filter?key={filterKey}&value={filterValue}` for filtering
- Displays **dynamic columns** with pagination and search

### **🔹 Products Page (`/products`)**

- Fetches data from `https://dummyjson.com/products`
- **Only supports Category filtering** (API does not support Title or Brand)
- Uses `/products/category/{categoryName}` for filtering
- Dynamically fetches category list from `https://dummyjson.com/products/categories`

### **🔹 Filters System**

- Click on a filter to open an **input field or dropdown** (depending on type)
- Filtering **sends a request to the API** and updates the results
- **Users & Products have different API endpoints for filtering**, handled dynamically

---

## 🛠 **GitHub Actions CI/CD**

This project has **automated checks** using GitHub Actions:
✅ **Linting** (`eslint`)  
✅ **Code Formatting** (`prettier`)  
✅ **Type Checking** (`tsc`)

Whenever you push changes, these checks **run automatically**.

---

## 🚀 **Live Demo**

The app is deployed on **Vercel**:  
🔗 **[astudio-table.vercel.app](https://astudio-table.vercel.app/)**

---

## 📜 **Additional Notes**

- The requirements **were unclear about filtering**, so I implemented a **flexible approach** where filters dynamically change based on type (text/select).
- The **Products Page filtering requirement** was unclear, so I followed the **same pattern as Users Page**, but **with different columns & filters**.
- The API **only supports filtering by Category** on Products, so I implemented **only Category filtering** instead of Title/Brand.

---

💡 **Built with ❤️ using Next.js, TypeScript, Tailwind & Redux Toolkit** 🚀
