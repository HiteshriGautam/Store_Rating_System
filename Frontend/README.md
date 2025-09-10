# Store Rating Platform

A React-based store rating platform with role-based authentication and dashboards for Admin, Users, and Store Owners.

## 🚀 Quick Setup for VS Code

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- VS Code

### 1. Download the Project
Save all the project files to a folder on your computer.

### 2. Install Dependencies
Open terminal in VS Code and run:

```bash
npm install
```

If you encounter any issues, try:
```bash
npm install --legacy-peer-deps
```

### 3. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 📋 Demo Accounts

### Admin Account
- **Email:** admin@example.com
- **Password:** Any password works
- **Access:** Full platform management

### Regular User Account  
- **Email:** john@example.com
- **Password:** Any password works
- **Access:** Store browsing and rating

### Store Owner Account
- **Email:** owner@store.com  
- **Password:** Any password works
- **Access:** Store management dashboard

## 🛠️ Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   └── Navbar.tsx
│   ├── UI/
│   │   ├── MetricCard.tsx
│   │   └── StarRating.tsx
│   ├── ui/                    # Shadcn components
│   └── ProtectedRoute.tsx
├── context/
│   └── AuthContext.tsx
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── UserManagement.tsx
│   │   └── StoreManagement.tsx
│   ├── Index.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   └── NotFound.tsx
├── services/
│   └── api.ts                 # Mock API with Axios
├── types/
│   └── index.ts
└── hooks/
    └── use-toast.ts
```

## 🎯 Features

### Admin Dashboard
- ✅ User management (CRUD operations)
- ✅ Store management (CRUD operations)
- ✅ Platform statistics
- ✅ Advanced filtering and sorting

### User Features
- ✅ Store browsing
- ✅ Rating submission
- ✅ Account management

### Store Owner Features
- ✅ Store dashboard
- ✅ Rating analytics
- ✅ Customer insights

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📝 Validation Rules

- **Name:** 5-40 characters
- **Address:** Maximum 400 characters  
- **Password:** 8-16 characters, 1 uppercase + 1 special character
- **Email:** Standard email format

## 🎨 Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Shadcn/ui
- **Routing:** React Router v6
- **State Management:** Context API
- **HTTP Client:** Axios
- **Icons:** Lucide React

## 🌐 API Integration

The project uses mock data but is structured for easy backend integration:

```typescript
// API endpoints are ready for backend connection
const API_BASE_URL = 'http://localhost:5000/api';

// Available API services:
- authAPI.login()
- authAPI.signup() 
- usersAPI.getAll()
- storesAPI.getAll()
- ratingsAPI.getAll()
```

## 🔐 Authentication Flow

1. Users login with role-based credentials
2. JWT tokens stored in localStorage
3. Protected routes based on user roles
4. Automatic redirect to appropriate dashboard

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Clean, professional UI
- Consistent design system

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/15ede147-70fd-4ac9-9405-5f87dfc9fcba) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
