const API = (() => {
  const URL = 'http://localhost:3000';
  const getCart = () => fetch(URL + '/cart').then(data => data.json());

  const getInventory = () =>
      fetch(URL + '/inventory').then(data => data.json());

  const addToCart = (inventoryItem) => fetch(URL + '/cart', {
                                         method: 'POST',
                                         body: JSON.stringify(inventoryItem),
                                         headers: {
                                           'Content-Type': 'application/json',
                                         },
                                       }).then((data) => data.json());

  const updateCart = (id, inventoryItem) => fetch(URL + '/cart/' + id, {
                                          method: 'PUT',
                                          body: JSON.stringify(inventoryItem),
                                          headers: {
                                            'Content-Type': 'application/json',
                                          },
                                        }).then((data) => data.json());
  ;

  const deleteFromCart = (id) => fetch(URL + '/cart/' + id, {
                                   method: 'DELETE'
                                 }).then((data) => data.json());

  const checkout = () => {
    // you don't need to add anything here
    return getCart().then(
        (data) => Promise.all(data.map((item) => deleteFromCart(item.id))));
  };

  return {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const Model = (() => {

  class State {
    #onChange;
    #inventory;
    #cart;
    constructor() {
      this.#inventory = [];
      this.#cart = [];
    }
    get cart() {
      return this.#cart;
    }

    get inventory() {
      return this.#inventory;
    }

    set cart(newCart) {
      this.#cart = newCart;
    }
    set inventory(newInventory) {
      this.#inventory = newInventory;
    }

    subscribe(cb) {}
  }
  const {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  } = API;
  return {
    State,
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const View = (() => {
  const inventoryEls = document.querySelector('.inventory-list');
  const cartEls = document.querySelector('.cart-list');
  const checkoutBtn = document.getElementById('checkout-btn');

  const renderInventoyList =
      (inventory) => {
        inventoryEls.innerHTML = '';
        inventory.forEach((item) => {
          const li = document.createElement('li');
          li.innerHTML = `
          <span>${item.content}</span>
          <button class="btn decrement-btn" id="${item.id}">-</button>
          <span>${item.amount}</span>
          <button class="btn increment-btn" id="${item.id}">+</button>
          <button class="btn addToCart-btn" id="${item.id}">Add to Cart</button>
          `;
          inventoryEls.appendChild(li);
        });
      }

  const renderCartList =
      (cart) => {
        cartEls.innerHTML = '';
        cart.forEach((item) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <span>${item.content} × ${item.amount}</span>
            <button class="btn delete-btn" id="${
              item.inventoryId}">Delete</button>
          `;
          cartEls.appendChild(li);
        });
      }

  return {inventoryEls, cartEls, checkoutBtn, renderInventoyList, renderCartList};
})();

const Controller = ((model, view) => {
  const state = new model.State();

  const getAndShowInventroy =
      () => {
        model.getInventory().then(data => {
          state.inventory = data.map(({content, id}) => {
            return {content, id, amount: 0};
          });
          view.renderInventoyList(state.inventory);
        })
      }

  const getAndShowCart =
      () => {
        model.getCart().then(data => {
          state.cart = data;
          view.renderCartList(state.cart);
        })
      }

  const init = () => {
    getAndShowInventroy();
    getAndShowCart();
  };

  const updateInventoryAmount =
      (id, change) => {
        const item = state.inventory.find(item => item.id === id);
        item.amount = item.amount + change >= 0 ? item.amount + change : 0;
        view.renderInventoyList(state.inventory);
      }

  const handleUpdateAmount = () => {
    view.inventoryEls.addEventListener('click', (event) => {
      if (event.target.classList.contains('increment-btn')) {
        const id = +event.target.getAttribute('id');
        updateInventoryAmount(id, 1);
      } else if (event.target.classList.contains('decrement-btn')) {
        const id = +event.target.getAttribute('id');
        updateInventoryAmount(id, -1);
      }
    })
  };

  const handleAddToCart = () => {
    view.inventoryEls.addEventListener('click', (event) => {
      if (event.target.classList.contains('addToCart-btn')) {
        const id = +event.target.getAttribute('id');
        const inventoryItem = state.inventory.find(item => item.id === id);
        const cartItem = state.cart.find((item) => item.inventoryId === id);
        if (inventoryItem.amount === 0) return;
        if (cartItem) {
          const newAmount = cartItem.amount + inventoryItem.amount;
          model.updateCart(cartItem.id, {...cartItem, amount: newAmount}).then(() => getAndShowCart());
        } else {
          model.addToCart({content: inventoryItem.content, inventoryId: inventoryItem.id, amount: inventoryItem.amount}).then(() => getAndShowCart());
        }
      }
    })
  };
  
  const handleDelete = () => {
    view.cartEls.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-btn')) {
        const inventoryId = +event.target.getAttribute('id');
        const id = state.cart.find(item => item.inventoryId === inventoryId)?.id;
        if (id === undefined) return;
        model.deleteFromCart(id).then(() => getAndShowCart());
      }
    })
  };

  const handleCheckout = () => {
    view.checkoutBtn.addEventListener('click', () => {
      model.checkout().then(() => getAndShowCart());
    })

  };

  const bootstrap = () => {
    handleUpdateAmount();
    handleAddToCart();
    handleDelete();
    handleCheckout();
    init();
  };

  return {
    bootstrap,
  };
  
})(Model, View);

Controller.bootstrap();
