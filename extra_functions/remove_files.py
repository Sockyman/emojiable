import os
from pathlib import Path

folders = ["Apple", "DoCoMo", "Facebook", "Gmail", "Google", "JoyPixels",
"KDDI", "Samsung", "SoftBank", "Twitter", "Windows"]

files = ["123", "124", "125", "126", "127", "128", "129", "13*", "14*",
"15*", "16*", "17*", "18*", "19*", "200", "201", "202", "203", "204",
"205", "206", "207", "340", "341", "364", "365", "366", "382", "383",
"384", "385", "386", "387", "388", "389", "39*", "400", "401", "402",
"403", "404", "405", "406", "407", "408", "412", "413", "414", "415",
"416", "417", "418", "419", "42*", "43*", "44*", "450", "451", "452",
"453", "454", "458", "459", "460", "461", "462", "463", "464", "465",
"466", "501", "502", "503", "504", "505", "506", "507", "508", "509",
"511", "512", "513", "515", "516", "517", "518", "523", "527", "528",
"530", "532", "533", "536", "537", "538", "540", "542", "543", "544",
"545", "546", "547", "548", "549", "550", "552", "553", "555", "556",
"559", "560", "562", "563", "568", "569", "570", "571", "572", "573",
"574", "576", "577", "579", "58*", "590", "591", "593", "594", "595",
"596", "598", "599", "60*", "61*", "62*", "63*", "64*", "65*", "66*",
"67*", "68*", "69*", "70*", "71*", "72*", "73*", "74*", "75*", "76*",
"77*", "78*", "79*", "80*", "81*", "82*", "83*", "84*", "85*", "86*",
"87*", "88*", "89*", "90*", "91*", "92*", "93*", "94*", "950", "951",
"952", "953", "954", "955", "959", "960", "963", "964", "965", "966",
"967", "968", "969", "97*", "98*", "99*"]

print(os.getcwd())
deleted = 0

# Iterates through each image folder and removes the provided numbered images
# Can do this because images are all numbered the same between folders (e.g. the heart eyes emoji is always numbered 15)
for folder in folders:
    for file in files:
        # For file numbers ending in '*', removes group of ten images
        # E.g. 99* will remove 990-999
        if (file.find("*") > -1):
            for n in range(10):
                name = (folder + "/" + file[:(len(file)-1)] + str(n) + ".png")
                if Path(name).is_file():
                    deleted += 1
                    os.remove(name)
        # Removes png with the name of given number from each folder
        else:
            name = folder + "/" + file + ".png"
            file_path = Path(name)
            if file_path.is_file():
                deleted += 1
                os.remove(name)
    # All images past 1000 are non-face emojis, so can all be removed
    for n in range(1000, 1817):
        file = (folder + "/" + str(n) + ".png")
        if Path(file).is_file():
            deleted += 1
            os.remove(file)

# Indicates how many files were removed from folder
if (deleted == 1):
    print("1 file was removed.")
else:
    print(str(deleted) + " files were removed.")