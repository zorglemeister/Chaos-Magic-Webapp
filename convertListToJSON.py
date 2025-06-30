
import csv

import json

def csv_to_json(csv_file_path, json_file_path):

    data = []

    with open (csv_file_path, mode='r', encoding='utf-8') as csv_file:

        csv_reader = csv.DictReader(csv_file)

        # Read each row

        for row in csv_reader:

        # Convert multivalue fields to lists, this includes 'inclusion' and 'school'

            if row['inclusion']:
                row['inclusion'] = row['inclusion'].split(', ')
            else:
                row['inclusion'] = []

            if row['school']:
                row['school'] = row['school'].split(', ')
            else:
                row['school'] = []

        # Convert 'indexNumber' to numeric

            row['indexNumber'] = int(row['indexNumber']) if row ['indexNumber'] else None

        # Stick the row into the data array

            data.append(row)

        # Turn it into JSON

        with open(json_file_path, mode='w', encoding='utf-8') as json_file:

        json.dump(data, json_file, indent=4)