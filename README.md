# XE Clone Currency Exchange Application

A comprehensive multi-page currency exchange web application inspired by XE.com, built with HTML, CSS, and JavaScript as an educational project.

## 🚀 Features Implemented

### Core Features
- **Multi-Page System**: Complete navigation between 5 functional pages
- **Live Currency Converter**: Real-time conversion between 20+ currencies
- **Conversion History**: Persistent storage using localStorage
- **Currency Details**: Detailed currency information with charts and trends
- **Settings Management**: Theme toggle, default currencies, and preferences

### Advanced Features
- **Dark/Light Mode**: Complete theme system with smooth transitions
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Search Functionality**: Currency search in dropdown menus
- **Loading States**: Visual feedback during conversion operations
- **Currency Flags**: Visual representation of each currency
- **Data Export**: Export history as JSON or CSV files
- **Interactive Charts**: Rate trends using Chart.js
- **Filter System**: Filter conversion history by currency

## 📁 Project Structure

```
currency-app/
│── index.html              # Homepage with quick converter
│── converter.html          # Full currency converter page
│── details.html            # Currency details and charts
│── history.html            # Conversion history and statistics
│── settings.html           # Application settings
│── css/
│   └── style.css           # Complete styling with theme system
│── js/
│   └── script.js           # All application logic
│── assets/                 # Static assets directory
│── README.md               # Project documentation
```

## 🌐 Pages Overview

### 1. Homepage (index.html)
- Modern hero section with gradient background
- Quick converter for instant conversions
- Feature showcase grid
- Call-to-action navigation

### 2. Converter Page (converter.html)
- Full-featured currency converter
- Amount input with validation
- Currency selection with search
- Swap functionality
- Conversion results with rate information
- Popular conversion shortcuts
- Save to history functionality

### 3. Currency Details (details.html)
- Individual currency information
- Exchange rate charts (7, 30, 90 days)
- Comparison with other currencies
- Historical rates table
- Visual currency flags

### 4. History Page (history.html)
- Complete conversion history
- Statistics dashboard
- Filter by currency
- Delete individual conversions
- Clear all history
- Export functionality (JSON/CSV)

### 5. Settings Page (settings.html)
- Dark/Light theme toggle
- Default currency preferences
- Language selection
- Data management options
- About section

## 🎨 Design System

### Color Scheme
- **Primary**: Blue gradient (#2563eb)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: System font stack for optimal performance
- **Weights**: Regular (400), Medium (500), Bold (600, 700)
- **Sizes**: Responsive scaling from mobile to desktop

### Components
- **Cards**: Consistent shadow and border radius
- **Buttons**: Hover effects and loading states
- **Forms**: Focus states and validation styling
- **Navigation**: Sticky header with active indicators

## 💻 Technical Implementation

### HTML5 Semantic Structure
- Proper use of semantic elements
- Accessibility considerations
- Meta tags for SEO
- Responsive viewport configuration

### CSS3 Features
- CSS Variables for theming
- Flexbox and Grid layouts
- Smooth transitions and animations
- Media queries for responsiveness
- Custom properties for maintainability

### JavaScript ES6+
- Modular code structure
- localStorage for data persistence
- Event-driven architecture
- Async operations with loading states
- Error handling and validation

### Responsive Design
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- Breakpoint-driven layout changes

## 🔧 Installation & Usage

### Local Development
1. Clone or download the project
2. Navigate to the project directory
3. Open `index.html` in a web browser
4. No build process required - pure HTML/CSS/JS

### Deployment
- Upload all files to a web server
- Ensure all file paths are maintained
- No server-side requirements

## 📊 Supported Currencies

The application supports 20 major world currencies:

| Code | Country | Symbol | Flag |
|------|---------|--------|------|
| USD | United States | $ | 🇺🇸 |
| EUR | Eurozone | € | 🇪🇺 |
| GBP | United Kingdom | £ | 🇬🇧 |
| JPY | Japan | ¥ | 🇯🇵 |
| CAD | Canada | C$ | 🇨🇦 |
| AUD | Australia | A$ | 🇦🇺 |
| CHF | Switzerland | Fr | 🇨🇭 |
| CNY | China | ¥ | 🇨🇳 |
| INR | India | ₹ | 🇮🇳 |
| MXN | Mexico | $ | 🇲🇽 |
| BRL | Brazil | R$ | 🇧🇷 |
| ZAR | South Africa | R | 🇿🇦 |
| RUB | Russia | ₽ | 🇷🇺 |
| KRW | South Korea | ₩ | 🇰🇷 |
| SGD | Singapore | S$ | 🇸🇬 |
| HKD | Hong Kong | HK$ | 🇭🇰 |
| SEK | Sweden | kr | 🇸🇪 |
| NOK | Norway | kr | 🇳🇴 |
| NZD | New Zealand | NZ$ | 🇳🇿 |
| TRY | Turkey | ₺ | 🇹🇷 |

## 🎯 Learning Objectives

This project demonstrates proficiency in:

### UI/UX Design
- Multi-page system design
- Component-based architecture
- User-centered design principles
- Responsive design patterns

### Web Development
- Semantic HTML5 structure
- Modern CSS3 techniques
- JavaScript DOM manipulation
- Local storage management
- Event handling and validation

### Version Control
- Git workflow management
- Project organization
- Documentation practices

### System Analysis
- Requirements gathering
- Feature prioritization
- Data structure design
- User flow optimization

## 🔮 Future Enhancements

### Planned Features
- Real API integration for live rates
- Currency calculator with mathematical operations
- Rate alerts and notifications
- Multi-language support
- Advanced charting capabilities
- Offline functionality

### Technical Improvements
- Progressive Web App (PWA) implementation
- Service worker for caching
- Advanced error handling
- Unit testing suite
- Performance optimization

## 📸 Screenshots

*(Note: Add actual screenshots when deploying)*

### Homepage
- Hero section with quick converter
- Feature showcase
- Modern gradient design

### Converter
- Clean conversion interface
- Currency selection with flags
- Real-time results display

### Currency Details
- Interactive charts
- Comparison grid
- Historical data table

### History
- Conversion timeline
- Statistics dashboard
- Export options

### Settings
- Theme toggle
- Preferences management
- Data controls

## 🤝 Contributing

This is an educational project. For learning purposes:

1. Study the code structure
2. Understand the implementation patterns
3. Experiment with modifications
4. Add new features as exercises

## 📄 License

This project is created for educational purposes. Feel free to use it as a learning resource.

## 🙏 Acknowledgments

- Inspired by XE.com for design patterns
- Chart.js for data visualization
- Modern web standards and best practices
- Educational curriculum guidelines

---

**Project Status**: ✅ Complete  
**Last Updated**: 2024  
**Version**: 1.0.0  
**Educational Level**: Level 3 SOD - Advanced Assignment
