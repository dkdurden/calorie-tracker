class Item {
    id: number;
    name: string;
    calories: number;

    constructor(id: number, name: string, calories: number) {
        this.id = id;
        this.name = name;
        this.calories = calories || 0;
    }
}

class ItemList {
    items: Array<Item>;
    length: number | null;
    calorieTotal: number | null;
    lastSelectedItem: Item | null;
    idCounter: number | null;
    constructor(items: Array<Item> = []) {
        this.items = items;
        this.length = items.length;
        this.calorieTotal = 0;
        this.lastSelectedItem = null;
        this.idCounter = 1;
    }

    getItems() {
        return this.items;
    }

    getItem(id: number) {
        const item = this.items.find((item: Item) => item.id === id);
        return item || null;
    }

    addItem(item: Item) {
        this.items.push(item);
        this.length++;
        this.idCounter++;
        this.calorieTotal += item.calories;
        return this.items;
    }

    updateItem(id: number, newName: string, newCalorieAmount: number) {
        const index = this.items.findIndex((item) => item.id === id);

        const oldCalories = this.items[index].calories;
        this.calorieTotal -= oldCalories;

        this.items[index].name = newName;
        this.items[index].calories = newCalorieAmount;

        this.calorieTotal += newCalorieAmount;

        return this.items;
    }

    deleteItem(id: number) {
        const index = this.items.findIndex((item) => item.id === id);
        let calories;

        if (index === -1) {
            return this.items;
        }

        calories = this.items[index].calories;

        if (index === 0) this.items.shift();
        else if (index === this.length - 1) this.items.pop();
        else {
            this.items = this.items
                .slice(0, index)
                .concat(this.items.slice(index + 1, this.length));
        }

        this.length--;
        this.calorieTotal -= calories;

        return this.items;
    }

    setItems(items: Array<Item> | []) {
        this.items = items;
        this.length = items.length;
        this.idCounter = items.length + 1;
        this.calorieTotal = calculateTotalCalories(this.items);
        return this.items;
    }

    clearItems() {
        this.items = [];
        this.length = 0;
        this.calorieTotal = 0;
        return this.items;
    }

    setLastSelectedItem(item: Item) {
        this.lastSelectedItem = item;
        return this.lastSelectedItem;
    }

    getLastSelectedItem() {
        return this.lastSelectedItem;
    }

    getTotalCalories() {
        return this.calorieTotal;
    }
}

const list = new ItemList();

export function addItem(name: string, calories: number) {
    const id = list.idCounter;

    const item = new Item(id, name, calories);

    return list.addItem(item);
}

export function updateItem(
    id: number,
    newName: string,
    newCalorieAmount: number
) {
    return list.updateItem(id, newName, newCalorieAmount);
}

export function deleteItem(id: number) {
    return list.deleteItem(id);
}

export function getItems(): Array<Item> {
    return list.getItems();
}

export function getItem(id: number) {
    list.getItem(id);
}

export function clearItems() {
    return list.clearItems();
}

export function setItems(items: any) {
    return list.setItems(<Array<Item>>items);
}

export function setLastSelectedItem(item: any) {
    return list.setLastSelectedItem(<Item>item);
}

export function getLastSelectedItem() {
    return list.getLastSelectedItem();
}

export function getTotalCalories() {
    return list.getTotalCalories();
}

function calculateTotalCalories(items: Array<Item>): number {
    return items.reduce((acc, curr) => {
        return acc + curr.calories;
    }, 0);
}
