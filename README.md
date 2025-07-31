# Apex Auto Mods - Frontend

A modern React-based frontend application for Apex Auto Mods Garage, providing car customization, service booking, and build management features.

## �� Features

- **User Authentication**: Secure login/register system with JWT tokens
- **Car Customization**: Interactive car builder with parts selection
- **Service Booking**: Book automotive services with scheduling
- **Build Management**: Save and manage custom car builds
- **Dashboard**: User dashboard with build history and bookings
- **Responsive Design**: Modern UI built with Tailwind CSS

## 🛠️ Tech Stack

- **React 19.1.0** - Modern React with hooks
- **Vite 7.0.4** - Fast build tool and dev server
- **Redux Toolkit 2.8.2** - State management
- **React Router DOM 7.7.1** - Client-side routing
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Lucide React 0.534.0** - Icon library

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see backend README)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ape-car/front-end
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

The app uses JWT tokens for authentication:

- Tokens are stored in localStorage
- Protected routes automatically redirect to login
- Automatic token validation on app startup
- Secure logout functionality

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Responsive design** for mobile and desktop
- **Modern UI components** with hover effects and animations
- **Consistent color scheme** and typography
