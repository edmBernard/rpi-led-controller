import json
from fire import Fire
from bottle import Bottle, request, response, run, static_file

app = Bottle()


@app.route("/")
def do_main():
    return static_file("index.html", root="../client/")


@app.route("/<filename:path>")
def do_static(filename):
    """
        Sert les fichiers statiques
    """
    return static_file(filename, root="../client/")

@app.route("/udpate/")
def do_update():
    return "Data updated"


def main(port=8000, server="tornado"):
    run(app, host="0.0.0.0", port=port, server=server)


if __name__ == "__main__":
    Fire(main)
