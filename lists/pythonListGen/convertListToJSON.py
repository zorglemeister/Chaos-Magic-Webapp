
import csv

import json

import os

# where does this script think it is?

print(f"Current working directoy:", os.getcwd())

# define input and output
csv_file_path = 'lists/pythonListGen/AppTestingBlock.csv'

json_file_path = 'lists/chaosTest.json'

# read the csv file

data = []

with open (csv_file_path, mode='r', newline='', encoding='utf-8') as csv_file:

    # make a bunch of dictionaries

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

    # Convert 'indexNum' to numeric

        row['indexNum'] = int(row['indexNum']) if row ['indexNum'] else None

    # Stick the row into the data array

        data.append(row)

    # Wrap the array in the "effects" key

        output_data = {"effects": data}

    # Turn it into JSON

with open(json_file_path, mode='w', encoding='utf-8') as json_file:

    json.dump(output_data, json_file, indent=4)

print(f"Did the thing. Input from {csv_file_path}, output to {json_file_path}.")