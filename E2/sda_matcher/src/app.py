# Based on https://towardsdatascience.com/talking-to-python-from-javascript-flask-and-the-fetch-api-e0ef3573c451
import os.path
import sys

from flask import Flask, jsonify, request, render_template, make_response, send_file
import io
from E2.styletransfer.execute_one import execute_one, execute_one_stub, OUTPUT_PATH
from E2.similarity.prediction import prediction

app = Flask(__name__)

ROOT_DIR = "/home/dmitrii/GitHub/SDAPraktikum/"
#ROOT_DIR = "/pfs/data5/home/kit/stud/uwgdz/SDAPraktikum"
#sys.path.append(ROOT_DIR)

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        fs = request.files.get('snap')
        if fs:
            print('FileStorage:', fs)
            print('filename:', fs.filename)
            fs.save(ROOT_DIR + "E2/styletransfer/NeuralNeighborStyleTransfer/inputs/content/"
                    + str(fs.filename))
            return 'Got Snap!'
        else:
            return 'You forgot Snap!'

    return 'Strange behaviour'


@app.route('/download/<filename>')
def download(filename):
    filename = os.path.join(ROOT_DIR + "E2/styletransfer/outputs", filename)
    return send_file(filename, mimetype='image/jpg')


@app.route('/getstyletransfer/<input>/<style>', methods=['GET', 'POST'])
def get_style_transfer(input, style):
    output_path = execute_one_stub(input, style) # execute_one_stub for imitation of functionality of execute_one!!!
    if request.method == 'POST':  # POST request
        print(request.get_text())  # parse as text
        return 'OK', 200
    else:  # GET request
        return output_path



@app.route('/getclustering/<path>', methods=['GET', 'POST'])
def get_clustering(path):
    images = prediction(path)
    if len(images)>20:
        images = images[:19]
    # todo: show the recommended images
    if request.method == 'POST':  # POST request
        print(request.get_text())  # parse as text
        return 'OK', 200
    else:  # GET request
        return images


if __name__ == "__main__":
    app.run()
