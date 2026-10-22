// main.js
import { Dashboard } from './js/Dashboard.js';

const dashboard = new Dashboard('dashboard-grid');

document.getElementById('btn-add-todo').addEventListener('click', () => {
  dashboard.addWidget('todo');
});
document.getElementById('btn-add-quote').addEventListener('click', () => {
  dashboard.addWidget('quote');
});
document.getElementById('btn-add-gamestats').addEventListener('click', () => {
  dashboard.addWidget('gamestats');
});
document.getElementById('btn-add-crypto').addEventListener('click', () => {
  dashboard.addWidget('crypto');
});

// Начальные виджеты
dashboard.addWidget('gamestats');
dashboard.addWidget('todo');