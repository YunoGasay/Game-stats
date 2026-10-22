// js/GameStatsWidget.js
import { UIComponent } from './UIComponent.js';

export class GameStatsWidget extends UIComponent {
  constructor(config) {
    super(config);
    this.teamId = config.teamId || '133604'; // Arsenal, можно любой
    this.matches = [];
  }

  render() {
    const el = super.render();
    const body = el.querySelector('.widget-body');
    body.innerHTML = `
      <div class="stats-loading">Загрузка матчей...</div>
      <ul class="match-list"></ul>
    `;
    this._listEl = body.querySelector('.match-list');
    this._loadingEl = body.querySelector('.stats-loading');
    return el;
  }

   async initData() {
    try {
      // Ссылка на ваш прокси Cloudflare
      const proxyUrl = 'https://game-proxy.polina2001f.workers.dev';
      
      const res = await fetch(proxyUrl);
      
      if (!res.ok) throw new Error('Ошибка сети');
      
      const data = await res.json();
      
      // PandaScore возвращает массив матчей
      this.matches = data || [];
      this._renderMatches();
      
    } catch (err) {
      this._loadingEl.textContent = 'Ошибка загрузки данных';
      console.error(err);
    }
  }

  _renderMatches() {
    this._loadingEl.style.display = 'none';
    this._listEl.innerHTML = '';
    
    if (!this.matches.length) {
      this._listEl.innerHTML = '<li>Нет предстоящих матчей</li>';
      return;
    }

    // Берем первые 5 матчей
    this.matches.slice(0, 5).forEach(m => {
      const li = document.createElement('li');
      li.className = 'match-item';
      
      // PandaScore использует поля opponents (оппоненты) и scheduled_at (дата)
      const home = m.opponents?.[0]?.opponent?.name || 'TBD';
      const away = m.opponents?.[1]?.opponent?.name || 'TBD';
      
      // Форматируем дату
      const date = m.scheduled_at ? new Date(m.scheduled_at).toLocaleDateString('ru-RU') : 'Дата неизвестна';
      
      // Название турнира/лиги
      const league = m.league?.name || 'Киберспорт';

      li.innerHTML = `
        <div style="font-size: 0.8em; color: #94a3b8; margin-bottom: 4px;">${league}</div>
        <span class="match-teams">${home} vs ${away}</span>
        <span class="match-date" style="font-size: 0.8em; color: #64748b;">${date}</span>
      `;
      this._listEl.appendChild(li);
    });
  }
}