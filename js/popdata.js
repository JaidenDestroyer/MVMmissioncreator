var classes = {
	"waveschedule": {
		"values": {
			"startingcurrency": { "value": null, "type": 'int' },
			"respawnwavetime": { "value": null, "type": 'int' },
			"eventpopfile": { "value": null, "type": 'string' },
			"fixedrespawnwavetime": { "value": null, "type": 'flag' },
			"addsentrybusterwhendamagedealtexceeds": { "value": null, "type": 'int' },
			"addsentrybusterwhenkillcountexceeds": { "value": null, "type": 'int' },
			"canbotsattackwhileinspawnroom": { "value": null, "type": 'flag' },
			"advanced": { "value": null, "type": 'flag' },
			"isendless": { "value": null, "type": 'flag' },
		},
		"templates" : [],
		"waves": [],
	},
	/////////////////////////////////////// WAVE /////////////////////////////////////
	"wave": {
		"values": {
			"sound": { "value": null, "type": 'string' },
			"discription": { "value": null, "type": 'string' },
			"waitwhendone": { "value": 0.0, "type": 'float' },
			"checkpoint": { "value": null, "type": 'flag' },
		},
		"wavespawns": [],
		"startwaveoutput": {},
		"doneoutput": {},
		"initwaveoutput": {},

		"nested_classes": {
			"wavespawns": "wavespawn",
			"startwaveoutput": "startwaveoutput",
			"doneoutput": "doneoutput",
			"initwaveoutput": "initwaveoutput",
		},
	},
	"startwaveoutput": {
		"values": {
			"target": { "value": null, "type": "string"},
			"action": { "value": null, "type": "string"},
		}
	},
	"doneoutput": {
		"values": {
			"target": { "value": null, "type": "string"},
			"action": { "value": null, "type": "string"},
		}
	},
	"initwaveoutput": {
		"values": {
			"target": { "value": null, "type": "string"},
			"action": { "value": null, "type": "string"},
		}
	},
	"wavespawn": {
		"values": {
			"template": { "value": null, "type": "string"},
			"where": { "value": null, "type": "string"},
			"totalcount": { "value": null, "type": "int"},
			"maxactive": { "value": null, "type": "int"},
			"spawncount": { "value": null, "type": "int"},
			"waitbeforestarting": { "value": null, "type": "float"},
			"waitbetweenspawns": { "value": null, "type": "float"},
			"waitbetweenspawnsafterdeath": { "value": null, "type": "float"},
			"startwavewarningsound": { "value": null, "type": "string"},
			"name": { "value": null, "type": "string"},
		}
	},
	///////////////////////////////////// END OF WAVE /////////////////////////////////
};


function addwave(waveschedule, values, nestedclasses) {
	for (let i = 0; i < nestedclasses.length; i++) {
	 	// loop through values
    	for (const [key, value] of Object.entries(values.nested_classes)) {
    		// check if there is more then 1 object
    		if (nestedclasses[i].class == value) {
    			values[`${key}`] = nestedclasses[i].values;
    		}
    	}
		//if (nestedclasses[i].classname == "wavespawn"){
		//	values.wavespawns.push(nestedclasses[i]);
		//}
	}
	waveschedule.waves.push(values);
}

function addtemplates(waveschedule, nestedclasses) {
	for (let i = 0; i < nestedclasses.length; i++) { 
		waveschedule.templates.push(nestedclasses[i].values);
	}
}

var datatypes = {
	"startingcurrency": 'int',
	"respawnwavetime": 'int',
	"eventpopfile": 'string',
	"fixedrespawnwavetime": 'flag',
	"addsentrybusterwhendamagedealtexceeds": 'int',
	"addsentrybusterwhenkillcountexceeds": 'int',
	"canbotsattackwhileinspawnroom": 'flag',
	"advanced": 'flag',
	"isendless": 'flag',
	"sound": 'string',
	"discription": 'string',
	"waitwhendone": 'float',
	"checkpoint": 'flag',
	"target": 'string',
	"action": 'string',
	"template": 'string',
	"where": 'string',
	"totalcount": 'int',
	"maxactive": 'int',
	"spawncount": 'int',
	"waitbeforestarting": 'float',
	"waitbetweenspawns": 'float',
	"waitbetweenspawnsafterdeath": 'float',
	"startwavewarningsound": 'string',
	"name": 'string',
};