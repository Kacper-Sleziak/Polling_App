import os
import csv

from questions.models import Question
from Polling_App.settings import BASE_DIR

def generate_csv():
 
    header = ['Tytuł', 'Opis', 'Data Utworzenia', 'Nazwa Firmy']
    data = ['Ankieta Testowa', 'Test Eksportu', '23-11-2022', 'PWR']
   
    with open('results/test.csv', 'w', encoding='UTF8', newline='') as f:
        writer = csv.writer(f)

        # write the header
        writer.writerow(header)

        # write multiple rows
        writer.writerows(data) 
   
        
           
    file_name = f"test"    
    path = os.path.join(BASE_DIR, "csv_results_exporter", 
                        "results", f"{file_name}.csv")
    

    return path, file_name 