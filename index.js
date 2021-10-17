class Employee {
    constructor(firstName, familyName, title, payPerHour) {
        this.firstName = firstName,
        this.familyName = familyName,
        this.title = title,
        this.payPerHour
    }
}

const createEmployeeRecord = (employee) => {
    return new Employee(...employee);
}