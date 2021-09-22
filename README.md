# weaverDB
Simple clientside graph db module, compatible as model with <a href="https://github.com/DubiousTunic/ANCHOR-router">ANCHOR</a> as view
For example see my "Phantom Blog"    
Essentially, use MongoDB JSON query patterns to match Graph DB 

var weave = WEAVER.load(sampleJSON);   
Loads JSON in d3 format:  
  {  
    "nodes" : [  
     ],  
     "links" : [  
     ]  
  }  
  
var fromParams = {
  "name" : "Freud",  
  "occupation" : "psychologist"  
}  
  
  
weave.getNodes(fromParams).toArray() //returns arr of nodes matching params  
weave.getNodes(fromParams).first() //returns first node matching params  
weave.getNodes(fromParams).setNodes({  
  "occupation" : "psychiatrist"  
})  
  
weave.addNode({"name" : "Nietzsche", "occupation" : "psychologist"})  
  
weave.db(); //returns entire db of nodes and edges  
  
New Atlantis Technology / GEAR module not production ready
