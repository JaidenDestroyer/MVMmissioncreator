function WaveSpawn() 
{
	this.template = null;
	this.where = null;
	this.totalcount = null;
	this.maxactive = null;
	this.spawncount = null;
	this.waitbeforestarting = null;
	this.waitbetweenspawns = null;
	this.waitbetweenspawnsafterdeath = null;
	this.startwavewarningsound = null;
	this.firstspawnwarningsound = null;
	this.lastspawnwarningsound = null;
	this.donewarningsound = null;
	this.totalcurrency = null;
	this.name = null;
	this.waitforallspawned = null;
	this.waitforalldead = null;
	this.support = false;
	this.randomspawn = false;

	this.startwaveoutput = new Output();
	this.firstspawnoutput = new Output();
	this.lastspawnoutput = new Output();
	this.doneoutput = new Output();

	this.spawner = {type: null, bots: []};

	///////////// SETTING FUNCTIONS /////////////////
	WaveSpawn.prototype.setTemplate = function(Template)
	{
		if (this.template != Template)
		{	
			this.template = Template;
		}
	}

	WaveSpawn.prototype.setWhere = function(Where)
	{
		if (this.where != Where)
		{	
			this.where = Where;
		}
	}

	WaveSpawn.prototype.setTotalCount = function(TotalCount)
	{
		if (this.totalcount != TotalCount)
		{	
			this.totalcount = TotalCount;
		}
	}

	WaveSpawn.prototype.setMaxActive = function(MaxActive)
	{
		if (this.maxactive != MaxActive)
		{	
			this.maxactive = MaxActive;
		}
	}

	WaveSpawn.prototype.setSpawnCount = function(SpawnCount)
	{
		if (this.spawncount != SpawnCount)
		{	
			this.spawncount = SpawnCount;
		}
	}

	WaveSpawn.prototype.setWaitBeforeStarting = function(WaitBeforeStarting)
	{
		if (this.waitbeforestarting != WaitBeforeStarting)
		{	
			this.waitbeforestarting = WaitBeforeStarting;
		}
	}

	WaveSpawn.prototype.setWaitBetweenSpawns = function(WaitBetweenSpawns)
	{
		if (this.waitbetweenspawns != WaitBetweenSpawns)
		{	
			this.waitbetweenspawns = WaitBetweenSpawns;
		}
	}

	WaveSpawn.prototype.setWaitBetweenSpawnsAfterDeath = function(WaitBetweenSpawnsAfterDeath)
	{
		if (this.waitbetweenspawnsafterdeath != WaitBetweenSpawnsAfterDeath)
		{	
			this.waitbetweenspawnsafterdeath = WaitBetweenSpawnsAfterDeath;
		}
	}

	WaveSpawn.prototype.setStartWaveWarningSound = function(StartWaveWarningSound)
	{
		if (this.startwavewarningsound != StartWaveWarningSound)
		{
			this.startwavewarningsound = StartWaveWarningSound;
		}
	}

	WaveSpawn.prototype.setFirstSpawnWarningSound = function(FirstSpawnWarningSound)
	{
		if (this.firstspawnwarningsound != FirstSpawnWarningSound)
		{
			this.firstspawnwarningsound = FirstSpawnWarningSound;
		}
	}

	WaveSpawn.prototype.setLastSpawnWarningSound = function(LastSpawnWarningSound)
	{
		if (this.lastspawnwarningsound != LastSpawnWarningSound)
		{
			this.lastspawnwarningsound = LastSpawnWarningSound;
		}
	}

	WaveSpawn.prototype.setDoneWarningSound = function(DoneWarningSound)
	{
		if (this.donewarningsound != DoneWarningSound)
		{
			this.donewarningsound = DoneWarningSound;
		}
	}

	WaveSpawn.prototype.setTotalCurrency = function(TotalCurrency)
	{
		if (this.totalcurrency != TotalCurrency)
		{
			this.totalcurrency = TotalCurrency;
		}
	}

	WaveSpawn.prototype.setName = function(Name)
	{
		if (this.name != Name)
		{
			this.name = Name;
		}
	}

	WaveSpawn.prototype.setWaitForAllSpawned = function(WaitForAllSpawned)
	{
		if (this.waitforallspawned != WaitForAllSpawned)
		{
			this.waitforallspawned = WaitForAllSpawned;
		}
	}

	WaveSpawn.prototype.setWaitForAllDead = function(WaitForAllDead)
	{
		if (this.waitforalldead != WaitForAllDead)
		{
			this.waitforalldead = WaitForAllDead;
		}
	}

	WaveSpawn.prototype.setSupport = function(Support)
	{
		if (this.support != Support)
		{
			this.support = Support;
		}
	}

	WaveSpawn.prototype.setRandomSpawn = function(RandomSpawn)
	{
		if (this.randomspawn != RandomSpawn)
		{
			this.randomspawn = RandomSpawn;
		}
	}


	// setStartWaveOutput @Target: string, @Action: string
	Wave.prototype.setStartWaveOutput = function(Target, Action) 
	{
		this.startwaveoutput = output;
	}

	Wave.prototype.setFirstSpawnOutput = function(node=null) 
	{	
		const output = new Output();
		if (node)
		{
			output.loadNode(node);
		}
		this.firstspawnoutput = output;
	}

	Wave.prototype.setLastSpawnOutput = function(node=null) 
	{	
		const output = new Output();
		if (node)
		{
			output.loadNode(node);
		}
		this.lastspawnoutput = output;
	}

	Wave.prototype.setDoneOutput = function(node=null) 
	{	
		const output = new Output();
		if (node)
		{
			output.loadNode(node);
		}
		this.doneoutput = output;
	}

	//////////////////// END OF SETTING FUNCTIONS //////////////////////////////


	WaveSpawn.prototype.loadNode = function(node)
	{
		// get all attributes
		for (let i = 0; i < node.attributes.length; i++) 
		{ 
			const attribute = node.attributes[i];
			const attributekey = attribute.key.toLowerCase();

			switch (attributekey)
			{
				case 'template':
					this.setTemplate(attribute.value);
					break;
				case 'where':
					this.setWhere(attribute.value);
					break;
				case 'totalcount':
					this.setTotalCount(attribute.value);
					break;
				case 'maxactive':
					this.setMaxActive(attribute.value);
					break;
				case 'spawncount':
					this.setSpawnCount(attribute.value);
					break;
				case 'waitbeforestarting':
					this.setWaitBeforeStarting(attribute.value);
					break;
				case 'waitbetweenspawns':
					this.setWaitBetweenSpawns(attribute.value);
					break;
				case 'waitbetweenspawnsafterdeath':
					this.setWaitBetweenSpawnsAfterDeath(attribute.value);
					break;
				case 'startwavewarningsound':
					this.setStartWaveWarningSound(attribute.value);
					break;
				case 'firstspawnwarningsound':
					this.setFirstSpawnWarningSound(attribute.value);
					break;
				case 'lastspawnwarningsound':
					this.setLastSpawnWarningSound(attribute.value);
					break;
				case 'donewarningsound':
					this.setDoneWarningSound(attribute.value);
					break;
				case 'totalcurrency':
					this.setTotalCurrency(attribute.value);
					break;
				case 'name':
					this.startwaveoutput.loadNode(node);
					this.setName(attribute.value);
					break;
				case 'waitforallspawned':
					this.setWaitForAllSpawned(attribute.value);
					break;
				case 'waitforalldead':
					this.setWaitForAllDead(attribute.value);
					break;
				case 'support':
					this.setSupport(attribute.value);
					break;
				case 'randomspawn':
					this.setRandomSpawn(attribute.value);
					break;
				default:
					Error.UnknownKey(attributekey, attribute.line_number);
					break;
			}
		}

		// get all childnodes
		for (let i = 0; i < node.childNodes.length; i++) 
		{ 
			var child = node.childNodes[i];
			var lowernodename = child.nodeName.toLowerCase();

			switch (lowernodename){
				case 'startwaveoutput':
						this.setStartWaveOutput(child);
						break;
					
				case "tfbot":
			    //case "tank":
					var bot = new Bot();
					bot.loadNode(child);
					console.warn(bot);
					if (bot.classicon)
					{
						console.warn('passed');
						window.editor.addIcon(`./icons/Leaderboard_class_${bot.classicon}.png`, this.totalcount);
					}else if(bot.template != null && window.templates != null)
					{
						console.warn('passed2');
						if (window.templates.getTemplateByClassName(bot.template.toLowerCase()))
						{
							console.warn('passed3');
							window.editor.addIcon(`./icons/Leaderboard_class_${window.templates.getTemplateByClassName(bot.template.toLowerCase()).classicon}.png`, this.totalcount);
						}
					}
					this.spawner.bots.push(bot);
			        break;
			    case "squad":
			    case "randomchoice":
			    	for (let x = 0; x < child.childNodes.length; x++) 
			    	{
			    		var newbot = new Bot();
						newbot.loadNode(child.childNodes[x]);
						this.spawner.type = lowernodename;
						this.spawner.bots.push(newbot);
			    	}
			    	break;
				//this.startwaveoutput = new Object();
				//this.firstspawnoutput = new Object();
				//this.lastspawnoutput = new Object();
				//this.doneoutput = new Object();
				default:
					Error.UnknownName(child.nodeName, child.nodeName_linenumber)
			}
		}
	}
}
