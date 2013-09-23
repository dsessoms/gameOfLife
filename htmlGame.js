//function uses the generic gameOfLife and converts it into the html based version
var htmlGame=function(){
	var htmlGrid=$("#gameGrid")
	var game=gameOfLife();
	var board=game.getBoard();
	var grid=board.getGrid();
	var htmlTable="";
	var clickList=[];

	//fill table function takes current grid and turns it into html format
	//then sets the current html table being displayed to it
	var fillTable=function(clear){
		htmlTable="";
		for(var x=0; x<20; x++){
			if(x>0){
				htmlTable+="</tr>";
			}
			htmlTable+="<tr>"
			for(var y=0; y<20; y++){
				if(grid[x][y]===1 && !clear){
					htmlTable+="<td id="+x+y+" x="+x+" y="+y+" value=alive bgcolor=#3B6AA0></td>";
				}
				else{
					htmlTable+="<td id="+x+y+" x="+x+" y="+y+" value=dead ></td>"
				}
			}
		}
	};
	return{
		//function causes underlying gameOfLife to take a step and then updates the html based on that
		//no returns only updates variables
		step: function() {
			clickList=[];
			game.step();
			grid=board.getGrid();
			fillTable();
			htmlGrid.html(htmlTable);
		 },
		 //when the called it appends the x and y values to the list of clicked htmlGrid cells
		addClick: function(x,y){
			clickList.push([parseInt(x),parseInt(y)]);
			game.manual(clickList);
		},
		//when called it removes the x and y values from the list of clicked htmlGrid cells
		removeClick: function(x,y){
			var index=clickList.indexOf([parseInt(x),parseInt(y)]);
			clickList.splice(index, 1);
			game.manual(clickList);
		},
		//when called it generates a table full of random living cells 
		randomize: function() {
			clickList=[];
			game.randomize();
			grid=board.getGrid();
			fillTable(false);
			htmlGrid.html(htmlTable);
		},
		//clears the html table in the browser
		clearView: function() {
			fillTable(true);
			board.clear();
			htmlGrid.html(htmlTable);
		}


	}
		
}