import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CaseIntake from './pages/CaseIntake';
import LegalTools from './pages/LegalTools';

const App = () => {
  return (
    <CssVarsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/intake" element={<CaseIntake />} />
          <Route path="/legal" element={<LegalTools />} />
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
};

export default App;
