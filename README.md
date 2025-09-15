#  Shopify CRM – Multi-Tenant Data Ingestion & Insights Service

This project is my submission for the #Xeno FDE Internship Assignment – 2025#.  
It simulates how Xeno helps enterprise retailers onboard, integrate, and analyze their Shopify customer/order data.

---

## Features

- ***Shopify Data Ingestion** via Webhooks:
  - Customers
  - Orders
  - Products
  - (Bonus) Cart Abandon Events
- **Multi-Tenancy***:
  - Each store is a Tenant with isolated data.
- ***Authentication**:
  - Email + password login for tenants.
- **Insights Dashboard**:
  - Total customers, orders, and revenue
  - Orders by date (with filters)
  - Top 5 customers by spend
  - Charts for business metrics
- **Deployment**:
  - Backend → Render  
  - Database → FreeSQL Database  
  - Frontend → Vercel  

---

##  Architecture

Data->Flow!
Shopify → Webhooks → Backend (Express.js + Sequelize) → MySQL (Tenant isolated data)
                                       ↓
                                   Frontend (React.js, Vercel)
