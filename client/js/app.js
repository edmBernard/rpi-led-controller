var root = document.body
var count = 0 // added a variable

var dim = 8;

var Square = {
    view: function(vnode) {
        return m("div" , {class: "pure-u-1-8"},
            m("button", {class: "pure-button", onclick: function() {count++}}, count + " clicks")
        );
    }
}

var Board = {
    view: function(vnode) {
        let board = [];
        let row = [];
        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                row.push(m(Square));
            }
            board.push(m("div", {class: "pure-g"}, row));
            row = [];
        }
        return m("board", board);
    }
}

var Client = {
    view: function(vnode) {
        return m("main", [
            m("h1", "Raspberry led controler"),
            m("div", {class: "pure-g"}, [
                m("div", {class: "pure-u-1"},
                    m("button", {class: "pure-button pure-button-primary button-on"}, "Turn ON"),
                    m("button", {class: "pure-button pure-button-primary button-on"}, "Turn OFF")
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


