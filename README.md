# Storyteller AI Project

![Banner](public/banner.png) *(optional: add a banner image if you have one)*

A full-stack application combining a React/Vite frontend with a Flask backend for AI-powered storytelling.

## 📁 Project Structure

```
[Storyteller_Ai/ # Frontend (React/Vite)
├── public/ #Static assets
│ ├── banner.png
│ └── vite.svg
├── src/
│ ├── assets/ # Images/fonts
│ ├── components/ # React components
│ ├── layouts/ # Page layouts
│ ├── routes/ # Application routes
│ ├── App.jsx # Main component
│ └── main.jsx # Entry point
├── .eslintrc.cjs # ESLint config
├── tailwind.config.js # Tailwind CSS config
└── vite.config.js # Vite config

storyteller-flask/ # Backend (Flask)
├── app.py # Main application
├── requirements.txt # Python dependencies
└── test_env.py # Environment tests

```


## 🚀 Setup Guide

### Frontend (React/Vite)
1. Navigate to frontend folder:
   ```bash
   cd Storyteller_Ai
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start development server:
    ```bash
      npm run dev
    ```
4. Open your browser at [http://localhost:5173](http://localhost:5173)

### Backend (Flask) 
1. Navigate to backend folder:
   ```bash
   cd storyteller-flask
    ```
2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Run Flask application:
    ```bash
    python app.py
    ```
4. Open your browser at [http://localhost:5000](http://localhost:)

### 🔧 Configuration 

&nbsp;&#10022; Frontend environment: ``` .env in Storyteller_Ai/ ```

&nbsp;&#10022; Backend environment: ``` .env in storyteller-flask/ ``` 

### 🛠️ Tech Stack 
## Frontend:

&nbsp;&#10022; React + Vite

&nbsp;&#10022; Tailwind CSS

&nbsp;&#10022; ESLint (code quality)

## Backend:

&nbsp;&#10022; Flask (Python)

&nbsp;&#10022; Python 3.x

## 🤝 Contributing : 

#### Fork the repository

&nbsp;&#10022; Create a new branch (git checkout -b feature/your-feature)

&nbsp;&#10022; Commit changes (git commit -m 'Add some feature')

&nbsp;&#10022; Push to branch (git push origin feature/your-feature)

&nbsp;&#10022; Open a Pull Request