export function getFromStorage() {
    const items = localStorage.getItem('items');

    if (items == null) {
        return [];
    }

    return JSON.parse(items);
}

export function addToLocalStorage(items: Array<any>) {
    localStorage.setItem('items', JSON.stringify(items));
}

export function clearFromLocalStorage() {
    localStorage.removeItem('items');
}
