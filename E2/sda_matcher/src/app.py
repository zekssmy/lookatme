# Based on https://towardsdatascience.com/talking-to-python-from-javascript-flask-and-the-fetch-api-e0ef3573c451
from flask import Flask, jsonify, request, render_template

from E2.styletransfer.execute_one import execute_one, execute_one_stub

app = Flask(__name__)


@app.route('/getstyletransfer/<input>/<style>', methods=['GET', 'POST'])
def data_get(input, style):
    output_path = execute_one_stub(input, style) # execute_one_stub for imitation of functionality of execute_one!!!
    if request.method == 'POST':  # POST request
        print(request.get_text())  # parse as text
        return 'OK', 200
    else:  # GET request
        return output_path

""" 
Stub for clustering
@app.route('/getclustering/<input>', methods=['GET', 'POST'])
def data_get2(input):
    #output = similariy(input)
    if request.method == 'POST':  # POST request
        print(request.get_text())  # parse as text
        return 'OK', 200
    else:  # GET request
        return output
"""

if __name__ == "__main__":
    app.run(debug=True)