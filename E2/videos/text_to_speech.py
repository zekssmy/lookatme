from numpy import array
from gtts import gTTS
from playsound import playsound 
import json 
import os
import sys 
import pyttsx3 
#from tts_watson.TtsWatson import TtsWatson
from ibm_watson import TextToSpeechV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator



language = 'de'
image_folder = r'C:/Users/olaei/OneDrive/Documents/Uni/Master/PSDA/SDAPraktikum/E2/videos/audio_males'

def split_hashtags(line):
    hobbys = line.split(';')
    without_hashtags = []
    for hobby in hobbys:
        hobby = hobby.replace(" ", "")
        without_hashtags.append(hobby[1:])
    return without_hashtags

#function to create sentence for hobby depending on the number of hobbys in the list
#since the number of hobbys is consistent
def count_ands_needed(hobby: array):
    i = 1
    if len(hobby) >= 1: 

        result = hobby[0] + " und "
        while i < len(hobby) - 1 :
            result = result +  hobby[i] + " und "  
            i += 1
        result = result + hobby[len(hobby)-1]
    return result




def from_json_to_speech(): 
    all_categories = ['alter', 'museum', 'sammlung', 'profil']
    empty = []
    for image in os.listdir(image_folder):
        image = (str(image).split('.')[0]) + ".jpg"
        empty.append(image)
    with open(os.path.join(sys.path[0], "metadata.json"), "r", encoding="utf8") as f:
        #load json file that contains all metadata
        d = json.load(f)
    for image in empty:
        for v in d: 
            for w in v['fotos']:
                if w['dateiname']  == image:
                    print('-----------------------')
                    print(v)
                    hobbys = split_hashtags(v['profil'])  
                    hobby_sentence = count_ands_needed(hobbys)
                    person_details = get_person_details(v)
                    all_data = {'alter': v['alter'], 'museum': v['museum'], 'sammlung': v['sammlung'], 'profil': hobby_sentence,
                    'people': person_details}
                    #assign 'unbekannt' to all empty keys
                    for category in all_categories:
                        if category not in all_data:
                            all_data[category] = 'unbekannt'
                    text = from_json_to_text(all_data) 
                    name_image  = str(image).split('.')[0]
                    speech = from_text_to_speech(text, False, name_image)

#retrieve details related to a person from the metadaten json file
def get_person_details(v:dict): 
    all_categories =['artist', 'geburtsort_a', 'todesort_a', 'geburtsdatum_a', 'todesdatum_a', 'portrait',
     'geburtsort_p', 'todesort_p', 'geburtsdatum_p', 'todesdatum_p']
    data_person = {} 
    i = 0
    print(v['person'])
    print(len(v['person']))
    while i < len(v['person']): 
        try:
            if v ['person'][i]['rolle'].startswith('Künstler'): 
                try:
                    data_person['artist'] = v['person'][i]['vorname']
                except KeyError:
                    pass
                try:
                    data_person['artist'] = data_person['artist'] +  " "+ v['person'][i]['nachname']
                except KeyError:
                    pass
                try:   
                    for o in v['person'][i]['ort']:
                        if o['typ'] == 'Geburtsort':
                            data_person['geburtsort_a'] = o['term'] 
                        if o['typ'] == 'Todesort': 
                            data_person['todesort_a'] = o['term'] 
                except KeyError:
                    pass
        
                try:
                    for o in v['person'][i]['datum']:
                        if o['typ'] == 'Geburtsdatum':
                            data_person['geburtsdatum_a'] = o['term'] 
                        if o['typ'] == 'Todesdatum': 
                            data_person['todesdatum_a'] = o['term']
                except KeyError:
                    pass
        except KeyError:
            pass

        try:
            if v ['person'][i]['rolle'] == 'Dargestellte Person': 
                try:
                    data_person['portrait'] = v['person'][i]['vorname']
                except KeyError:
                    pass
                try:
                    data_person['portrait'] = data_person['portrait'] +" "+ v['person'][i]['nachname']
                    print(data_person, "!!")
                except KeyError:
                    pass
            
                try:
                    for o in v['person'][i]['ort']:
                        if o['typ'] == 'Geburtsort':
                            data_person['geburtsort_p'] = o['term'] 
                        if o['typ'] == 'Todesort': 
                            data_person['todesort_p'] = o['term']  
                except KeyError:
                    pass

                try:
                    for o in v['person'][i]['datum']:
                        if o['typ'] == 'Geburtsdatum':
                            data_person['geburtsdatum_p'] = o['term'] 
                        if o['typ'] == 'Todesdatum': 
                            data_person['todesdatum_p'] = o['term']
                except KeyError:
                    pass

        except KeyError:
                pass        
        i +=  1          
        #print(data_person)
    #assign 'unbekannt' to all empty keys
    for category in all_categories:
        if category not in data_person:
            data_person[category] = 'unbekannt'
    return data_person



# function to fill in the blanks of a predefined text paragraph
def from_json_to_text(all_data:dict):  

        text= f"""Hallo, mein Name ist {all_data['people']['portrait']}. Ich bin {all_data['alter']} Jahre alt. Ich bin im Jahr
         {all_data['people']['geburtsdatum_p']} in {all_data['people']['geburtsort_p']} geboren und bin im Jahr {all_data['people']['todesdatum_p'] } in 
         {all_data['people']['todesort_p']} gestorben. Momentan bin ich ausgestellt im {all_data['museum']}. Ich wurde gemalt von {all_data['people']['artist']}. 
         Er ist im Jahr {all_data['people']['geburtsdatum_a']} in {all_data['people']['geburtsort_a']} geboren und im Jahr {all_data['people']['todesdatum_a']} gestorben.
         Meine Hobbys sind {all_data['profil']} """
         #{all_data['profil'][0]} und {all_data['profil'][1]} und {all_data['profil'][2]}
        return text

        
def from_text_to_speech(text, gender: bool, image): 
    if gender == True: 
        print(text)
        speech = gTTS(text = text, lang = language, slow = False)
        speech.save(f'{image}.wav')
    else: 
        #doesn't have a male voice
       # text = "Guten Tag, das ist ein Text"
        # engine = pyttsx3.init()
        # voices = engine.getProperty('voices')
        # engine.setProperty("voice", voices[1].id) 
        # engine.save_to_file(text, f'{image}.wav' ) 
        # engine.runAndWait()  
        url_key = 'your url_key'
        api = 'your_api'
        authenticator = IAMAuthenticator(api)
        text_to_speech = TextToSpeechV1(authenticator=authenticator)
        text_to_speech.set_service_url(url_key) 
        with open(f'./{image}.wav', 'wb') as audio_file:
            res = text_to_speech.synthesize(text, accept='audio/wav', voice='de-DE_DieterV3Voice').get_result()
            audio_file.write(res.content)




    
function = from_text_to_speech("Vielen Dank für die Aufmerksamkeit, gibt es Fragen?", False, 'outro')  
#function = from_speech_to_text() 
#function = male_voice()