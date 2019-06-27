var root = document.body

var Client = {
    view: function(vnode) {
        return m("main", {class: "main"}, [
            m("ul.pure-menu pure-menu-horizontal",
                m("ul.pure-menu-list", [
                    m("li.pure-menu-item", m("a.pure-menu-link", {href:"/"}, "Home")),
                    m("li.pure-menu-item", m("a.pure-menu-link", {href:"create"}, "Create")),
                    m("li.pure-menu-item pure-menu-selected", m("a.pure-menu-link", {href:"list"}, "List"))
                ])
            ),
            m("h1", {class: "small-margin-bottom"}, "Raspberry Pi LED Controller")
        ])
    }
}

m.mount(root, Client)

