// Your code here
const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
};
const createEmployeeRecords = (array) => {
  return array.map((item) => createEmployeeRecord(item));
};

const createTimeInEvent = (employeeRecord, dateStamp) => {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employeeRecord;
};
const createTimeOutEvent = (employeeRecord, dateStamp) => {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employeeRecord;
};
const hoursWorkedOnDate = (employeeRecord, dateStamp) => {
  const timeInEvents = employeeRecord.timeInEvents.find(
    (item) => item.date === dateStamp
  );
  const timeOutEvents = employeeRecord.timeOutEvents.find(
    (item) => item.date === dateStamp
  );
  return (timeOutEvents.hour - timeInEvents.hour) / 100;
};
const wagesEarnedOnDate = (employeeRecord, dateStamp) => {
  return (
    employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, dateStamp)
  );
};
const allWagesFor = (employeeRecord) => {
  return employeeRecord.timeInEvents.reduce(
    (total, item) => total + wagesEarnedOnDate(employeeRecord, item.date),
    0
  );
};

const calculatePayroll = (employeeRecords) => {
  return employeeRecords.reduce((total, item) => total + allWagesFor(item), 0);
};
