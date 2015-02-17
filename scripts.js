
var project = 'mydocteopro';

init();

function init() {
    
    handler();
    syncpro();
    
}

function handler() {

    $("#add").on("click", function() {
        addpro();
    });



}

function syncpro() {
    var pros = getPros();
    $("#pros").empty();
    if (pros.length > 0) {
        $("#nopro").hide();
        for (var x = 0; x < pros.length; x++) {
            displayPro(x, pros[x]);
        }
    }
    else {
        $("#nopro").show();
    }
}

function displayPro(index, pro) {
    $("#pros").append("<li><a href='" + pro.adress + "' target='_blank'>" + pro.name + "</a><button class='remove' onclick='removepro(" + index + ");'>Supprimer</button></li>");
}

function getPros() {
    return JSON.parse(localStorage[project]);
}

function savePros(pros) {
    localStorage[project] = JSON.stringify(pros);
}

function resetForm() {
    $("input").val("");
}

function addpro() {

    var name = $("#name").val();
    var adresse = $("#adress").val();

    if (!name || !adress) {
        return false;
    }

    // Get pros
    var pros = getPros();
    if (typeof (pros) == "undefined") {
        pros = new Array();
    }

    // Add pro
    var pro = {"name": name, "adress": adresse};
    pros.push(pro);

    // Store pros
    savePros(pros);

    // Reset form
    resetForm();

    // Sync
    syncpro();

}

function removepro(index) {
    // Get Pros
    var pros = JSON.parse(localStorage[project]);

    // Remove pro
    pros.splice(index);

    // Store pros
    localStorage[project] = JSON.stringify(pros);

    // Sync
    syncpro();
}