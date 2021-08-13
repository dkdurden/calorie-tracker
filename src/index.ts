import './styles/index.scss';
import {
    addItem,
    deleteItem,
    getItems,
    getLastSelectedItem,
    setItems,
    setLastSelectedItem,
    updateItem,
    getTotalCalories,
    clearItems,
} from './controllers/items';
import {
    populateItems,
    changeSubmitGroupState,
    changeFormInputState,
    showTotalCalories,
    clearTotalCalories,
    showBackButton,
    hideBackButton,
    addBackEventListener,
} from './controllers/interface';
import {
    addToLocalStorage,
    getFromStorage,
    clearFromLocalStorage,
} from './controllers/storage';

const form = <HTMLFormElement>document.getElementById('calorie-form');
const meal = <HTMLInputElement>document.getElementById('meal');
const calories = <HTMLInputElement>document.getElementById('calories');
const clearButton = <HTMLButtonElement>document.getElementById('clear-all');

let localStorageItems = getFromStorage();
if (localStorageItems.length > 0) {
    const items = setItems(localStorageItems);
    const totalCalories = getTotalCalories();
    showTotalCalories(totalCalories);
    const calorieList = populateItems(items);
    calorieList.addEventListener('click', handleItemClick);
}

addBackEventListener(() => {
    changeSubmitGroupState('add');
    addClickEvents('add');
});

addClickEvents('add');

form.addEventListener('submit', (e) => e.preventDefault());

clearButton.addEventListener('click', () => {
    const items = clearItems();

    clearFromLocalStorage();

    const totalCalories = getTotalCalories();
    if (totalCalories === 0) clearTotalCalories();
    else showTotalCalories(totalCalories);

    populateItems(items);
});

function handleAdd(e: any) {
    const mealName = meal.value;
    const calorieAmount = parseInt(calories.value);

    const items = addItem(mealName, calorieAmount);

    addToLocalStorage(items);

    const totalCalories = getTotalCalories();
    showTotalCalories(totalCalories);

    const calorieList = populateItems(items);

    removeEvents('update', 'delete');
    addClickEvents('add');

    // There were no previous items
    if (items.length === 1)
        calorieList.addEventListener('click', handleItemClick);

    if (items.length === 0)
        calorieList.removeEventListener('click', handleItemClick);
}

function handleUpdate(e: any) {
    const mealName = meal.value;
    const calorieAmount = parseInt(calories.value);

    const item = getLastSelectedItem();
    const items = updateItem(item.id, mealName, calorieAmount);

    removeEvents('update', 'delete');
    changeSubmitGroupState('add');
    addClickEvents('add');

    addToLocalStorage(items);

    hideBackButton();

    const totalCalories = getTotalCalories();
    showTotalCalories(totalCalories);

    populateItems(items);
}

function handleDelete(e: any) {
    const mealName = meal.value;
    const calorieAmount = parseInt(calories.value);

    const item = getLastSelectedItem();
    const items = deleteItem(item.id);

    removeEvents('update', 'delete');
    changeSubmitGroupState('add');
    addClickEvents('add');

    addToLocalStorage(items);

    hideBackButton();

    const totalCalories = getTotalCalories();
    if (totalCalories === 0) clearTotalCalories();
    else showTotalCalories(totalCalories);

    const calorieList = populateItems(items);

    if (items.length === 0)
        calorieList.removeEventListener('click', handleItemClick);
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

        const item = items.find((item: any) => item.id === parseInt(id));

        setLastSelectedItem(item);

        removeEvents('add');

        showBackButton();
        changeSubmitGroupState('edit');
        changeFormInputState(item.name, item.calories);

        addClickEvents('update', 'delete');
    }
}

function addClickEvents(...events: Array<string>) {
    const addBtn: any = document.getElementById('add-item');
    const updateBtn: any = document.getElementById('update-btn');
    const deleteBtn: any = document.getElementById('delete-btn');

    events.forEach((event) => {
        if (event === 'add' && addBtn)
            addBtn.addEventListener('click', handleAdd);
        else if (event === 'update' && updateBtn)
            updateBtn.addEventListener('click', handleUpdate);
        else if (event === 'delete' && deleteBtn)
            deleteBtn.addEventListener('click', handleDelete);
    });
}

function removeEvents(...events: Array<string>) {
    const addBtn: any = document.getElementById('add-item');
    const updateBtn: any = document.getElementById('update-btn');
    const deleteBtn: any = document.getElementById('delete-btn');
    events.forEach((event) => {
        if (event === 'add' && addBtn)
            addBtn.removeEventListener('click', handleAdd);
        else if (event === 'update' && updateBtn)
            updateBtn.removeEventListener('click', handleUpdate);
        else if (event === 'delete' && deleteBtn)
            deleteBtn.removeEventListener('click', handleDelete);
    });
}
