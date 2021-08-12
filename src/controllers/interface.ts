const backButton = document.getElementById('back');

export function useTotalCaloriesHeader() {
    return document.getElementById('total-calories');
}

export function showTotalCalories(calories: number) {
    const calorieHeader = document.getElementById('total-calories');

    calorieHeader.innerText = `Total Calories: ${calories}`;

    return calorieHeader;
}

export function clearTotalCalories() {
    const calorieHeader = document.getElementById('total-calories');

    calorieHeader.innerText = '';

    return calorieHeader;
}

export function populateItems(items: Array<any>) {
    const calorieList = document.getElementById('calorie-list');

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

export function changeSubmitGroupState(state: string) {
    const submitGroup = <HTMLDivElement>document.getElementById('submit-group');

    let htmlString = ``;
    if (state === 'edit') {
        htmlString = `
            <button
                type="submit"
                name="update"
                class="calorie-form__submit btn-warning"
            >
                <i class="fas fa-plus"></i>
                <span>Update Meal</span>
            </button>
            <button
                type="submit"
                name="delete"
                class="calorie-form__submit btn-danger"
            >
                <i class="fas fa-plus"></i>
                <span>Delete Meal</span>
            </button>
        `;
    } else {
        htmlString = `
        <button
            type="submit"
            name="add"
            class="calorie-form__submit"
            id="add-item"
        >
            <i class="fas fa-plus"></i>
            <span>Add Meal</span>
        </button>
    `;
    }

    submitGroup.innerHTML = htmlString;
    return;
}

export function changeFormInputState(name: string, calories: number) {
    const mealInput = <HTMLInputElement>document.getElementById('meal');
    const calorieInput = <HTMLInputElement>document.getElementById('calories');

    mealInput.value = name;
    calorieInput.value = calories.toString();
}

export function showBackButton() {
    if (backButton.className.includes('d-block')) return;

    backButton.className = backButton.className.replace('d-none', 'd-block');
}

export function hideBackButton() {
    if (backButton.className.includes('d-none')) return;

    backButton.className = backButton.className.replace('d-block', 'd-none');
}

export function addBackEventListener(handler: any) {
    backButton.addEventListener('click', handler);
}
