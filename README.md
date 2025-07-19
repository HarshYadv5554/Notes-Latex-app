# LaTeX Notes App

A modern, full-stack notes application with live LaTeX rendering, built with React, TypeScript, and Node.js.

![LaTeX Notes](https://img.shields.io/badge/LaTeX-Notes-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## ✨ Features

### 🧮 **Live LaTeX Rendering**

- Real-time LaTeX equation rendering using KaTeX
- Support for both inline (`$...$`) and display (`$$...$$`) math
- Instant preview as you type

### 🔧 **Equation Toolbar**

- Comprehensive symbol palette including:
  - Mathematical symbols (∑, ∫, √, π, matrices, limits)
  - Greek letters (α, β, γ, δ, θ, λ, μ, σ, φ, ω)
  - Chemical symbols (H₂O, CO₂, reaction arrows)
  - Relations, operators, and arrows
- One-click LaTeX code insertion

### 📝 **Notes Management**

- Create, edit, update, and delete notes
- Auto-save functionality
- MongoDB persistence
- Responsive design for all devices

### 🎨 **Modern UI**

- Clean, professional interface with Tailwind CSS
- Split-pane editor with live preview
- Dark/light theme support
- Responsive design

## 🚀 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Query** for data fetching
- **KaTeX** for LaTeX rendering

### Backend

- **Node.js** with Express
- **MongoDB** with Mongoose
- **TypeScript** for type safety
- **CORS** for cross-origin requests

### Deployment

- **Netlify** with serverless functions
- **MongoDB Atlas** for cloud database

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18 or later
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd latex-notes
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file
   echo "MONGODB_URI=your_mongodb_connection_string" > .env
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit `http://localhost:8080`

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Push to GitHub
2. Connect repository to Netlify
3. Set environment variable: `MONGODB_URI`
4. Deploy automatically!

### Other Deployment Options

- **Vercel**: Use included `vercel.json`
- **Docker**: Use included `Dockerfile`
- **Railway/Render**: Standard Node.js deployment

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Type checking
- `npm test` - Run tests

### Project Structure

```
├── client/                 # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Route components
│   └── App.tsx           # Main app component
├── server/                # Express backend
│   ├── routes/           # API endpoints
│   └── index.ts          # Server setup
├── shared/               # Shared types
└── netlify/              # Netlify functions
```

## 📚 Usage

### Writing LaTeX

- **Inline math**: `$E = mc^2$` → $E = mc^2$
- **Display math**: `$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$`
- **Fractions**: `$\frac{a+b}{c+d}$`
- **Greek letters**: `$\alpha, \beta, \gamma$`
- **Subscripts/Superscripts**: `$x_{i}^{2}$`

### Chemical Formulas

- **Water**: `$H_2O$`
- **Carbon Dioxide**: `$CO_2$`
- **Reactions**: `$A + B \to C$`

### Symbols

Use the equation toolbar to insert complex symbols with one click!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [KaTeX](https://katex.org/) for beautiful math rendering
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [MongoDB Atlas](https://www.mongodb.com/atlas) for database hosting

---

**Made with ❤️ for mathematics and note-taking enthusiasts**
