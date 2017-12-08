import pandas as pd
from pygeocoder import Geocoder
import ast
import time
import json

input_data = pd.read_csv('data.csv')

extant_zipcodes = {}
if 'zipcodes.json':
    with open('zipcodes.json', 'r') as f:
        stored_zipcodes = json.load(f)
if stored_zipcodes != None:
    extant_zipcodes = stored_zipcodes

input_data['ZIP'] = input_data['ZIP'].astype(str).str.zfill(5)
grouped = (input_data.groupby(['ZIP']).apply(lambda x: x.to_json(orient='records')))

map_items = []
index = 0
for key, value in grouped.iteritems():
    item = {}
    item['zipcode'] = key
    print key

    try:
        existing_info = extant_zipcodes[key]
        print "Getting zipcode location from storage..."
        item['latitude'] = existing_info['latitude']
        item['longitude'] = existing_info['longitude']
    except:
        print "Fetching zipcode location from geocoder..."
        item['latitude'] = Geocoder.geocode(key).latitude
        item['longitude'] = Geocoder.geocode(key).longitude
        print "Storing zipcode location for future use..."
        new_location = {}
        new_location['latitude'] = item['latitude']
        new_location['longitude'] = item['longitude']
        extant_zipcodes[key] = new_location
        index += 1

        if index % 5 == 0:
            print "Waiting for geocode api..."
            time.sleep(4)
    print item['latitude']
    print item['longitude']

    item['letters'] = ast.literal_eval(value)  # gets them to a list
    map_items.append(item)

output_data = {}
output_data['map_items'] = map_items

with open('data.json', 'w') as fp:
    json.dump(output_data, fp)
with open('zipcodes.json', 'w') as fp:
    json.dump(extant_zipcodes, fp)
