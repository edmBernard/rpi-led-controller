var root = document.body
var count = 0 // added a variable

var dim = 8;
var board_size = 400;
var square_size = board_size / dim;
var border_grid_size = 1
var square_list = []

var color_wheel = []
for (let i = 0; i < 360; i+=20) {
    color_wheel.push("hsl(" + i/360 + ", 100%, 50%)");
}

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
                    m("button", {class: "pure-button pure-button-primary button-on", onclick: turn_off}, "Turn OFF")
                )
            ]),
            m(Board),
            m("div", {class: "pure-g"},
                m("div", {class: "pure-u-1 pure-button-group", role: "group"}, [
                    m("button", {class: "pure-button"}, "Benjamin"),
                    m("button", {class: "pure-button"}, "Rainbow"),
                    m("button", {class: "pure-button"}, "Invader")
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
            console.log(square.color_idx);
            console.log(color_wheel[square.color_idx]);
            square.attr({fill: color_wheel[square.color_idx++]});
        });
    }
}


