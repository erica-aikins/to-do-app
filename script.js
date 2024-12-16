document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const categorySelect = document.getElementById("category-select");
    const filterCategory = document.getElementById("filter-category");
    const addTaskBtn = document.getElementById("add-task-btn");
    const addCategoryBtn = document.getElementById("add-category-btn");
    const categoryInput = document.getElementById("category-input");
    const taskList = document.getElementById("task-list");
    const searchBar = document.getElementById("search-bar");

    const categories = [];
    const tasks = [];

    function renderCategories() {
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        filterCategory.innerHTML = '<option value="">All Categories</option>';
        categories.forEach(category => {
            categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
            filterCategory.innerHTML += `<option value="${category}">${category}</option>`;
        });
    }

    function renderTasks() {
        const filterValue = filterCategory.value.toLowerCase();
        const searchValue = searchBar.value.toLowerCase();

        taskList.innerHTML = "";
        tasks
            .filter(task =>
                (filterValue === "" || task.category.toLowerCase() === filterValue) &&
                task.name.toLowerCase().includes(searchValue)
            )
            .forEach((task, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span>${task.name}</span>
                    <span class="task-category">${task.category}</span>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                `;
                taskList.appendChild(li);
            });

        // Add delete functionality
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                tasks.splice(index, 1);
                renderTasks();
            });
        });
    }

    addCategoryBtn.addEventListener("click", () => {
        const category = categoryInput.value.trim();
        if (category && !categories.includes(category)) {
            categories.push(category);
            renderCategories();
            categoryInput.value = "";
        }
    });

    addTaskBtn.addEventListener("click", () => {
        const taskName = taskInput.value.trim();
        const category = categorySelect.value.trim();
        if (taskName && category) {
            tasks.push({ name: taskName, category });
            taskInput.value = "";
            renderTasks();
        }
    });

    filterCategory.addEventListener("change", renderTasks);
    searchBar.addEventListener("input", renderTasks);
});
