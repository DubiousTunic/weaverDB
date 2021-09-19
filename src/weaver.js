//clientside JSON graph db, to be used as MODEL for SPA
//for Civil Society!!!

//it is a wrapper for a json object

//var db;

var WEAVER = {
	_db : {},
	//pointer either arr nodes or edges
	_pointer : [],
	load : function(obj){
		if(obj.hasOwnProperty("nodes") && obj.hasOwnProperty("edges")){
			//it's the dead catholics
			if(Object.prototype.toString.call(obj.nodes) === '[object Array]' && Object.prototype.toString.call(obj.edges) === '[object Array]'){
				//db = obj;
				//why doesn't this point to load fn
				this._db = obj;

				//assign incremental id to each node
				this._db.nodes.forEach(function(node, i){
					node._id = i;
				})

				//assign incremental id to each edge
				this._db.edges.forEach(function(edge, i){
					edge._id = i;
				})
				return this;	
			}
			else{
				return "Nodes or Edges not Array"
			}
		}
		else{
			return "Pass a JSON Object with nodes and edges property"
		}
	}
	,
	/*
		Updates nodes in the pointer
		params : object of params to set
	*/
	setNodes : function(params){
		console.log(params);
		var that = this;
		this._pointer.map(function(node) {
  			Object.assign(node, params);
  			that._db.nodes[node._id] = node;
		});
		return this; //eschatology
	}
	,
	setEdges : function(params){
		console.log(params);
		var that = this;
		this._pointer.map(function(edge) {
  			Object.assign(edge, params);
  			//this is the kind of thing you would yell about
  			that._db.edges[edge._id] = edge;
		});
		return this; //eschatology
	}
	,
	//what if each db item has an id
	getNodes : function(props){
		if(!props){
			this._pointer = this._db.nodes;
			return this;
		}
		this._pointer = this._db.nodes.filter(function(e) {
		  return Object.keys(props).every(function(a) {
		    return Object.values(props).includes(e[a])
		  })
		})
		return this;
	}
	,
	//does this work with async
	getEdges : function(props){
		if(!props){
			this._pointer = this._db.edges;
			return this;
		}
		this._pointer = this._db.edges.filter(function(e) {
		  return Object.keys(props).every(function(a) {
		    return Object.values(props).includes(e[a])
		  })
		})
		return this;
	}
	,
	pointer : function(){
		return this._pointer;
	}
	,
	db : function(){
		return this._db;
	}
	,
	addNode : function(node){
		db.nodes.push(node)
	}
	,
	addEdge : function(edge){
		db.edges.push(edge);
	}
	,
	deleteNode : function(){

	}
	,
	deleteEdge : function(){

	}
}

function lance(){

}