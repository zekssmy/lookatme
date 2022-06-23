import os, sys
ROOT_DIR = os.getcwd()
print(ROOT_DIR)
sys.path.append(ROOT_DIR)
from E2.similarity.clustering import extract_features_cluster

import os
import pickle

import numpy as np

from keras.applications.vgg16 import VGG16
from keras.models import Model

def predict(profile_path):
    queries = []
    portraits=[]
    groups = {}
    #f = open("/home/xintian/Downloads/kmean.pickle", 'rb')
    model_weights = os.path.join(ROOT_DIR, "E2", "similarity", "kmean.pickle")
    print("MODEL WEIGHTS:", model_weights)
    f = open(model_weights, "rb")
    cluster_model = pickle.load(f)
    queries.append(profile_path)
    data_pred = {}  # features for queries

    model = VGG16()
    model = Model(inputs=model.inputs, outputs=model.layers[-2].output)

    for query in queries:
        feat_new = extract_features_cluster(query, model)
        data_pred[query] = feat_new

    feat_new = np.array(list(data_pred.values()))
    feat_new = feat_new.reshape(-1, 4096)

    pred = cluster_model.predict(feat_new)

    print('the query is similar to cluster ', pred)
    #path = os.path.join("/home/xintian/Downloads/croppedFotos")
    path = os.path.join(ROOT_DIR, "E2", "styletransfer", "NeuralNeighborStyleTransfer", "inputs", "style")
    os.chdir(path)
    with os.scandir(path) as files:
        for file in files:
            if file.name.endswith('.jpg'):
                portraits.append(file.name)
    for portrait, cluster in zip(portraits, cluster_model.labels_):
        if cluster not in groups.keys():
            groups[cluster] = []
            groups[cluster].append(portrait)
        else:
            groups[cluster].append(portrait)
    f.close()
    return groups[pred[0]]
#file_name = "/home/uwgdz/tmp/SDAPraktikum/E2/styletransfer/NeuralNeighborStyleTransfer/inputs/content/rsz_dima.png"
#print(predict(file_name))

