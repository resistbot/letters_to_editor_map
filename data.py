import pandas as pd
from pygeocoder import Geocoder

data = pd.read_csv('data.csv')

data['ZIP'] = data['ZIP'].astype(str).str.zfill(5)

data['latitude'] = Geocoder.geocode(data["ZIP"]).latitude
data['longitude'] = Geocoder.geocode(data["ZIP"]).longitude

grouped = (data.groupby(['ZIP', 'latitude', 'longitude'])
           .apply(lambda x: x.to_json(orient='records'))
           ).to_json('data.json')