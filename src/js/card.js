export default class Card {
  constructor() {
    this.container = document.querySelector('.container');
    this.items = null;
    this.storageOb = { todo: [], inprogress: [], done: [] };
  }

  init() {
    this.addCard();
    this.deleteCard();
    this.items = this.container.querySelectorAll('.items');
  }

  addCard() {
    const addItem = Array.from(this.container.querySelectorAll('.add_item'));
    addItem.forEach((i) => {
      i.addEventListener('click', (e) => {
        const item = document.createElement('div');
        item.classList.add('create_item');
        const textarea = document.createElement('textarea');
        textarea.classList.add('textarea');
        textarea.setAttribute('placeholder', 'Enter a title for this card...');
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.textContent = 'Add Card';
        const close = document.createElement('button');
        close.classList.add('close');
        close.textContent = 'X';
        item.append(textarea, btn, close);
        e.target.replaceWith(item);
        item.addEventListener('click', (ev) => {
          if (ev.target === close) {
            item.replaceWith(i);
          }
          if (ev.target === btn && textarea.value !== '') {
            const li = document.createElement('li');
            li.classList.add('item');
            li.textContent = textarea.value;
            li.insertAdjacentHTML('beforeend', '<button class="close-item">X</button>');
            const ul = ev.target.closest('.block').querySelector('ul');
            ul.append(li);
            item.replaceWith(i);
          }
        });
      });
    });
  }

  deleteCard() {
    const ul = Array.from(document.querySelectorAll('.items'));
    ul.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-item')) {
          const li = e.target.closest('.item');
          li.remove();
        }
      });
    });
  }

  createStorage() {
    this.items.forEach((item) => {
      item.querySelectorAll('li').forEach((el, i) => {
        const key = item.getAttribute('data');
        this.storageOb[key][i] = el.textContent;
      });
    });
    return this.storageOb;
  }
}
