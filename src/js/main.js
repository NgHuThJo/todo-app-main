import { TodoModel } from "./todo/model.js";
import { TodoView } from "./todo/view.js";
import { TodoControl } from "./todo/controller.js";

function main() {
    const app = new TodoControl(new TodoModel(), new TodoView());
}

main();