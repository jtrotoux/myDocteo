var project = 'mydocteopro';

// Static account (first step)
var pros = new Array();
pros.push(new Array('Sylvain Guillet','http://www.mydocteo.com/1'));
pros.push(new Array('Julien Trotoux','http://www.mydocteo.com/2'));


// Get From LS (next step)
//var pros = LocalStorage.get(project);

// FI, myDocteo will share these informations while connecting
//LocalStorage.save(project,pros);


// if pro connection(s), just add shortcuts to the body
if(pros.length) {
	$("<ul/>").insertAfter($("body"));
	for(var x=0;x<pros.length;x++) {
		$("ul").append("<li><a href='"+pros[x][1]+"' target='_blank'>"+pros[x][0]+"</a></li>");
	}
}
// else inform there's no account and force to connect to myDocteo Pro
else {
	$("<p>Aucun espace pro n'est configuré<br/><a href='http://www.mydocteo.com'>Connectez-vous</a></p>").insertAfter($("body"));
}

