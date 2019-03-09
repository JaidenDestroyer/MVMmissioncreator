var Node = fabric.util.createClass(fabric.Rect, {

    type: 'Node',

    initialize: function(options) {
        options || (options = { });

        this.callSuper('initialize', options);
        this.set('label', options.label || '');
    },

    toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
        });
    },

    _render: function(ctx) 
    {
        this.callSuper('_render', ctx);

        ctx.font = '20px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.label, -this.width/2 + 10, -this.height/2 + 30);
    }

});

function makeNode (name, left, top, lines=null)
{
    var c = new Node({
        width: 150,
        height: 50,
        left: left,
        top: top,
        label: name,
        fill: '#faa'
    });

    c.lines = lines;

    c.hasControls = false;
    c.lockMovementX = true;
    c.lockMovementY = true;

    return c;
}

function makeLine(coords, color='#008abc') 
{
    return new fabric.Line(coords, {
        fill: color,
        stroke: color,
        strokeWidth: 5,
        selectable: false,
        evented: false,
    });
}

function makeLineDash(coords, color='#008abc')
{
    return new fabric.Line(coords, {
        fill: color,
        stroke: color,
        strokeWidth: 5,
        selectable: false,
        evented: false,
        strokeDashArray: [5, 5],
    });
}

function makeText(name, left, top, fontsize=30, color='white')
{
    var c = new fabric.Text(name, { 
        left: left, //Take the block's position
        top: top, 
        fill: color,
        fontSize: fontsize,
    });

    c.hasControls = false;
    c.lockMovementX = true;
    c.lockMovementY = true;
    c.hasBorders = false;

    return c;
}
/*
    this.canvas.on('object:moving', function(e) { // or 'object:added'
            var p = e.target;
            console.log(p.get('left'), p.get('top'));
            if (p.line1)
                p.line1.set({'x2': p.left, 'y2': p.top});
            if (p.line2)
                p.line2.set({'x1': p.left, 'y1': p.top});
            console.log(p);
    });
*/
/*
function Editor()
{
    this.canvas = new fabric.Canvas('editor', { selection: false, backgroundColor: "#282c34"});;

    this.canvas.on('mouse:down', function(e) {
        const p = e.target;
        if (!p) return;
        console.log(p.label);
    });

    Editor.prototype.loadWaves = function(waves, waveschedule_x)
    {
        const spacing_x = 200;
        let indent = 0;
        for (let i = 0; i < waves.length; i++)
        {
            const wave_x = indent+400+i*spacing_x;
            let wavespawn_indent = 0;
            for (let x = 0; x < waves[i].wavespawns.length; x++)
            {
                const wavespawn_x = wavespawn_indent+wave_x+x*spacing_x;
                if (x >= 1) indent += spacing_x;
                if (waves[i].wavespawns[x].spawner.type != null)
                {
                    for (let y = 0; y < waves[i].wavespawns[x].spawner.bots.length; y++)
                    {
                        if (y >= 1) 
                        {
                            wavespawn_indent += spacing_x;
                            indent += spacing_x;
                        }
                        this.canvas.add(makeLine([wavespawn_x, 700, wavespawn_x+y*spacing_x, 700]));
                        this.canvas.add(makeLine([wavespawn_x+y*spacing_x, 700, wavespawn_x+y*spacing_x, 900]));
                        this.canvas.add(makeNode('TFBot', wavespawn_x+y*spacing_x, 900));

                        if (waves[i].wavespawns[x].spawner.bots[y].template != null)
                        {
                            this.canvas.add(makeText(waves[i].wavespawns[x].spawner.bots[y].template, wavespawn_x+y*spacing_x, 950));
                        }
                        else if (waves[i].wavespawns[x].spawner.bots[y].class != null)
                        {
                            this.canvas.add(makeText(waves[i].wavespawns[x].spawner.bots[y].class, wavespawn_x+y*spacing_x, 950));
                        }
                    }
                    this.canvas.add(makeLine([wavespawn_x, 500, wavespawn_x, 500]));
                    this.canvas.add(makeLine([wavespawn_x, 500, wavespawn_x, 700]));
                    this.canvas.add(makeNode(waves[i].wavespawns[x].spawner.type, wavespawn_x, 700));
                }
                else 
                {
                    for (let y = 0; y < waves[i].wavespawns[x].spawner.bots.length; y++)
                    {
                        if (y >= 1) 
                        {
                            wavespawn_indent += spacing_x;
                            indent += spacing_x;
                        }
                        this.canvas.add(makeLine([wavespawn_x, 500, wavespawn_x+y*spacing_x, 500]));
                        this.canvas.add(makeLine([wavespawn_x+y*spacing_x, 500, wavespawn_x+y*spacing_x, 700]));
                        this.canvas.add(makeNode('TFBot', wavespawn_x+y*spacing_x, 700));
                        if (waves[i].wavespawns[x].spawner.bots[y].template != null)
                        {
                            this.canvas.add(makeText(waves[i].wavespawns[x].spawner.bots[y].template, wavespawn_x+y*spacing_x, 750));
                        }
                        else if (waves[i].wavespawns[x].spawner.bots[y].class != null)
                        {
                            this.canvas.add(makeText(waves[i].wavespawns[x].spawner.bots[y].class, wavespawn_x+y*spacing_x, 750));
                        }
                    }
                }
                if (waves[i].wavespawns[x].waitforalldead)
                {
                    let pos = findWithAttr(waves[i].wavespawns, 'name', waves[i].wavespawns[x].waitforallspawned);
                    if (pos != null)
                    {
                        pos = pos*spacing_x+wave_x;
                        //this.canvas.add(makeText(waves[i].wavespawns[x].waitforalldead, wavespawn_x, 400+x*-15));
                        // caller (the waitforalldead)
                        this.canvas.add(makeLine([wavespawn_x-50, 500, wavespawn_x-50, 400+x*-10], '#00ba37'));
                        // connection line long
                        this.canvas.add(makeLine([wavespawn_x-50, 400+x*-10, pos+50, 400+x*-10], '#00ba37'));
                        // reciever (the classname we are calling)
                        const reciever = makeLine([pos+50, 400+x*-10, pos+50, 500], '#145bce');
                        this.canvas.add(reciever);
                        this.canvas.sendToBack(reciever);
                    }
                }

                if (waves[i].wavespawns[x].waitforallspawned)
                {
                    //this.canvas.add(makeLine([wavespawn_x+50, 400, wavespawn_x+150, 400], '#00ba37'));
                    let pos = findWithAttr(waves[i].wavespawns, 'name', waves[i].wavespawns[x].waitforallspawned);
                    if (pos != null)
                    {
                        pos = pos*spacing_x+wave_x;
                        const lines = [
                            makeLine([wavespawn_x-40, 500, wavespawn_x-40, 480+x*-10], '#00ba37'),
                            makeLine([wavespawn_x-40, 480+x*-10, pos+40, 480+x*-10], '#00ba37'),
                            makeLine([pos+40, 480+x*-10, pos+40, 500], '#145bce'),
                        ];
                        for (line in lines)
                        {
                            console.log(line);
                            this.canvas.add(line);
                        }
                    }
                }

                this.canvas.add(makeLine([wave_x, 300, wavespawn_x, 300]));
                this.canvas.add(makeLine([wavespawn_x, 300, wavespawn_x, 500]));
                this.canvas.add(makeNode('WaveSpawn', wavespawn_x, 500));
            }
            this.canvas.add(makeLine([waveschedule_x, 100, wave_x, 100]));
            this.canvas.add(makeLine([wave_x, 100, wave_x, 300]));
            this.canvas.add(makeNode(`Wave ${i+1}`, wave_x, 300));
        }
    }

    Editor.prototype.loadPop = function(population)
    {
        const waveschedule_x = 400;
        this.loadWaves(population.waves, waveschedule_x);
        this.canvas.add(makeNode('WaveSchedule', waveschedule_x, 100));
    }
}
*/
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return null;
}

function Editor()
{
    this.canvas = new fabric.Canvas('editor', { selection: false, backgroundColor: "#282c34"});;
    this.spacing_x = 300;
    this.spacing_y = 300;
    this.starting_offset_x = 400;
    this.starting_offset_y = 100;

    this.canvas.on('mouse:down', function(e) {
        const p = e.target;
        if (!p) return;
        console.log(p.label);
    });

    Editor.prototype.loadWaves = function(waves)
    {
        let wave_indent = 0;
        for (let a = 0; a < waves.length; a++)
        {
            // y and x pos of wave node
            const wave_x = a*this.spacing_x + this.starting_offset_x+wave_indent;
            const wave_y = this.starting_offset_y + this.spacing_y;

            let wavespawn_indent = 0;
            let wavespawn_dict = [];
            for (let b = 0; b < waves[a].wavespawns.length; b++)
            {
                if (b >= 1) wave_indent += this.spacing_x;

                const wavespawn_x = wave_x+b*this.spacing_x+wavespawn_indent;
                const wavespawn_y = wave_y+this.spacing_y;
                wavespawn_dict.push(wavespawn_x);

                let bot_parent_x = wavespawn_x;
                let bot_parent_y = wavespawn_y;

                if (waves[a].wavespawns[b].spawner.type == 'randomchoice')
                {
                    bot_parent_y += this.spacing_y;
                    this.canvas.add(makeLine([wavespawn_x, wavespawn_y, bot_parent_x, bot_parent_y]));
                    this.canvas.add(makeNode(`RandomChoice`, bot_parent_x, bot_parent_y));
                }
                else if (waves[a].wavespawns[b].spawner.type == 'squad')
                {
                    bot_parent_y += this.spacing_y;
                    this.canvas.add(makeLine([wavespawn_x, wavespawn_y, bot_parent_x, bot_parent_y]));
                    this.canvas.add(makeNode(`Squad`, bot_parent_x, bot_parent_y));
                }

                for (let c = 0; c < waves[a].wavespawns[b].spawner.bots.length; c++)
                {
                    if (c >= 1) 
                    {
                        // identation for each wave
                        wave_indent += this.spacing_x;
                        // indentation for each wavespawn
                        wavespawn_indent += this.spacing_x;
                    }

                    const bot_x = bot_parent_x+c*this.spacing_x;
                    const bot_y = bot_parent_y+this.spacing_y;

                    let line1 = null;
                    let line2 = null;
                    if (waves[a].wavespawns[b].spawner.type == 'randomchoice')
                    {
                        line1 = makeLineDash([bot_parent_x, bot_parent_y, bot_x, bot_parent_y]);
                        line2 = makeLineDash([bot_x, bot_parent_y, bot_x, bot_y]);
                    }
                    else
                    {
                        line1 = makeLine([bot_parent_x, bot_parent_y, bot_x, bot_parent_y]);
                        line2 = makeLine([bot_x, bot_parent_y, bot_x, bot_y]);
                    }

                    this.canvas.add(line1);
                    this.canvas.add(line2);
                    this.canvas.sendToBack(line1);
                    this.canvas.sendToBack(line2);
                    this.canvas.add(makeNode(`TFBot`, bot_x, bot_y));
                    if (waves[a].wavespawns[b].spawner.bots[c].template != null)
                    {
                        this.canvas.add(makeText(waves[a].wavespawns[b].spawner.bots[c].template, bot_x, bot_y+50, 17));
                    }
                    else if (waves[a].wavespawns[b].spawner.bots[c].class != null)
                    {
                        this.canvas.add(makeText(waves[a].wavespawns[b].spawner.bots[c].class, bot_x, bot_y+50, 30));
                        if (waves[a].wavespawns[b].spawner.bots[c].health != null)
                        {
                            this.canvas.add(makeText(`Health: ${waves[a].wavespawns[b].spawner.bots[c].health}`, bot_x, bot_y+100, 30, '#00e016'));
                        }
                    }
                }

                if (waves[a].wavespawns[b].waitforallspawned)
                {
                    const pos = findWithAttr(waves[a].wavespawns, 'name', waves[a].wavespawns[b].waitforallspawned);
                    if (pos != null)
                    {
                        if (pos > b)
                        {
                             var rect = new fabric.Rect({
                                top: wavespawn_y,
                                left: wavespawn_x,
                                width: 200,
                                height: 100,
                                hasBorder: true,
                                stroke: 'red',
                                strokeWidth: 5,
                                fill:'transparent'
                            });
                            this.canvas.add(makeText('Calling Wavespawn That Is Ahead', wavespawn_x-100, wavespawn_y-70, 35, 'red'));

                            this.canvas.add(rect);
                        }
                        else
                        {
                            // caller (the waitforalldead)
                            const caller_x = wavespawn_x-40;
                            const caller_y = wavespawn_y;
                            const connection_y = caller_y-this.spacing_y+b*20+20;
                            const reciever_x = wavespawn_dict[pos]+40;

                            this.canvas.add(makeLine([caller_x, caller_y, caller_x, connection_y], '#00ba37'));
                            // connection line long
                            this.canvas.add(makeLine([caller_x, connection_y, reciever_x, connection_y], '#00ba37'));
                            // reciever (the classname we are calling)
                            const reciever = makeLine([reciever_x, connection_y, reciever_x, caller_y], '#00ba37');
                            this.canvas.add(new fabric.Triangle({
                                width: 20, height: 30, fill: 'white', left: (caller_x+reciever_x)/2, top: connection_y, angle: 270
                            }));
                            this.canvas.add(new fabric.Triangle({
                                width: 20, height: 30, fill: 'white', left: caller_x, top: caller_y-70, angle: 0
                            }));

                            this.canvas.add(new fabric.Triangle({
                                width: 20, height: 30, fill: 'white', left: reciever_x, top: caller_y-70, angle: 180
                            }));

                            this.canvas.add(reciever);
                            this.canvas.sendToBack(reciever);
                        }
                    }
                }
                else if (waves[a].wavespawns[b].waitforalldead)
                {
                    const pos = findWithAttr(waves[a].wavespawns, 'name', waves[a].wavespawns[b].waitforalldead);
                    if (pos != null)
                    {
                        if (pos > b)
                        {
                             var rect = new fabric.Rect({
                                    top: wavespawn_y,
                                    left: wavespawn_x,
                                    width: 200,
                                    height: 100,
                                    hasBorder: true,
                                    stroke: 'red',
                                    strokeWidth: 5,
                                    fill:'transparent'
                            });
                            this.canvas.add(makeText('Calling Wavespawn That Is Ahead', wavespawn_x-100, wavespawn_y-70, 35, 'red'));

                            this.canvas.add(rect);
                        }
                        else
                        {
                            // caller (the waitforalldead)
                            const caller_x = wavespawn_x-50;
                            const caller_y = wavespawn_y;
                            const connection_y = caller_y-this.spacing_y+b*20+20;
                            const reciever_x = wavespawn_dict[pos]+50;

                            this.canvas.add(makeLine([caller_x, caller_y, caller_x, connection_y], '#e07b00'));
                            // connection line long
                            this.canvas.add(makeLine([caller_x, connection_y, reciever_x, connection_y], '#e07b00'));
                            // reciever (the classname we are calling)
                            const reciever = makeLine([reciever_x, connection_y, reciever_x, caller_y], '#e07b00');
                            this.canvas.add(new fabric.Triangle({
                                width: 20, height: 30, fill: 'white', left: (caller_x+reciever_x)/2, top: connection_y, angle: 270
                            }));
                            
                            this.canvas.add(new fabric.Triangle({
                                width: 20, height: 30, fill: 'white', left: caller_x, top: caller_y-70, angle: 0
                            }));

                            this.canvas.add(new fabric.Triangle({
                                width: 20, height: 30, fill: 'white', left: reciever_x, top: caller_y-70, angle: 180
                            }));

                            this.canvas.add(reciever);
                            this.canvas.sendToBack(reciever);
                        }
                    }
                }

                this.canvas.add(makeLine([wave_x, wave_y, wavespawn_x, wave_y]));
                this.canvas.add(makeLine([wavespawn_x, wave_y, wavespawn_x, wavespawn_y]));
                this.canvas.add(makeNode(`WaveSpawn ${b+1}`, wavespawn_x, wavespawn_y));
                if (waves[a].wavespawns[b].name != null)
                {
                    this.canvas.add(makeText(waves[a].wavespawns[b].name, wavespawn_x, wavespawn_y+50));
                }
            }
            //wave_x += wavespawn_indent

            // add node & connection lines
            this.canvas.add(makeLine([this.starting_offset_x, this.starting_offset_y, wave_x, this.starting_offset_y]));
            this.canvas.add(makeLine([wave_x, this.starting_offset_y, wave_x, wave_y]));
            this.canvas.add(makeNode(`Wave ${a+1}`, wave_x, wave_y));
        }
    }

    Editor.prototype.loadPop = function(population)
    {
        this.loadWaves(population.waves);
        this.canvas.add(makeNode('WaveSchedule', this.starting_offset_x, this.starting_offset_y));
    }
}
