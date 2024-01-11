class TodoControl {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.bindRenderCallback(this.renderCallback);
        this.view.listenToCreate(this.handleCreate);
        this.view.listenToUpdate(this.handleUpdate);
        this.view.listenToRemove(this.handleRemove);
        this.view.listenToToggle(this.handleToggle);
        this.view.listenToThemeSwitch(this.handleThemeSwitch);
        this.view.listenToShowAll(this.handleShowAll);
        this.view.listenToShowActive(this.handleFilter);
        this.view.listenToShowCompleted(this.handleFilter);
        this.view.listenToRemoveCompleted(this.handleRemoveCompleted);
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

    handleThemeSwitch = () => {
        return this.model.switchTheme();
    }

    handleShowAll = () => {
        this.model.renderCallback(this.model.todos);
    }

    handleFilter = (option) => {
        this.model.filter(option);
    }
    
    handleRemoveCompleted = () => {
        this.model.removeCompleted();
    }
};

export { TodoControl };