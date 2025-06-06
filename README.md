﻿# Bike Servicing Management System

A backend API for managing bike service centers, customers, bikes, and service records. Built with modern tools to handle CRUD operations, service workflows, and overdue tracking.

Live Link -[https://bike-service-management-server.vercel.app/](https://bike-service-management-server.vercel.app/)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: Zod
- **HTTP Status**: http-status-ts

## Key Features

- **Customer Management**
  - Create/update/delete customers
- **Bike Inventory**
  - Register bikes with brand/model/year
  - Associate bikes with customers
- **Service Management**
  - Create service records with statuses: `pending`, `in-progress`, `done`
  - Mark services as completed with optional completion dates
  - Find overdue or pending services (>7 days old)
- **Safety First**
  - UUID validation for all resources
  - Standardized error responses with stack and proper message

## Setup Guide

1. **Clone Repo**
   ```bash
   git clone https://github.com/thesanchitadevi/bike-service-management-server
   cd bike-service-management-server
   npm install
   npm run dev
   ```

API will run on `http://localhost:5000`

## API Endpoints

- Customer Management

POST    `/api/customers` Create a new customer

GET     `/api/customers` Get all customers

GET     `/api/customers/:customerId` Get a specific customer by ID

PATCH   `/api/customers/:customerId` Update customer details

DELETE  `/api/customers/:customerId` Delete a customer

- Bike Management

POST `/api/bikes` Add a new bike

GET `/api/bikes` Get all bikes

GET `/api/bikes/:bikeId` Get a specific bike by ID

- Service Management

POST `/api/services` Create a service record

GET `/api/services` Get all service records

GET `/api/services/:serviceId` Get a specific service by ID

PUT `/api/services/:serviceId/complete` Mark service as completed

GET `/api/services/status` Get overdue/pending services

### Thank you for visiting.
