class TodoModel {
    constructor() {
        this.id = 0;
        this.todos = [];
        this.themes = {
            light: "dark",
            dark: "light",
        };
        this.currentTheme = "dark";
        this.filterOptions = {
            active: (todo) => {
                return !this.isTodoCompleted(todo);
            },
            completed: (todo) => {
                return this.isTodoCompleted(todo);
            },
        }
    }

    bindRenderCallback(callback) {
        this.renderCallback = callback;
    }

    // Todo is an object within todos array
    isIdEqual(id, todo) {
        return todo.id === id; 
    }

    isTodoCompleted(todo) {
        return todo.isComplete;
    }

    filter(option) {
        const todosCopy = this.todos.filter((item) => this.filterOptions[option](item));

        this.renderCallback(todosCopy);
    }

    create(todoText) {
        this.todos.push( {id: this.id, text: todoText, isComplete: false} );
        this.id++;

        this.renderCallback(this.todos);
    }

    update(id, updatedText) {
        for(const todo of this.todos) {
            if(this.isIdEqual(id, todo)) {
                todo.text = updatedText;
                break;
            }
        }

        this.renderCallback(this.todos);
    }

    remove(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);

        this.renderCallback(this.todos);
    }

    removeCompleted() {
        this.todos = this.todos.filter((item) => !this.isTodoCompleted(item));

        this.renderCallback(this.todos);
    }
    
    toggle(id) {
        for(const todo of this.todos) {
            if(this.isIdEqual(id, todo)) {
                todo.isComplete = !todo.isComplete;
                break;
            }
        }

        this.renderCallback(this.todos);
    } 

    switchTheme() {
        const lastTheme = this.currentTheme;
        this.currentTheme = this.themes[lastTheme];

        const switchThemeData = {
            lastTheme: lastTheme,
            currentTheme: this.currentTheme,
        };

        return switchThemeData;
    }
};

export { TodoModel };