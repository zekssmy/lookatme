from numpy import array
from gtts import gTTS
from playsound import playsound 
import json 
import os
import sys 
import pyttsx3


language = 'de'
image_folder = r'C:/Users/olaei/OneDrive/Documents/Uni/Master/PSDA/Uebung2/Mann'

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
    print('------------------------------')
    all_categories = ['alter', 'museum', 'sammlung', 'profil']
    # for image in os.listdir(image_folder): 
    #     img = os.path.join()
    
    with open(os.path.join(sys.path[0], "metadata.json"), "r", encoding="utf8") as f:
        #load json file that contains all metadata
        d = json.load(f)
    for image in os.listdir(image_folder): 
        for v in d: 
            for w in v['fotos']:
                if w['dateiname']  == image:
                    print(image, "..........")
                    hobbys = split_hashtags(v['profil'])  
                    hobby_sentence = count_ands_needed(hobbys)
                    person_details = get_person_details(v['person'])
                    all_data = {'alter': v['alter'], 'museum': v['museum'], 'sammlung': v['sammlung'], 'profil': hobby_sentence,
                    'people': person_details}
                    print('--------------------')
                    print(all_data)
                    for category in all_categories:
                        if category not in all_data:
                            all_data[category] = 'unbekannt'
                    text = from_json_to_text(all_data) 
                    name_image = name = str(image).split('.')[0]
                    #gender = get_gender(v)
                    speech = from_speech_to_text(text, False ,name_image)
                    #return text     
              #return all_data

def get_person_details(v:dict): 
    all_categories =['artist', 'geburtsort_a', 'todesort_a', 'geburtsdatum_a', 'todesdatum_a', 'portrait',
     'geburtsort_p', 'todesort_p', 'geburtsdatum_p', 'todesdatum_p']
    data_person = {} 
    for person in v: 
        if person['rolle'].startswith('Künstler'): 
            try:
                data_person['artist'] = person['vorname']
            except KeyError:
                pass
            try:
                data_person['artist'] = data_person['artist'] +  " "+ person['nachname']
            except KeyError:
                pass
            try:   
                for o in person['ort']:
                    if o['typ'] == 'Geburtsort':
                        data_person['geburtsort_a'] = o['term'] 
                    if o['typ'] == 'Todesort': 
                        data_person['todesort_a'] = o['term'] 
            except KeyError:
                pass
            try:
                for o in person['datum']:
                    if o['typ'] == 'Geburtsdatum':
                        data_person['geburtsdatum_a'] = o['term'] 
                    if o['typ'] == 'Todesdatum': 
                        data_person['todesdatum_a'] = o['term']
            except KeyError:
                pass
            
        if person['rolle'] == 'Dargestellte Person': 
            #if person['vorname']: 
            try:
                data_person['portrait'] = person['vorname']
            except KeyError:
                pass
            try:
                data_person['portrait'] = data_person['portrait'] +" "+ person['nachname']
            except KeyError:
                pass
            
            try:
                for o in person['ort']:
                    if o['typ'] == 'Geburtsort':
                        data_person['geburtsort_p'] = o['term'] 
                    if o['typ'] == 'Todesort': 
                        data_person['todesort_p'] = o['term']  
            except KeyError:
                pass

            try:
                for o in person['datum']:
                    if o['typ'] == 'Geburtsdatum':
                        data_person['geburtsdatum_p'] = o['term'] 
                    if o['typ'] == 'Todesdatum': 
                        data_person['todesdatum_p'] = o['term']
            except KeyError:
                pass

        print(data_person)
        for category in all_categories:
            if category not in data_person:
                data_person[category] = 'unbekannt'
        return data_person



# function to fill in the blanks of a predefined
def from_json_to_text(all_data:dict):  

        text= f"""Hallo, mein Name ist {all_data['people']['portrait']}. Ich bin {all_data['alter']} Jahre alt. Ich bin im Jahr
         {all_data['people']['geburtsdatum_p']} in {all_data['people']['geburtsort_p']} geboren und bin im Jahr {all_data['people']['todesdatum_p'] } in 
         {all_data['people']['todesort_p']} gestorben. Momentan bin ich ausgestellt im {all_data['museum']}. Ich wurde gemalt von {all_data['people']['artist']}. 
         Er ist im Jahr {all_data['people']['geburtsdatum_a']} in {all_data['people']['geburtsort_a']} geboren und im Jahr {all_data['people']['todesdatum_a']} gestorben.
         Meine Hobbys sind {all_data['profil']} """
         #{all_data['profil'][0]} und {all_data['profil'][1]} und {all_data['profil'][2]}
        return text

        
def from_speech_to_text(text, gender: bool, image): 
    #text = read_json()
    if gender == True: 
        print(text)
        speech = gTTS(text = text, lang = language, slow = False)
        speech.save(f'{image}.wav')
    else: 
       # text = "Guten Tag, das ist ein Text"
        engine = pyttsx3.init()
        voices = engine.getProperty('voices')
        engine.setProperty("voice", voices[1].id) 
        engine.save_to_file(text, f'{image}.wav' ) 
        engine.runAndWait() 



#def male_voice(): 
    
    # for voice in voices:
    #     print(voice)
        #if voice.languages[0] == u'de_DE':
         #   engine.setProperty('voice', voice.id)
        #break

    # engine.say('Hello World')
    # engine.runAndWait()
    # for voice in voices:
    #     print(f"Voice: {voice.name}")
    

# def get_gender(info: dict): 
#     if info['term'] == 'Frau':
#         return True 
#     else:
#         return False
    
function = from_json_to_speech()  
#function = from_speech_to_text() 
#function = male_voice()