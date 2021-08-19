import * as Interface from './interface';
import * as Items from './items';
import * as Storage from './storage';

function init() {
    const localStorageItems = Storage.getFromLocalStorage();

    if (localStorageItems.length > 0) {
        const items = Items.setItems(localStorageItems);

        const totalCalories = Items.getTotalCalories();
        Interface.showTotalCalories(totalCalories);

        Interface.renderItems(items);
    }

    loadEventListeners();
}

function loadEventListeners() {
    document
        .querySelector(Interface.selectors.dismissBtn)
        .addEventListener('click', hideBanner);
    document
        .querySelector(Interface.selectors.form)
        .addEventListener('submit', (e) => e.preventDefault());

    document
        .querySelector(Interface.selectors.calorieList)
        .addEventListener('click', handleItemClick);

    document
        .querySelector(Interface.selectors.clearBtn)
        .addEventListener('click', handleClearAll);

    document
        .querySelector(Interface.selectors.addBtn)
        .addEventListener('click', handleAdd);

    document
        .querySelector(Interface.selectors.backButton)
        .addEventListener('click', handleBack);
}

function handleAdd(e: MouseEvent) {
    const { name, calories } = Interface.getFormInput();

    if (name == '' || calories == '' || parseInt(calories) <= 0) return;

    console.log(name, calories);

    const items = Items.addItem(name, parseInt(calories));

    Storage.setLocalStorage(items);

    const totalCalories = Items.getTotalCalories();
    Interface.showTotalCalories(totalCalories);

    Interface.renderItems(items);

    Interface.clearForm();
}

function handleDelete(e: any) {
    const item = Items.getSelectedItem();
    const items = Items.deleteItem(item.id);

    Interface.hideEditState(handleAdd);

    const totalCalories = Items.getTotalCalories();
    if (totalCalories === 0) Interface.clearTotalCalories();
    else Interface.showTotalCalories(totalCalories);

    Interface.renderItems(items);

    Storage.setLocalStorage(items);

    Interface.clearForm();
}

function handleUpdate(e: any) {
    const { name, calories } = Interface.getFormInput();

    if (name == '' || calories == '' || parseInt(calories) <= 0) return;

    const item = Items.getSelectedItem();
    const items = Items.updateItem(item.id, name, parseInt(calories));

    Interface.hideEditState(handleAdd);

    const totalCalories = Items.getTotalCalories();
    Interface.showTotalCalories(totalCalories);

    Interface.renderItems(items);

    Storage.setLocalStorage(items);

    Interface.clearForm();
}

function handleBack(e: MouseEvent) {
    Interface.hideEditState(handleAdd);
    Interface.clearForm();
}

function handleItemClick(e: MouseEvent) {
    const target = <HTMLButtonElement>e.target;

    if (
        target.className === 'calorie-list__icon' ||
        target.nodeName === 'svg' ||
        target.nodeName === 'path'
    ) {
        let id: number;

        // Deal with event delegation target issues
        if (target.nodeName === 'svg')
            id = parseInt(target.parentElement.dataset.id);
        else if (target.nodeName === 'path')
            id = parseInt(target.parentElement.parentElement.dataset.id);
        else id = parseInt(target.dataset.id);

        const items = Items.getItems();

        const item = Items.getItem(id);

        Items.setSelectedItem(item);

        Interface.showEditState(handleUpdate, handleDelete);
        Interface.changeFormInputState(item.name, item.calories);
    }
}

function handleClearAll(e: MouseEvent) {
    const items = Items.clearItems();

    Interface.renderItems(items);

    Interface.clearTotalCalories();

    Storage.clearLocalStorage();
}

function hideBanner() {
    Interface.hideBanner();
}

export default {
    init,
};
