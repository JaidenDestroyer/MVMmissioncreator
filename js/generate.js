function Compile()
{
	this.output = new String();
	this.indentation_string = new String();
	this.indentation_int = 0;

	// Value Adders
	Compile.prototype.addString = function(Key, Value)
	{
		this.output += `${this.indentation_string}\t${Key} "${Value}"\n`;
	}

	Compile.prototype.addNumber = function(Key, Value)
	{
		this.output += `${this.indentation_string}\t${Key} ${Value}\n`;
	}
	// End Of Values Adders

	// Node Controllers
	Compile.prototype.addNodeStart = function(NodeName)
	{
		this.indentation_int += 1;
		this.indentation_string = "\t".repeat(this.indentation_int);

		this.output += `${this.indentation_string}${NodeName}\n`;
		this.output += `${this.indentation_string}{\n`;
	}

	Compile.prototype.addNodeEnd = function()
	{
		this.output += `${this.indentation_string}}\n`;

		this.indentation_int -= 1;
		this.indentation_string = "\t".repeat(this.indentation_int);
	}
	// End of Node Controllers 

	Compile.prototype.GenerateWaveSpawn = function(WaveSpawn)
	{
		this.addNodeStart('WaveSpawn');

		if (WaveSpawn.name != null)
			this.addString('Name', WaveSpawn.name);
		if (WaveSpawn.template != null)
			this.addString('Template', WaveSpawn.template);
		if (WaveSpawn.where != null)
			this.addString('Where', WaveSpawn.where);
		if (WaveSpawn.totalcount != null)
			this.addNumber('TotalCount', WaveSpawn.totalcount);
		if (WaveSpawn.maxactive != null)
			this.addNumber('MaxActive', WaveSpawn.maxactive);
		if (WaveSpawn.spawncount != null)
			this.addNumber('SpawnCount', WaveSpawn.spawncount);
		if (WaveSpawn.waitbeforestarting != null)
			this.addNumber('WaitBeforeStarting', WaveSpawn.waitbeforestarting);
		if (WaveSpawn.waitbetweenspawns != null)
			this.addNumber('WaitBetweenSpawns', WaveSpawn.waitbetweenspawns);
		if (WaveSpawn.waitbetweenspawnsafterdeath != null)
			this.addNumber('WaitBetweenSpawnsAfterDeath', WaveSpawn.waitbetweenspawnsafterdeath);
		if (WaveSpawn.startwavewarningsound != null)
			this.addString('StartWaveWarningSound', WaveSpawn.startwavewarningsound);
		if (WaveSpawn.firstspawnwarningsound != null)
			this.addString('FirstSpawnWarningSound', WaveSpawn.firstspawnwarningsound);
		if (WaveSpawn.lastspawnwarningsound != null)
			this.addString('LastSpawnWarningSound', WaveSpawn.lastspawnwarningsound);
		if (WaveSpawn.donewarningsound != null)
			this.addString('DoneWarningSound', WaveSpawn.donewarningsound);
		if (WaveSpawn.totalcurrency != null)
			this.addNumber('TotalCurrency', WaveSpawn.totalcurrency);
		if (WaveSpawn.waitforallspawned != null)
			this.addString('WaitForAllSpawned', WaveSpawn.waitforallspawned);
		if (WaveSpawn.waitforalldead != null)
			this.addString('WaitForAllDead', WaveSpawn.waitforalldead);
		if (WaveSpawn.support != null)
			this.addString('Support', WaveSpawn.support);
		if (WaveSpawn.randomspawn != null)
			this.addNumber('RandomSpawn', WaveSpawn.randomspawn);

		this.addNodeEnd();
	}

	Compile.prototype.GenerateWave = function(Wave)
	{
		this.addNodeStart('Wave');	

		if (Wave.sound != null) 
			this.addString('Sound', Wave.sound);
		if (Wave.description != null)
			this.addString('Description', Wave.description);
		if (Wave.waitwhendone != null)
			this.output += `WaitWhenDone ${Wave.waitwhendone}\n`; //float
		if (Wave.checkpoint != null)
			this.output += `Checkpoint ${Wave.checkpoint}\n`; //flag

		if (Wave.wavespawns.length)
		{
			for (let i = 0; i < Wave.wavespawns.length; i++)
			{
				this.GenerateWaveSpawn(Wave.wavespawns[i]);
			}
		}

		this.addNodeEnd(); // closing bracket 

	}

	Compile.prototype.Generate = function(population)
	{
		this.addNodeStart('WaveSchedule');

		if (population.startingcurrency != null)
			this.addNumber('StartingCurrency', population.startingcurrency);
		if (population.respawnwavetime != null)
			this.addNumber('RespawnWaveTime', population.respawnwavetime);
		if (population.eventpopfile != null)
			this.addNumber('EventPopFile', population.eventpopfile);
		if (population.fixedrespawnwavetime != null)
			this.addNumber('FixedRespawnWaveTime', population.fixedrespawnwavetime);
		if (population.addsentrybusterwhendamagedealtexceeds != null)
			this.addNumber('AddSentryBusterWhenDamageDealtExceeds', population.addsentrybusterwhendamagedealtexceeds);
		if (population.addsentrybusterwhenkillcountexceeds != null)
			this.addNumber('AddSentryBusterWhenKillCountExceeds', population.addsentrybusterwhenkillcountexceeds);
		if (population.canbotsattackwhileinspawnroom != null)
			this.addNumber('CanBotsAttackWhileInSpawnRoom', population.canbotsattackwhileinspawnroom);
		if (population.advanced != null)
			this.addNumber('Advanced', population.advanced);
		if (population.isendless != null)
			this.addNumber('IsEndless', population.isendless);

		if (population.waves.length)
		{
			for (let i = 0; i < population.waves.length; i++)
			{
				this.GenerateWave(population.waves[i]);
			}
		}

		this.addNodeEnd();
	}
}