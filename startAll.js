//function that starts all the javascript for the webapge
var startAll=function(){
	var htmlTableGame=htmlGame();
	htmlTableGame.step();

	//function reinitializes the listeners for the table data
	var gameGridListener= function(){
		//inialializes the click listeners for the table data
		//if table cell is clicked it changes color to blue and add the coords to the click list, if its already 
		//active it  changes it to white and removes it from the click list
		$("#gameGrid td").click(function(){
			var x= $(this).attr("x");
			var y= $(this).attr("y");
			if(!$(this).hasClass("clicked")){
				$(this).addClass("clicked");
				$(this).attr("bgcolor", "#3B6AA0");
				htmlTableGame.addClick(x,y);
			}
			else{
				$(this).removeClass("clicked");
				$(this).attr("bgcolor", "FFFFFF");
				htmlTableGame.removeClick(x,y);
			}
			
		});
	};

	gameGridListener();

	//add event so board runs after clicking start
	$("#start").click(function(){
		if (!$(this).hasClass("clicked")){
			keepRunning= setInterval(htmlTableGame.step,500);
			$(this).addClass("clicked");
			if($("#stop").hasClass("clicked")){
				$("#stop").removeClass("clicked");
			}
		}

	})

	//add event so board stops after clicking stop button
	$("#stop").click(function(){
		if($("#start").hasClass("clicked")){
			clearInterval(keepRunning);
			$("#start").removeClass("clicked");
			$("#stop").addClass("clicked");
		}
	})

	

	//add event listener for the randomize button
	$("#random").click(function(){
		htmlTableGame.randomize();
	})

	//add event listener for clear button
	$("#clear").click(function(){
		if(!$("#start").hasClass("clicked")){
			htmlTableGame.clearView();
			gameGridListener();
		}
	})
}

startAll();