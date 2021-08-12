/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/controllers/items.ts
var Item = /** @class */ (function () {
    function Item(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories || 0;
    }
    return Item;
}());
var ItemList = /** @class */ (function () {
    function ItemList(items) {
        if (items === void 0) { items = []; }
        this.items = items;
        this.length = items.length;
        this.calorieTotal = 0;
        this.lastSelectedItem = null;
        this.idCounter = 1;
    }
    ItemList.prototype.getItems = function () {
        return this.items;
    };
    ItemList.prototype.addItem = function (item) {
        this.items.push(item);
        this.length++;
        this.idCounter++;
        this.calorieTotal += item.calories;
        return this.items;
    };
    ItemList.prototype.updateItem = function (id, newName, newCalorieAmount) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        var oldCalories = this.items[index].calories;
        this.calorieTotal -= oldCalories;
        this.items[index].name = newName;
        this.items[index].calories = newCalorieAmount;
        this.calorieTotal += newCalorieAmount;
        return this.items;
    };
    ItemList.prototype.deleteItem = function (id) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        var calories;
        if (index === -1) {
            return this.items;
        }
        calories = this.items[index].calories;
        if (index === 0)
            this.items.shift();
        else if (index === this.length - 1)
            this.items.pop();
        else {
            this.items = this.items
                .slice(0, index)
                .concat(this.items.slice(index + 1, this.length));
        }
        this.length--;
        this.calorieTotal -= calories;
        return this.items;
    };
    ItemList.prototype.setItems = function (items) {
        this.items = items;
        this.length = items.length;
        this.idCounter = items.length + 1;
        this.calorieTotal = calculateTotalCalories(this.items);
        return this.items;
    };
    ItemList.prototype.clearItems = function () {
        this.items = [];
        this.length = 0;
        this.calorieTotal = 0;
        return this.items;
    };
    ItemList.prototype.setLastSelectedItem = function (item) {
        this.lastSelectedItem = item;
        return this.lastSelectedItem;
    };
    ItemList.prototype.getLastSelectedItem = function () {
        return this.lastSelectedItem;
    };
    ItemList.prototype.getTotalCalories = function () {
        return this.calorieTotal;
    };
    return ItemList;
}());
var list = new ItemList();
function addItem(name, calories) {
    var id = list.idCounter;
    var item = new Item(id, name, calories);
    return list.addItem(item);
}
function updateItem(id, newName, newCalorieAmount) {
    return list.updateItem(id, newName, newCalorieAmount);
}
function deleteItem(id) {
    return list.deleteItem(id);
}
function getItems() {
    return list.getItems();
}
function clearItems() {
    return list.clearItems();
}
function setItems(items) {
    return list.setItems(items);
}
function setLastSelectedItem(item) {
    return list.setLastSelectedItem(item);
}
function getLastSelectedItem() {
    return list.getLastSelectedItem();
}
function getTotalCalories() {
    return list.getTotalCalories();
}
function calculateTotalCalories(items) {
    return items.reduce(function (acc, curr) {
        return acc + curr.calories;
    }, 0);
}

;// CONCATENATED MODULE: ./src/controllers/interface.ts
var backButton = document.getElementById('back');
function useTotalCaloriesHeader() {
    return document.getElementById('total-calories');
}
function showTotalCalories(calories) {
    var calorieHeader = document.getElementById('total-calories');
    calorieHeader.innerText = "Total Calories: " + calories;
    return calorieHeader;
}
function clearTotalCalories() {
    var calorieHeader = document.getElementById('total-calories');
    calorieHeader.innerText = '';
    return calorieHeader;
}
function populateItems(items) {
    var calorieList = document.getElementById('calorie-list');
    var htmlString = "";
    items.forEach(function (item) {
        htmlString += "\n            <li class=\"calorie-list__item flex justify-between\">\n                <div>\n                    <b>" + item.name + ":</b><i class=\"ml-1\">" + item.calories + " Calories</i>\n                </div>\n                <button class=\"calorie-list__icon\" data-id=\"" + item.id + "\">\n                    <i class=\"fas fa-pencil-alt icon\"></i>\n                </button>\n            </li>\n        ";
    });
    calorieList.innerHTML = htmlString;
    return calorieList;
}
function changeSubmitGroupState(state) {
    var submitGroup = document.getElementById('submit-group');
    var htmlString = "";
    if (state === 'edit') {
        htmlString = "\n            <button\n                type=\"submit\"\n                name=\"update\"\n                class=\"calorie-form__submit btn-warning\"\n            >\n                <i class=\"fas fa-plus\"></i>\n                <span>Update Meal</span>\n            </button>\n            <button\n                type=\"submit\"\n                name=\"delete\"\n                class=\"calorie-form__submit btn-danger\"\n            >\n                <i class=\"fas fa-plus\"></i>\n                <span>Delete Meal</span>\n            </button>\n        ";
    }
    else {
        htmlString = "\n        <button\n            type=\"submit\"\n            name=\"add\"\n            class=\"calorie-form__submit\"\n            id=\"add-item\"\n        >\n            <i class=\"fas fa-plus\"></i>\n            <span>Add Meal</span>\n        </button>\n    ";
    }
    submitGroup.innerHTML = htmlString;
    return;
}
function changeFormInputState(name, calories) {
    var mealInput = document.getElementById('meal');
    var calorieInput = document.getElementById('calories');
    mealInput.value = name;
    calorieInput.value = calories.toString();
}
function showBackButton() {
    if (backButton.className.includes('d-block'))
        return;
    backButton.className = backButton.className.replace('d-none', 'd-block');
}
function hideBackButton() {
    if (backButton.className.includes('d-none'))
        return;
    backButton.className = backButton.className.replace('d-block', 'd-none');
}
function addBackEventListener(handler) {
    backButton.addEventListener('click', handler);
}

;// CONCATENATED MODULE: ./src/controllers/storage.ts
function getFromStorage() {
    var items = localStorage.getItem('items');
    if (items == null) {
        return [];
    }
    return JSON.parse(items);
}
function addToLocalStorage(items) {
    localStorage.setItem('items', JSON.stringify(items));
}
function clearFromLocalStorage() {
    localStorage.removeItem('items');
}

;// CONCATENATED MODULE: ./src/index.ts




var src_form = document.getElementById('calorie-form');
var meal = document.getElementById('meal');
var calories = document.getElementById('calories');
var clearButton = document.getElementById('clear-all');
var localStorageItems = getFromStorage();
if (localStorageItems.length > 0) {
    var items = setItems(localStorageItems);
    var totalCalories = getTotalCalories();
    showTotalCalories(totalCalories);
    var calorieList = populateItems(items);
    calorieList.addEventListener('click', handleItemClick);
}
addBackEventListener(function () {
    changeSubmitGroupState('add');
});
src_form.addEventListener('submit', handleFormSubmit);
clearButton.addEventListener('click', function () {
    var items = clearItems();
    clearFromLocalStorage();
    var totalCalories = getTotalCalories();
    if (totalCalories === 0)
        clearTotalCalories();
    else
        showTotalCalories(totalCalories);
    populateItems(items);
});
function handleFormSubmit(e) {
    e.preventDefault();
    var actionType = e.submitter.name;
    var mealName = meal.value;
    var calorieAmount = parseInt(calories.value);
    if (!mealName || !calorieAmount) {
        return;
    }
    var items;
    if (actionType === 'update') {
        var item = getLastSelectedItem();
        items = updateItem(item.id, mealName, calorieAmount);
        changeSubmitGroupState('add');
    }
    else if (actionType === 'delete') {
        var item = getLastSelectedItem();
        items = deleteItem(item.id);
        changeSubmitGroupState('add');
    }
    else {
        items = addItem(mealName, calorieAmount);
    }
    addToLocalStorage(items);
    hideBackButton();
    var totalCalories = getTotalCalories();
    if (totalCalories === 0)
        clearTotalCalories();
    else
        showTotalCalories(totalCalories);
    var calorieList = populateItems(items);
    // There were no previous items
    if (items.length === 1 && actionType === 'add')
        calorieList.addEventListener('click', handleItemClick);
    if (items.length === 0)
        calorieList.removeEventListener('click', handleItemClick);
}
function handleItemClick(e) {
    var target = e.target;
    if (target.className === 'calorie-list__icon' ||
        target.nodeName === 'svg' ||
        target.nodeName === 'path') {
        var id_1;
        // Deal with event delegation target issues
        if (target.nodeName === 'svg')
            id_1 = target.parentElement.dataset.id;
        else if (target.nodeName === 'path')
            id_1 = target.parentElement.parentElement.dataset.id;
        else
            id_1 = target.dataset.id;
        var items = getItems();
        var item = items.find(function (item) { return item.id === parseInt(id_1); });
        setLastSelectedItem(item);
        showBackButton();
        changeSubmitGroupState('edit');
        changeFormInputState(item.name, item.calories);
    }
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBb0IsUUFBUTtBQUM1QixnREFBZ0Qsb0NBQW9DO0FBQ3BGLFFBQVEsbUJBQW1CO0FBQzNCLFFBQVEsY0FBYztBQUN0QixRQUFRLHNCQUFzQjtBQUM5QixRQUFRLG9CQUFvQjtBQUM1QjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2Fsb3JpZS10cmFja2VyLy4vc3JjL2NvbnRyb2xsZXJzL2l0ZW1zLnRzIiwid2VicGFjazovL2NhbG9yaWUtdHJhY2tlci8uL3NyYy9jb250cm9sbGVycy9pbnRlcmZhY2UudHMiLCJ3ZWJwYWNrOi8vY2Fsb3JpZS10cmFja2VyLy4vc3JjL2NvbnRyb2xsZXJzL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vY2Fsb3JpZS10cmFja2VyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBJdGVtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSXRlbShpZCwgbmFtZSwgY2Fsb3JpZXMpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmNhbG9yaWVzID0gY2Fsb3JpZXMgfHwgMDtcclxuICAgIH1cclxuICAgIHJldHVybiBJdGVtO1xyXG59KCkpO1xyXG52YXIgSXRlbUxpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBJdGVtTGlzdChpdGVtcykge1xyXG4gICAgICAgIGlmIChpdGVtcyA9PT0gdm9pZCAwKSB7IGl0ZW1zID0gW107IH1cclxuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBpdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5jYWxvcmllVG90YWwgPSAwO1xyXG4gICAgICAgIHRoaXMubGFzdFNlbGVjdGVkSXRlbSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pZENvdW50ZXIgPSAxO1xyXG4gICAgfVxyXG4gICAgSXRlbUxpc3QucHJvdG90eXBlLmdldEl0ZW1zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xyXG4gICAgfTtcclxuICAgIEl0ZW1MaXN0LnByb3RvdHlwZS5hZGRJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5sZW5ndGgrKztcclxuICAgICAgICB0aGlzLmlkQ291bnRlcisrO1xyXG4gICAgICAgIHRoaXMuY2Fsb3JpZVRvdGFsICs9IGl0ZW0uY2Fsb3JpZXM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXM7XHJcbiAgICB9O1xyXG4gICAgSXRlbUxpc3QucHJvdG90eXBlLnVwZGF0ZUl0ZW0gPSBmdW5jdGlvbiAoaWQsIG5ld05hbWUsIG5ld0NhbG9yaWVBbW91bnQpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLml0ZW1zLmZpbmRJbmRleChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS5pZCA9PT0gaWQ7IH0pO1xyXG4gICAgICAgIHZhciBvbGRDYWxvcmllcyA9IHRoaXMuaXRlbXNbaW5kZXhdLmNhbG9yaWVzO1xyXG4gICAgICAgIHRoaXMuY2Fsb3JpZVRvdGFsIC09IG9sZENhbG9yaWVzO1xyXG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLm5hbWUgPSBuZXdOYW1lO1xyXG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLmNhbG9yaWVzID0gbmV3Q2Fsb3JpZUFtb3VudDtcclxuICAgICAgICB0aGlzLmNhbG9yaWVUb3RhbCArPSBuZXdDYWxvcmllQW1vdW50O1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xyXG4gICAgfTtcclxuICAgIEl0ZW1MaXN0LnByb3RvdHlwZS5kZWxldGVJdGVtID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pdGVtcy5maW5kSW5kZXgoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uaWQgPT09IGlkOyB9KTtcclxuICAgICAgICB2YXIgY2Fsb3JpZXM7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2Fsb3JpZXMgPSB0aGlzLml0ZW1zW2luZGV4XS5jYWxvcmllcztcclxuICAgICAgICBpZiAoaW5kZXggPT09IDApXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuc2hpZnQoKTtcclxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gdGhpcy5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnBvcCgpO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtc1xyXG4gICAgICAgICAgICAgICAgLnNsaWNlKDAsIGluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdCh0aGlzLml0ZW1zLnNsaWNlKGluZGV4ICsgMSwgdGhpcy5sZW5ndGgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sZW5ndGgtLTtcclxuICAgICAgICB0aGlzLmNhbG9yaWVUb3RhbCAtPSBjYWxvcmllcztcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcclxuICAgIH07XHJcbiAgICBJdGVtTGlzdC5wcm90b3R5cGUuc2V0SXRlbXMgPSBmdW5jdGlvbiAoaXRlbXMpIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBpdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5pZENvdW50ZXIgPSBpdGVtcy5sZW5ndGggKyAxO1xyXG4gICAgICAgIHRoaXMuY2Fsb3JpZVRvdGFsID0gY2FsY3VsYXRlVG90YWxDYWxvcmllcyh0aGlzLml0ZW1zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcclxuICAgIH07XHJcbiAgICBJdGVtTGlzdC5wcm90b3R5cGUuY2xlYXJJdGVtcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuY2Fsb3JpZVRvdGFsID0gMDtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcclxuICAgIH07XHJcbiAgICBJdGVtTGlzdC5wcm90b3R5cGUuc2V0TGFzdFNlbGVjdGVkSXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWRJdGVtID0gaXRlbTtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXN0U2VsZWN0ZWRJdGVtO1xyXG4gICAgfTtcclxuICAgIEl0ZW1MaXN0LnByb3RvdHlwZS5nZXRMYXN0U2VsZWN0ZWRJdGVtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RTZWxlY3RlZEl0ZW07XHJcbiAgICB9O1xyXG4gICAgSXRlbUxpc3QucHJvdG90eXBlLmdldFRvdGFsQ2Fsb3JpZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2Fsb3JpZVRvdGFsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBJdGVtTGlzdDtcclxufSgpKTtcclxudmFyIGxpc3QgPSBuZXcgSXRlbUxpc3QoKTtcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEl0ZW0obmFtZSwgY2Fsb3JpZXMpIHtcclxuICAgIHZhciBpZCA9IGxpc3QuaWRDb3VudGVyO1xyXG4gICAgdmFyIGl0ZW0gPSBuZXcgSXRlbShpZCwgbmFtZSwgY2Fsb3JpZXMpO1xyXG4gICAgcmV0dXJuIGxpc3QuYWRkSXRlbShpdGVtKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSXRlbShpZCwgbmV3TmFtZSwgbmV3Q2Fsb3JpZUFtb3VudCkge1xyXG4gICAgcmV0dXJuIGxpc3QudXBkYXRlSXRlbShpZCwgbmV3TmFtZSwgbmV3Q2Fsb3JpZUFtb3VudCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUl0ZW0oaWQpIHtcclxuICAgIHJldHVybiBsaXN0LmRlbGV0ZUl0ZW0oaWQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtcygpIHtcclxuICAgIHJldHVybiBsaXN0LmdldEl0ZW1zKCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFySXRlbXMoKSB7XHJcbiAgICByZXR1cm4gbGlzdC5jbGVhckl0ZW1zKCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW1zKGl0ZW1zKSB7XHJcbiAgICByZXR1cm4gbGlzdC5zZXRJdGVtcyhpdGVtcyk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldExhc3RTZWxlY3RlZEl0ZW0oaXRlbSkge1xyXG4gICAgcmV0dXJuIGxpc3Quc2V0TGFzdFNlbGVjdGVkSXRlbShpdGVtKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGFzdFNlbGVjdGVkSXRlbSgpIHtcclxuICAgIHJldHVybiBsaXN0LmdldExhc3RTZWxlY3RlZEl0ZW0oKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG90YWxDYWxvcmllcygpIHtcclxuICAgIHJldHVybiBsaXN0LmdldFRvdGFsQ2Fsb3JpZXMoKTtcclxufVxyXG5mdW5jdGlvbiBjYWxjdWxhdGVUb3RhbENhbG9yaWVzKGl0ZW1zKSB7XHJcbiAgICByZXR1cm4gaXRlbXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGN1cnIpIHtcclxuICAgICAgICByZXR1cm4gYWNjICsgY3Vyci5jYWxvcmllcztcclxuICAgIH0sIDApO1xyXG59XHJcbiIsInZhciBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2snKTtcclxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRvdGFsQ2Fsb3JpZXNIZWFkZXIoKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFsLWNhbG9yaWVzJyk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dUb3RhbENhbG9yaWVzKGNhbG9yaWVzKSB7XHJcbiAgICB2YXIgY2Fsb3JpZUhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbC1jYWxvcmllcycpO1xyXG4gICAgY2Fsb3JpZUhlYWRlci5pbm5lclRleHQgPSBcIlRvdGFsIENhbG9yaWVzOiBcIiArIGNhbG9yaWVzO1xyXG4gICAgcmV0dXJuIGNhbG9yaWVIZWFkZXI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyVG90YWxDYWxvcmllcygpIHtcclxuICAgIHZhciBjYWxvcmllSGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFsLWNhbG9yaWVzJyk7XHJcbiAgICBjYWxvcmllSGVhZGVyLmlubmVyVGV4dCA9ICcnO1xyXG4gICAgcmV0dXJuIGNhbG9yaWVIZWFkZXI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlSXRlbXMoaXRlbXMpIHtcclxuICAgIHZhciBjYWxvcmllTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxvcmllLWxpc3QnKTtcclxuICAgIHZhciBodG1sU3RyaW5nID0gXCJcIjtcclxuICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBodG1sU3RyaW5nICs9IFwiXFxuICAgICAgICAgICAgPGxpIGNsYXNzPVxcXCJjYWxvcmllLWxpc3RfX2l0ZW0gZmxleCBqdXN0aWZ5LWJldHdlZW5cXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGI+XCIgKyBpdGVtLm5hbWUgKyBcIjo8L2I+PGkgY2xhc3M9XFxcIm1sLTFcXFwiPlwiICsgaXRlbS5jYWxvcmllcyArIFwiIENhbG9yaWVzPC9pPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiY2Fsb3JpZS1saXN0X19pY29uXFxcIiBkYXRhLWlkPVxcXCJcIiArIGl0ZW0uaWQgKyBcIlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmFzIGZhLXBlbmNpbC1hbHQgaWNvblxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICA8L2xpPlxcbiAgICAgICAgXCI7XHJcbiAgICB9KTtcclxuICAgIGNhbG9yaWVMaXN0LmlubmVySFRNTCA9IGh0bWxTdHJpbmc7XHJcbiAgICByZXR1cm4gY2Fsb3JpZUxpc3Q7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVN1Ym1pdEdyb3VwU3RhdGUoc3RhdGUpIHtcclxuICAgIHZhciBzdWJtaXRHcm91cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtZ3JvdXAnKTtcclxuICAgIHZhciBodG1sU3RyaW5nID0gXCJcIjtcclxuICAgIGlmIChzdGF0ZSA9PT0gJ2VkaXQnKSB7XHJcbiAgICAgICAgaHRtbFN0cmluZyA9IFwiXFxuICAgICAgICAgICAgPGJ1dHRvblxcbiAgICAgICAgICAgICAgICB0eXBlPVxcXCJzdWJtaXRcXFwiXFxuICAgICAgICAgICAgICAgIG5hbWU9XFxcInVwZGF0ZVxcXCJcXG4gICAgICAgICAgICAgICAgY2xhc3M9XFxcImNhbG9yaWUtZm9ybV9fc3VibWl0IGJ0bi13YXJuaW5nXFxcIlxcbiAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhcyBmYS1wbHVzXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgIDxzcGFuPlVwZGF0ZSBNZWFsPC9zcGFuPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIDxidXR0b25cXG4gICAgICAgICAgICAgICAgdHlwZT1cXFwic3VibWl0XFxcIlxcbiAgICAgICAgICAgICAgICBuYW1lPVxcXCJkZWxldGVcXFwiXFxuICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJjYWxvcmllLWZvcm1fX3N1Ym1pdCBidG4tZGFuZ2VyXFxcIlxcbiAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhcyBmYS1wbHVzXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgIDxzcGFuPkRlbGV0ZSBNZWFsPC9zcGFuPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBodG1sU3RyaW5nID0gXCJcXG4gICAgICAgIDxidXR0b25cXG4gICAgICAgICAgICB0eXBlPVxcXCJzdWJtaXRcXFwiXFxuICAgICAgICAgICAgbmFtZT1cXFwiYWRkXFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJjYWxvcmllLWZvcm1fX3N1Ym1pdFxcXCJcXG4gICAgICAgICAgICBpZD1cXFwiYWRkLWl0ZW1cXFwiXFxuICAgICAgICA+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhcyBmYS1wbHVzXFxcIj48L2k+XFxuICAgICAgICAgICAgPHNwYW4+QWRkIE1lYWw8L3NwYW4+XFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgXCI7XHJcbiAgICB9XHJcbiAgICBzdWJtaXRHcm91cC5pbm5lckhUTUwgPSBodG1sU3RyaW5nO1xyXG4gICAgcmV0dXJuO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VGb3JtSW5wdXRTdGF0ZShuYW1lLCBjYWxvcmllcykge1xyXG4gICAgdmFyIG1lYWxJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZWFsJyk7XHJcbiAgICB2YXIgY2Fsb3JpZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbG9yaWVzJyk7XHJcbiAgICBtZWFsSW5wdXQudmFsdWUgPSBuYW1lO1xyXG4gICAgY2Fsb3JpZUlucHV0LnZhbHVlID0gY2Fsb3JpZXMudG9TdHJpbmcoKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0JhY2tCdXR0b24oKSB7XHJcbiAgICBpZiAoYmFja0J1dHRvbi5jbGFzc05hbWUuaW5jbHVkZXMoJ2QtYmxvY2snKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBiYWNrQnV0dG9uLmNsYXNzTmFtZSA9IGJhY2tCdXR0b24uY2xhc3NOYW1lLnJlcGxhY2UoJ2Qtbm9uZScsICdkLWJsb2NrJyk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVCYWNrQnV0dG9uKCkge1xyXG4gICAgaWYgKGJhY2tCdXR0b24uY2xhc3NOYW1lLmluY2x1ZGVzKCdkLW5vbmUnKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBiYWNrQnV0dG9uLmNsYXNzTmFtZSA9IGJhY2tCdXR0b24uY2xhc3NOYW1lLnJlcGxhY2UoJ2QtYmxvY2snLCAnZC1ub25lJyk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEJhY2tFdmVudExpc3RlbmVyKGhhbmRsZXIpIHtcclxuICAgIGJhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKTtcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0RnJvbVN0b3JhZ2UoKSB7XHJcbiAgICB2YXIgaXRlbXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXRlbXMnKTtcclxuICAgIGlmIChpdGVtcyA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaXRlbXMpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUb0xvY2FsU3RvcmFnZShpdGVtcykge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2l0ZW1zJywgSlNPTi5zdHJpbmdpZnkoaXRlbXMpKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJGcm9tTG9jYWxTdG9yYWdlKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2l0ZW1zJyk7XHJcbn1cclxuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcclxuaW1wb3J0IHsgYWRkSXRlbSwgZGVsZXRlSXRlbSwgZ2V0SXRlbXMsIGdldExhc3RTZWxlY3RlZEl0ZW0sIHNldEl0ZW1zLCBzZXRMYXN0U2VsZWN0ZWRJdGVtLCB1cGRhdGVJdGVtLCBnZXRUb3RhbENhbG9yaWVzLCBjbGVhckl0ZW1zLCB9IGZyb20gJy4vY29udHJvbGxlcnMvaXRlbXMnO1xyXG5pbXBvcnQgeyBwb3B1bGF0ZUl0ZW1zLCBjaGFuZ2VTdWJtaXRHcm91cFN0YXRlLCBjaGFuZ2VGb3JtSW5wdXRTdGF0ZSwgc2hvd1RvdGFsQ2Fsb3JpZXMsIGNsZWFyVG90YWxDYWxvcmllcywgc2hvd0JhY2tCdXR0b24sIGhpZGVCYWNrQnV0dG9uLCBhZGRCYWNrRXZlbnRMaXN0ZW5lciwgfSBmcm9tICcuL2NvbnRyb2xsZXJzL2ludGVyZmFjZSc7XHJcbmltcG9ydCB7IGFkZFRvTG9jYWxTdG9yYWdlLCBnZXRGcm9tU3RvcmFnZSwgY2xlYXJGcm9tTG9jYWxTdG9yYWdlLCB9IGZyb20gJy4vY29udHJvbGxlcnMvc3RvcmFnZSc7XHJcbnZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbG9yaWUtZm9ybScpO1xyXG52YXIgbWVhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZWFsJyk7XHJcbnZhciBjYWxvcmllcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxvcmllcycpO1xyXG52YXIgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xlYXItYWxsJyk7XHJcbnZhciBsb2NhbFN0b3JhZ2VJdGVtcyA9IGdldEZyb21TdG9yYWdlKCk7XHJcbmlmIChsb2NhbFN0b3JhZ2VJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICB2YXIgaXRlbXMgPSBzZXRJdGVtcyhsb2NhbFN0b3JhZ2VJdGVtcyk7XHJcbiAgICB2YXIgdG90YWxDYWxvcmllcyA9IGdldFRvdGFsQ2Fsb3JpZXMoKTtcclxuICAgIHNob3dUb3RhbENhbG9yaWVzKHRvdGFsQ2Fsb3JpZXMpO1xyXG4gICAgdmFyIGNhbG9yaWVMaXN0ID0gcG9wdWxhdGVJdGVtcyhpdGVtcyk7XHJcbiAgICBjYWxvcmllTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUl0ZW1DbGljayk7XHJcbn1cclxuYWRkQmFja0V2ZW50TGlzdGVuZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgY2hhbmdlU3VibWl0R3JvdXBTdGF0ZSgnYWRkJyk7XHJcbn0pO1xyXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZUZvcm1TdWJtaXQpO1xyXG5jbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpdGVtcyA9IGNsZWFySXRlbXMoKTtcclxuICAgIGNsZWFyRnJvbUxvY2FsU3RvcmFnZSgpO1xyXG4gICAgdmFyIHRvdGFsQ2Fsb3JpZXMgPSBnZXRUb3RhbENhbG9yaWVzKCk7XHJcbiAgICBpZiAodG90YWxDYWxvcmllcyA9PT0gMClcclxuICAgICAgICBjbGVhclRvdGFsQ2Fsb3JpZXMoKTtcclxuICAgIGVsc2VcclxuICAgICAgICBzaG93VG90YWxDYWxvcmllcyh0b3RhbENhbG9yaWVzKTtcclxuICAgIHBvcHVsYXRlSXRlbXMoaXRlbXMpO1xyXG59KTtcclxuZnVuY3Rpb24gaGFuZGxlRm9ybVN1Ym1pdChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgYWN0aW9uVHlwZSA9IGUuc3VibWl0dGVyLm5hbWU7XHJcbiAgICB2YXIgbWVhbE5hbWUgPSBtZWFsLnZhbHVlO1xyXG4gICAgdmFyIGNhbG9yaWVBbW91bnQgPSBwYXJzZUludChjYWxvcmllcy52YWx1ZSk7XHJcbiAgICBpZiAoIW1lYWxOYW1lIHx8ICFjYWxvcmllQW1vdW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGl0ZW1zO1xyXG4gICAgaWYgKGFjdGlvblR5cGUgPT09ICd1cGRhdGUnKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSBnZXRMYXN0U2VsZWN0ZWRJdGVtKCk7XHJcbiAgICAgICAgaXRlbXMgPSB1cGRhdGVJdGVtKGl0ZW0uaWQsIG1lYWxOYW1lLCBjYWxvcmllQW1vdW50KTtcclxuICAgICAgICBjaGFuZ2VTdWJtaXRHcm91cFN0YXRlKCdhZGQnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFjdGlvblR5cGUgPT09ICdkZWxldGUnKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSBnZXRMYXN0U2VsZWN0ZWRJdGVtKCk7XHJcbiAgICAgICAgaXRlbXMgPSBkZWxldGVJdGVtKGl0ZW0uaWQpO1xyXG4gICAgICAgIGNoYW5nZVN1Ym1pdEdyb3VwU3RhdGUoJ2FkZCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaXRlbXMgPSBhZGRJdGVtKG1lYWxOYW1lLCBjYWxvcmllQW1vdW50KTtcclxuICAgIH1cclxuICAgIGFkZFRvTG9jYWxTdG9yYWdlKGl0ZW1zKTtcclxuICAgIGhpZGVCYWNrQnV0dG9uKCk7XHJcbiAgICB2YXIgdG90YWxDYWxvcmllcyA9IGdldFRvdGFsQ2Fsb3JpZXMoKTtcclxuICAgIGlmICh0b3RhbENhbG9yaWVzID09PSAwKVxyXG4gICAgICAgIGNsZWFyVG90YWxDYWxvcmllcygpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHNob3dUb3RhbENhbG9yaWVzKHRvdGFsQ2Fsb3JpZXMpO1xyXG4gICAgdmFyIGNhbG9yaWVMaXN0ID0gcG9wdWxhdGVJdGVtcyhpdGVtcyk7XHJcbiAgICAvLyBUaGVyZSB3ZXJlIG5vIHByZXZpb3VzIGl0ZW1zXHJcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAxICYmIGFjdGlvblR5cGUgPT09ICdhZGQnKVxyXG4gICAgICAgIGNhbG9yaWVMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlSXRlbUNsaWNrKTtcclxuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgY2Fsb3JpZUxpc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVJdGVtQ2xpY2spO1xyXG59XHJcbmZ1bmN0aW9uIGhhbmRsZUl0ZW1DbGljayhlKSB7XHJcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2NhbG9yaWUtbGlzdF9faWNvbicgfHxcclxuICAgICAgICB0YXJnZXQubm9kZU5hbWUgPT09ICdzdmcnIHx8XHJcbiAgICAgICAgdGFyZ2V0Lm5vZGVOYW1lID09PSAncGF0aCcpIHtcclxuICAgICAgICB2YXIgaWRfMTtcclxuICAgICAgICAvLyBEZWFsIHdpdGggZXZlbnQgZGVsZWdhdGlvbiB0YXJnZXQgaXNzdWVzXHJcbiAgICAgICAgaWYgKHRhcmdldC5ub2RlTmFtZSA9PT0gJ3N2ZycpXHJcbiAgICAgICAgICAgIGlkXzEgPSB0YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkO1xyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC5ub2RlTmFtZSA9PT0gJ3BhdGgnKVxyXG4gICAgICAgICAgICBpZF8xID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgaWRfMSA9IHRhcmdldC5kYXRhc2V0LmlkO1xyXG4gICAgICAgIHZhciBpdGVtcyA9IGdldEl0ZW1zKCk7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSBpdGVtcy5maW5kKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmlkID09PSBwYXJzZUludChpZF8xKTsgfSk7XHJcbiAgICAgICAgc2V0TGFzdFNlbGVjdGVkSXRlbShpdGVtKTtcclxuICAgICAgICBzaG93QmFja0J1dHRvbigpO1xyXG4gICAgICAgIGNoYW5nZVN1Ym1pdEdyb3VwU3RhdGUoJ2VkaXQnKTtcclxuICAgICAgICBjaGFuZ2VGb3JtSW5wdXRTdGF0ZShpdGVtLm5hbWUsIGl0ZW0uY2Fsb3JpZXMpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==