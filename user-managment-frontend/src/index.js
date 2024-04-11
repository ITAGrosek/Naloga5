import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Najdite kontejner, kjer želite prikazati vašo React aplikacijo
const container = document.getElementById('root');

// Ustvarite koren (root) z uporabo kontejnerja
const root = createRoot(container);

// Uporabite root.render, da prikažete vašo React komponento
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
