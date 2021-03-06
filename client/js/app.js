var root = document.body
var count = 0 // added a variable

// parameters
var dim = 8;
var board_size = 400;
var square_size = board_size / dim;

var nbr_color = 20     // don't change without break every things
var nbr_color_row = 10 // don't change without break every things
var pellet_size = board_size / nbr_color;  // black and white color
var color_picker_height = 200

// Internal object
var square_list = []

// Create Color Wheel
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
for (let j = 0; j < nbr_color_row; j++) {
    for (let i = 0; i < 360; i+= 360/nbr_color) {
        color_wheel.push(rgb2hex(...hsl2rgb(i, 1, j/(nbr_color_row-1)*(0.7) + 0.2)));
    }
}
color_wheel.push("#ffffff");
color_wheel.push("#000000");

var color_picked = color_wheel.length - 2;

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

function sensehat_update_all() {
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
        url: "/updateall",
        data: c
    })
}

function sensehat_update_one(x, y) {
    return function() {

        m.request({
            method: "POST",
            url: "/updateone",
            data: {
                x: x,
                y: y,
                color: color_wheel[square_list[x+dim*y].color_idx]
            }
        })
    }
}

function sensehat_off() {
    let c = [];
    for (let i = 0; i < dim*dim; i++) {
        c.push(color_wheel[color_wheel.length - 1]);
    }
    m.request({
        method: "POST",
        url: "/updateall",
        data: c
    })
}

function fill_2color(schema, color1, color2) {
    for (let i = 0; i < square_list.length; i++) {
        square_list[i].color_idx = schema[i] == 0 ? color1 : color2;
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx]});
    }
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

function turn_fill() {
    for (let i = 0; i < square_list.length; i++) {
        square_list[i].color_idx = color_picked;
        square_list[i].attr({fill: color_wheel[square_list[i].color_idx]});
    }
}

function turn_rotate() {

    let c = [];
    for (let i = 0; i < dim*dim; i++) {
        c.push(square_list[i].color_idx);
    }

    for (let j = 0; j < dim; j++) {
        for (let i = 0; i < dim; i++) {
            let idx_tmp = dim*dim-dim*(i+1)+j
            console.log(idx_tmp);
            square_list[idx_tmp].color_idx = c[i+dim*j];
            square_list[idx_tmp].attr({fill: color_wheel[square_list[idx_tmp].color_idx]});
        }
    }
}

function turn_rainbow() {
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            square_list[i+dim*j].color_idx = j + i + nbr_color*nbr_color_row/2;
            square_list[i+dim*j].attr({fill: color_wheel[square_list[i+dim*j].color_idx]});
        }
    }
}

function turn_invader1() {
    let color1 = color_wheel.length - 1;  // black
    let color2 = 7+nbr_color*nbr_color_row/2;  // green
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
    fill_2color(schema, color1, color2);
}

function turn_invader2() {
    let color1 = color_wheel.length - 1;  // black
    let color2 = 4+nbr_color*nbr_color_row/2;  // white
    let schema = [
        0, 1, 0, 0, 0, 0, 1, 0,
        0, 0, 1, 1, 1, 1, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 0,
        1, 1, 0, 1, 1, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        0, 1, 1, 0, 0, 1, 1, 0,
        1, 0, 1, 0, 0, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
    ]
    fill_2color(schema, color1, color2);
}

function turn_question() {
    let color1 = color_wheel.length - 1;  // black
    let color2 = 0+nbr_color*nbr_color_row/2;  // red
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
    fill_2color(schema, color1, color2);
}

function turn_smiley() {
    let color1 = color_wheel.length - 1;  // black
    let color2 = 10+nbr_color*nbr_color_row/2;  // white
    let schema = [
        0, 0, 1, 1, 1, 1, 0, 0,
        0, 1, 0, 0, 0, 0, 1, 0,
        1, 0, 1, 0, 1, 0, 0, 1,
        1, 0, 1, 0, 1, 0, 0, 1,
        1, 0, 0, 0, 0, 1, 0, 1,
        1, 0, 1, 1, 1, 0, 0, 1,
        0, 1, 0, 0, 0, 0, 1, 0,
        0, 0, 1, 1, 1, 1, 0, 0,
    ]
    fill_2color(schema, color1, color2);
}

function turn_arrow() {
    let color1 = color_wheel.length - 1;  // black
    let color2 = 0+nbr_color*nbr_color_row/2;  // white
    let schema = [
        0, 0, 0, 1, 1, 0, 0, 0,
        0, 0, 0, 1, 1, 0, 0, 0,
        0, 0, 0, 1, 1, 0, 0, 0,
        1, 0, 0, 1, 1, 0, 0, 1,
        1, 1, 0, 1, 1, 0, 1, 1,
        0, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 1, 1, 0, 0, 0,
    ]
    fill_2color(schema, color1, color2);
}

var Board = {
    view: function(vnode) {
        return m("svg", {id: "board", width: board_size, height: board_size});
    }
}

var ColorPicker = {
    view: function(vnode) {
        return m("svg", {id: "colorpicker", width: board_size, height: color_picker_height});
    }
}

var Client = {
    view: function(vnode) {
        return m("main", {class: "main"}, [
            m("ul.pure-menu pure-menu-horizontal",
                m("ul.pure-menu-list", [
                    m("li.pure-menu-item pure-menu-selected", m("a.pure-menu-link", {href:"/"}, "Home")),
                    m("li.pure-menu-item", m("a.pure-menu-link", {href:"create"}, "Create")),
                    m("li.pure-menu-item", m("a.pure-menu-link", {href:"list"}, "List"))
                ])
            ),
            m("h1", {class: "small-margin-bottom"}, "Raspberry Pi LED Controller"),
            m("div", {class: "pure-g button-container"}, [
                m("div", {class: "pure-u-1 pure-button-group", role: "group"},
                    m("button", {class: "pure-button button-small pure-button-primary", onclick: function() {turn_on();sensehat_update_all()}}, "ON"),
                    m("button", {class: "pure-button button-small pure-button-primary", onclick: function() {turn_off();sensehat_off()}}, "OFF"),
                    m("button", {class: "pure-button button-small", onclick: function() {turn_fill();sensehat_update_all()}}, "Fill"),
                    m("button", {class: "pure-button button-small", onclick: function() {turn_rotate();sensehat_update_all()}}, "Rotate")
                )
            ]),
            m("div", {class: "pure-g button-container"},
                m("div", {class: "pure-u-1 pure-button-group", role: "group"}, [
                    m("button", {class: "pure-button button-small", onclick: function() {turn_rainbow();sensehat_update_all()}}, "Rainbow"),
                    m("button", {class: "pure-button button-small", onclick: function() {turn_invader1();sensehat_update_all()}}, "Invader 1"),
                    m("button", {class: "pure-button button-small", onclick: function() {turn_invader2();sensehat_update_all()}}, "Invader 2"),
                    m("button", {class: "pure-button button-small", onclick: function() {turn_question();sensehat_update_all()}}, "Question"),
                    m("button", {class: "pure-button button-small", onclick: function() {turn_smiley();sensehat_update_all()}}, "Smiley"),
                    m("button", {class: "pure-button button-small", onclick: function() {turn_arrow();sensehat_update_all()}}, ["Arrow ", m("i.far fa-trash-alt")])
                ])
            ),
            m("div", {class: "pure-g"}, m("div", {class: "pure-u-1"}, m(ColorPicker))),
            m("div", {class: "pure-g"}, m("div", {class: "pure-u-1"}, m(Board)))
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
                sensehat_update_one(i, j)();
            },
            function () {}
        );
    }
}

function create_pellet(form, row, col) {
    let square = form.rect(col*pellet_size, row*color_picker_height/(nbr_color_row+1), pellet_size, color_picker_height/(nbr_color_row+1));
    square.color_idx = col+row*nbr_color;  // Inject color index property
    square.attr({fill: color_wheel[square.color_idx]});
    square.attr({stroke: "#ffffff", strokeWidth: 1});

    square.click(function () {
        color_picked = square.color_idx;
        sensehat_update_all();
    });
}
function create_black(form, row, col) {
    let square = form.rect(col*board_size/2, row*color_picker_height/(nbr_color_row+1), board_size/2, color_picker_height/(nbr_color_row+1));
    square.color_idx = col+row*nbr_color;  // Inject color index property
    square.attr({fill: color_wheel[square.color_idx]});

    square.click(function () {
        color_picked = square.color_idx;
        sensehat_update_all();
    });
}

var sc = Snap("#colorpicker");
for (let j = 0; j < nbr_color_row; j++) {
    for (let i = 0; i < nbr_color; i++) {
        create_pellet(sc, j, i);
    }
}
create_black(sc, nbr_color_row, 0);
create_black(sc, nbr_color_row, 1);
