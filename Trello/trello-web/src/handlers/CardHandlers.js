// Handlers for DnD API
export const cardDragEndHandler = (e) => {
    console.log('Dragging has ended', e);
}

export const cardDragStartHandler = (e) => {
    e.dataTransfer.setData("cardItem", e.target.id);
    e.dataTransfer.setData("listId", e.target.closest('.group-list-item').id);
}

export const cardDragOverHandler = (e) => {
    e.preventDefault();
}