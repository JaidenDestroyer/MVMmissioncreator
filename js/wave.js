function Wave() 
{
	this.sound = null;
	this.description = null;
	this.waitwhendone = null;
	this.checkpoint = null;

	this.startwaveoutput = new Object();
	this.doneoutput = new Object();
	this.initwaveoutput = new Object();

	this.wavespawns = new Array();

	// setSound @Sound: string
	Wave.prototype.setSound = function(Sound) 
	{
		if (this.sound != Sound)
		{	
			this.sound = Sound;
		}
	}

	// setDescription @Description: string
	Wave.prototype.setDescription = function(Description) 
	{
		if (this.description != Description)
		{	
			this.description = Description;
		}
	}

	// setWaitWhenDone @WaitWhenDone: float
	Wave.prototype.setWaitWhenDone = function(WaitWhenDone) 
	{
		if (this.waitwhendone != WaitWhenDone)
		{	
			this.waitwhendone = WaitWhenDone;
		}
	}

	// setCheckpoint @Checkpoint: flag
	Wave.prototype.setCheckpoint = function(Checkpoint) 
	{
		if (this.checkpoint != Checkpoint)
		{	
			this.checkpoint = Checkpoint;
		}
	}

	// setStartWaveOutput @Target: string, @Action: string
	Wave.prototype.setStartWaveOutput = function(node=null) 
	{
		const output = new Output();
		if (node)
		{
			output.loadNode(node);
		}
		this.startwaveoutput = output;
	}

	// setDoneOutput @Target: string, @Action: string
	Wave.prototype.setDoneOutput = function(node=null) 
	{	
		const output = new Output();
		if (node)
		{
			output.loadNode(node);
		}
		this.doneoutput = output;
	}

	Wave.prototype.setInitWaveOutput = function(node=null) 
	{	
		const output = new Output();
		if (node)
		{
			output.loadNode(node);
		}
		this.initwaveoutput = output;
	}

	Wave.prototype.addWaveSpawn = function(node=null)
	{
		let wavespawn = new WaveSpawn();
		if (node)
		{
			wavespawn.loadNode(node);
		}
		this.wavespawns.push(wavespawn);
	}

	Wave.prototype.loadNode = function(node)
	{
		// get all attributes
		for (let i = 0; i < node.attributes.length; i++) 
		{ 
			const attribute = node.attributes[i];
			const attributekey = attribute.key.toLowerCase();

			switch (attributekey)
			{
				case 'waitwhendone': 
					this.setWaitWhenDone(attribute.value);
					break;
				case 'checkpoint':
					this.setCheckpoint(attribute.value);
					break;
				case 'description':
					this.setDescription(attribute.value);
					break;
				case 'sound':
					this.setSound(attribute.value);
					break;
			}
		}

		// get all childnodes
		for (let i = 0; i < node.childNodes.length; i++) 
		{ 
			var child = node.childNodes[i];
			var lowernodename = child.nodeName.toLowerCase();

			switch (lowernodename){
				case "wavespawn":
					this.addWaveSpawn(child);
					break;
				case "startwaveoutput":
					this.setStartWaveOutput(child);
					break;
				case "doneoutput":
					this.setDoneOutput(child);
					break;
				case "initwaveoutput":
					this.setInitWaveOutput(child);
					break;
			}
		}
	}
}