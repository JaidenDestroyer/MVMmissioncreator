function readPop()
{
	const input = event.target;
	if (!input.files.length) return; // no files selected
	console.log(input);

	// create a new file reader
	const reader = new FileReader();

	// do stuff when the file is loaded
	reader.onload = function()
	{
		let text = reader.result;
		text = text.replace(/\/\/.*/g, ""); //remove comments
        text = text.replace(/^[ \t\r\f]+|[ \t\r\f]+$/gm, ""); //remove spaces

        const pop = new Population();
        const node = parse(text.split('\n')); //split into lines and load
        if (node != null) pop.loadNode(node); // load the node 

        window.editor.create();

        // store var
        localStorage.setItem('population', JSON.stringify(pop));

        // clear the file to allow loading of the same file multiple times
		input.value = '';
	}

	reader.readAsText(input.files[0]); // load the first file
}