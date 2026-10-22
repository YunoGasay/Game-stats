// js/Dashboard.js
import { ToDoWidget } from './ToDoWidget.js';
import { QuoteWidget } from './QuoteWidget.js';
import { GameStatsWidget } from './GameStatsWidget.js';
import { CryptoWidget } from './CryptoWidget.js';

export class Dashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.widgets = [];
    this._counter = 0;

    // Слушаем закрытие виджетов
    document.addEventListener('widget-closed', (e) => {
      const id = e.detail.id;
      this.widgets = this.widgets.filter(w => w.id !== id);
    });
  }

  addWidget(type) {
    this._counter++;
    const id = `widget-${type}-${this._counter}`;
    let widget;

    switch (type) {
      case 'todo':
        widget = new ToDoWidget({ title: 'Список дел', id });
        break;
      case 'quote':
        widget = new QuoteWidget({ title: 'Цитата', id });
        break;
      case 'gamestats':
        widget = new GameStatsWidget({ title: 'Последние матчи', id, teamId: '133604' });
        break;
      case 'crypto':
        widget = new CryptoWidget({ title: 'Игровая валюта', id, coinId: 'gala' });
        break;
      default:
        console.warn('Неизвестный тип виджета:', type);
        return;
    }

    const el = widget.render();
    this.container.appendChild(el);
    this.widgets.push(widget);
    widget.initData();
    return widget;
  }

  removeWidget(widgetId) {
    const widget = this.widgets.find(w => w.id === widgetId);
    if (widget) {
      widget.destroy();
    }
  }
}