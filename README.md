# MiniShop - E-commerce Web Application

A modern, responsive e-commerce web application built with React, Vite, and Tailwind CSS. This application consumes the Fake Store API to provide a complete shopping experience with product browsing, cart management, and checkout functionality.

## 🚀 Features

### Core Functionality
- **Product Listing** - Browse all products in a responsive grid layout
- **Search & Filter** - Search by product title and filter by categories
- **Product Details** - View detailed product information with images and ratings
- **Shopping Cart** - Add, update, and remove items with quantity management
- **Checkout Process** - Complete order form with validation and confirmation

### Technical Features
- **Data Caching** - In-memory caching to avoid redundant API calls
- **State Management** - Zustand for global cart state management
- **Local Storage** - Persistent cart data and user preferences
- **Responsive Design** - Mobile-first design that works on all devices
- **Loading States** - Smooth loading indicators and error handling
- **Form Validation** - Client-side validation with user-friendly error messages

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Zustand
- **API**: Fake Store API
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/
│   ├── Header/
│   │   └── Header.jsx
│   ├── ProductCard/
│   │   └── ProductCard.jsx
│   ├── LoadingSpinner/
│   │   └── LoadingSpinner.jsx
│   ├── ErrorMessage/
│   │   └── ErrorMessage.jsx
│   └── CartItem/
│       └── CartItem.jsx
├── pages/
│   ├── Home/
│   │   └── Home.jsx
│   ├── ProductDetail/
│   │   └── ProductDetail.jsx
│   ├── Cart/
│   │   └── Cart.jsx
│   └── Checkout/
│       └── Checkout.jsx
├── hooks/
│   ├── useProducts.js
│   ├── useCart.js
│   └── useLocalStorage.js
├── stores/
│   └── cartStore.js
├── utils/
│   ├── api.js
│   └── validation.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🚦 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-ecommerce
   cd .\frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 Key Features Explained

### Product Management
- **Product Listing**: Displays all products from the Fake Store API in a responsive grid
- **Search Functionality**: Real-time search through product titles and descriptions
- **Category Filtering**: Filter products by categories fetched from the API
- **Product Details**: Detailed view with images, ratings, and descriptions

### Shopping Cart
- **Add to Cart**: Add products with quantity selection (1-5 on product detail, 1-10 in cart)
- **Cart Management**: Update quantities, remove items, clear entire cart
- **Persistent Storage**: Cart data persists using Zustand with localStorage
- **Real-time Updates**: Cart count updates immediately across the application

### Checkout Process
- **Order Summary**: Review all items, quantities, and pricing
- **Form Validation**: Client-side validation for all required fields
- **Tax & Shipping**: Automatic calculation (10% tax, free shipping over $50)
- **Order Confirmation**: Success page with order details

### Data Management
- **API Caching**: In-memory caching prevents redundant API calls
- **Error Handling**: Comprehensive error handling with retry functionality
- **Loading States**: Smooth loading indicators throughout the application
- **Offline Support**: Cart data persists even when offline

## 🎨 Design Features

### User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: Proper ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Optimized images, lazy loading, and efficient rendering

### Visual Elements
- **Interactive Cards**: Hover effects and smooth transitions
- **Loading Animations**: Consistent loading spinners throughout the app
- **Form Feedback**: Real-time validation feedback with clear error messages
- **Status Indicators**: Visual feedback for cart items, loading states, and actions

## 🧪 Testing the Application

### Test Scenarios

1. **Browse Products**
   - Visit the home page to see all products
   - Use the search bar to find specific products
   - Filter by categories using the dropdown

2. **Product Details**
   - Click on any product to view details
   - Try changing quantities and adding to cart
   - Navigate back and forth between products

3. **Shopping Cart**
   - Add multiple products to cart
   - Update quantities in the cart
   - Remove items and observe total updates

4. **Checkout Process**
   - Proceed to checkout with items in cart
   - Fill out the form (try both valid and invalid data)
   - Complete the order and see confirmation

## 📱 API Integration

The application integrates with the [Fake Store API](https://fakestoreapi.com/) for:

- **Products**: `GET /products` - Fetch all products
- **Product Details**: `GET /products/{id}` - Get single product
- **Categories**: `GET /products/categories` - Get all categories
- **Category Products**: `GET /products/category/{category}` - Get products by category

## 🔧 Customization

### Adding New Features
- **Wishlist**: Extend the state management to include wishlist functionality
- **User Authentication**: Add login/signup with protected routes
- **Product Reviews**: Implement review system with local storage
- **Order History**: Track previous orders with local storage

### Styling Customization
- Modify `tailwind.config.js` for custom colors and styles
- Update `index.css` for global styles
- Customize component-specific styles in individual components

## 🚀 Performance Optimizations

- **Code Splitting**: React.lazy for route-based code splitting
- **Image Optimization**: Lazy loading for product images
- **API Caching**: In-memory cache reduces API calls
- **State Management**: Efficient state updates with Zustand
- **Bundle Size**: Tree shaking and minification in production

## 🛡 Security Considerations

- **Input Validation**: Client-side validation for all forms
- **XSS Protection**: Safe handling of user input
- **API Security**: Proper error handling for API failures
- **Data Privacy**: No sensitive data stored in localStorage

## 📈 Future Enhancements

- **Payment Integration**: Add real payment processing
- **User Accounts**: Implement user registration and profiles
- **Order Tracking**: Add order status and tracking
- **Product Reviews**: Allow users to rate and review products
- **Advanced Filtering**: Price range, ratings, and multiple category filters
- **Search Enhancement**: Fuzzy search and search suggestions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



**Happy Shopping! 🛒**
