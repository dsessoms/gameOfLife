//define board object that will represent a generic gridded game board
var Board= function(size){
	var that= Object.create(Array.prototype);
	//build grid of 0's to specified size
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
	that.size=size;
	//grid will be the representation of the board using arrays 
	var grid = buildGrid(size);

	//function that reinitializes grid given list of coordinate ex: [[1,2],[3,4]]
	that.reinitializeGrid= function(list){
		grid=buildGrid(size);
		var change= function(coords){
			grid[coords[0]][coords[1]]=1;
		}
		list.forEach(change);
	};

	//updates the entire grid based on the updated grid passed in
	that.updateGrid= function(updatedGrid){
		//console.log(grid===updatedGrid)
		grid=updatedGrid;
		//console.log(grid===updatedGrid);
	};

	//returns the grid array
	that.getGrid=function(){
		return grid;
	};

	//clears the grid by replacing it with a grid of 0's
	that.clear=function(){
		grid=buildGrid(size);
	};
	Object.freeze(that);
	return that; 
}