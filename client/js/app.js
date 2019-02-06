var root = document.body
var count = 0 // added a variable

// parameters
var dim = 8;
var board_size = 400;
var square_size = board_size / dim;

var nbr_color = 20 // don't change without break every things
var pellet_size = board_size / (nbr_color + 2);  // black and white color

var border_grid_size = 1

// Internal object
var square_list = []
var color_picked = 0


function hsl2rgb(h,s,l)
{
  let a=s*Math.min(l,1-l);
  let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
  return [f(0),f(8),f(4)];
}

// r,g,b are in [0-1], result e.g. #0812fa.
let rgb2hex = (r,g,b) =>
   "#" + [r,g,b].map( x=>Math.round(x*255).toString(16).padStart(2,0)
).join('');

var color_wheel = []
for (let i = 0; i < 360; i+=360/nbr_color) {
    color_wheel.push(rgb2hex(...hsl2rgb(i,1,0.5)));
}
color_wheel.push("#ffffff");
color_wheel.push("#000000");

function get_colors() {
    let c = [];
    if (square_list.length == 0) {
        for (let i = 0; i < dim*dim; i++) {
            c.push(color_wheel[color_wheel.length - 1]);
        }
    } else {
        for (let i = 0; i < square_list.length; i++) {
            c.push(color_wheel[square_list[i].color_idx]);
        }
    }
    return c;
}

function sensehat_update() {
    let c = [];
    if (square_list.length == 0) {
        for (let i = 0; i < dim*dim; i++) {
            c.push(color_wheel[color_wheel.length - 1]);
        }
    } else {
        for (let i = 0; i < square_list.length; i++) {
            c.push(color_wheel[square_list[i].color_idx]);
        }
    }
    m.request({
        method: "POST",
        url: "/update",
        data: c
    })
}

function sensehat_off() {
    let c = [];
    for (let i = 0; i < dim*dim; i++) {
        c.push(color_wheel[color_wheel.length - 1]);
    }
    m.request({
        method: "POST",
        url: "/update",
        data: c
    })
}

function turn_off() {
    for (let i = 0; i < square_list.length; i++) {
        square_list[i].attr({fill: "#000000"});
    }
}

function turn_on() {
    for (let i = 0; i < square_list.length; i++) {
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx]});
    }
}

function turn_reset() {
    for (let i = 0; i < square_list.length; i++) {
        square_list[i].color_idx = color_wheel.length - 1;
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx]});
    }
}

function turn_benjamin() {
    let color1 = 0;   // red
    let color2 = 10;  // blue
    let schema = [
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
    ]

    for (let i = 0; i < square_list.length; i++) {
        if (schema[i] == 0) {
            square_list[i].color_idx = color1;
        } else {
            square_list[i].color_idx = color2;
        }
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx]});
    }
}

function turn_rainbow() {
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            square_list[i+dim*j].color_idx = j + i;
            square_list[i+dim*j].attr({fill: color_wheel[square_list[i+dim*j].color_idx++]});
        }
    }
}

function turn_invader() {
    let color1 = color_wheel.length - 1;  // black
    let color2 = 7;  // green
    let schema = [
        0, 0, 0, 1, 1, 0, 0, 0,
        0, 0, 1, 1, 1, 1, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 0, 1, 1, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 1, 0, 0, 1, 0, 0,
        0, 1, 0, 1, 1, 0, 1, 0,
        1, 0, 1, 0, 0, 1, 0, 1,
    ]

    for (let i = 0; i < square_list.length; i++) {
        if (schema[i] == 0) {
            square_list[i].color_idx = color1;
        } else {
            square_list[i].color_idx = color2;
        }
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx]});
    }
}

function turn_question() {
    let color1 = color_wheel.length - 1;  // black
    let color2 = 0;  // red
    let schema = [
        0, 0, 0, 1, 1, 0, 0, 0,
        0, 0, 1, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0,
    ]

    for (let i = 0; i < square_list.length; i++) {
        if (schema[i] == 0) {
            square_list[i].color_idx = color1;
        } else {
            square_list[i].color_idx = color2;
        }
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx]});
    }
}


var Board = {
    view: function(vnode) {
        return m("board", m("svg", {id: "board", width: board_size, height: board_size}));
    }
}

var Board = {
    view: function(vnode) {
        return m("svg", {id: "board", width: board_size, height: board_size});
    }
}

var ColorPicker = {
    view: function(vnode) {
        return m("svg", {id: "colorpicker", width: board_size, height: square_size});
    }
}

var Client = {
    view: function(vnode) {
        return m("main", [
            m("h1", "Raspberry Pi LED Controler"),
            m("div", {class: "pure-g"}, [
                m("div", {class: "pure-u-1"},
                    m("button", {class: "pure-button pure-button-primary button-on", onclick: function() {turn_on();sensehat_update()}}, "Turn ON"),
                    m("button", {class: "pure-button pure-button-primary button-on", onclick: function() {turn_off();sensehat_off()}}, "Turn OFF")
                )
            ]),
            m("div", {class: "pure-g"}, m("div", {class: "pure-u-1"}, m(ColorPicker))),
            m("div", {class: "pure-g"}, m("div", {class: "pure-u-1"}, m(Board))),
            m("div", {class: "pure-g"},
                m("div", {class: "pure-u-1 pure-button-group", role: "group"}, [
                    m("button", {class: "pure-button button-error", onclick: function() {turn_reset();sensehat_update()}}, "Reset"),
                    m("button", {class: "pure-button", onclick: function() {turn_benjamin();sensehat_update()}}, "Benjamin"),
                    m("button", {class: "pure-button", onclick: function() {turn_rainbow();sensehat_update()}}, "Rainbow"),
                    m("button", {class: "pure-button", onclick: function() {turn_invader();sensehat_update()}}, "Invader"),
                    m("button", {class: "pure-button", onclick: function() {turn_question();sensehat_update()}}, "Question")
                ])
            )
        ])
    }
}

m.mount(root, Client)


var sb = Snap("#board");
for (let j = 0; j < dim; j++) {
    for (let i = 0; i < dim; i++) {
        let square = sb.rect(i * square_size, j * square_size, square_size, square_size);
        square.color_idx = color_wheel.length - 1;  // Inject color index property
        square.attr({fill: color_wheel[square.color_idx]});
        square.attr({stroke: "#ffffff", strokeWidth: 1});

        square_list.push(square);

        // square.click(function () {
        //     square.attr({fill: color_wheel[color_picked]});
        // });

        // ondrag function is more flexible than on click
        square.drag(
            function () {},
            function () {
                square.color_idx = color_picked;
                square.attr({fill: color_wheel[color_picked]});
                sensehat_update();
            },
            function () {}
        );
    }
}



var sc = Snap("#colorpicker");
for (let i = 0; i < nbr_color + 2; i++) {
    let square = sc.rect(i * pellet_size, 0, pellet_size - border_grid_size, square_size - border_grid_size);
    square.attr({fill: color_wheel[i]});
    square.color_idx = i;  // Inject color index property

    square.click(function () {
        color_picked = square.color_idx;
        sensehat_update();
    });
}


