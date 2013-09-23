//buildgrid is a function that takes in a size and builds/returns a sizeXsize grid of 0's 
var buildGrid=function(size){
	var grid = [0];
	for(var i=0; i<size;i++){
		grid[i]=[0];
		for(var j=0; j<size;j++){
			grid[i][j]=0;
		}
	}
	return grid;
};
//gameOfLife is a function that when called initializes an instance of the game of life
//function uses a Board object to represent the game of life cells
var gameOfLife=function(){
	var gameBoard=Board(20);
	var grid=gameBoard.getGrid();
	//update life updates the cell life based on the current cells on the board's grid using conway's rules
	//does not return any values, but updates the game board within the gameOfLife scope
	var updateLife=function(){
		var grid=gameBoard.getGrid();
		var size=gameBoard.size;
		//function returns the number of neighbors the given coord has
		var getNeighbors=function(xIndex,yIndex){
			var neighbors=0;
			for(var i=xIndex-1;i<=xIndex+1;i++){
				for(var j=yIndex-1;j<=yIndex+1;j++){
					if(j!=yIndex || i!=xIndex){
						if(j>-1 && j<size){
							if(i>-1 && i<size){
								neighbors+=grid[i][j];
							}
						}
					}
				}
			}
			return neighbors
		};
		//create a completely new grid 
		var newGrid=buildGrid(size);
		for(var x=0; x<size; x++){
			for(var y=0; y<size; y++){
				var neighbors=getNeighbors(x,y);
				//populate
				if(neighbors===3){
					newGrid[x][y]=1;
				}
				//stays the same
				else if(neighbors===2){
					newGrid[x][y]=grid[x][y];
				}
				//dies from being alone
				else if(neighbors<2){
					newGrid[x][y]=0;
				}
				//dies from overcrowding
				else if(neighbors>3){
					newGrid[x][y]=0;
				}
			}
		}
		//update grid by setting it equal to newGrid
		gameBoard.updateGrid(newGrid);
	};
	return{
		getBoard: function() {return gameBoard},
		//generates up to 140 living cells on the game board
		randomize: function() {
			var random20=[];
			for(var i=0;i<140;i++){
				//randomly generate x and y between 0 and 19
				var x=Math.floor((Math.random()*20));
				var y=Math.floor((Math.random()*20));
				random20[i]=[x,y];
			}
			gameBoard.reinitializeGrid(random20);
		},
		//allows for the manual editting of the game grid
		//when called, a list of ints representing the coords of the board is passed in ex: [[1,2],[3,4]]
		//these values are then used to generate the living cells on the game board
		manual: function(list){
			gameBoard.reinitializeGrid(list);
		},
		//when called it updates the board once and represents 1 step in the game of life
		step: function(){
			updateLife();
		}
	}

}

