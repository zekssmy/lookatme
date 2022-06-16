from keras.preprocessing.image import load_img
from keras.applications.vgg16 import preprocess_input

# models
from keras.applications.vgg16 import VGG16
from keras.models import Model

# clustering and dimension reduction
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

# for everything else
import os
import numpy as np
import json

def cluster(path):
    portraits = []
    data = {}
    groups = {}
    json_groups = {}

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

    # PCA dimension reduction
    pca = PCA(random_state=22)
    pca.fit(feature)
    x = pca.transform(feature)

    kmeans = KMeans(random_state=22)
    kmeans.fit(x)

    for file, cluster in zip(filenames, kmeans.labels_):
        if cluster not in groups.keys():
            groups[cluster] = []
            groups[cluster].append(file)
        else:
            groups[cluster].append(file)

    json_groups = json.dumps(groups, skipkeys=True)

    # print(groups)

    return json_groups

def extract_features_cluster(file, model):
    img = load_img(file, target_size=(224, 224))
    img = np.array(img)
    reshaped_img = img.reshape(1, 224, 224, 3)
    imgx = preprocess_input(reshaped_img)
    features = model.predict(imgx, use_multiprocessing=True)
    return features



