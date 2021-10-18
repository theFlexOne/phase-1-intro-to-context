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
    this.timeInEvents.push(new TimeInEvent(timestamp));
    return this;
  }
  clockOut(timestamp) {
    this.timeOutEvents.push(new TimeOutEvent(timestamp));
    return this;
  }
}

class TimeInEvent {
  constructor(timestamp) {
      const [date, hour] = timestamp.split(" ");
      this.type = "TimeIn";
      this.date = date;
      this.hour = +hour;
  }
}
class TimeOutEvent {
  constructor(timestamp) {
    const [date, hour] = timestamp.split(" ");
    this.type = "TimeOut";
    this.date = date;
    this.hour = +hour;
  }
}

const createEmployeeRecord = employee => new Employee(...employee);

const createEmployeeRecords = employees => {
  const records = [];
  employees.forEach(employee => records.push(new Employee(...employee)));
  return records;
};

const createTimeInEvent = (record, timestamp) => record.clockIn(timestamp);

const createTimeOutEvent = (record, timestamp) => record.clockOut(timestamp);

const hoursWorkedOnDate = ({ timeInEvents, timeOutEvents }, date) => {
  const i = timeInEvents.findIndex(event => event.date === date);
  const [hourIn, hourOut] = [timeInEvents[i].hour, timeOutEvents[i].hour || timeOutEvents[i + 1] + 2400];
  return (hourOut - hourIn) / 100;
};

const wagesEarnedOnDate = (
  { timeInEvents, timeOutEvents, payPerHour },
  date
) => {
  const hours = hoursWorkedOnDate(
    {
      timeInEvents,
      timeOutEvents
    },
    date
  );
  return hours * payPerHour;
};

const allWagesFor = employee => {
  return employee.timeInEvents
    .map(({ date }) => {
      return wagesEarnedOnDate(employee, date);
    })
    .reduce((total, num) => total + num, 0);
};

const calculatePayroll = employees =>
  employees.reduce((total, employee) => total + allWagesFor(employee), 0);
