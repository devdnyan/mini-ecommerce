# Mini E-Commerce Application (React + Node + Docker)

This project is a mini e-commerce application built using React and Node.js.  
It demonstrates frontend–backend interaction, state management, and basic Docker usage.

It includes:
- React (Vite) frontend
- Node.js + Express backend
- Cart functionality
- Docker & Docker Compose setup


## ⚙️ Prerequisites

Make sure you have the following installed:

- Docker
- Docker Compose (v2)

Check installation:
```bash
docker --version
docker compose version
```

## Running the project

https://github.com/devdnyan/mini-ecommerce/issues/1#issue-3913364446

```bash
git clone https://github.com/devdnyan/mini-ecommerce.git
cd mini-ecommerce
docker compose up --build
```
then visit 
FRONTEND : http://localhost:5173/
BACKEND : http://localhost:5000/

## Backend endpoints

GET /products :  Returns a list of available products.
GET /cart : Returns a list of avialable cart items
POST /cart : TO add Item to a cart
DELETE /cart : TO remove item totally
PATCH /cart : To remove item from cart or reduce the quantity

## Environment Variables

The backend supports environment variables via a .env file but also works with default values.

If you want to use envs explicitly:
  cd products-backend/.env.example to products-backend/.env

## 📱 Application Details

This is a simple mini e-commerce application that demonstrates core frontend and backend concepts.

### Features
- Product listing page displaying products with image, name, and price
- Add to Cart functionality
- Cart page showing selected products with quantity update and remove options
- Backend APIs for products and cart actions
- Dockerized setup for consistent execution

---

## 🛒 Cart Navigation Design Decision

The **Cart button is used only to toggle/navigation between the Products view and the Cart view**.

Client-side routing libraries (such as React Router) were intentionally **not used**, as introducing full routing for a two-view application would be unnecessary overhead for this scope.

Instead:
- A simple state-based view switch is used
- This keeps the application lightweight and easier to reason about
- The focus remains on state management, API interaction, and Docker setup

This approach is suitable for small applications and aligns with the goal of demonstrating core concepts without overengineering.

---

## 🧠 Design Considerations

- Simplicity and clarity were prioritized over complex architecture
- State management is handled using React Context API
- Backend uses in-memory data storage as allowed
- Docker is used to ensure the application runs consistently across environments

