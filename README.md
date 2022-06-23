# Our Project
This is a project that has been implemented as part of the [Coding da Vinci Hakathon](https://codingdavinci.de/) and uses this
[data set](https://codingdavinci.de/daten/look-me-100-gesichter-100-geschichten) from the Augustinermuseum.
Our project can be split into three use cases: 

1) Style Transfer 
2) Similarity
3) Exploration

## Getting Started 
### Architecture
Our Project consists of python python backend (`styletransfer`, `similarity`, `videos`, `utils`), 
and javascript react bootstrap frontend (`sda_mathcer`). Connection is performed through flask in python and ajax in javascript.

### Prerequisites
1. Install the environment with conda
2. Install python flask server on the remote server with GPU
3. Start app.py on the remote server
4. Start the tunnel from the server to your local device with 127.0.0.1:5000
5. Install react and npm on the local device 
6. Install all dependencies in sdm_matcher using npm
7. Start the localhost 


### Style Transfer
#### Description
This is a modification of [Neural Neighbor Style Transfer](https://github.com/nkolkin13/NeuralNeighborStyleTransfer)
Some modifications are done to perform FP16 iterations on GPU. 
This modification reduces execution time by factor 2 and the quality remains almost the same.

#### Use
The interface `execute_one` proposes the method `execute_one(...)` for processing of one image with image style.
The content and style images are awaited under `/styletransfer/NeuralNeighborStyleTransfer/inputs`

 ### Similarity 
 We adapted the unsupervised learning method to cluster portraits. The trained-well clustering model was stored in a pickle file. And these portraits were clustered into eight groups and stored in a pickle file. Also, when a user uploads a new picture by GUI, we exploit the similarity and make a reliable prediction that portraits in which cluster has the highest similarity with this new picture.
 
 The details are as follows:
1) Extract the features of each portrait.
2) Apply the k-means algorithm to process the feature matrix and form a robust clustering model.
3) Use this model and predict function to decide a new picture belongs to which cluster.
4) Return all the portraits in this cluster.

 How to use it?
1) Run the requirements.txt and import all the necessary packages.
2) Run the cluster function to train a model.
3) Run the prediction function to get the most similar portraits.

 ### Exploration 
 We created videos in .mp4 form with lip-sync, where the portraits introduce themselves. 
 Files that are relevant for this use case including requirements.txt can be found in /videos.

To realise this we had to go through the following steps: 
1) Extract the needed information from JSON file provided in the data set for every portrait. 
(Extraction code can be found in text_to_speech.py)
2) Convert the resulting text to audio. For Female voice in German we used the gtts library [here](https://gtts.readthedocs.io/en/latest/).
For male voice in german we used the ibm-watson library [here](https://cloud.ibm.com/catalog/services/text-to-speech) and the available voice models can be found [here](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices).
3) Convert the .jpg to .mp4 videos. A face has to be available in every frame or else the model (see next step) will through an error.
4) Feed the [Wav2Lip Model](https://github.com/Rudrabha/Wav2Lip) each audio and video and the output will be a video in an mp4 format with lip-sync. 

All video results can be found [here](https://drive.google.com/drive/folders/1Aym3jpz2XV2FUKID8KyKFOQnHHV5MXBC?usp=sharing). 
