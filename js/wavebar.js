"use strict";

function wavebar(canvas)
{
	this.canvas = canvas;
	this.icons = new Array();

	// this is shite, gets made every time it's created
	this.starting_offset_y = 100;
	this.icon_middle_x = 600;
	this.starting_offset_x = 400;
	this.icon_spacing_x = 105;
	this.icon_spacing_y = 60;

	// RGB - 187,21,0 (giant)
	// RGB - 0,207,236 (crit frame 1)
	// RGB - 0,154,198 (crit frame 2)
	// RGB - 230,224,198 (default)
	wavebar.prototype.addIcon = function(icon_img, count='0', back_color='#e6e0c6')
	{
		// mama mia that is sum spicy pasta
		let rect_crits = null;
		let rect = null;
		if (back_color == '#00cfec')
		{
			rect_crits = new fabric.Rect({
				width: 70,
				height: 70,
				fill: back_color,
			});
			back_color = '#e6e0c6';
			rect = new fabric.Rect({
				left: 3,
				top: 3,
				width: 64,
				height: 64,
				fill: back_color,
				rx: 10,
				ry: 10
			});
		}
		else
		{
			rect = new fabric.Rect({
				width: 70,
				height: 70,
				fill: back_color,
				rx: 10,
				ry: 10
			});
		}


		const icon = new fabric.Image(icon_img, {
			// offset inside the rect
			left: 3,
			top: 3,
			width: 64,
			height: 64,
		});

		const text = new fabric.Text(count, {
			left: 30,
			top: 75,
			fill: 'white',
			fontSize: 20
		});
		const group = new fabric.Group([rect_crits, rect, icon, text]);
		this.icons.push(group);
		this.canvas.add(group);
	}

	wavebar.prototype.renderAll = function()
	{
		// where should the icons x pos be?
		//let icon_x = this.icon_middle_x + this.icons.length*this.icon_spacing_x/2;
		let icon_x = this.icons.length*this.icon_spacing_x/2+this.starting_offset_x;
		console.log(this);
		for (let a = 0; a < this.icons.length; a++)
		{
			console.log(this.icons[a]);
			this.icons[a].set({'left': icon_x, 'top': this.icon_spacing_y});
			this.icons[a].setCoords();
			//this.canvas.add(icons[a]);
			//this.canvas.add(makeNode(`Wave`, icon_x, this.icon_spacing_y));
			icon_x += this.icon_spacing_x;
		}
		this.canvas.renderAll();
	}

}

function makeText(text, left, top, fill, fontsize)
{
	var c = new fabric.Text(text, { 
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