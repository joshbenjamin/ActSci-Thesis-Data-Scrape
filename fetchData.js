var HttpClient = function() {
    this.get = function(surname, aCallback) {
    	var aUrl = "https://www.identitynumber.org/death-notices-results.php?surname=" + surname + "";
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );   
        //anHttpRequest.responseType = "text";         
        anHttpRequest.send( null );
    }
}

function isUserPresent(name, surname, year){
	var client = new HttpClient();
	client.get(surname, function(response) {

		var personFound = false;

		var html = $.parseHTML(response);

		var res = html[html.length-1];
		var people = res.getElementsByClassName("gradeX");

		for (var i = 0; i < people.length; i++) {
			var info = people[i].getElementsByTagName("td");

			var resFirstName = info[0].innerHTML;
			var resSurname = info[1].innerHTML;
			var resYear = info[2].innerHTML;

			if(name == resFirstName && surname == resSurname && year == resYear){
				personFound = true;
				break;
			}
		}

		if(personFound){
			console.log(name + " " + surname + " " + year + ": FOUND");
		}
		else{
			console.log(name + " " + surname + " " + year + ": NOT FOUND");
		}

		return personFound;
	});
}