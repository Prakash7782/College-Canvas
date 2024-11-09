# College Canvas 🎨

**College Canvas** is a collaborative online drawing platform designed for students to creatively engage, collaborate, and express ideas visually. The platform provides real-time drawing capabilities, easy-to-use drawing tools, and a seamless user experience. Whether for brainstorming, taking visual notes, or creating artwork, College Canvas brings collaboration to life!

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
 
- **Multiple Tools**: Access a variety of tools including brush, eraser, color picker, and more.
- **Save & Export**: Save and export your canvas as an image to share your creations.
- **Undo/Redo**: Quickly fix mistakes with undo and redo functionality.
- **Responsive UI**: Works smoothly on both desktop and mobile devices.

## Tech Stack
- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB ( saving projects)
- **WebSocket**: Socket.IO for real-time drawing synchronization

## Getting Started

### Prerequisites
- **Node.js** (v14 or above)
- **npm** (v6 or above)
- **MongoDB** (optional, only if persistent data storage is needed)

### Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/college-canvas.git
    cd college-canvas
    ```

2. **Install Backend Dependencies**
    ```bash
    cd server
    npm install
    ```

3. **Install Frontend Dependencies**
    ```bash
    cd ../client
    npm install
    ```

### Configuration
Create a `.env` file in the `server` directory to store your environment variables:
```env
PORT=5000
MONGODB_URI=<Your MongoDB URI here>
SOCKET_PORT=4000
