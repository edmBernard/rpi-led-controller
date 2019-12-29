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

@app.route("/list")
def do_list():
    return static_file("list.html", root="../client/")


@app.route("/<filename:path>")
def do_static(filename):
    """
        Sert les fichiers statiques
    """
    return static_file(filename, root="../client/")

@app.route("/updateall", method='POST')
def do_update_all():
    pixels = json.loads(request.body.getvalue().decode('utf-8'))

    colors = [[int(i.lstrip("#")[j:j+2], 16) for j in (0, 2, 4)] for i in pixels]

    app.hat.set_pixels(colors)

    response.status = 200
    return json.dumps({"message":"Data updated"})

@app.route("/updateone", method='POST')
def do_update_one():
    pixel = json.loads(request.body.getvalue().decode('utf-8'))

    color = [int(pixel["color"].lstrip("#")[j:j+2], 16) for j in (0, 2, 4)]

    app.hat.set_pixel(pixel["x"], pixel["y"], color)

    response.status = 200
    return json.dumps({"message":"Data updated"})


def main(port=8000, server="tornado"):
    run(app, host="0.0.0.0", port=port, server=server)


if __name__ == "__main__":
    Fire(main)
