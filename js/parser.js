// function to parse str of popfile into pop object (it sets this class context)
function parse(lines, line_number=0, inside=false) 
{
	let nodeName = null
    	let nodeName_linenumber = null;
	let last_valid_line_linenumber = null;
	let counter = 0;
	let childNodes = new Array();
    	let attributes = new Array();

	// loop through all items
	for (let i = 0; i < lines.length; i++)
	{	
		// skip this line if the text is empty 
		if (lines[i] == "") continue;

		if (lines[i] == '}') 
		{
			// do stuff on end of class
			counter -= 1;
			if (counter == 0) return {nodeName: nodeName, childNodes: childNodes, attributes: attributes, nodeName_linenumber: nodeName_linenumber};
			else if (counter < 0) 
		    	{
				console.warn('[FATAL ERROR] counter less then 1');
				return null;
		    	}
		}
		else if (lines[i] == '{') 
		{
			// do stuff on start of class
			counter += 1;

		    if (counter == 1) 
		    {
			if (i > 0) 
			{
			    if (lines[last_valid_line_linenumber]) 
			    {
				if(!inside)
				{
					if (!(nodeName == "waveschedule" || nodeName == "population"))
					{
						console.warn('Fatal Error When Parsing: No waveschedule detected');

				    		// fatal error, return null
				    		return null;
					}
				}
			    }
			    else 
			    {
				console.warn(`Node missing nodeName: line ${line_number+i}`);
				return null;
			    }
			}
			else
			{
			    // fatal error causes infinite loop (dunno why?)
			    console.warn('[FATAL ERROR] Node missing NodeName: line 0');
			    return null;
			}
		    }
		    else if (counter == 2) 
		    {
			childNodes.push(this.parse(lines.slice(last_valid_line_linenumber), line_number+last_valid_line_linenumber, true));
		    }

		    // if the counter is higher then 0, then we are inside a class
		    }
		else if (counter == 1 && lines[i+1] != '{') 
		{
		    const attribute = get_attributes(lines[i]);
		    if (attribute) 
		    {
			// get key and value of attribute
			const key = attribute.key;
			const value = attribute.value;
			// if the key and value is not null then push the attribute into the array
			if (key && value) attributes.push({"key" : key, "value" : value, "line_number" : line_number+i+1});
		    }
		}
		else if(counter == 0) 
		{
		    nodeName = lines[i].toLowerCase();
		    nodeName_linenumber = line_number+i;
		}
		last_valid_line_linenumber = i;
	}
	return null;
}

// function to get attribute, and value from a string
function get_attributes(str)
{
    const regex = str.match(/("[\w\s]+"|[\w]+)[\s"]+([^\n]+?)(?:["\n]|$)/);
    if (!Array.isArray(regex) || !regex.length) 
    {
        // array does not exist, is not an array, or is empty
        return null;
    }
    // the attribute can be lowercase because it does not matter
    return {key: regex[1], value: regex[2]};
}
