
class Employee {
    constructor(firstName, familyName, title, payPerHour) {
        this.firstName = firstName;
        this.familyName = familyName;
        this.title = title;
        this.payPerHour = payPerHour;
        this.timeInEvents = [];
        this.timeOutEvents = [];
    }
    clockIn(timestamp) {
        const [date, hour] = timestamp.split(" ");
        this.timeInEvents.push(new TimeInEvent(date, +hour));
        return this;
    }
    clockOut(timestamp) {
        const [date, hour] = timestamp.split(" ");
        this.timeOutEvents.push(new TimeOutEvent(date, +hour));
        return this;
    }
}

class TimeInEvent {
    constructor(date, hour) {
        this.type = "TimeIn";
        this.date = date;
        this.hour = +hour;
    }
}
class TimeOutEvent {
    constructor(date, hour) {
        this.type = "TimeOut";
        this.date = date;
        this.hour = +hour;
    }
}


const createEmployeeRecord = employee => new Employee(...employee)

const createEmployeeRecords = employees => {
    const records = [];
    employees.forEach(employee => records.push(new Employee(...employee)))
    return records;
}

const createTimeInEvent = (record, timestamp) => record.clockIn(timestamp);

const createTimeOutEvent = (record, timestamp) => record.clockOut(timestamp);

const hoursWorkedOnDate = ({ timeInEvents, timeOutEvents }, date) => {
    debugger;
    const i = timeInEvents.findIndex(event => event.date === date);
    const [hourIn, hourOut] = [timeInEvents[i].hour, timeOutEvents[i].hour];
    if (!hourIn || !hourOut) return console.error("date does not exist");
    return (hourOut - hourIn) / 100;
};

const wagesEarnedOnDate = ({timeInEvents, timeOutEvents, payPerHour}, date) => {
    const hours = hoursWorkedOnDate({timeInEvents, timeOutEvents}, date);
    return hours * payPerHour;
};

const allWagesFor = ({timeInEvents, timeOutEvents, payPerHour}) => {
    timeInEvents.map(event => {
        
    })
}

let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
let updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
let dateToCheck = "0044-03-05"
