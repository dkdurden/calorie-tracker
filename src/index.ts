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

const addButton = document.querySelector('.calorie-form__submit');

addButton.addEventListener('click', () => {
    form.submit();
});

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
});

form.addEventListener('submit', handleFormSubmit);

clearButton.addEventListener('click', () => {
    const items = clearItems();

    clearFromLocalStorage();

    const totalCalories = getTotalCalories();
    if (totalCalories === 0) clearTotalCalories();
    else showTotalCalories(totalCalories);

    populateItems(items);
});

function handleFormSubmit(e: any): void {
    e.preventDefault();

    const actionType = e.submitter.dataset.action;

    const mealName = meal.value;
    const calorieAmount = parseInt(calories.value);

    // if (!mealName || !calorieAmount) {
    //     return;
    // }

    let items;
    if (actionType === 'update') {
        const item = getLastSelectedItem();
        items = updateItem(item.id, mealName, calorieAmount);
        changeSubmitGroupState('add');
    } else if (actionType === 'delete') {
        const item = getLastSelectedItem();
        items = deleteItem(item.id);
        changeSubmitGroupState('add');
    } else {
        items = addItem(mealName, calorieAmount);
    }

    addToLocalStorage(items);

    hideBackButton();

    const totalCalories = getTotalCalories();
    if (totalCalories === 0) clearTotalCalories();
    else showTotalCalories(totalCalories);

    const calorieList = populateItems(items);

    // There were no previous items
    if (items.length === 1 && actionType === 'add')
        calorieList.addEventListener('click', handleItemClick);

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

        showBackButton();
        changeSubmitGroupState('edit');
        changeFormInputState(item.name, item.calories);
    }
}
