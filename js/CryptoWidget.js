// js/CryptoWidget.js
import { UIComponent } from './UIComponent.js';

export class CryptoWidget extends UIComponent {
  constructor(config) {
    super(config);
    this.coinId = config.coinId || 'gala';
    this.price = null;
  }

  render() {
    const el = super.render();
    const body = el.querySelector('.widget-body');
    body.innerHTML = `
      <div class="crypto-display">
        <span class="coin-name">${this.coinId.toUpperCase()}</span>
        <span class="coin-price">-</span>
        <button class="btn-refresh">Обновить</button>
      </div>
    `;
    this._priceEl = body.querySelector('.coin-price');
    const btn = body.querySelector('.btn-refresh');
    const onRefresh = () => this.initData();
    btn.addEventListener('click', onRefresh);
    this._listeners.push({ el: btn, type: 'click', fn: onRefresh });
    return el;
  }

  async initData() {
    this._priceEl.textContent = '...';
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${this.coinId}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await res.json();
      const info = data[this.coinId];
      if (info) {
        const change = info.usd_24h_change?.toFixed(2) ?? '0.00';
        const sign = change >= 0 ? '+' : '';
        this._priceEl.innerHTML = `$${info.usd} <small class="${change >= 0 ? 'up' : 'down'}">${sign}${change}%</small>`;
      } else {
        this._priceEl.textContent = 'Нет данных';
      }
    } catch (err) {
      this._priceEl.textContent = 'Ошибка';
    }
  }
}