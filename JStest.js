/*
1. Count Employees Number by Factory // => [ {name: 'BR1', count: 4}, ... ]
2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]
3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }

4. Count total hours worked in 1 day ? // => 39
5. Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int
6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.
*/

function start(){
    const factories = [
        { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
        { name: "BR2", employees: ["Jessie", "Karen", "John"] },
        { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
        { name: "BR4", employees: [] }
    ];
    countEmployeeEachFactory(factories);
    countEmployeeWorkPlace(factories);
    sortEmployeesName(factories);
    const employeeType = [
        {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
        {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
        {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
    ];
  
    const employees = [
          {id: 1, name: "Alice", type: 2},
          {id: 2, name: "Bob", type: 3},
          {id: 3, name: "John", type: 2},
          {id: 4, name: "Karen", type: 1},
          {id: 5, name: "Miles", type: 3},
          {id: 6, name: "Henry", type: 1}
    ];
  
    const tasks = [
        {id: 1, title: "task01", duration: 60 },//min
        {id: 2, title: "task02", duration: 120},
        {id: 3, title: "task03", duration: 180},
        {id: 4, title: "task04", duration: 360},
        {id: 5, title: "task05", duration: 30},
        {id: 6, title: "task06", duration: 220},
        {id: 7, title: "task07", duration: 640},
        {id: 8, title: "task08", duration: 250},
        {id: 9, title: "task09", duration: 119},
        {id: 10, title: "task10", duration: 560},
        {id: 11, title: "task11", duration: 340},
        {id: 12, title: "task12", duration: 45},
        {id: 13, title: "task13", duration: 86},
        {id: 14, title: "task14", duration: 480},
        {id: 15, title: "task15", duration: 900}
    ];
    var workTimeADay = countWorkHoursADay(employees, employeeType);
    howManyEmployeeByTime(12);
    costDays(tasks, workTimeADay);
}

//calculate each factory has how many employees
function countEmployeeEachFactory(factory){
    var countEmployees = [];
    for(var obj of factory){
        countEmployees.push({"name":obj.name,"count":obj.employees.length});
    }
    console.log("1.", countEmployees);
    return countEmployees;
}

//count how many times each employee shows up  
function countWorkPlaceEachEmployee(nameArray, numOfWorkPlace){
    for(var name of nameArray){
        if(Object.keys(numOfWorkPlace).includes(name)){
            numOfWorkPlace[name]++;
        }
        else{
            numOfWorkPlace[name] = 1;
        }
    }
    return numOfWorkPlace;
}

//calculate each employee work in how many factories
function countEmployeeWorkPlace(factory){
    var names = [];
    var numOfWorkPlace = {};
    for(var obj of factory){
        names = obj.employees;
        numOfWorkPlace = countWorkPlaceEachEmployee(names, numOfWorkPlace);
    }
    var countWorkPlace = [];
    for(var employee in numOfWorkPlace){
        countWorkPlace.push({"employee":employee, "count":numOfWorkPlace[employee]});
    }
    console.log("2.", countWorkPlace);
    return countWorkPlace;
}

//Order employees list by alphabetical order
function sortEmployeesName(factory){
    var sorted = [];
    for(var obj of factory){  
        sorted.push({"name": obj.name, "employees": obj.employees.sort()});
    }
    console.log("3. ", sorted);
    return sorted;
}

//calculate working hours of each type 
function calculateWorkTime(workEnd, workStart){
    if(workEnd[0] == 0) workEnd[0] = 24;
    if(workStart[0] == 0) workStart[0] = 24;
    return workEnd[0] - workStart[0];
}

//Count total hours worked in one day
function countWorkHoursADay(employees, employeeType){
    var workerTypes = [0,0,0];
    for(worker of employees){
        workerTypes[worker.type-1]++;
    }
    var workingHours = 0;
    for(workType of employeeType){
        var workEnd = workType.work_end.split(":");
        var workStart = workType.work_begin.split(":");
        workingHours += calculateWorkTime(workEnd,workStart)*workerTypes[workType.id-1];
    }
    console.log("4. ", workingHours);
    return workingHours;
}

const employeeType = [
    {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
    {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
    {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

function getEmployees(){
    const employees = [
        {id: 1, name: "Alice", type: 2},
        {id: 2, name: "Bob", type: 3},
        {id: 3, name: "John", type: 2},
        {id: 4, name: "Karen", type: 1},
        {id: 5, name: "Miles", type: 3},
        {id: 6, name: "Henry", type: 1}
  ];
    return employees;
}

//find how many workers in the type 
function howManyEmployeeInTheType(type){
    var employees = getEmployees();
    var num = 0;
    for(var worker of employees){
        if(type.indexOf(worker.type) > -1) num++;
    }
    console.log("5. ", num);
    return num;
}


//calculate how many workers work at the time, parameters=24-hour => int
function howManyEmployeeByTime(time){
    if(time<0 || time > 24) {
        console.log("invaild");
        return 0;
    }
    if(time < 9 || time > 24) return 0;
    if(time >= 9 && time < 12){ // type: 1
        return howManyEmployeeInTheType(1);
    }
    else if(time >= 12 && time < 17){// type: 1 & 2
        return howManyEmployeeInTheType([1,2]);
    }
    else if(time >= 17 && time < 20){// type: 2
        return howManyEmployeeInTheType(2);
    }
    else if(time >= 20 && time < 24){// type: 2 & 3
        return howManyEmployeeInTheType([2,3]);
    }
}

//calculate how many days does it take to complete all tasks 
function costDays(tasks, workTimeADay){
    var totalMinutes = 0; 
    for(t of tasks){
        totalMinutes += t.duration;
    }
    var costDay = totalMinutes/60/workTimeADay;
    if((totalMinutes/60)%workTimeADay != 0) costDay++;
    console.log("6. ", parseInt(costDay));
    return parseInt(costDay);
}
window.addEventListener("load", start, false);