
var project = 'mydocteopro';
var currenturl = '';
var currenttitle = '';

init();

function init() {

    handler();
    syncpro();

}

function handler() {

    $("#add").on("click", function() {
        addpro();
    });

    $("body").on("click", "button.remove", function() {
        removepro($(this).data("index"));
    });

    $("body").on("click", "button.current", function() {
        addpro(currenttitle,currenturl);
    });

    chrome.tabs.getSelected(null,function(tab) {
        currenturl = tab.url;
        currenttitle= tab.title;
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
    $("#pros").append("<li><button class='remove link' index='" + index + "'>x</button><a href='" + pro.adress + "' target='_blank'>" + pro.name + "</a></li>");
}

function getPros() {
    var pros = JSON.parse(localStorage.getItem(project));
    if (pros == null)
        pros = new Array();
    return pros;
}

function savePros(pros) {
    localStorage.setItem(project, JSON.stringify(pros));
}

function resetForm() {
    $("input").val("");
}

function addpro(name, adress) {

    if (!name) {
        name = $("#name").val();
    }

    if (!adress) {
        adress = $("#adress").val();
    }

    if (!name || !adress) {
        return false;
    }

    // Get pros
    var pros = getPros();
    if (typeof (pros) == "undefined") {
        pros = new Array();
    }

    // Add pro
    var pro = {"name": name, "adress": adress};
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
    var pros = getPros();

    // Remove pro
    pros.splice(index);

    // Store pros
    savePros(pros);

    // Sync
    syncpro();
}