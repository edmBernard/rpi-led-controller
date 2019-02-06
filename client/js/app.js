var root = document.body
var count = 0 // added a variable

// parameters
var dim = 8;
var board_size = 400;
var square_size = board_size / dim;

var nbr_color = 20 // don't change without break every things
var pellet_size = board_size / nbr_color;

var border_grid_size = 1

// Internal object
var square_list = []
var color_picked = 0

var color_wheel = []
for (let i = 0; i < 360; i+=360/nbr_color) {
    color_wheel.push("hsl(" + i/360 + ", 100%, 50%)");
}
color_wheel.push("#ffffff");
color_wheel.push("#000000");


function turn_off() {
    for (let i = 0; i < square_list.length; i++) {
        square_list[i].attr({fill: "#000000"});
    }
}

function turn_on() {
    for (let i = 0; i < square_list.length; i++) {
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx - 1]});
    }
}

function turn_reset() {
    for (let i = 0; i < square_list.length; i++) {
        square_list[i].color_idx = 0;
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx++]});
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
            square_list[i].color_idx = color1+1;
        } else {
            square_list[i].color_idx = color2+1;
        }
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx - 1]});
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
        0, 0, 0, 1, 1, 0, 0, 1,
        0, 0, 1, 1, 1, 0, 1, 0,
        0, 1, 1, 0, 1, 1, 0, 1,
        1, 1, 1, 1, 1, 0, 1, 0,
        1, 1, 1, 1, 1, 0, 1, 0,
        0, 1, 1, 0, 1, 1, 0, 1,
        0, 0, 1, 1, 1, 0, 1, 0,
        0, 0, 0, 1, 1, 0, 0, 1,
    ]

    for (let i = 0; i < square_list.length; i++) {
        if (schema[i] == 0) {
            square_list[i].color_idx = color1+1;
        } else {
            square_list[i].color_idx = color2+1;
        }
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx - 1]});
    }
}

function turn_question() {
    let color1 = color_wheel.length - 1;  // black
    let color2 = 0;  // red
    let schema = [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0,
        0, 1, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
    ]

    for (let i = 0; i < square_list.length; i++) {
        if (schema[i] == 0) {
            square_list[i].color_idx = color1+1;
        } else {
            square_list[i].color_idx = color2+1;
        }
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx - 1]});
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
                    m("button", {class: "pure-button pure-button-primary button-on", onclick: turn_on}, "Turn ON"),
                    m("button", {class: "pure-button pure-button-primary button-on", onclick: turn_off}, "Turn OFF"),
                    m("button", {class: "pure-button pure-button-primary button-on", onclick: turn_reset}, "Reset")
                )
            ]),
            m("div", {class: "pure-g"}, m("div", {class: "pure-u-1"}, m(ColorPicker))),
            m("div", {class: "pure-g"}, m("div", {class: "pure-u-1"}, m(Board))),
            m("div", {class: "pure-g"},
                m("div", {class: "pure-u-1 pure-button-group", role: "group"}, [
                    m("button", {class: "pure-button", onclick: turn_benjamin}, "Benjamin"),
                    m("button", {class: "pure-button", onclick: turn_rainbow}, "Rainbow"),
                    m("button", {class: "pure-button", onclick: turn_invader}, "Invader"),
                    m("button", {class: "pure-button", onclick: turn_question}, "Question")
                ])
            )
        ])
    }
}

m.mount(root, Client)


var sb = Snap("#board");
for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
        let square = sb.rect(i * square_size, j * square_size, square_size, square_size);
        square.attr({fill: color_wheel[0]});
        square.attr({stroke: "#ffffff", strokeWidth: 1});
        square.color_idx = 1;  // Inject color index property

        square_list.push(square);

        square.click(function () {
            square.attr({fill: color_wheel[color_picked]});
        });
    }
}



var sc = Snap("#colorpicker");
for (let i = 0; i < nbr_color; i++) {
    let square = sc.rect(i * pellet_size, 0, pellet_size - border_grid_size, square_size - border_grid_size);
    square.attr({fill: color_wheel[i]});
    square.color_idx = i;  // Inject color index property

    // square_list.push(square);

    square.click(function () {
        color_picked = square.color_idx;
    });
}


