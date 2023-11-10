import Card from './card';
import DragDrop from './dragDrop';

const card = new Card();
card.init();
const DnD = new DragDrop();
DnD.init();

window.addEventListener('beforeunload', () => {
  const formData = card.createStorage();
  localStorage.setItem('formData', JSON.stringify(formData));
});
document.addEventListener('DOMContentLoaded', () => {
  const json = localStorage.getItem('formData');
  let Data;
  try {
    Data = JSON.parse(json);
  } catch (err) {
    return false;
  }
  if (Data) {
    const container = document.querySelector('.container');
    Object.keys(Data).forEach((key) => {
      const value = Data[key];
      value.forEach((content) => {
        const li = document.createElement('li');
        li.classList.add('item');
        li.textContent = content;
        li.insertAdjacentHTML('beforeend', '<button class="close-item">X</button>');
        container.querySelector(`[data="${key}"]`).insertAdjacentElement('beforeend', li);
      });
    });
  }
  return true;
});
