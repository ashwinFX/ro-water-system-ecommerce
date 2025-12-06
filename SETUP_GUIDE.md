# RO Water System E-Commerce Application

## Real-time E-Commerce Platform with Stripe Payments

### Quick Start Guide

#### Prerequisites
- Node.js v14+ (Download from nodejs.org)
- MongoDB (Download from mongodb.com or use MongoDB Atlas)
- Git (Download from git-scm.com)
- Stripe Account (Create at stripe.com)

#### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/ashwinFX/ro-water-system-ecommerce.git
cd ro-water-system-ecommerce
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
```

3. **Configure Environment Variables (backend/.env)**
```
MONGODB_URI=mongodb://localhost:27017/ro-water-system
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_your_stripe_key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

4. **Start Backend Server**
```bash
npm start
# Server will run on http://localhost:5000
```

5. **Setup Frontend (In another terminal)**
```bash
cd frontend
npm install
npm start
# App will open on http://localhost:3000
```

#### Features
- Real-time inventory updates with WebSocket
- Stripe payment integration
- User authentication with JWT
- Shopping cart system
- Order management and tracking
- Admin dashboard
- Responsive design

#### Technology Stack
- **Backend**: Node.js, Express.js, MongoDB, Socket.io
- **Frontend**: React.js, Tailwind CSS, Socket.io Client
- **Payment**: Stripe API
- **Authentication**: JWT (JSON Web Tokens)

#### API Documentation
All API endpoints are documented in the backend/routes folder

#### Support
For issues and questions, please open an issue on GitHub.
