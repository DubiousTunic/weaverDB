# reaperDB
Simple clientside graph db module, compatible as model with <a href="https://github.com/DubiousTunic/ANCHOR-router">ANCHOR</a> as view
  
var reap = REAPER.load(sampleJSON);   
Loads JSON in d3 format:  
  {  
    "nodes" : [  
     ],  
     "edges" : [  
     ]  
  }  
  
var fromParams = {
  "name" : "Freud",  
  "occupation" : "psychologist"  
}  
  
reap.getNodes(fromParams) //returns arr of nodes matching params  
reap.getNodes(fromParams).first() //returns first node matching params  
reap.getNodes(fromParams).setNodes({  
  "occupation" : "psychiatrist"  
})  
  
reap.addNode({"name" : "Nietzsche", "occupation" : "psychologist"})  
  
reap.db(); //returns entire db of nodes and edges  
  
New Atlantis gear module
