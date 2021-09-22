//clientside JSON graph db, to be used as MODEL for SPA
//for Civil Society!!!

//TODO: index properties for searching

//it is a wrapper for a json object

//var db;

var WEAVER = {
	_db : {
		"nodes" : [],
		"links" : []
	},
	//save arbitrary data in the cluster (BUDDHA)
	cluster : {},
	//cursor either arr nodes or links
	_cursor : [],
	load : function(obj){
		if(obj.hasOwnProperty("nodes") && obj.hasOwnProperty("links")){
			//it's the dead catholics
			if(Object.prototype.toString.call(obj.nodes) === '[object Array]' && Object.prototype.toString.call(obj.links) === '[object Array]'){
				//db = obj;
				//why doesn't this point to load fn
				this._db = obj;

				//assign incremental id to each node
				this._db.nodes.forEach(function(node, i){
					if(node)
						node.id = i;
					else
						console.log("ERROR NODE UNDEFINED")
				})

				//assign incremental id to each link
				this._db.links.forEach(function(link, i){
					if(link)
						link.id = i;
					else
						console.log("ERROR EDGE UNDEFINED")
				})
				return this;	
			}
			else{
				return "Nodes or Links not Array"
			}
		}
		else{
			return "Pass a JSON Object with nodes and links property"
		}
	},
	init : function(){
		return this;
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
			that._db.nodes[node.id] = node;
		})
	}
	,
	setLinksGroup : function(group){
		this._cursor.map(function(link){
			link.Group = group;
			that._db.links[link.id] = link;
		})
	}
	,
	//ONLY PROBLEM WITH MY METHOD IS YOU GET DELETED EMPTY NODES {}
	setNodes : function(params){
		if(!params)
			return this;

		var that = this;
		//this is probably where id is getting changed
		console.log(this._cursor)

		//at this point the cursor seems to have multiple nodes after i getnodebyid 
		this._cursor.map(function(node) {
			console.log(node)
  			Object.assign(node, params);
  			//_SPERM.WHALE
  			that._db.nodes[node.id] = node;
		});
		console.log(this._cursor);
		return this; //eschatology^((8))
	}
	,
	//THIS MIGHT NOT WORK
	setNodesPush : function(params){
		if(!params){
			return this;
		}

		var that = this;

		//thanks obama YOU HAVE TO CAPITALIZE OBAMA
		this._cursor.map(function(node){
			if(node[Object.keys(params)[0]]){
				node[Object.keys(params)[0]].push(params[Object.keys(params)[0]]);
			}
			else{
				node[Object.keys(params)[0]] = [params[Object.keys(params)[0]]];
			}
			that._db.nodes[node.id] = node;
		})

		return this;
	}
	,
	//this was not the most eloquent solution!
	setNodesPull : function(params){
		if(!params){
			return this;
		}

		var that = this;

		this._cursor.map(function(node){
			var index = node[Object.keys(params)[0]].indexOf(params[0]);
			node[Object.keys(params)[0]].splice(index, 1);
			that._db.nodes[node.id] = node;
		})

		return this;
	}
	,
	setLinks : function(params){
		if(!params)
			return this;

		var that = this;
		this._cursor.map(function(link) {
  			Object.assign(link, params);
  			that._db.links[link.id] = link;
		});
		return this; //eschatology^2
	}
	,
	//eschatology 2nd edition
	getNodeByID : function(id){
		console.log(id);
		this._cursor = [this.getNodes().sort({id : -1}).toArray()[id]]
		console.log(this._cursor);
		return this;
	}
	,
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
	getLinks : function(props){
		if(!props){
			this._cursor = this._db.links;
			return this;
		}
		this._cursor = this._db.links.filter(function(e) {
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
		return this;
	},
	//{property : -1 or 1}
	sort : function(params){
		//problem when called on empty db
		//shorthand, probably temporary...
		if(params.time){
			this._cursor.sort(function (a, b) {	
			//sketchy MAYBE delete soon
			if(b.time && a.time)
				if(params.time === -1)	
    				return b.time.toString().localeCompare(a.time.toString());
    			else if(params.time === 1)
    				return a.time.toString().localeCompare(b.time.toString());    	
			});
		}
		else if(params.id){
			this._cursor.sort(function(a, b) {
				if(params.id === -1) 
  					return a.id - b.id;
				else if(params.id === 1)
					return b.id - a.id;
			});
		}
	
		return this;
	}
	,
	toArray : function(){
		return this._cursor;
	}
	,
	db : function(){
		//this._cursor = this._db.nodes;
		return this._db;
	},
	_set_nodes_cursor : function(){
		this._cursor = this._db.nodes;
	}
	,
	_set_links_cursor : function(){
		this._cursor = this._db.links;
	}
	,	
	getNodeID : function(node){
		return node.id;
	}
	,
	getLinkID : function(link){
		return link.id;
	}
	,
	addNode : function(node){
		if(!node)
			return this;
		this._set_nodes_cursor(); //sets cursor to db
		node.id = this._db.nodes.length;
		this._db.nodes.push(node)

		this._cursor = [node];
		return this;
	}
	,
	addNodeUnique : function(node, params){
		if(!node)
			return this;
		console.log(node[Object.keys(params)[0]]);
		console.log(params[Object.keys(params)[0]]);
		if (!this._db.nodes.some(node => node[Object.keys(params)[0]] === params[Object.keys(params)[0]])) {
  			console.log(node);
			node.id = this._db.nodes.length;
			this._db.nodes.push(node)

			this._cursor = [node];
		}
		//set the cursor to the already existing node
		else{
			//fuck it do another search #AGILE9001
			this._cursor = this._db.nodes.filter(function(e) {
		  	return Object.keys(params).every(function(a) {
		  	  return Object.values(params).includes(e[a])
		 	 })
			})		
		}
		return this;

	}
	,
	addLink : function(link){
		if(!link)
			return this;
		//im pozz3d
		link.id = this._db.links.length;
		this._db.links.push(link);
		this._cursor = [link];
		return this;
	}
	,
	//TODO: maybe remove links before removing node
	deleteNodeByID : function(id){
		this.getNodes().sort({id : -1}).toArray()[id] = {id : id}
		this._cursor = []; //fine
		return this;
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
			console.log("DELETING NODE ID: " + props.id);
			var that = this;
			this._cursor = this._db.nodes.filter(function(e) {
			  return Object.keys(props).every(function(a) {
			  	//that._db.nodes.splice(e.id, 1);
			  	//HOW DO YOU TURN THIS ON
			    that.getNodes().sort({id : -1}).toArray()[e.id] = {id : e.id};
			    return !Object.values(props).includes(e[a])		    
			  })
			})
		}		
		return this;
	}
	,
	deleteLink : function(props){
		if(!props){
			this._cursor = this._db.links;
			return this;
		}
		if(this._db.links.length <= 1){
			this._db.links.splice(0, 1);
			this._cursor = this._db.links;
		}
		else{
			var that = this;
			/*this._cursor = this._db.links.filter(function(e) {
				//IT'S OVER 9000!!!!!!
			  return Object.keys(props).every(function(a) {
			  	//that._db.links.splice(e.id, 1);
			  	that.getLinks().sort({id : -1})[e.id] = {id : e.id};
			    return !Object.values(props).includes(e[a])		    
			  })
			})*/

			this._cursor = this._db.links.filter(function(link, i) {
			  for (var key in props) {
			    if (link[key] === undefined || link[key] != props[key])
			      return false;
			  }
			  console.log(link.id);
			  console.log(that.getLinks().sort({id : -1}).toArray()[link.id])
			  that.getLinks().sort({id : -1}).toArray()[link.id] = {"source" : 0, "target" : 0};
			  return true;
			});


		}
		return this;//WoW
	}
	//TODO: GraphQL with ~MongoDB commands
}