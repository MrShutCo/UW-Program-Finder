

// terrible practice, but dunno how to easily get out of callback
// also note that you can just append JSON objects from file calls onto this and it
// it *should* work, but I seem to be having issues with duplicate courses somehow
var courses = [];

// Going to be used later for keeping track of user courses, cache or cookie?
var my_courses = [];

// the visual graph
var graph;


$(document).ready(function(){
    $("#course_submit").submit(function(e){
        e.preventDefault();
        getProgram(document.getElementById("programSelect").value);
        
    });
});


// getProgram(name): returns from the local JSON all courses of a certain
//    program 'name'... this will be the entry point for the rest of the code
function getProgram(name) {
   $.getJSON("data/" + name + ".json", function(json) {
     $("#allOfIt").text(JSON.stringify(stripCourses(json))); //Used for debugging the program
       courses = json;
       graph = createGraph(stripCourses(courses));
   });
}



/*   DEPRECATED

// tablestoJSON(): run this on a UWaterloo course page to get back a list of JSON objects
//   similar to what you would get from an API call. Caution: may have to modify HTML to remove
//   any other non-UW-course tables (no ids or anything, go figure)
// replace API JSON data with this array
// returns: Array
function tablesToJSON() {
    var tables = document.getElementsByTagName("table");
    var formattedClasses = [];
    for (var i = 0; i < tables.length-1; i++) {
        var table = tables[i];
        var c_info = table.rows[0].cells[0];
        
        //May fuckup
        var prereq = getPrereq(table); //Collect all cells with the word Prereq, otherwise there are none
        if (prereq === -1) {
            prereq = "Not specified";
        } else {
            prereq = getPrereq(prereq);
        }
        
        var course = {
            course_id: table.rows[0].cells[1].innerText.split(": ")[1],
            subject: c_info.innerText.split(" ")[0],
            catalog_number: c_info.innerText.split(" ")[1],
            title: table.rows[1].cells[0].innerText,
            units: c_info.innerText.split(" ")[c_info.innerText.split(" ").length - 1], // Literally cancerous
            description: table.rows[2].cells[0].innerText,
            academic_level: "undergraduate",
            prerequisites: prereq
            
        };
        formattedClasses.push(course);
        
    }
    return formattedClasses;
}


// getPrereq(text): Extracts all prereqs from a text, splitting into two catagories
//   1: all_of and 2: one_of. 1 requires all courses need to be taken for it, and
//   2 only needs one of them
// returns { all_of:Array, one_of:Array } or "None"
function getPrereq(text){
    
    // Due to the inconsistencies in naming for prereqs, may occasionally mess up
    // and have to hardcode some values
    var split_req = text.split(";")[0]; // [0] gives courses, [1] gives program type
    
    
    
}


// getPrereqText(table): Given a course table, it returns the first text that contains the word
//    'Prereq: ' followed by a bunch of different prereqs, will be parsed later. Returns -1 if failure
// returns: String or Number
function getPrereqText(table) {
    for (var i = 0; i < table.rows.length-1; i++) {
        var pos_prereq = table.rows[i].cells[0].innerText;
        if (pos_prereq.includes("Prereq: ")) {
            return pos_prereq;
        }
    }
    return -1;
}

*/