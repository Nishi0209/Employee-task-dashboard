export function getTaskStatus(dueDate) {
    if (!dueDate) {
        return {
            status: "",
            statusClass: "",
        };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const difference = Math.ceil(
        (due - today) / (1000 * 60 * 60 * 24)
    );

    if (difference < 0) {
        return {
            status: `Overdue by ${Math.abs(difference)} day${Math.abs(difference) > 1 ? "s" : ""
                }`,
            statusClass: "overdue",
        };
    }

    if (difference === 0) {
        return {
            status: "Due Today",
            statusClass: "due-today",
        };
    }

    return {
        status: `${difference} day${difference > 1 ? "s" : ""
            } left`,
        statusClass: "upcoming",
    };
}