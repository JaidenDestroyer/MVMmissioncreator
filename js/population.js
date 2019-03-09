function Population() 
{
	this.startingcurrency = 0;
	this.respawnwavetime = null;
	this.eventpopfile = null;
	this.fixedrespawnwavetime = null;
	this.addsentrybusterwhendamagedealtexceeds = null;
	this.addsentrybusterwhenkillcountexceeds = null;
	this.canbotsattackwhileinspawnroom = null;
	this.advanced = null;
	this.isendless = null;

	this.waves = new Array();
	this.templates = null;

	// setStartingCurrency @StartingCurrency: integer
	Population.prototype.setStartingCurrency = function(StartingCurrency) 
	{
		if (this.startingcurrency != StartingCurrency)
		{	
			// fix overflow issue
			if (StartingCurrency > 30000) { console.warn(`StartingCurrency Overflow: ${StartingCurrency}`); StartingCurrency = 30000; }
			this.startingcurrency = StartingCurrency;
		}
	}

	// setRespawnWaveTime @RespawnWaveTime: integer
	Population.prototype.setRespawnWaveTime = function(RespawnWaveTime) 
	{	
		// check if the new var DOES NOT match the current var
		if (this.respawnwavetime != RespawnWaveTime)
		{	
			this.respawnwavetime = RespawnWaveTime;
		}
	}

	// setEventPopFile @EventPopFile: bool
	Population.prototype.setEventPopFile = function(EventPopFile)
	{
		// check if the new var DOES NOT match the current var
		if (this.eventpopfile != EventPopFile)
		{	
			this.eventpopfile = EventPopFile;
		}
	}

	// setFixedRespawnWaveTime @FixedRespawnWaveTime: bool
	Population.prototype.setFixedRespawnWaveTime = function(FixedRespawnWaveTime)
	{
		// check if the new var DOES NOT match the current var
		if (this.fixedrespawnwavetime != FixedRespawnWaveTime)
		{	
			this.fixedrespawnwavetime = FixedRespawnWaveTime;
		}
	}

	// setAddSentryBusterWhenDamageDealtExceeds @AddSentryBusterWhenDamageDealtExceeds: integer
	Population.prototype.setAddSentryBusterWhenDamageDealtExceeds = function(AddSentryBusterWhenDamageDealtExceeds)
	{
		// check if the new var DOES NOT match the current var
		if (this.addsentrybusterwhendamagedealtexceeds != AddSentryBusterWhenDamageDealtExceeds)
		{	
			this.addsentrybusterwhendamagedealtexceeds = AddSentryBusterWhenDamageDealtExceeds;
		}
	}

	// setAddSentryBusterWhenKillCountExceeds @AddSentryBusterWhenKillCountExceeds: integer
	Population.prototype.setAddSentryBusterWhenKillCountExceeds = function(AddSentryBusterWhenKillCountExceeds)
	{
		// check if the new var DOES NOT match the current var
		if (this.addsentrybusterwhenkillcountexceeds != AddSentryBusterWhenKillCountExceeds)
		{	
			this.addsentrybusterwhenkillcountexceeds = AddSentryBusterWhenKillCountExceeds;
		}
	}

	// setCanBotsAttackWhileInSpawnRoom @CanBotsAttackWhileInSpawnRoom: bool
	Population.prototype.setCanBotsAttackWhileInSpawnRoom = function(CanBotsAttackWhileInSpawnRoom) 
	{
		// check if the new var DOES NOT match the current var
		if (this.canbotsattackwhileinspawnroom != CanBotsAttackWhileInSpawnRoom)
		{
			this.canbotsattackwhileinspawnroom = CanBotsAttackWhileInSpawnRoom;
		}
	}

	// setAdvanced @Advanced: bool (flag)
	Population.prototype.setAdvanced = function(Advanced) 
	{
		// check if the new var DOES NOT match the current var
		if (this.advanced != Advanced)
		{
			this.advanced = Advanced;
		}
	}

	// setIsEndless @IsEndless: bool (flag)
	Population.prototype.setIsEndless = function(IsEndless) 
	{
		// check if the new var DOES NOT match the current var
		if (this.isendless != IsEndless)
		{
			this.isendless = IsEndless;
		}
	}

	Population.prototype.addWave = function(node=null)
	{
		const wave = new Wave();
		if (node)
		{
			wave.loadNode(node);
		}
		this.waves.push(wave);
	}

	Population.prototype.addTemplates = function(templates)
	{
		this.templates.push(templates);
	}

	Population.prototype.loadNode = function(node)
	{
		// get all attributes
		for (let i = 0; i < node.attributes.length; i++) 
		{ 
			const attribute = node.attributes[i];
			const attributekey = attribute.key.toLowerCase();

			switch (attributekey)
			{
				case 'startingcurrency': 
					// check for correct datatype
					if (!IsDatatype('int', attribute.value, attribute.line_number)) {
						console.warn(`Incorrect Datatype: line ${attribute.line_number}`);
						break;
					} 
					this.setStartingCurrency(attribute.value);
					break;
				case 'respawnwavetime':
					// check for correct datatype
					if (!IsDatatype('int', attribute.value, attribute.line_number)) {
						console.warn(`Incorrect Datatype: line ${attribute.line_number}`);
						break;
					}
					this.setRespawnWaveTime(attribute.value);
					break;
				case 'eventpopfile':
					// check for correct datatype
					if (!IsDatatype('string', attribute.value, attribute.line_number)) {
						console.warn(`Incorrect Datatype: line ${attribute.line_number}`);
						break;
					}
					this.setEventPopFile(attribute.value.toLowerCase()=="halloween"?true:false);
					break;
				case 'fixedrespawnwavetime':
					// check for correct datatype
					if (!IsDatatype('flag', attribute.value, attribute.line_number)) {
						console.warn(`Incorrect Datatype: line ${attribute.line_number}`);
						break;
					}
					this.setFixedRespawnWaveTime(attribute.value.toLowerCase()=="yes"?true:false);
					break;
				case 'addsentrybusterwhendamagedealtexceeds':
					// check for correct datatype
					if (!IsDatatype('int', attribute.value, attribute.line_number)) {
						console.warn(`Incorrect Datatype: line ${attribute.line_number}`);
						break;
					}
					this.setAddSentryBusterWhenDamageDealtExceeds(attribute.value);
					break;
				case 'addsentrybusterwhenkillcountexceeds':
					// check for correct datatype
					if (!IsDatatype('int', attribute.value, attribute.line_number)) {
						console.warn(`Incorrect Datatype: line ${attribute.line_number}`);
						break;
					}
					this.setAddSentryBusterWhenKillCountExceeds(attribute.value);
					break;
				case 'canbotsattackwhileinspawnroom':
					// check for correct datatype
					if (!IsDatatype('string', attribute.value, attribute.line_number)) {
						console.warn(`Incorrect Datatype: line ${attribute.line_number}`);
						break;
					}
					this.setCanBotsAttackWhileInSpawnRoom(attribute.value.toLowerCase()=="yes"?true:false);
					break;
				case 'advanced':
					// check for correct datatype
					if (!IsDatatype('flag', attribute.value, attribute.line_number)) {
						console.warn(`Incorrect Datatype: line ${attribute.line_number}`);
						break;
					}
					this.setAdvanced(attribute.value=="1"?true:false);
					break;
				case 'isendless':
					// check for correct datatype
					if (!IsDatatype('flag', attribute.value, attribute.line_number)) {
						console.warn(`Incorrect Datatype: line ${attribute.line_number}`);
						break;
					}
					this.setIsEndless(attribute.value=="1"?true:false);
					break;
				default:
					Error.UnknownKey(attributekey, attribute.line_number);
					break;
			}
		}

		// get all childnodes
		for (let i = 0; i < node.childNodes.length; i++) 
		{ 
			const child = node.childNodes[i];

			switch (child.nodeName){
				case "templates":
					//load templates
					var templates = new Templates();
					templates.loadNode(child);
					this.templates = templates;
					console.log(this);
					break;

				case "mission":
					break;

				case "wave":
					this.addWave(child);
					break;
				default:
					Error.UnknownName(child.nodeName, child.nodeName_linenumber)
			}
		}
	}
}

function Output()
{
	this.target = null;
	this.action = null;

	Output.prototype.loadNode = function(node)
	{
		// get all attributes
		for (let i = 0; i < node.attributes.length; i++) 
		{ 
			const attribute = node.attributes[i];
			const attributekey = attribute.key.toLowerCase();

			switch (attributekey)
			{
				case 'target': 
					this.target = attribute.value;
					break;
				case 'action':
					this.action = attribute.value;
					break;
			}
		}
	}
}

function IsDatatype(type, token, line_number = -1)
{
	switch (type) 
	{
		case 'int':
			return /^(-?)\d+$/.test(token);

		case 'float':
			return /\d+(\.\d*)?|\.\d+/.test(token);

		case 'boolean':
			return /^(false|true|yes|no|1|0)$/i.test(token);

		case 'string':
			return true;

		case 'flag':
			return true;
	}
}

function Error() {};

Error.InvalidValueType = function (token, line_number)
{
	console.warn(`Invalid value (${token}) found on line ${line_number}`);
}

Error.MissingName = function (token, line_number)
{
	console.warn(`Missing name found on line ${line_number}`);
}

Error.UnknownKey = function (token, line_number)
{
	console.warn(`Unknown key (${token}) found on line ${line_number}`);
}

Error.UnknownName = function (token, line_number)
{
	console.warn(`Unknown name (${token}) found on line ${line_number}`);
}