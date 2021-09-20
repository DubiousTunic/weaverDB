//clientside JSON graph db, to be used as MODEL for SPA
//for Civil Society!!!

//TODO: index properties for searching

//it is a wrapper for a json object

//var db;

var REAVER = {
	_db : {},
	cluster : {},
	//cursor either arr nodes or edges
	_cursor : [],
	load : function(obj){
		if(obj.hasOwnProperty("nodes") && obj.hasOwnProperty("edges")){
			//it's the dead catholics
			if(Object.prototype.toString.call(obj.nodes) === '[object Array]' && Object.prototype.toString.call(obj.edges) === '[object Array]'){
				//db = obj;
				//why doesn't this point to load fn
				this._db = obj;

				//assign incremental id to each node
				this._db.nodes.forEach(function(node, i){
					if(node)
						node._id = i;
					else
						console.log("ERROR NODE UNDEFINED")
				})

				//assign incremental id to each edge
				this._db.edges.forEach(function(edge, i){
					if(edge)
						edge._id = i;
					else
						console.log("ERROR EDGE UNDEFINED")
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
	
	/*
		Updates nodes in the cursor
		params : object of params to set
	*/
	//LOTUS saves arbitrary data
/*	setCluster : function(obj){
		if(obj)
			Object.assign(this.cluster, obj);
	}
	,
	getCluster : function(params){
		if(params)
			return Object.keys(params).every(function(a) {
		    	return Object.values(params).includes(this.cluster[a])
			})
		else
			return this.cluster;
	}*/
	,
	setNodesGroup : function(group){
		this._cursor.map(function(node){
			node.Group = group;
			that._db.nodes[node._id] = node;
		})
	}
	,
	setEdgesGroup : function(group){
		this._cursor.map(function(edge){
			edge.Group = group;
			that._db.edges[edge._id] = edge;
		})
	}
	,
	setNodes : function(params){
		if(!params)
			return this;
		console.log(params);
		var that = this;
		this._cursor.map(function(node) {
  			Object.assign(node, params);
  			that._db.nodes[node._id] = node;
		});
		return this; //eschatology^2
	}
	,
	setEdges : function(params){
		if(!params)
			return this;
		console.log(params);
		var that = this;
		this._cursor.map(function(edge) {
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
			this._cursor = this._db.nodes;
			return this;
		}
		this._cursor = this._db.nodes.filter(function(e) {
		  return Object.keys(props).every(function(a) {
		    return Object.values(props).includes(e[a])
		  })
		})
		return this;
	}
	,
	getEdges : function(props){
		if(!props){
			this._cursor = this._db.edges;
			return this;
		}
		this._cursor = this._db.edges.filter(function(e) {
		  return Object.keys(props).every(function(a) {
		    return Object.values(props).includes(e[a])
		  })
		})
		return this;
	}
	,
	first : function(){
		return this._cursor[0]
	}
	,
	last : function(){
		if(this._cursor && this._cursor.length > 0)
			return this._cursor[this._cursor.length - 1]
	}	
	,
	//TODO: error handling
	skip : function(index){
		if(index)
			this._cursor = this._cursor.slice(index - 1, this._cursor.length)
		return this;
	}
	,	
	//see how they help me
	limit : function(index){
		if(index)
			this._cursor = this._cursor.slice(0, index);
			console.log(this._db);
			console.log(this._cursor);
		return this;
	}
	,
	sort: function(){

	}
	,
	toArray : function(){
		return this._cursor;
	}
	,
	db : function(){
		return this._db;
	},
	_set_nodes_cursor : function(){
		this._cursor = this._db.nodes;
	}
	,
	_set_edges_cursor : function(){
		this._cursor = this._db.edges;
	}
	,	
	getNodeID : function(node){
		return node._id;
	}
	,
	getEdgeID : function(edge){
		return edge._id;
	}
	,
	addNode : function(node){
		if(!node)
			return this;
		this._set_nodes_cursor(); //sets cursor to db
		if(!this.last())
			node._id = 0;
		else
			node._id = this.last()._id + 1;
		this._db.nodes.push(node)
		this._cursor = [node];
		return this._cursor[0];
	}
	,
	addEdge : function(edge){
		if(!edge)
			return this;
		this._db.edges.push(edge);
		this._cursor = [edge];
		return this._cursor[0];
	}
	,
	deleteNode : function(props){
		if(!props){
			this._cursor = this._db.nodes;
			return this;
		}

		if(this._db.nodes.length <= 1){
			this._db.nodes.splice(0, 1);
			this._cursor = this._db.nodes;
		}
		else{
			var that = this;
			this._cursor = this._db.nodes.filter(function(e) {
			  return Object.keys(props).every(function(a) {
			  	that._db.nodes.splice(e._id, 1);
			    return !Object.values(props).includes(e[a])		    
			  })
			})	
		}		
		return this;
	}
	,
	deleteEdge : function(edge){
		if(!props){
			this._cursor = this._db.edges;
			return this;
		}
		var that = this;
		this._cursor = this._db.edges.filter(function(e) {
		  return Object.keys(props).every(function(a) {
		  	that._db.edges.splice(e._id, 1);
		    return !Object.values(props).includes(e[a])		    
		  })
		})
		return this;
	}
	//TODO: basic query language
}