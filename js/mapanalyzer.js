class MapAnalyzer {
  constructor() {
    // an array of all entitys
    this.entitys = [];
    // an array of all spawnpoints and the text inside
    this.spawn_points = [];
    // an array of only the target names of all spawnpoints
    this.spawn_points_targetname = [];
    // an array of all logic_relays and the text inside
    this.logic_relays = [];
    // an array of only the target names of all logic_relays
    this.logic_relays_targetname = [];
    // an array of all path_tracks and the text inside
    this.path_tracks = [];
    // an array of only the target names of all path_tracks
    this.path_tracks_targetname = [];
    // an array of all nav_paths and the text inside
    this.nav_paths = [];
    // an array of only the target names of all nav_paths
    this.nav_paths_targetname = [];
  }

  analyze(text) {
	console.log(text);
    // get all entitys
    this.get_entitys(text);
    // array of all targetnames
    let targetname = null;
    const entitys_length = this.entitys.length;
    for (let i = 0; i < this.entitys_length; i++) { 
      // loop through all entitys
        // get the target name
        switch (get_classname(this.entitys[i])) {
          case 'info_player_teamspawn':
            // the targetname of the entity
            targetname = get_targetname(this.entitys[i]);
            if (is_in_array(this.spawn_points_targetname, targetname)){
              // do stuff if the targetname of the entity is already known
              continue;
            }
            // do stuff if the entity is a spawnpoint
            if(this.entitys[i].match(/(?:"TeamNum" "3")/) ){
              // do stuff if its a blue spawn
              this.spawn_points.push(this.entitys[i]);
              this.spawn_points_targetname.push(targetname);
            }   
            break;

          case 'logic_relay':
            // do stuff if the entity is a logic relay
            targetname = get_targetname(this.entitys[i]);
            if (is_in_array(this.logic_relays_targetname, targetname)){
              // do stuff if the targetname of the entity is already known
              continue;
            }
            this.logic_relays.push(this.entitys[i]);
            this.logic_relays_targetname.push(targetname);
            break;

          case 'path_track':
            // do stuff if the entity is a path_track
            targetname = get_targetname(this.entitys[i]);
            if (is_in_array(this.path_tracks_targetname, targetname)){
              // do stuff if the targetname of the entity is already known
              continue;
            }
            this.path_tracks.push(this.entitys[i]);
            this.path_tracks_targetname.push(targetname);
            break;

          case 'func_nav_prefer':
            // do stuff if the entity is a nav_path
            targetname = get_targetname(this.entitys[i]);
            if (is_in_dict(this.nav_paths_targetname, targetname)){
              // do stuff if the targetname of the entity is already known
              continue;
            }
            this.nav_paths.push(this.entitys[i]);
            this.nav_paths_targetname.push({targetname: targetname, tags: get_tags(this.entitys[i])})
            break;
        }
    }
  }

  // function to get all entitys
  get_entitys(text) {
    // everything between {}
    const items = text.match(/\{([^}]+)\}/g);
    // the length of items 
    const items_length = items.length;
    // loop through all items
    for (let i = 0; i < items_length; i++) { 
      // check if the item contains "classname", this usally means that its a entity
      if (items[i].match(/(?:"classname")/)) {
          // do stuff it the itme contains "origin"
          // add the item to the list of entitys
          this.entitys.push(items[i]);
      }
    }
  }

};

// function to get the first classname found from a string
function get_classname(text) {
  // execute the regex statement and return the second group (the classname)
  const regex = text.match(/(?:"classname" ")(.*?)(?:")/);
  if (!Array.isArray(regex) || !regex.length) {
    // array does not exist, is not an array, or is empty
    return null;
  }
  return regex[1];
}

// function to get the first targetname found from a string
function get_targetname(text) {
  // execute the regex statement and return the second group (the targetname)
  const regex = text.match(/(?:"targetname" ")(.*?)(?:")/);
  if (!Array.isArray(regex) || !regex.length) {
    // array does not exist, is not an array, or is empty
    return null;
  }
  return regex[1];
}

function get_tags(text) {
  const regex = text.match(/(?:"tags" ")(.*?)(?:")/);
  if (!Array.isArray(regex) || !regex.length) {
    // array does not exist, is not an array, or is empty
    return null;
  }
  return regex[1].split(' ');
}

function is_in_array(array, value) {
  return array.indexOf(value) >= 0;
}

function is_in_dict(array, value) {
  return array.some(e => e.targetname == value);
}
