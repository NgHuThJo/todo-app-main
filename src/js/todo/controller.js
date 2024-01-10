class TodoControl {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.bindRenderCallback(this.renderCallback);
        this.view.listenToCreate(this.handleCreate);
        this.view.listenToUpdate(this.handleUpdate);
        this.view.listenToRemove(this.handleRemove);
        this.view.listenToToggle(this.handleToggle);
        this.renderCallback(this.model.todos);
    }

    renderCallback = (todos) => {
        this.view.display(todos);
    }

    handleCreate = todoText => {
        this.model.create(todoText);
    }

    handleUpdate = (id, todoText) => {
        this.model.update(id, todoText);
    }

    handleRemove = id => {
        this.model.remove(id);
    }

    handleToggle = id => {
        this.model.toggle(id);
    }
};

export { TodoControl };