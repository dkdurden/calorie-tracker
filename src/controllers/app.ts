import {
    selectors,
    clearTotalCalories,
    showTotalCalories,
    renderItems,
    getFormInput,
} from './interface';
import { addItem, clearItems, getTotalCalories, getItem } from './items';
import { setLocalStorage, clearLocalStorage } from './storage';

function loadEventListeners() {
    document
        .querySelector(selectors.form)
        .addEventListener('submit', (e) => e.preventDefault());

    document
        .querySelector(selectors.calorieList)
        .addEventListener('click', handleItemClick);

    document.querySelector(selectors.clearBtn).addEventListener('click', () => {
        const items = clearItems();

        renderItems(items);

        clearTotalCalories();

        clearLocalStorage();
    });

    document
        .querySelector(selectors.addBtn)
        .addEventListener('click', handleAdd);
}

function handleAdd(e: any) {
    const { name, calories } = getFormInput();

    const items = addItem(name, calories);

    setLocalStorage(items);

    const totalCalories = getTotalCalories();
    showTotalCalories(totalCalories);

    renderItems(items);
}

function handleItemClick(e: MouseEvent) {
    const target = <HTMLButtonElement>e.target;

    if (
        target.className === 'calorie-list__icon' ||
        target.nodeName === 'svg' ||
        target.nodeName === 'path'
    ) {
        let id: string;

        // Deal with event delegation target issues
        if (target.nodeName === 'svg') id = target.parentElement.dataset.id;
        else if (target.nodeName === 'path')
            id = target.parentElement.parentElement.dataset.id;
        else id = target.dataset.id;

        const items = getItems();

        const item = getItem(id);

        const item = items.find((item: any) => item.id === parseInt(id));

        setLastSelectedItem(item);

        removeEvents('add');

        showBackButton();
        changeSubmitGroupState('edit');
        changeFormInputState(item.name, item.calories);

        addClickEvents('update', 'delete');
    }
}
