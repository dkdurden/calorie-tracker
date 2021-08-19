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
    bannerSection: '#banner-section',
    dismissBtn: '#dismiss',
};

export function showTotalCalories(calories: number) {
    const calorieHeader = <HTMLHeadingElement>(
        document.querySelector(selectors.calorieHeader)
    );

    calorieHeader.innerText = `Total Calories: ${calories}`;

    return calorieHeader;
}

export function clearTotalCalories() {
    const calorieHeader = <HTMLHeadingElement>(
        document.querySelector(selectors.calorieHeader)
    );

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
    updateEvent: (e: MouseEvent) => void,
    deleteEvent: (e: MouseEvent) => void
) {
    const submitBtnGroup = document.querySelector(selectors.submitBtnGroup);
    submitBtnGroup.innerHTML = '';

    const updateBtn = document.createElement('button');
    updateBtn.className = 'calorie-form__submit btn-warning';
    updateBtn.id = 'update-btn';
    updateBtn.addEventListener('click', updateEvent);

    const updateIcon = document.createElement('i');
    updateIcon.className = 'fas fa-edit';

    const updateBtnText = document.createElement('span');
    updateBtnText.innerText = 'Update meal';

    updateBtn.appendChild(updateIcon);
    updateBtn.appendChild(updateBtnText);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'calorie-form__submit btn-danger';
    deleteBtn.id = 'delete-btn';
    deleteBtn.addEventListener('click', deleteEvent);

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash-alt';

    const deleteBtnText = document.createElement('span');
    deleteBtnText.innerText = 'Delete meal';

    deleteBtn.appendChild(deleteIcon);
    deleteBtn.appendChild(deleteBtnText);

    submitBtnGroup.appendChild(updateBtn);
    submitBtnGroup.appendChild(deleteBtn);

    showBackButton();
}

export function hideEditState(addEvent: (e: MouseEvent) => void) {
    const submitBtnGroup = document.querySelector(selectors.submitBtnGroup);
    submitBtnGroup.innerHTML = '';

    const addButton = document.createElement('button');
    addButton.className = 'calorie-form__submit';
    addButton.id = 'add-btn';
    addButton.addEventListener('click', addEvent);

    const icon = document.createElement('i');
    icon.className = 'fas fa-plus';

    const btnText = document.createElement('span');
    btnText.innerText = 'Add meal';

    addButton.appendChild(icon);
    addButton.appendChild(btnText);

    submitBtnGroup.appendChild(addButton);

    hideBackButton();
}

export function getFormInput() {
    const name = <HTMLInputElement>document.querySelector(selectors.mealInput);
    const calories = <HTMLInputElement>(
        document.querySelector(selectors.calorieInput)
    );

    return { name: name.value, calories: calories.value };
}

export function changeFormInputState(name: string, calories: number) {
    const mealInput = <HTMLInputElement>document.getElementById('meal');
    const calorieInput = <HTMLInputElement>document.getElementById('calories');

    mealInput.value = name;
    calorieInput.value = calories.toString();
}

export function clearForm() {
    const mealInput = <HTMLInputElement>document.getElementById('meal');
    const calorieInput = <HTMLInputElement>document.getElementById('calories');

    mealInput.value = '';
    calorieInput.value = '';
}

export function hideBanner() {
    document.querySelector(selectors.bannerSection).remove();
}

function showBackButton() {
    const backButton = document.querySelector(selectors.backButton);

    if (backButton.className.includes('d-block')) return;

    backButton.className = backButton.className.replace('d-none', 'd-block');
}

function hideBackButton() {
    const backButton = document.querySelector(selectors.backButton);

    if (backButton.className.includes('d-none')) return;

    backButton.className = backButton.className.replace('d-block', 'd-none');
}
