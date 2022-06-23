import os, sys
ROOT_DIR = os.getcwd()
print(ROOT_DIR)
from keras.preprocessing.image import load_img
#import tensorflow as tf 
#from tensorflow.keras.utils import load_img

from keras.applications.vgg16 import preprocess_input

# models
from keras.applications.vgg16 import VGG16
from keras.models import Model
import pickle

# clustering
from sklearn.cluster import KMeans

# for everything else
import os
import numpy as np
import glo, config

#group = glo.get_value('group')

groups = {}

def extract_features_cluster(file, model):
    img = load_img(file, target_size=(224, 224))
    img = np.array(img)
    reshaped_img = img.reshape(1, 224, 224, 3)
    imgx = preprocess_input(reshaped_img)
    features = model.predict(imgx, use_multiprocessing=True)

    return features

def cluster():
    portraits = []
    data = {}
    path = "/Users/lenajd/Documents/python_work/Praktikum/Ex2/pictures/pictures"
    # read metadata
    os.chdir(path)
    with os.scandir(path) as files:
        for file in files:
            if file.name.endswith('.jpg'):
                portraits.append(file.name)

    model = VGG16()
    model = Model(inputs=model.inputs, outputs=model.layers[-2].output)

    for portrait in portraits:
        feature = extract_features_cluster(portrait, model)
        data[portrait] = feature

    filenames = np.array(list(data.keys()))
    feature = np.array(list(data.values()))
    feature = feature.reshape(-1, 4096)

    kmeans = KMeans(random_state=22)
    kmeans.fit(feature)
    kmeans_model = open("/Users/lenajd/Documents/pythonProject/data_app/kmean.pickle", 'wb')
    pickle.dump(kmeans, kmeans_model)
    kmeans_model.close()

    for file, cluster in zip(filenames, kmeans.labels_):
        if cluster not in groups.keys():
            groups[cluster] = []
            groups[cluster].append(file)
        else:
            groups[cluster].append(file)

    return groups

def predict(path_pred):
    queries = []
    #f = open("/Users/lenajd/Documents/pythonProject/data_app/kmean.pickle", 'rb')
    model_weights = os.path.join(ROOT_DIR, "E2", "similarity", "kmean.pickle")
    f = open(model_weights, "rb")
    culster_model = pickle.load(f)
    #os.chdir(path_pred)
    #with os.scandir(path_pred) as files:
    #    for file in files:
            #if file.name.endswith('.jpg'):
    queries.append(path_pred)
    data_pred = {}  # features for queries

    model = VGG16()
    model = Model(inputs=model.inputs, outputs=model.layers[-2].output)

    for query in queries:
        feat_new = extract_features_cluster(query, model)
        data_pred[query] = feat_new

    feat_new = np.array(list(data_pred.values()))
    feat_new = feat_new.reshape(-1, 4096)

    pred = culster_model.predict(feat_new)

    print('the query is similar to cluster ', pred)


    f.close()
    groups=cluster()
    return groups[pred]
#file_name = os.path.join(ROOT_DIR, "E2", "styletransfer", "NeuralNeighborStyleTransfer", "inputs", "content", "rsz_dima.png")
#print("FILENAME:")
#print(file_name)
#file_name = "/home/uwgdz/tmp/SDAPraktikum/E2/styletransfer/NeuralNeighborStyleTransfer/inputs/style/smf_aug_xxx_01573_003.jpg"
#predict(file_name)
