function Bot() {
	this.classname = null;

	this.template = null;
	this.class = null;
	this.classicon = null;
	this.health = null;
	this.scale = null;
	this.name = null;
	this.autojumpmin = null;
	this.autojumpmax = null;
	this.skill = null;
	this.weaponrestrictions = null;

	this.teleportwhere = new Array();
	this.behaviormodifiers = new Array();
	this.maxvisionrange = new Array();
	this.items = new Array();
	this.attributes = new Array();

	this.itemattributes = new Array();
	this.characterattributes = new Array();


	Bot.prototype.loadNode = function(node)
	{
		this.classname = node.nodeName;
		for (var i = 0; i < node.attributes.length; i++)
		{	
			// attribute: The attribute (key, value, line_pos)
			var attribute = node.attributes[i];
			var attributekey = attribute.key.toLowerCase();
			// fix this later
			switch (attributekey)
			{
				case 'template':
					this.template = attribute.value;
					break;
				case 'class':
					this.class = attribute.value;
					break;
				case 'classicon':
					editor.addIcon(`./icons/Leaderboard_class_${attribute.value}.png`, 1, false, false, false);
					this.classicon = attribute.value;
					break;
				case 'health':
					this.health = attribute.value;
					break;
				case 'scale':
					this.scale = attribute.value;
					break;
				case 'name':
					this.name = attribute.value;
					break;
				case 'autojumpmin':
					this.autojumpmin = attribute.value;
					break;
				case 'autojumpmax':
					this.autojumpmax = attribute.value;
					break;
				case 'skill':
					this.skill = attribute.value;
					break;
				case 'weaponrestrictions':
					this.weaponrestrictions = attribute.value;
					break;
				case 'attributes':
					this.attributes.push(attribute.value);	
					break;
				case 'tag':
				case 'item':
				case 'maxvisionrange':
				case 'speed':
				case 'skin':
					break;
				default:
					Error.UnknownKey(attributekey, attribute.line_number);
					break;
			}
		}
	}
}