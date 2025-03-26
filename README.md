# GameChanger Basketball Platform

A comprehensive basketball team management platform with live streaming, statistics tracking, and film analysis capabilities.

## Installation Instructions for Windows 10 with WSL2 and Ubuntu

These instructions will guide you through setting up and running the GameChanger Basketball Platform on your Windows 10 machine using WSL2 with Ubuntu.

### Prerequisites

1. Windows 10 with WSL2 and Ubuntu installed
2. Node.js (version 20.x or later)
3. npm (comes with Node.js)
4. Git

### Setting Up WSL2 and Ubuntu (If Not Already Configured)

If you already have WSL2 with Ubuntu set up, you can skip this section.

1. Enable WSL2 in Windows:
   - Open PowerShell as Administrator
   - Run: `wsl --install`
   - Restart your computer when prompted

2. Install Ubuntu from the Microsoft Store:
   - Search for "Ubuntu" in the Microsoft Store
   - Select and install the latest LTS version

3. Set up Ubuntu:
   - Launch Ubuntu from the Start menu
   - Create a username and password when prompted

### Installing Node.js in WSL2 Ubuntu

1. Update package lists:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. Install Node.js and npm using NVM (Node Version Manager):
   ```bash
   # Install dependencies
   sudo apt install -y curl

   # Install NVM
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

   # Load NVM
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

   # Install Node.js 20.x
   nvm install 20
   nvm use 20
   ```

3. Verify installation:
   ```bash
   node -v  # Should show v20.x.x
   npm -v   # Should show 10.x.x or later
   ```

### Cloning and Setting Up the Project

1. Clone the repository (replace with your actual repository URL):
   ```bash
   git clone <your-repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the application:
   ```bash
   npm run dev
   ```

2. Access the application:
   - Open your web browser
   - Navigate to `http://localhost:5000`

### Potential WSL2-Specific Adjustments

If you encounter network-related issues with WSL2:

1. For port forwarding issues:
   - The application should automatically be accessible from Windows
   - If not, you might need to run: `netsh interface portproxy add v4tov4 listenport=5000 listenaddress=0.0.0.0 connectport=5000 connectaddress=$(wsl hostname -I)`

2. File watching issues:
   - If you notice file watching doesn't work properly, try adding this to your project's package.json:
   ```json
   "nodemonConfig": {
     "legacyWatch": true
   }
   ```

3. Performance optimization:
   - Store your project files in the Linux file system (e.g., `/home/username/projects/`) rather than in Windows file system (e.g., `/mnt/c/Users/...`)
   - This significantly improves disk I/O performance

### Troubleshooting

1. If you encounter a "EADDRINUSE" error:
   - Another application might be using port 5000
   - Stop the other application or change the port in the application's configuration

2. WebSocket connection issues:
   - Ensure your firewall isn't blocking WebSocket connections
   - Check that Windows Defender is configured to allow the application

3. Node.js version issues:
   - The platform works best with Node.js 20.x
   - If using a different version, consider switching using `nvm use 20`

## Project Structure

The platform uses a full-stack JavaScript architecture:

- Frontend: React with TypeScript and TailwindCSS
- Backend: Express.js
- Storage: In-memory storage (can be replaced with a database)

## Features

- Dashboard with team statistics and upcoming games
- Live streaming for games with real-time controls
- Film room for video analysis and highlight tagging
- Statistics tracking for players and teams
- Team management tools for roster and communication
- Schedule management with calendar integration
- Subscription management with different tiers

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.