import { QuerySelector } from "../dom/queryselector.js";
import { Template } from "../dom/template.js";

class TodoView {
    constructor() {
        this.template = QuerySelector.getElement(".task__template");
        this.form = QuerySelector.getElement(".form");
        this.input = QuerySelector.getElement("input");
        this.todoList = QuerySelector.getElement(".todo__list"); 
    }

    get inputText() {
        return this.input.value;
    }

    resetInput() {
        this.input.value = "";
    }

    display(todos) {
        const newChildren = [];

        todos.forEach((todo) => {
            const clone = Template.createTemplate(this.template);
            clone.dataset.id = todo.id;
            QuerySelector.getElement(".checkbox", clone).
                    setAttribute("aria-pressed", todo.isComplete);
            QuerySelector.getElement("p", clone).textContent = todo.text;

            newChildren.push(clone);
        })

        this.todoList.replaceChildren(...newChildren);
    }

    listenToCreate(handler) {
        this.form.addEventListener("submit", event => {
            event.preventDefault();

            if(this.inputText) {
                handler(this.inputText);
                this.resetInput();
            }
        });
    }

    listenToUpdate(handler) {
        let temporaryTodoText = "";

        this.todoList.addEventListener("input", event => {
            temporaryTodoText = event.target.textContent;
        });

        this.todoList.addEventListener("focusout", event => {
            if(temporaryTodoText) {
                const id = parseInt(event.target.closest(".task").dataset.id);

                handler(id, temporaryTodoText);
                temporaryTodoText = "";
            }
        });
    }

    listenToRemove(handler) {
        this.todoList.addEventListener("click", event => {
            if(event.target.closest(".cross")) {
                const id = parseInt(event.target.closest(".task").dataset.id);

                handler(id);
            }
        });
    }

    listenToToggle(handler) {
        this.todoList.addEventListener("click", event => {
            if(event.target.closest(".checkbox")) {
                const id = parseInt(event.target.closest(".task").dataset.id);

                handler(id);
            }
        });
    }
};

export { TodoView };