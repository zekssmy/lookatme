import json
import re
def filter_age(age):
    age_portraits_dic={}
    with open("/home/xintian/Downloads/Museen/smf_codingDaVinci_2022-03-30.json", 'r') as f:
        portraits = json.load(f)
    filtered_portraits=[]
    for portrait in portraits:
        if regex_matcher(portrait['alter'],age):
           filtered_portraits.append(portrait['fotos'][0]['dateiname'])
        age_portraits_dic[portrait['fotos'][0]['dateiname']]=portrait['alter']
    return filtered_portraits
def regex_matcher(str,age):
    if re.search("-",str):
       range=list(map(int,str.split("-")))
       if age>=range[0] and age<=range[1]:
           return True
    elif str.isdigit():
        if age is int(str):
            return True
    elif str=="späte 50er":
        if age >= 55 and age <=60:
            return True
    else:
        if 20 <= age <=25:
            return True
    return False



if __name__ == "__main__":
    filter_age(30)