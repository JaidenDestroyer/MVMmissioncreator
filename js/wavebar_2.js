"use strict";

// could use a upgrade later on
function WaveBar(wavehud)
{
	this.wavehud = wavehud;
	this.botcontainer = this.wavehud.getElementsByClassName('botContainer')[0];

	this.giant = new Array();
	this.normal = new Array();
	this.support = new Array();

	// support bar
	const support_line = document.createElement("div")
	support_line.classList.add("supportBar");

	// support text
	const support_text = document.createElement("p");
	support_text.setAttribute("style", "opacity: 1; position: relative; left: 22px; margin-top: -10px");
	support_text.innerText = 'support';
	// end of support bar

	WaveBar.prototype.addIcon = function(src='./icons/missing_texture.png', count=1, isSupport=false, isGiant=false, isCritical=false)
	{
     	// create them
		const waveBot = document.createElement("div");
		const waveBotIcon = document.createElement("div");
		const botIcon = document.createElement("img");

		// set the class type
		waveBot.classList.add("waveBot");
		waveBotIcon.classList.add("waveBotIcon");
		botIcon.classList.add("botIcon");

		// set the type of bot (giant, critical or normal)
		if (!isGiant) botIcon.classList.add("normal");
		if (isGiant) botIcon.classList.add("giant");
		if (isCritical) botIcon.classList.add("critical");

		// set the image source
		botIcon.setAttribute("src", src);

		// append them together
		waveBotIcon.appendChild(botIcon);
		waveBot.appendChild(waveBotIcon);
		if (!isSupport) 
		{
			// set stuff
			const botCount = document.createElement("p");
			botCount.setAttribute("style", "opacity: 1;margin-top: -10px;");
			botCount.id = "count";
			botCount.innerText = count;
			waveBot.appendChild(botCount);
		}

		else if (this.support.length > 1) waveBot.classList.add("support");
		else if (this.support.length) waveBot.classList.add("supportsecond");
		else waveBot.classList.add("supportfirst");

		console.log(waveBot);
		//this.botcontainer.appendChild(waveBot);

		if (isSupport) this.support.push(waveBot);
		else if (isGiant) this.giant.push(waveBot);
		else this.normal.push(waveBot);

		return waveBot;
	}

	WaveBar.prototype.create = function()
	{
		// append giants
		for (let a = 0; a < this.giant.length; a++)
		{
			this.botcontainer.appendChild(this.giant[a]);
		}

		// append normal bots
		for (let a = 0; a < this.normal.length; a++)
		{
			this.botcontainer.appendChild(this.normal[a]);
		}
		
		// append support bots
		if (this.support.length)
		{
			if (this.giant.length || this.normal.length)
			{
				this.botcontainer.appendChild(support_line);
			}
			this.support[0].appendChild(support_text);

			for (let a = 0; a < this.support.length; a++)
			{
				this.botcontainer.appendChild(this.support[a]);
			}
		}
	}

	WaveBar.prototype.clear = function()
	{

		// append support bots
		this.botcontainer.innerHTML = '';

		for (let a = 0; a < this.support.length; a++)
		{
			this.support[a].remove();
		}

		this.support.length = 0; // clear array


		// remove giants
		for (let a = 0; a < this.giant.length; a++)
		{
			this.giant[a].remove();
		}

		this.giant.length = 0; // clear array

		// append normal bots
		for (let a = 0; a < this.normal.length; a++)
		{
			this.normal[a].remove();
		}

		this.normal.length = 0; // clear array
	}
}