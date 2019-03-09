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

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

// side bar open
function openScanInfo() {
  document.getElementById("scan-info").style.width = "250px";
  document.getElementById("main").style.marginRight = "250px";
}

// side bar close
function closeScanInfo() {
  document.getElementById("scan-info").style.width = "0";
  document.getElementById("main").style.marginRight= "0";
}

// side bar open
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

// side bar close
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

function add_spawn_to_list(id, text, spawn){
    let node = document.createElement('li');
    let textnode = document.createTextNode(text);
    node.onclick = function () {
        alert(spawn);
    };
    node.appendChild(textnode);
    document.getElementById(id).appendChild(node);
}

function add_to_list(id, text){
  let node = document.createElement('li');
  let textnode = document.createTextNode(text);
  node.appendChild(textnode);
  document.getElementById(id).appendChild(node);
}

function clear_list(id){
    let list = document.getElementById(id);
    while (list.lastChild) {
        list.removeChild(list.lastChild);
    }
}

