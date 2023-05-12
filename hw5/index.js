const DATA = [
  {name: 'apple', category: 'fruit'}, {name: 'Cucumber', category: 'vegetable'},
  {name: 'Banana', category: 'fruit'}, {name: 'Celery', category: 'vegetable'},
  {name: 'orange', category: 'fruit'}, {name: 'sausage', category: 'meat'},
  {name: 'bacon', category: 'meat'}
];

const API = (() =>{

    const URL = "http://localhost:3000/items";
    const getItems = () => fetch(URL).then(data => data.json());

    return {
        getItems
    }
})();


const Model = (() => {
    class State {
        #items;
        #categories;
        #selectedItem;
        #selectedCategory;
        
        constructor() {
            this.#categories = [];
            this.#items = [];
            this.#selectedCategory = '';
            this.#selectedItem = '';
        }

        get items() {
            return this.#items;
        }
        set items(items) {
            this.#items = items;
        }

        get categories() {
            return this.#categories;
        }
        set categories(categories) {
            this.#categories = categories;
        }

        get selectedCategory() {
            return this.#selectedCategory;
        }
        set selectedCategory(selectedCategory) {
            this.#selectedCategory = selectedCategory;
            this.#items = DATA.filter(({ category }) => category === selectedCategory).map(({ name }) => name);
            this.#selectedItem = this.items?.[0] ?? '';
        }

        get selectedItem() {
            return this.#selectedItem;
        }
        set selectedItem(selectedItem) {
            this.#selectedItem = selectedItem;
        }

    };

    const { getItems } = API;

    return {
        State,
        getItems
    }
})();

const View = (() => {
    const categoryEls = document.querySelector(".selector_category");
    const itemEls = document.querySelector(".selector_item");
    const headerEl = document.querySelector(".display_header");

    const renderSelect = (selectEl, elements) => {
        selectEl.innerHTML = '';
        elements.forEach((element) => {
            const option = document.createElement('option');
            option.value = element;
            option.text = element;
            selectEl.appendChild(option);
        });
    };

    const renderElement = (element, content) => {
        element.innerHTML = content;
    }

    return {
        categoryEls,
        itemEls,
        headerEl,
        renderElement,
        renderSelect
    }
})();

const Controller = ((model, view) => {
    const state = new model.State();

    const handleCategoryChange = () => {
        view.categoryEls.addEventListener("change", (event) => {
            const category = event.target.value;
            state.selectedCategory = category;
            view.renderSelect(view.itemEls, state.items);
            view.renderElement(view.headerEl, state.selectedItem);
        })
    };

    const handleItemChange = () => {
        view.itemEls.addEventListener("change", (event) => {
            const item = event.target.value;
            state.selectedItem = item;
            view.renderElement(view.headerEl, item);
        })
    };

    const init = async () => {
        const DATA = await model.getItems();
        const categories = [...new Set(DATA.map(({ category }) => category))];
        const defaultCategory = categories?.[0] ?? '';
        state.categories = categories;
        state.selectedCategory = defaultCategory;
        view.renderSelect(view.categoryEls, state.categories);
        view.renderSelect(view.itemEls, state.items);
        view.renderElement(view.headerEl, state.selectedItem);
    };

    const bootstrap = () => {
        handleCategoryChange();
        handleItemChange();
        init();
    };

    return {
        bootstrap
    };

})(Model, View);

Controller.bootstrap();