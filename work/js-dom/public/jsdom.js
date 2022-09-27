"use strict";
(function () {
    const items = [
        {
            name: 'apple',
            quantity: 0,
        },
        {
            name: 'banana',
            quantity: 3,
        },
    ];

    const listEl = document.querySelector('#js-dom .itemList');
    const inputEl = document.querySelector('#js-dom input');
    const addButtonEl = document.querySelector('#js-dom button');

    disableButtonIfNoInput();
    increaseQty();
    decreaseQty();
    addItems();
    deleteItems();

    render(items);

    function render(items) {
        const html = items.map( (item, index) => {
            const disabled = item.quantity === 0 ? 'disabled' : '';
            return `
              <li>
                <div class="name-form">
                  <span class="itemName" data-index="${index}">${item.name}</span>
                  <button class="delete" data-index="${index}">X</button>
                </div>
                <div class="qty-form">
                  <button class="decrease ${disabled}" data-index="${index}" ${disabled}>-</button>
                  <span class="itemQty" data-index="${index}">${item.quantity}</span>
                  <button class="increase" data-index="${index}">+</button>
                <div>
              </li>
            `;
        }).join('');

        listEl.innerHTML = html;
        addButtonEl.disabled = !inputEl.value;
    };

    function disableButtonIfNoInput() {
        inputEl.addEventListener('input', () => {
            addButtonEl.disabled = !inputEl.value;
        });
    }

    function increaseQty() {
        listEl.addEventListener('click', (e) => {
            if(!e.target.classList.contains('increase')) {
                return;
            }
            const index = e.target.dataset.index;
            items[index].quantity++;
            render(items);
        });
    }

    function decreaseQty() {
        listEl.addEventListener('click', (e) => {
            if(!e.target.classList.contains('decrease')) {
                return;
            }
            const index = e.target.dataset.index;
            items[index].quantity--;
            render(items);
        });
    }

    function addItems() {
        addButtonEl.addEventListener('click', (e) => {
            const newItem = {
                name: inputEl.value,
                quantity: 0,
            };
            items.push(newItem);
            inputEl.value = '';
            render(items);
        });
    }

    function deleteItems() {
        listEl.addEventListener('click', (e) => {
            if(!e.target.classList.contains('delete')) {
                return;
            }

            const index = e.target.dataset.index;
            items.splice(index,1);
            render(items);
        });
    }
})();