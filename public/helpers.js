var g;

// createGraph(courses): adds a node for every single course to the graph
//   as well as connections between them as prereqs
function createGraph(courses) {
    var node = []
    var edge = [];
    for (var i = 0; i < courses.length - 1; i++) {
        node.push({
            id: courses[i]["id"]
            , label: courses[i]["id"]
        });
        for (var j = 0; j < courses[i]["connections"].length-1; j++) {
            edge.push({

                from: courses[i]["id"],
                to: courses[i]["connections"][j]
            });
        }
    }
    return new vis.Network(document.getElementById("courseDisplay"), { nodes: node, edges: edge }, {});
}


// stripCourses(courses): takes in a list of courses, and returns only the course name
//   and its prerequisites... useful for building graphs connecting them
function stripCourses(courses) {
    var new_courses = [];
    for (var i = 0; i < courses.length-1; i++) {
        var c = courses[i]["prerequisites"];
        // Strip out any blanks and stylize them all
        if (c == null || c == "" || c == []) {
           // c = [];
            continue;
        }
        // Remove Grad courses
        if (parseInt(courses[i]["catalog_number"]) < 500) {
             var new_course = {
            id: courses[i]["subject"] + courses[i]["catalog_number"],
            connections: stripPreReq(c)
        }
        new_courses.push(new_course);
        }
       
    }
    return new_courses;
}
        
        
function stripPreReq(prereq){
    var flattened_prereq = []
    for (var i = 0; i < prereq.length-1;i++) {
        
        if (prereq[i].constructor === Array) { 
            for (var j = 0; j < prereq[i].length-1; j++) {
                if (prereq[i][j].constructor === String) {
                    flattened_prereq.push(prereq[i][j]);
                }
            }
        }
        if (prereq[i].constructor === String){
            flattened_prereq.push(prereq[i]);
        }
    }
    return flattened_prereq;
}


// getCoursesAPI(program): calls the UW API to get JSON of all the courses in a program
// effects: ajax call
//          mutates courses[]
function getCoursesAPI(program){
    
    $.ajax({
        url: "https://api.uwaterloo.ca/v2/courses/" + program + ".json",
        data: {
            key: "a2f3cc21d28368e740c424b0a35e08db"
        },
        cache: true,
        type: "GET",
        success: function(response) {
            courses = response.data;
        },
        failure: function(xhr) {
            console.log("Error");
        }
    })
};


// addPreReqs(): calls UW API to add the prereq's to all of the classes in courses
// effects: ajax call
//          mutates courses[]
function addPreReqs() {
    
    for (var i = 0; i < courses.length-1; i++) {
        var program_name = courses[i].subject;
        var course_name = courses[i].catalog_number;
        $.ajax({
            async: false,
            url: "https://api.uwaterloo.ca/v2/courses/" + program_name + "/" + course_name + "/prerequisites.json",
            data: {
                key: "a2f3cc21d28368e740c424b0a35e08db"
            },
            cache: true,
            type: "GET",
            success: function(response) {
                courses[i].prerequisites = response["data"]["prerequisites_parsed"]
            },
            failure: function(xhr) {
                console.log("Error");
            }
        })
    }
}