function Templates()
{
	this.templates = new Array();

	Templates.prototype.loadNode = function(node)
	{
		// get all childnodes
		for (let i = 0; i < node.childNodes.length; i++) 
		{ 
			var template = node.childNodes[i];
			var lowernodename = template.nodeName.toLowerCase();
			var bot = new Bot();
			if (bot) 
			{
				bot.loadNode(template);
			}
			this.templates.push(bot);
		}
	}
}