class TodoModel {
    constructor() {
        this.id = 0;
        this.todos = [];
    }

    bindRenderCallback(callback) {
        this.renderCallback = callback;
    }

    // Todo is an object within todos array
    isIdEqual(id, todo) {
        return todo.id === id; 
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
    
    toggle(id) {
        for(const todo of this.todos) {
            if(this.isIdEqual(id, todo)) {
                todo.isComplete = !todo.isComplete;
                break;
            }
        }

        this.renderCallback(this.todos);
    } 
};

export { TodoModel };