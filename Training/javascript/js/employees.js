/**
 * Created by purushotham on 03-01-2017.
 */
var Emp=function () {
    var id,name,type,dob,dateOfJoining,experience;
    return{
        setid:set_Id,
        setname:set_Name,
        settype:set_Type,
        setdob:set_Dob,
        setdateOfJoining:set_DateOfJoining,
        setexperience:set_Expereince,
        getid:get_Id,
        getName:get_Name,
        getType:get_Type,
        getDob:get_Dob,
        getDateOfJoining:get_DateOfJoining,
        getExperience:get_Expereince
    }
    //setters
    function set_Id(i) {
       id=i;
    } function set_Type(t) {
        type=t;
    } function set_Name(n) {
        name=n;
    } function set_Dob(d) {
        dob=d;
    } function set_DateOfJoining(doj) {
        dateOfJoining=doj;
    } function set_Expereince(e) {
        experience=e;
    }
    //getters
    function get_Id() {
        return id;
    } function get_Name() {
        return name;
    } function get_Type() {
        return type;
    } function get_Dob() {
       return dob;
    } function get_DateOfJoining() {
        return dateOfJoining;
    } function get_Expereince() {
        return experience;
    }
}
//call back function to get json response
function getEmployees(callback) {
    var request;
    if(window.XMLHttpRequest){
        request=new XMLHttpRequest();
    }else{
        request=new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open('GET','employee.json');
    request.onreadystatechange=function() {
        if ((request.readyState == 4) && (request.status == 200)) {
            callback(request.responseText);
        }
    }
    request.send(null);
}
//parsing json and pushing it to another list
function Employees() {
    getEmployees(function (response) {
        window.employees = [];
        var itms = JSON.parse(response);
        for (var i = 0; i < itms.length; i++) {
            var e = new Emp();
            e.setid(itms[i]["id"]);
            e.setname(itms[i]["name"]);
            e.settype(itms[i]["type"]);
            e.setdob(itms[i]["dob"]);
            e.setdateOfJoining(itms[i]["dateOfJoining"]);
            e.setexperience(itms[i]["experience"]);
            /*for (var key in itms[i]) {
             if (col.indexOf(key) === -1) {
             col.push(key);
             }
             }*/
            employees.push(e);
        }
        createTable();
    });

}
//creating table for json data
function createTable() {
    var table = document.createElement("table");
    var tr = table.insertRow(-1);
    //for(key in employees[i]){
    var th=tr.insertCell(-1);
    th.innerHTML="ID";
    th=tr.insertCell(-1);
    th.innerHTML="NAME";
    th=tr.insertCell(-1);
    th.innerHTML="TYPE";
    th=tr.insertCell(-1);
    th.innerHTML="DOB";
    th=tr.insertCell(-1);
    th.innerHTML="DATE OF JOINING";
    th=tr.insertCell(-1);
    th.innerHTML="EXPERIENCE";


    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i =0; i < employees.length; i++) {
        tr = table.insertRow(-1);
        //  tr.setAttribute("id","id" + i );
        //for (var j = 0; j < employees.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = employees[i].getid();
        tabCell = tr.insertCell(-1);
        tabCell.innerHTML += employees[i].getName();
        tabCell = tr.insertCell(-1);
        tabCell.innerHTML += employees[i].getType();
        tabCell = tr.insertCell(-1);
        tabCell.innerHTML += employees[i].getDob();
        tabCell = tr.insertCell(-1);
        tabCell.innerHTML += employees[i].getExperience();
        tabCell = tr.insertCell(-1);
        tabCell.innerHTML += employees[i].getDateOfJoining();
        tr.setAttribute("onclick","get_EMp_Data(" + employees[i].getid() + ")")
    }
    var divContainer = document.getElementById("json_table");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    //console.log(divContainer);
}
//get  Emp Data on click
function get_EMp_Data(empId) {
    var EmpDetails = getSelectedEmp(empId);
    var p = document.createElement("p");

    for (var i = 0; i < 4; i++) {
        p.innerHTML = "ID"+":"+" "+ EmpDetails.getid()+"<br>";
        p.innerHTML+="NAME"+":"+" "+ EmpDetails.getName()+"<br>";
        p.innerHTML+="DOB"+":"+" "+ EmpDetails.getDob()+"<br>";
        p.innerHTML+="DOJ"+":"+" "+ EmpDetails.getDateOfJoining();
    }
    var divContainer = document.getElementById("selected_table");
    divContainer.innerHTML = "";
    divContainer.appendChild(p);
}
//get selected employee
function getSelectedEmp(eid){

    for(var e in employees) {
        if (employees[e].getid() == eid) {
            console.log(employees[e]);
            return employees[e];
        }
    }
}

