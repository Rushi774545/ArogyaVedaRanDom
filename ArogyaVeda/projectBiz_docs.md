# Project Documentation: ArogyaVeda (projectBiz)

This document tracks all updates, file creations, and module developments for the project.

## Initial Setup - 2026-03-31

### Django Project Creation
- Created a new Django project named **ArogyaVeda** in the root directory.
- Initial project structure:
    - `manage.py`: Django's command-line utility.
    - `ArogyaVeda/`: Project configuration directory.
        - `__init__.py`: Marks the directory as a Python package.
        - `settings.py`: Configuration for the Django project.
        - `urls.py`: URL declarations for the project.
        - `asgi.py`: Entry point for ASGI-compatible web servers.
        - `wsgi.py`: Entry point for WSGI-compatible web servers.

### Files Created
- `manage.py`
- `ArogyaVeda/__init__.py`
- `ArogyaVeda/asgi.py`
- `ArogyaVeda/settings.py`
- `ArogyaVeda/urls.py`
- `ArogyaVeda/wsgi.py`
- `projectBiz_docs.md`: This documentation file.

## User App Creation - 2026-03-31

### Django App Creation
- Created a new Django app named **user**.
- Registered the `user` app in `ArogyaVeda/settings.py` under `INSTALLED_APPS`.

### Files Created in `user/`
- `user/migrations/`
- `user/__init__.py`
- `user/admin.py`
- `user/apps.py`
- `user/models.py`
- `user/tests.py`
- `user/views.py`
- `user/serializers.py`: DRF Serializer for Patient model.
- `user/urls.py`: App-specific URL routing.

## Full-Stack Setup and Frontend UI - 2026-03-31

### Backend Updates
- Configured **Django REST Framework** and **CORS Headers**.
- Defined **Patient Model** with custom `patient_id` generation logic (starting from 101).
- Implemented **Registration API** endpoint at `/api/user/register/`.

### Frontend Development (React + Vite)
- Initialized React project using Vite.
- Installed **Three.js**, **React Three Fiber**, **Framer Motion**, and **Tailwind CSS**.
- Created a **3D Animated Hero Page** with a modern, dark-themed UI.
- Implemented **Patient Registration Form** with real-time API integration.
- Added **Lucide React** icons for an intuitive user experience.

### Files Created/Modified
- `ArogyaVeda/settings.py`: Updated with CORS and App registration.
- `ArogyaVeda/urls.py`: Added API route inclusion.
- `frontend/`: Entire React frontend directory.
- `frontend/src/components/Navbar.tsx`: Navigation component.
- `frontend/src/components/Hero.tsx`: 3D Animated Hero section.
- `frontend/src/components/Register.tsx`: Registration form with API integration.
- `frontend/src/App.jsx`: Main routing configuration.

## UI Refinement (Health Monitoring Focus) - 2026-03-31

### Simplified Layout
- Removed the "Download App" button from both Navbar and Hero sections for a cleaner look.
- Replaced the doctor smartphone mockup with a **Health Dashboard Visualization**.
- Added a "Login" link and "Get Started" button to the Navbar.

### Hero Section Enhancements
- **Central Analytics Card**: A high-fidelity card showing patient heart rate, sleep score, and daily vitals.
- **Real-time Data Simulation**: Added an animated bar chart representing live patient data.
- **Health-Focused Floating Elements**:
    - **Secure Health Vault**: Highlighting data privacy and encryption.
    - **Live Pulse Tracker**: Showing heart rate in bpm.
    - **Global Trust Card**: "350M+ Trusted Users Worldwide".
- **Enhanced Typography**: Increased the scale of the main heading for more impact.
- **Clean Background**: Refined the grid pattern and added soft glows for depth.

## Complete Home Page Redesign (From Scratch) - 2026-03-31

### Design Philosophy: "Clean, Authoritative, & Spacious"
- **Total Overhaul**: Scrapped the previous cluttered designs in favor of an ultra-minimalist, high-end medical aesthetic.
- **Color Palette**: Focused on pure white (`#ffffff`), soft slate grays, and a sharp "Teal/Emerald" (`#14b8a6`) for primary actions.
- **Typography**: Used **Inter** with "Black" weights (900+) and extra-large sizes (up to 100px) for a bold, modern feel.

### Ultra-Clean Navbar
- **Floating Design**: Implemented a centered, floating navbar with glassmorphism effects (`backdrop-blur-xl`).
- **Minimalist Branding**: A sleek logo treatment with a 3D-rotated icon.
- **Focused Navigation**: Reduced noise by focusing on high-intent links and a clear "Get Started" call-to-action.

### High-Impact Hero Section
- **Typography First**: A massive, center-aligned headline: "Your Health, Decoded by AI."
- **Abstract Accents**: Replaced busy backgrounds with soft, multi-layered radial glows.
- **Modern Social Proof**: A clean, grid-based stat section showing "100K+ Active Users" and "4.9/5 Rating".
- **Visual Storytelling**: A large, professionally framed medical image paired with a floating, animated "Heart Rate" card.

### Refined Registration Experience
- **Spacious Forms**: Moved from busy inputs to large, comfortable fields with soft backgrounds.
- **Modern UX**: Implemented a "Success State" that highlights the generated Patient ID in a massive, high-contrast display.
- **Consistency**: All forms and buttons now use consistent "Super-Rounded" (`2rem+`) corners for a friendly yet professional feel.
- **Success State**: Enhanced the Patient ID display with massive typography (`8xl`) and a success-check icon.

## User-Friendly UI Refinement - 2026-03-31

### Streamlined Design
- **Clutter Removal**: Removed unnecessary floating cards, secondary images, and the "Watch Our Story" button for a more focused user experience.
- **Modern Background**: Implemented a dynamic, multi-color mesh gradient background (`blue`, `teal`, `purple`) with soft blurs for a premium, non-basic feel.
- **Glassmorphism**: Applied `backdrop-blur-xl` and semi-transparent backgrounds to the Navbar and focal elements.

### Enhanced Hero Section
- **Typography Focus**: Massive, black-weight heading ("Health is wealth") with a high-contrast blue italicized subtitle.
- **Minimalist Features**: Replaced complex cards with a clean, three-column feature indicator row (`Secure Data`, `Expert Care`, `AI Analysis`).
- **Unified CTA**: A single, high-impact "Get Started Now" button with hover transitions.

### Clean & Focused Navigation
- **Minimalist Navbar**: Reduced link density and focused on clear navigation paths.
- **Active States**: Implemented smooth underline transitions for navigation items.

### Simplified Registration
- **Dedicated Layout**: Removed background imagery from the registration form to focus entirely on user input.
- **Refined Inputs**: Large, comfortable form fields with subtle borders and focus-active states.
- **Success View**: A clean, centered success state that prominently features the Patient ID in a high-contrast container.

## Deployment & Production Setup - 2026-04-05

### Backend Deployment (Azure VM)
- **Lazy OpenAI Initialization**: Modified `Prediction_App` and `Chatbot_App` to initialize the OpenAI client only when needed. This prevents the server from crashing during startup or migrations if the `OPENAI_API_KEY` is missing.
- **ML Model Training**: Executed the training script on the VM to generate `health_model.h5` and associated scalers/encoders.
- **Data Import**: Updated and ran the `import_medicines` command to populate the production database with Ayurvedic medicine data.
- **Process Management**: Configured **PM2** to manage the Gunicorn process, ensuring the Django backend remains active.

### Frontend Deployment (React)
- **API Configuration**: Updated `api-config.ts` to point to the VM's public IP (`20.205.21.79`).
- **Build Optimization**: Upgraded Node.js to version 20 on the VM to support the latest Vite/React build process.
- **Static Hosting**: Generated an optimized production build and configured Nginx to serve it.

### Web Server Configuration (Nginx)
- **Reverse Proxy**: Configured Nginx as a reverse proxy to:
    - Serve the React frontend from `/`.
    - Route API requests (`/api/`) to the Django Gunicorn server running on port 8000.
- **Security**: Disabled the default Nginx site and applied project-specific routing.

### Files Created/Modified
- `Prediction_App/views.py`: Implemented lazy loading for OpenAI.
- `Chatbot_App/rag_utils.py`: Implemented lazy loading for OpenAI and embeddings.
- `frontend/src/api-config.ts`: Set production API URL.
- `deployment.md`: Comprehensive log of all deployment commands.
- `arogyaveda.nginx`: Nginx site configuration file.







