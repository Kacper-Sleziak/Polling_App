import os
import csv

from django.conf import settings
from django.utils.text import slugify
from utils.utils import get_lookup_fields, qs_to_dataset

# def generate_csv():
#     header = ['Tytuł', 'Opis', 'Data Utworzenia', 'Nazwa Firmy']
#     data = ['Ankieta Testowa', 'Test Eksportu', '23-11-2022', 'PWR']
   
#     with open('results/test.csv', 'w', encoding='UTF8', newline='') as f:
#         writer = csv.writer(f)
#         writer.writerow(header)
#         writer.writerow(data) 
    
#     file_name = f"test"    
#     path = os.path.join(BASE_DIR, "csv_results_exporter", 
#                         "results", f"{file_name}.csv")
    
#     return path, file_name 

BASE_DIR = settings.BASE_DIR

def qs_to_local_csv(qs, fields=None, path=None, filename=None):
    if path is None:
        path = os.path.join(os.path.dirname(BASE_DIR), 'csvstorage')
        if not os.path.exists(path):
            '''
            CSV storage folder doesn't exist, make it!
            '''
            os.mkdir(path)
    if filename is None:
        model_name = slugify(qs.model.__name__)
        filename = "{}.csv".format(model_name)
    filepath = os.path.join(path, filename)
    lookups = get_lookup_fields(qs.model, fields=fields)
    dataset = qs_to_dataset(qs, fields)
    rows_done = 0
    with open(filepath, 'w') as my_file:
        writer = csv.DictWriter(my_file, fieldnames=lookups)
        writer.writeheader()
        for data_item in dataset:
            writer.writerow(data_item)
            rows_done += 1
    print("{} rows completed".format(rows_done))