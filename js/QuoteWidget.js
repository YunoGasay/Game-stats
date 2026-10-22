// js/QuoteWidget.js
import { UIComponent } from './UIComponent.js';

const QUOTES = [
  "Победа любит подготовку.",
  "Каждый матч — новая история.",
  "Статистика не врёт, но интерпретация может.",
  "Лучшая защита — нападение.",
  "Играй умно, а не только быстро."
];

export class QuoteWidget extends UIComponent {
  constructor(config) {
    super(config);
    this.currentQuote = QUOTES[0];
  }

  render() {
    const el = super.render();
    const body = el.querySelector('.widget-body');
    body.innerHTML = `
      <blockquote class="quote-text">${this.currentQuote}</blockquote>
      <button class="btn-quote-refresh">Другая цитата</button>
    `;
    const btn = body.querySelector('.btn-quote-refresh');
    this._quoteEl = body.querySelector('.quote-text');
    const onRefresh = () => {
      const idx = Math.floor(Math.random() * QUOTES.length);
      this.currentQuote = QUOTES[idx];
      this._quoteEl.textContent = this.currentQuote;
    };
    btn.addEventListener('click', onRefresh);
    this._listeners.push({ el: btn, type: 'click', fn: onRefresh });
    return el;
  }
}