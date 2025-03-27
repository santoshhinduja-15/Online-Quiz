$(document).ready(function () {
    let expenses = [];

    // Add Expense
    $("#add-expense").click(function () {
        let name = $("#expense-name").val();
        let amount = $("#expense-amount").val();
        let category = $("#expense-category").val();

        if (name === "" || amount === "") {
            alert("Please enter all details!");
            return;
        }

        let expense = {
            id: new Date().getTime(),
            name: name,
            amount: parseFloat(amount),
            category: category
        };

        expenses.push(expense);
        updateExpenseList();
        updateTotal();
        clearInputs();
    });

    // Update Expense List
    function updateExpenseList() {
        let expenseList = $("#expense-list");
        expenseList.empty();

        expenses.forEach((expense) => {
            let row = `<tr>
                <td>${expense.name}</td>
                <td>${expense.amount} ₹</td>
                <td>${expense.category}</td>
                <td><button class="btn btn-danger btn-sm delete-btn" data-id="${expense.id}">Delete</button></td>
            </tr>`;
            expenseList.append(row);
        });
    }

    // Update Total Expense
    function updateTotal() {
        let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        $("#total-expense").text(total);
    }

    // Delete Expense
    $(document).on("click", ".delete-btn", function () {
        let id = $(this).data("id");
        expenses = expenses.filter(expense => expense.id !== id);
        updateExpenseList();
        updateTotal();
    });

    // Clear Input Fields
    function clearInputs() {
        $("#expense-name").val("");
        $("#expense-amount").val("");
    }
});
