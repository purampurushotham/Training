/**
 * Created by purushotham on 03-01-2017.
 */
var emp=function () {
    var id,name,type,dob,dateOfJoining,experience;
    return{
        setId:set_Id,
        setName:set_Name,
        setType:set_Type,
        setDob:set_Dob,
        setDateOfJoining:set_DateOfJoining,
        setExperience:set_Expereince,
        getId:get_Id,
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
//parsing json and pushing it to another list
function employees() {
    console.log("in employees");
    jQuery.ajax({
        url: "employees.json",
        dataType: 'json',
        success: function (data) {
            getEmployees(data);
        },
        error: function () {
            alert("error");
        }
    });
}
function getEmployees(itms){
    window.employees = [];
    jQuery.each(itms,function (key) {
        var e = new emp();
        e.setId(itms[key]["id"]);
        e.setName(itms[key]["name"]);
        e.setType(itms[key]["type"]);
        e.setDob(itms[key]["dob"]);
        e.setDateOfJoining(itms[key]["dateOfJoining"]);
        e.setExperience(itms[key]["experience"]);
        employees.push(e);

    });
    console.log(employees);
    createTable();

}

//creating table for json data
function createTable() {
    var jQueryt=jQuery('<tr>').append(
        jQuery('<th>').text("ID"),
        jQuery('<th>').text("NAME"),
        jQuery('<th>').text("TYPE"),
        jQuery('<th>').text("DOB"),
        jQuery('<th>').text("DATE OF JOINING"),
        jQuery('<th>').text("EXPERIENCE")
    ).appendTo('#json_table');
    jQuery.each(employees, function(i, item) {
        jQuerytr="";
        jQuerytr = jQuery('<tr>').attr('tid',item.getid()).on("click",function () {
            get_EMp_Data(item.getid());
        }).append(
            jQuery('<td>').text(item.getId()),
            jQuery('<td>').text(item.getName()),
            jQuery('<td>').text(item.getType()),
            jQuery('<td>').text(item.getDob()),
            jQuery('<td>').text(item.getDateOfJoining()),
            jQuery('<td>').text(item.getExperience())

        ).appendTo('#json_table');
    });

}
//get  Emp Data on click
function getEmpData(empId) {
    jQuery('#selected_table').empty();
    var EmpDetails = getSelectedEmp(empId);
    jQuery("<p/>").html("<strong> Name : </strong>"+EmpDetails.getid()).appendTo("#selected_table");
    jQuery("<p/>").html("<strong> Phone : </strong>"+EmpDetails.getName()).appendTo("#selected_table");
    jQuery("<p/>").html("<strong> DOB : </strong>"+EmpDetails.getDob()).appendTo("#selected_table");
    jQuery("<p/>").html("<strong> City : </strong>"+EmpDetails.getDateOfJoining()).appendTo("#selected_table");

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

