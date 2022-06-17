from clustering import extract_features,cluster
from sklearn.decomposition import PCA
import os
from keras.applications.vgg16 import VGG16
from keras.models import Model
from sklearn.metrics import mean_squared_error

def prediction(path_pred):
    model = VGG16()
    model = Model(inputs=model.inputs, outputs=model.layers[-2].output)
    # path_pred = "/home/xintian/Downloads/selfie(78)"
    os.chdir(path_pred)
    with os.scandir(path_pred) as files:
        for file in files:
            if file.name.endswith('.jpg'):
                feat_new = extract_features(file, model)
    feat_new.shape
    # todo
    pca = PCA(random_state=22)
    x_pca_new = pca.fit_transform(feat_new)
    sse_list = []
    centers, clusters = cluster("/home/xintian/Downloads/croppedFotos")
    for center in centers:
        sse_list.append(mean_squared_error(center, x_pca_new))
    cluster_Nr = sse_list.index(min(sse_list))
    # return a list of the names of recommended photos
    return clusters[cluster_Nr]