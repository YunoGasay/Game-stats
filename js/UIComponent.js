// js/UIComponent.js
export class UIComponent {
  constructor({ title, id }) {
    this.title = title;
    this.id = id;
    this.element = null;
    this._listeners = [];
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'widget';
    wrapper.id = this.id;
    wrapper.innerHTML = `
      <div class="widget-header">
        <h3>${this.title}</h3>
        <div class="widget-controls">
          <button class="btn-minimize" title="Свернуть">—</button>
          <button class="btn-close" title="Закрыть">×</button>
        </div>
      </div>
      <div class="widget-body"></div>
    `;
    this.element = wrapper;
    this._bindCommonEvents();
    return wrapper;
  }

  _bindCommonEvents() {
    const closeBtn = this.element.querySelector('.btn-close');
    const minBtn = this.element.querySelector('.btn-minimize');

    const onClose = () => this.destroy();
    const onMin = () => {
      this.element.classList.toggle('minimized');
    };

    closeBtn.addEventListener('click', onClose);
    minBtn.addEventListener('click', onMin);
    this._listeners.push({ el: closeBtn, type: 'click', fn: onClose });
    this._listeners.push({ el: minBtn, type: 'click', fn: onMin });
  }

  destroy() {
    this._listeners.forEach(({ el, type, fn }) => {
      el.removeEventListener(type, fn);
    });
    this._listeners = [];
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.element = null;
    // Сообщаем дашборду
    document.dispatchEvent(new CustomEvent('widget-closed', { detail: { id: this.id } }));
  }

  // Хук для дочерних классов
  async initData() {}
}