import json

# Categorie da mantenere
categorie_da_mantenere = {"MISC"}
# categorie_da_mantenere = {"GRP", "FILE", "COMT", "MMED", "HOST", "SRCH", "GAME", "COMM", "MISC"}
# Nome del file di input e output
input_file = './File-Web-Site/input.json'
output_file = 'MISC.json'

try:
    # Leggi e filtra i dati
    dati_filtrati = []
    with open(input_file, 'r', encoding='utf-8') as file:
        data = json.load(file)
        for entry in data:
            if entry['category_code'] in categorie_da_mantenere:
                dati_filtrati.append(entry)
    
    # Scrivi i dati filtrati nel file di output
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(dati_filtrati, file, indent=4)

    print("Filtraggio completato. I dati filtrati sono stati salvati in 'output.json'.")

except FileNotFoundError:
    print(f"Errore: Il file '{input_file}' non è stato trovato.")
except json.JSONDecodeError:
    print(f"Errore: Il file '{input_file}' contiene dati non validi JSON.")
except Exception as e:
    print(f"Errore: {e}")
