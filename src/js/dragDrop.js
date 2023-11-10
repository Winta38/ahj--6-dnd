export default class DragDrop {
  constructor() {
    this.draggedEl = null;
    this.ghostEl = null;
    this.elem = null;
    this.container = null;
    this.empty = null;
  }

  init() {
    this.container = document.querySelector('.container');
    this.container.addEventListener('mousedown', (e) => this.down(e));
    this.container.addEventListener('mousemove', (e) => this.move(e));
    this.container.addEventListener('mouseleave', (e) => this.leave(e));
    this.container.addEventListener('mouseup', (e) => this.up(e));
  }

  down(e) {
    if (!e.target.classList.contains('item')) {
      return;
    }
    e.preventDefault();
    this.draggedEl = e.target.closest('.item');
    this.ghostEl = this.draggedEl.cloneNode(true);
    this.ghostEl.style.cssText = `width: ${this.draggedEl.offsetWidth}px`;
    this.ghostEl.classList.add('dragged');
    this.container.appendChild(this.ghostEl);
    this.ghostEl.style.cssText = `left: ${e.pageX - this.ghostEl.offsetWidth / 2}px`;
    this.ghostEl.style.cssText = `top: ${e.pageY - this.ghostEl.offsetHeight / 2}px`;
    this.draggedEl.style.opacity = '0';
    this.empty = document.createElement('li');
    this.empty.classList.add('empty');
    this.empty.style.height = `${this.draggedEl.offsetHeight}px`;
  }

  move(e) {
    e.preventDefault();
    if (!this.draggedEl) {
      return;
    }
    this.ghostEl.classList.add('hidden');
    this.elem = document.elementFromPoint(e.clientX, e.clientY);
    this.ghostEl.classList.remove('hidden');
    this.ghostEl.style.cssText = `left: ${e.pageX - this.ghostEl.offsetWidth / 2}px`;
    this.ghostEl.style.cssText = `top: ${e.pageY - this.ghostEl.offsetHeight / 2}px`;
    if (!this.elem) {
      return;
    }
    if (this.elem.closest('.block')) {
      const parentEl = this.elem.closest('.block').querySelector('ul');
      if (!parentEl.hasChildNodes()) {
        parentEl.append(this.empty);
      } else if (this.elem.closest('.add_item')) {
        parentEl.append(this.empty);
      } else if (this.elem.closest('h3')) {
        parentEl.prepend(this.empty);
      } else if (this.elem.closest('.item')) {
        parentEl.insertBefore(this.empty, this.elem.closest('.item'));
      }
    }
  }

  up(e) {
    e.preventDefault();
    if (!this.draggedEl) {
      return;
    }
    if (!this.elem) {
      return this.cancel(e);
    }
    if (!this.elem.closest('.block')) {
      return this.cancel(e);
    }
    const parentUl = this.elem.closest('.block').querySelector('ul');
    if (this.elem.closest('h3')) {
      parentUl.prepend(this.draggedEl);
    } else if (this.elem.closest('.add_item')) {
      parentUl.append(this.draggedEl);
    } else {
      parentUl.insertBefore(this.draggedEl, this.elem.closest('.item'));
    }
    if (this.container.querySelector('.empty')) {
      this.container.querySelector('.empty').remove();
    }
    this.draggedEl.style.opacity = '1';
    this.draggedEl = null;
    this.ghostEl = null;
  }

  cancel(e) {
    e.preventDefault();
    if (this.ghostEl) {
      this.ghostEl.remove();
    }
    if (this.container.querySelector('.empty')) {
      this.container.querySelector('.empty').remove();
    }
    if (this.draggedEl) {
      this.draggedEl.style.opacity = '1';
    }
    this.draggedEl = null;
    this.ghostEl = null;
  }

  leave(e) {
    return this.cancel(e);
  }
}
