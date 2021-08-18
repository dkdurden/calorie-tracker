export const selectors = {
    calorieHeader: '#total-calories',
    calorieList: '#calorie-list',
    submitBtnGroup: '#submit-group',
    mealInput: '#meal',
    calorieInput: '#calories',
    backButton: '#back',
    form: '#calorie-form',
    clearBtn: '#clear-all',
    addBtn: '#add-btn',
    updateBtn: '#update-btn',
    deleteBtn: '#delete-btn',
};

export function showTotalCalories(calories: number) {
    const calorieHeader = document.getElementById(selectors.calorieHeader);

    calorieHeader.innerText = `Total Calories: ${calories}`;

    return calorieHeader;
}

export function clearTotalCalories() {
    const calorieHeader = document.getElementById(selectors.calorieHeader);

    calorieHeader.innerText = '';

    return calorieHeader;
}

export function renderItems(items: Array<any>) {
    const calorieList = document.querySelector(selectors.calorieList);

    let htmlString = ``;

    items.forEach((item) => {
        htmlString += `
            <li class="calorie-list__item flex justify-between">
                <div>
                    <b>${item.name}:</b><i class="ml-1">${item.calories} Calories</i>
                </div>
                <button class="calorie-list__icon" data-id="${item.id}">
                    <i class="fas fa-pencil-alt icon"></i>
                </button>
            </li>
        `;
    });

    calorieList.innerHTML = htmlString;

    return calorieList;
}

export function showEditState(
    updateEvent: (e: MouseEvent) => {},
    deleteEvent: (e: MouseEvent) => {}
) {
    const submitBtnGroup = document.querySelector(selectors.submitBtnGroup);
    submitBtnGroup.innerHTML = '';

    const updateBtn = document.createElement('button');
    updateBtn.className = 'calorie-form__submit btn-warning';
    updateBtn.id = 'update-btn';
    updateBtn.addEventListener('click', updateEvent);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'calorie-form__submit btn-danger';
    deleteBtn.id = 'delete-btn';
    deleteBtn.addEventListener('click', deleteEvent);

    submitBtnGroup.appendChild(updateBtn);
    submitBtnGroup.appendChild(deleteBtn);
}

export function hideEditState(addEvent: (e: MouseEvent) => {}) {
    const submitBtnGroup = document.querySelector(selectors.submitBtnGroup);
    submitBtnGroup.innerHTML = '';

    const addButton = document.createElement('button');
    addButton.className = 'calorie-form__submit';
    addButton.id = 'add-btn';
    addButton.addEventListener('click', addEvent);

    submitBtnGroup.appendChild(addButton);
}

export function getFormInput() {
    const name = <HTMLInputElement>document.querySelector(selectors.mealInput);
    const calories = <HTMLInputElement>(
        document.querySelector(selectors.calorieInput)
    );

    return { name: name.value, calories: parseInt(calories.value) };
}

export function changeFormInputState(name: string, calories: number) {
    const mealInput = <HTMLInputElement>document.getElementById('meal');
    const calorieInput = <HTMLInputElement>document.getElementById('calories');

    mealInput.value = name;
    calorieInput.value = calories.toString();
}

export function showBackButton() {
    const backButton = document.querySelector(selectors.backButton);

    if (backButton.className.includes('d-block')) return;

    backButton.className = backButton.className.replace('d-none', 'd-block');
}

export function hideBackButton() {
    const backButton = document.querySelector(selectors.backButton);

    if (backButton.className.includes('d-none')) return;

    backButton.className = backButton.className.replace('d-block', 'd-none');
}
