// js/ToDoWidget.js
import { UIComponent } from './UIComponent.js';

export class ToDoWidget extends UIComponent {
  constructor(config) {
    super(config);
    this.tasks = []; // { id, text, done }
  }

  render() {
    const el = super.render();
    const body = el.querySelector('.widget-body');
    body.innerHTML = `
      <div class="todo-input-row">
        <input type="text" class="todo-input" placeholder="Новая задача...">
        <button class="btn-add">Добавить</button>
      </div>
      <ul class="todo-list"></ul>
    `;
    this._input = body.querySelector('.todo-input');
    this._list = body.querySelector('.todo-list');
    const btn = body.querySelector('.btn-add');

    const onAdd = () => this._addTask();
    const onKey = (e) => { if (e.key === 'Enter') this._addTask(); };

    btn.addEventListener('click', onAdd);
    this._input.addEventListener('keydown', onKey);
    this._listeners.push({ el: btn, type: 'click', fn: onAdd });
    this._listeners.push({ el: this._input, type: 'keydown', fn: onKey });

    this._renderTasks();
    return el;
  }

  _addTask() {
    const text = this._input.value.trim();
    if (!text) return;
    this.tasks.push({ id: Date.now(), text, done: false });
    this._input.value = '';
    this._renderTasks();
  }

  _renderTasks() {
    this._list.innerHTML = '';
    this.tasks.forEach(t => {
      const li = document.createElement('li');
      li.className = t.done ? 'done' : '';
      li.innerHTML = `
        <span class="task-text">${t.text}</span>
        <button class="btn-del">✕</button>
      `;
      const delBtn = li.querySelector('.btn-del');
      const onDel = (e) => {
        e.stopPropagation();
        this.tasks = this.tasks.filter(x => x.id !== t.id);
        this._renderTasks();
      };
      li.querySelector('.task-text').addEventListener('click', () => {
        t.done = !t.done;
        this._renderTasks();
      });
      delBtn.addEventListener('click', onDel);
      // Сохраняем для очистки при destroy (упрощённо)
      this._listeners.push({ el: delBtn, type: 'click', fn: onDel });
      this._list.appendChild(li);
    });
  }

  // Переопределяем, чтобы очистить слушатели задач
  destroy() {
    // Слушатели задач уже в _listeners, базовый destroy их удалит
    super.destroy();
  }
}