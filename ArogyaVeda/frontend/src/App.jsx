import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModernNavbar from './components/ModernNavbar';
import AnimatedHero from './components/AnimatedHero';
import WellnessFeatures from './components/WellnessFeatures';
import VedicJourney from './components/VedicJourney';
import AncientWisdom from './components/AncientWisdom';
import ModernFooter from './components/ModernFooter';
import Register from './components/Register';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import Prediction from './components/Prediction';
import AboutDisease from './components/AboutDisease';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--color-bg)] selection:bg-[var(--color-primary-light)]">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <ModernNavbar />
              <AnimatedHero />
              <WellnessFeatures />
              <VedicJourney />
              <AncientWisdom />
              <ModernFooter />
            </>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Dashboard Routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="prediction" element={<Prediction />} />
            <Route path="about-disease" element={<AboutDisease />} />
            <Route path="chatbot" element={<Chatbot />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
