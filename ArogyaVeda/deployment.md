# Deployment Guide: ArogyaVeda

This document tracks all commands, configurations, and steps required to host the ArogyaVeda application on an Azure Virtual Machine (Ubuntu) using PM2 and Nginx.

## Server Information
- **IP Address**: `20.205.21.79`
- **Frontend URL**: `http://20.205.21.79` (Port 80)
- **Backend URL**: `http://20.205.21.79:8000` (Port 8000)
- **SSH Access**: `ssh -i "C:\Users\rushi\Downloads\MyVirtualMachine3_key.pem" azureuser@20.205.21.79`
- **Git Repo**: `https://github.com/Rushi774545/ArogyaVeDa.git`

## 1. Initial Server Setup
Run these commands to update the system and install required dependencies.

```bash
# 1. Update package list to ensure latest versions are available
sudo apt update

# 2. Install Python, Node.js, and Nginx
sudo apt install python3-pip python3-venv nginx -y

# 3. Install Node.js (Version 20 required for Vite build)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Install PM2 globally to manage background processes
sudo npm install pm2 -g
```

## 2. Environment Configuration (.env)
Since sensitive API keys (OpenAI, LangChain) are not on GitHub, create a `.env` file in the Django project root.

```bash
# Create the .env file
nano /home/azureuser/ArogyaVeDa/ArogyaVeda/.env
```

**Content:**
```env
OPENAI_API_KEY=your_key_here
LANGCHAIN_API_KEY=your_key_here
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=ArogyaVeda
```

## 3. Backend Deployment (Django)

### Setup Environment
```bash
# 1. Clone the repository
git clone https://github.com/Rushi774545/ArogyaVeDa.git
cd ArogyaVeDa/ArogyaVeda

# 2. Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install requirements
pip install -r requirements.txt
pip install gunicorn
```

### PM2 Process for Backend
```bash
# Start Django with PM2
pm2 start "gunicorn --bind 0.0.0.0:8000 ArogyaVeda.wsgi" --name "arogyaveda-backend"
```

## 4. Frontend Deployment (React)

### Build Frontend
```bash
cd frontend
# Ensure src/api-config.ts points to http://20.205.21.79:8000
npm install
npm run build
```

## 5. Nginx Configuration
Nginx is configured to serve the Frontend on port 80 and proxy the Backend on port 8000.

Create configuration: `sudo nano /etc/nginx/sites-available/arogyaveda`

```nginx
# Frontend Configuration (Port 80)
server {
    listen 80;
    server_name 20.205.21.79;

    location / {
        root /home/azureuser/ArogyaVeDa/ArogyaVeda/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}

# Backend Configuration (Port 8000)
server {
    listen 8000;
    server_name 20.205.21.79;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Apply Configuration
```bash
sudo ln -sf /etc/nginx/sites-available/arogyaveda /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

## 6. Permissions Fix (Crucial)
If you see a 500 or 403 error, ensure Nginx has permission to read the home directory:
```bash
sudo chmod -R 755 /home/azureuser
```

