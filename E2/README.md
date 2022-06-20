# Our Project
This is a project that has been implemented as part of the [Coding da Vinci Hakathon](https://codingdavinci.de/) and uses this
[data set](https://codingdavinci.de/daten/look-me-100-gesichter-100-geschichten) from the Augustinermuseum.
Our project can be split into three use cases: 

1) Style Transfer 
2) Similarity
3) Exploration

 ## Getting Started 
 ### Prerequisites


 ### Style Transfer
 Brief explanation of use-case + tools + steps followed to implement a functioning tool

 ### Similarity 
 Brief explanation of use-case + tools + steps followed to implement a functioning tool

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
