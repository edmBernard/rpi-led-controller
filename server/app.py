import json
from fire import Fire
from bottle import Bottle, request, response, run, static_file
from sense_hat import SenseHat

sense = SenseHat()
app = Bottle()
app.hat = sense

@app.route("/")
def do_main():
    return static_file("index.html", root="../client/")


@app.route("/<filename:path>")
def do_static(filename):
    """
        Sert les fichiers statiques
    """
    return static_file(filename, root="../client/")

@app.route("/update", method='POST')
def do_update():
    print(json.loads(request.body.getvalue().decode('utf-8')))
    colors = json.loads(request.body.getvalue().decode('utf-8'))

    print([[int(i.lstrip("#")[j:j+2], 16) for j in (0, 2, 4)] for i in colors])

    pixels = [[int(i.lstrip("#")[j:j+2], 16) for j in (0, 2, 4)] for i in colors]

    app.hat.set_pixels(pixels)

    response.status = 200
    return json.dumps({"message":"Data updated"})


def main(port=8000, server="tornado"):
    run(app, host="0.0.0.0", port=port, server=server)


if __name__ == "__main__":
    Fire(main)
