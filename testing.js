
//testing
var testSuite=function(){
	//tests to make sure a grid is full of zeros
	var blankGridTest=function(grid){
		var values=0;
		for(var i=0; i<grid.size;i++){
			for(var j=0;j<grid.size;j++){
				values+=grid[i][j]
			}
		}
		if(values!=0){
			console.log("Blank Grid test =fail");
		}
		else{
			console.log("Blank Grid test = pass");
		}
	};
	//test buildGrid function for size and all zeros
	var buildGridTest= function(size){
		var testGrid=buildGrid(size);
		if(testGrid.length===size){
			console.log("testGrid of size "+size+" = Pass size test");
			blankGridTest(testGrid);
		}
		else{console.log("testGrid of size "+size+" = fail")}
	};
	var gridTest5=buildGridTest(5);
	var gridTest10=buildGridTest(10);
	var gridTest17=buildGridTest(17);

	var gameOfLifeFunctionTest=function(){
		var game=gameOfLife();
		var board=game.getBoard();
		if(typeof(board)===Object){
			console.log("boardTest object= fail");
		}
		beforeGrid=board.getGrid()
		game.randomize();
		afterGrid=board.getGrid()
		//if the board is the same randomize didnt randomize the board
		if(beforeGrid===afterGrid){
			console.log("BoardTest randomize= fail");
		}
		else{
			console.log("Board Test randomize= pass")
			beforeGrid=board.getGrid();
			game.manual([[1,2],[3,4]]);
			afterGrid=board.getGrid();
			if(beforeGrid===afterGrid){
				console.log("Manual grid set= fail");
			}
			else{
				if(afterGrid[1][2]!=1 || afterGrid[3][4]!=1){
					console.log("Manual grid set = pass");
				}
				else{
				console.log("Manual grid set= pass");}
			}
		}
		//test Update function
		//cell configuration makes a birth occur and increases number of cells on grid by 1
		game.manual([[1,1],[1,2],[2,1]]);
		game.step();
		birthGrid=board.getGrid();
		var values=0;
		for(var i=0; i<board.size;i++){
			for(var j=0;j<board.size;j++){
				values+=birthGrid[i][j];
			}
		}
		if(values===4){
			console.log("birthGrid test= Pass");
		}
			
	}
	gameOfLifeFunctionTest();

	var BoardTest=function(size){
		var testBoard=Board(size);
		var grid=testBoard.getGrid();
		if(testBoard.size!=size){
			console.log("board size = fail");
		}
		if(grid.size!=size){
			console.log("board of size " + size+ " = fail")
		}
		testBoard.reinitializeGrid([[1,2],[3,4]]);
		var grid=testBoard.getGrid();
		if(grid[1][2]!=1 || grid[3][4]!=1){
			console.log("reinitialize = fail")
		}
		grid=testBoard.getGrid();
		blankGridTest(grid);
	}
	BoardTest(10);
};

//uncomment following line to run test suite
//testSuite();

/*the htmlGame was tested using visuals because that is mainly what it consisted of. 
the cells were click on and off to ensure that the relevant lists were updated correctly and the correct 
initial conditions were chosen. 
The buttons were tested extesnively to ensure that start just started (it initially increased the speed of th game every time you clicked it)
and made sure that when you clicked stop it would always stop that instance of the game. The randomize button works no matter if the game is stopped
or running. The clear button was limited to just being used after the game had been paused for simplicity. 
The clear function was tested multiple times to ensure that the previous grid did not "bleed through" and effect the new game. 
*/

