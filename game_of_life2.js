//attempt 2

//builds grid of 0's of specified size
var buildGrid=function(size){
	var grid = [0];
	for(var i=0; i<size;i++){
		grid[i]=[0];
		for(var j=0; j<size;j++){
			grid[i][j]=0;
		}
	}
	return grid;

}

//takes in list of x's and y's that will initialize grid for ease of testing
var initializeGrid=function(list,gridToChange){
	var change= function(coords){
		gridToChange[coords[0]][coords[1]]=1;
	}
	list.forEach(change);
}

//runs through a grid and updates the life on that grid based on Conways rules
var updateLife=function(grid){
	var size=grid.length
	//function returns the number of neighbors the given coord has
	var getNeighbors=function(xIndex,yIndex){
		var neighbors=0;
		for(var i=xIndex-1;i<=xIndex+1;i++){
			for(var j=yIndex-1;j<=yIndex+1;j++){
				if(j!=yIndex || i!=xIndex){
					if(j>0 && j<size){
						if(i>0 && i<size){
							neighbors+=grid[i][j];
						}
					}
				}
			}
		}
		return neighbors
	}
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
	return newGrid;

}

//creates a game 
var gameOfLife=function(){
	var grid=buildGrid(20);
	//generate 20 random spots to start cells
	var random20=[];
	for(var i=0;i<140;i++){
		//randomly generate x and y between 0 and 19
		var x=Math.floor((Math.random()*20));
		var y=Math.floor((Math.random()*20));
		random20[i]=[x,y];
	}
	initializeGrid(random20,grid);
	return{
		getGrid: function() {return grid},
		step: function(){
			grid=updateLife(grid);
		}
	}

}

//create a visual version of the game based on graphics given
var visualGame=function(){
	//define colors
	var black = Color(0,0,0);
	var red = Color(255,0,0);
	var green = Color(0,255,0);
	var blue = Color(0,0,255);
	//define pad
	pad = Pad(document.getElementById('canvas'));
	pad.clear();
	//make pad easily usable
	var x_factor = 5*pad.get_width() / 100;
	var y_factor = 5*pad.get_height() / 100;
	var width=pad.get_width()/100;
	var height=pad.get_height()/100;
	//draw border
	pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 8, black);
	//initialize game
	var game=gameOfLife();
	var grid=game.getGrid();
	var draw= function(){
		pad.clear();
		pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 8, black);
		grid=game.getGrid();
		for(var i=0;i<20;i++){
			for(var j=0;j<20;j++){
				if(grid[i][j]===1){
					pad.draw_rectangle(Coord(i*x_factor,j*y_factor),x_factor,y_factor,0,black,black);
				}
			}
		}
		game.step();
	}
	// for(var t=0; t<3;t++){
	// pad.clear();
	// grid=game.getGrid();
	// draw(grid);
	// setTimeout(game.step,1000);
	// }
	setInterval(draw,500);
}
//run a visual game to be displayed on the canvas



//testing
var tests=function(){
	//test buildGrid function for size and all zeros
	var testGrid1=buildGrid(5);
	if(testGrid1.length===5){
		var values=0;
		for(var i=0; i<5;i++){
			for(var j=0;j<5;j++){
				values+=testGrid1[i][j]
			}
		}
		if(values===0){
			console.log("testGrid1 = Pass");
		}
	}

	var testGrid2=buildGrid(10);
	if(testGrid2.length===10){
		var values=0;
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				values+=testGrid2[i][j]
			}
		}
		if(values===0){
			console.log("testGrid2 = Pass")
		}
	}

	//test initialize grid to ensure it initializes all the correct locations inputed 
	//reuse test grids 
	initializeGrid([[1,1],[1,2],[1,3],[2,3],[3,4]],testGrid1);
	if(testGrid1[1][1]){
		if(testGrid1[1][2]){
			if(testGrid1[1][3]){
				if(testGrid1[2][3]){
					if(testGrid1[3][4]){
						console.log("testGrid1 initialization= Pass");
					}
				}
			}
		}
	}

	initializeGrid([[3,4],[5,6],[9,1],[9,9],[0,0]],testGrid2)
	if(testGrid2[3][4]){
		if(testGrid2[5][6]){
			if(testGrid2[9][1]){
				if(testGrid2[9][9]){
					if(testGrid2[0][0]){
						console.log("testGrid2 initialization= Pass");
					}
				}
			}
		}
	}

	//test updateLife(grid) to ensure that it follows the rules of conways game each time it is called
	//stable should maintain number of cells at each step
	var squareStableGrid=buildGrid(10);
	initializeGrid([[1,1],[1,2],[2,1],[2,2]],squareStableGrid);
	squareStableGrid=updateLife(squareStableGrid);
	var values=0;
	for(var i=0; i<10;i++){
		for(var j=0;j<10;j++){
			values+=squareStableGrid[i][j];
		}
	}
	if(values===4){
		console.log("squareStableGrid test= Pass");
	}
	//all of the cells have less than 2 neighbors so they should all die
	var everythingDiesGrid=buildGrid(10);
	initializeGrid([[1,1],[5,5],[8,8],[9,1]],everythingDiesGrid);
	everythingDiesGrid=updateLife(everythingDiesGrid);
	var values=0;
	for(var i=0; i<10;i++){
		for(var j=0;j<10;j++){
			values+=everythingDiesGrid[i][j];
		}
	}
	if(values===0){
		console.log("everythingDiesGrid test= Pass");
	}
	//there are 3 stable cells that surround an empty cell so it should come to life 
	var birthGrid=buildGrid(10);
	initializeGrid([[1,1],[1,2],[2,1]],birthGrid)
	birthGrid=updateLife(birthGrid);
	var values=0;
	for(var i=0; i<10;i++){
		for(var j=0;j<10;j++){
			values+=birthGrid[i][j];
		}
	}
	if(values===4){
		console.log("birthGrid test= Pass");
	}

}

//to run tests uncomment following function call
//tests();
visualGame();
