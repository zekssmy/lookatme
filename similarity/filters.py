import json
import os, sys
import re
ROOT_DIR = os.getcwd()
sys.path.append(ROOT_DIR)
METADATA = os.path.join(ROOT_DIR, "E2", "similarity", 'smf_codingDaVinci_2022-03-30.json')


def get_style_pics():
    path = os.path.join(ROOT_DIR, "E2", "styletransfer", "NeuralNeighborStyleTransfer", "inputs", "style")
    cropped_portraits = []
    with os.scandir(path) as files:
        for file in files:
            if file.name.endswith('.jpg'):
                cropped_portraits.append(file.name)
    return cropped_portraits


PORTRAITS = get_style_pics()


def find_hashtags(query):
    result = []
    with open(METADATA, "r") as f:
        data = json.load(f)

    for i in range(len(data)):
        l = list(data[i]['profil'].replace(" ", "").replace(";", "").split("#"))
        set_l = set(l)
        set_query = set(query)
        intersection = list(set_l & set_query)
        if len(intersection) != 0:
            for foto in data[i]['fotos']:
                if foto['dateiname'] in PORTRAITS:
                    result.append(foto['dateiname'])
    return result


def find_location(query):
    result = []
    with open(METADATA, "r") as f:
        data = json.load(f)

    for i in range(len(data)):
        dargestelltePerson = False
        dargestelltePerson_id = -1
        kunstler = False
        kunstler_id = -1
        for j in range(len(data[i]['person'])):
            if data[i]['person'][j]['rolle'].lower() == "dargestellte person":
                dargestelltePerson = True
                dargestelltePerson_id = j
            if data[i]['person'][j]['rolle'].lower() == "künstler/in":
                kunstler = True
                kunstler_id = j

        if dargestelltePerson or kunstler:
            if dargestelltePerson:
                person = data[i]['person'][dargestelltePerson_id]
            else:
                person = data[i]['person'][kunstler_id]
            if 'ort' in person.keys():
                for ort in person['ort']:
                    if ort['typ'].lower() == 'geburtsort':
                        if ort['term'] == query:
                            for foto in data[i]['fotos']:
                                if foto['dateiname'] in PORTRAITS:
                                    result.append(foto['dateiname'])
    return result

def find_age(age):
    with open(METADATA, "r") as f:
        portraits = json.load(f)
    filtered_portraits=[]
    for portrait in portraits:
        if regex_matcher(portrait['alter'],age):
            for foto in portrait['fotos']:
                if foto['dateiname'] in PORTRAITS:
                    filtered_portraits.append(foto['dateiname'])
    return filtered_portraits

def regex_matcher(s,age):
    if re.search("-", s):
       r=list(map(int, s.split("-")))
       if (age>=r[0]) and (age<=r[1]):
           return True
    elif s.isdigit():
        if age is int(s):
            return True
    elif s=="späte 50er":
        if 55 <= age <=60:
            return True
    else:
        if 20 <= age <=25:
            return True
    return False

#print(find_hashtags(['Wein']))
#print(find_location("Karlsruhe"))
#print(find_age(25))
