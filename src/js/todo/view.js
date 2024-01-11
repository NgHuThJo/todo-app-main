import { QuerySelector } from "../dom/queryselector.js";
import { Template } from "../dom/template.js";

class TodoView {
    constructor() {
        // Task template
        this.template = QuerySelector.getElement(".task__template");
        this.form = QuerySelector.getElement(".form");
        this.input = QuerySelector.getElement("input");
        this.todoList = QuerySelector.getElement(".todo__list"); 
        // Theme switcher
        this.themeButton = QuerySelector.getElement(".theme__button");
        // Status shows number of tasks in list
        this.status = QuerySelector.getElement(".status");
        // Options
        this.showAllButton = QuerySelector.getElement(".all__button");
        this.showActiveButton = QuerySelector.getElement(".active__button");
        this.showCompletedButton = QuerySelector.getElement(".completed__button");
        this.removeCompletedButton = QuerySelector.getElement(".clear__button");
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

        this.status.textContent = `${todos.length} ${todos.length === 1 ? "item" : "items"} left`;
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
    
    listenToThemeSwitch(handler) {
        const body = QuerySelector.getElement("body");
        const themeSwitchIcons = QuerySelector.getAllElements("img", this.themeButton);

        this.themeButton.addEventListener("click", () => {
            const switchThemeData = handler();

            for(const theme in switchThemeData) {
                body.classList.toggle(switchThemeData[theme]);
            }

            for(const icon of themeSwitchIcons) {
                const isPressed = icon.getAttribute("aria-pressed");
                icon.setAttribute("aria-pressed", isPressed === "true" ? "false" : "true");
            }
        });
    }

    listenToShowAll(handler) {
        this.showAllButton.addEventListener("click", event => {
            handler();
        });
    }

    listenToShowActive(handler) {
        this.showActiveButton.addEventListener("click", event => {
            handler("active");
        });
    }

    listenToShowCompleted(handler) {
        this.showCompletedButton.addEventListener("click", event => {
            handler("completed");
        });
    }

    listenToRemoveCompleted(handler) {
        this.removeCompletedButton.addEventListener("click", event => {
            handler();
        });
    }
};

export { TodoView };