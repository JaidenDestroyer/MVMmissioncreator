// code editor setup
$(document).ready(function(){
    editor.on('change',function(editor){
        // get value right from instance
        //pop = new Population();

        let str = editor.getValue();

        str = str.replace(/\/\/.*/g, "");
        //str = str.replace(/^\s+|[ \t\r\f]+$/gm, "");
        str = str.replace(/^[ \t\r\f]+|[ \t\r\f]+$/gm, "");
        const lines = str.split('\n');
        const pop = new Population();
        const population = parse(lines);
        if (population != null) pop.loadNode(parse(lines));
        console.log(pop);
        const test = new Compile();
        test.Generate(pop);
        console.warn(test.output);
        // store var
        localStorage.setItem('population', JSON.stringify(pop));
        /*
        for (let i = 0; i < pop.waves.length; i++) { 
            add_to_list('waves', `Wave ${i}`);
            for (let x = 0; x < pop.waves[i].WaveSpawns.length; x++) { 
                const text = `
                Name: ${pop.waves[i].WaveSpawns[x].Name}
                Where: ${pop.waves[i].WaveSpawns[x].Where}
                TotalCount: ${pop.waves[i].WaveSpawns[x].TotalCount}
                MaxActive: ${pop.waves[i].WaveSpawns[x].MaxActive}
                SpawnCount: ${pop.waves[i].WaveSpawns[x].SpawnCount}
                TotalCurrency: ${pop.waves[i].WaveSpawns[x].TotalCurrency}
                SpawnType: ${pop.waves[i].WaveSpawns[x].SpawnType}
                `

                add_spawn_to_list('waves', pop.waves[i].WaveSpawns[x].Name, text);
            }
        }
        */
    });


    $("#file-input-pop").change(function(){
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function(){
             // the files content
            var str = reader.result;
		str = str.replace(/\/\/.*/g, "");
		//str = str.replace(/^\s+|[ \t\r\f]+$/gm, "");
		str = str.replace(/^[ \t\r\f]+|[ \t\r\f]+$/gm, "");
		const lines = str.split('\n');
		const pop = new Population();
		const population = parse(lines);
		if (population != null) pop.loadNode(parse(lines));
		console.log(pop);
		const test = new Compile();
		test.Generate(pop);
		console.warn(test.output);
		// store var
		localStorage.setItem('population', JSON.stringify(pop));
            // clear the file to allow loading of the same file multiple times
            $("#file-input-pop").prop("value", "")
        };
        reader.readAsText(input.files[0]);
    });

    $("#file-input-map").change(function(){
        const input = event.target;
        const reader = new FileReader();
        reader.onload = function(){
            // the files content
            const text = reader.result;
            // the map analyzer
            const map = new MapAnalyzer();
            // all entitys
            map.analyze(text);
            console.log('BLUE SPAWNS:');
            spawn_points_targetname_length = map.spawn_points_targetname.length;
            if (spawn_points_targetname_length < 1){
                // do stuff if no spawns were found
                alert('Failed to find any spawns!');
            }else{
                // do stuff if spawn(s) were found
                clear_list('spawn_points');
                for (i = 0; i < spawn_points_targetname_length; i++) { 
                    console.log(map.spawn_points_targetname[i]);
                    add_spawn_to_list('spawn_points', map.spawn_points_targetname[i], map.spawn_points[i]);
                }
                openScanInfo();
            }
            console.log('LOGIC_RELAYS:');
            logic_relays_targetname_length = map.logic_relays_targetname.length;
            if (logic_relays_targetname_length < 1){
                // do stuff if no relays were found
                alert('Failed to find any logic_relays!');
            }else{
                // do stuff if spawn(s) were found
                clear_list('logic_relays');
                for (i = 0; i < logic_relays_targetname_length; i++) { 
                    console.log(map.logic_relays_targetname[i]);
                    add_spawn_to_list('logic_relays', map.logic_relays_targetname[i], map.logic_relays[i]);
                }
                openScanInfo();
            }
            // clear the file to allow loading of the same file multiple times
            $("#file-input-map").prop("value", "")
        };
        reader.readAsBinaryString(input.files[0]);
    });

});

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

