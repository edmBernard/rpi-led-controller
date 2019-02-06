var root = document.body
var count = 0 // added a variable

var dim = 8;
var board_size = 400;
var square_size = board_size / dim;
var border_grid_size = 1
var square_list = []

// 0, 0, 0, 0, 0, 0, 0, 0,
// 0, 0, 0, 0, 0, 0, 0, 0,
// 0, 0, 0, 0, 0, 0, 1, 0,
// 1, 0, 0, 0, 0, 0, 0, 1,
// 1, 0, 1, 1, 0, 0, 0, 1,
// 0, 0, 0, 0, 1, 0, 0, 1,
// 0, 0, 0, 0, 0, 1, 1, 0,
// 0, 0, 0, 0, 0, 0, 0, 0,

var color_wheel = []
for (let i = 0; i < 360; i+=20) {
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

function turn_rainbow() {
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            square_list[i+dim*j].color_idx = j + i;
            square_list[i+dim*j].attr({fill: color_wheel[square_list[i+dim*j].color_idx++]});
        }
    }
}

function turn_invader() {
    let color1 = color_wheel.length - 1;
    let color2 = 7;
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
    let color1 = color_wheel.length - 1;
    let color2 = 0;
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
        return m("board", m("svg", {id: "svg", width: board_size, height: board_size}));
    }
}

var Client = {
    view: function(vnode) {
        return m("main", [
            m("h1", "Raspberry led controler"),
            m("div", {class: "pure-g"}, [
                m("div", {class: "pure-u-1"},
                    m("button", {class: "pure-button pure-button-primary button-on", onclick: turn_on}, "Turn ON"),
                    m("button", {class: "pure-button pure-button-primary button-on", onclick: turn_off}, "Turn OFF"),
                    m("button", {class: "pure-button pure-button-primary button-on", onclick: turn_reset}, "Reset")
                )
            ]),
            m(Board),
            m("div", {class: "pure-g"},
                m("div", {class: "pure-u-1 pure-button-group", role: "group"}, [
                    m("button", {class: "pure-button"}, "Benjamin"),
                    m("button", {class: "pure-button", onclick: turn_rainbow}, "Rainbow"),
                    m("button", {class: "pure-button", onclick: turn_invader}, "Invader"),
                    m("button", {class: "pure-button", onclick: turn_question}, "Question")
                ])
            )
        ])
    }
}

m.mount(root, Client)

var s = Snap("#svg");
for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
        let square = s.rect(i * square_size, j * square_size, square_size - border_grid_size, square_size - border_grid_size);
        square.attr({fill: color_wheel[0]});
        square.color_idx = 1;  // Inject color index

        square_list.push(square);

        square.click(function () {
            if (square.color_idx >= color_wheel.length)
                square.color_idx = 0;
            square.attr({fill: color_wheel[square.color_idx++]});
        });
    }
}


