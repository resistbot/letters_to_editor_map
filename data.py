import pandas as pd
from pygeocoder import Geocoder
import ast
import time

input_data = pd.read_csv('data.csv')

input_data['ZIP'] = input_data['ZIP'].astype(str).str.zfill(5)

grouped = (input_data.groupby(['ZIP']).apply(lambda x: x.to_json(orient='records')))

map_items = []
index = 0
for key, value in grouped.iteritems():
    item = {}
    item['zipcode'] = key
    print key
    item['latitude'] = Geocoder.geocode(key).latitude
    print item['latitude']
    item['longitude'] = Geocoder.geocode(key).longitude
    print item['longitude']
    if index % 5 == 0:
        print "Waiting for geocode api..."
        time.sleep(5)
    item['letters'] = ast.literal_eval(value) #gets them to a list
    map_items.append(item)
    index += 1

output_data = {}
output_data['map_items'] = map_items

import json
with open('data.json', 'w') as fp:
    json.dump(output_data, fp)
