const fieldName = 'items';

export function getFromLocalStorage() {
    const data = localStorage.getItem(fieldName);

    if (data == null) {
        return [];
    }

    return JSON.parse(data);
}

export function setLocalStorage(data: any) {
    localStorage.setItem(fieldName, JSON.stringify(data));
}

export function clearLocalStorage() {
    localStorage.removeItem('items');
}
