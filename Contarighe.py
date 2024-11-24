import os

def conta_righe_codice(directory):
    total_lines = {
        'js': 0,
        'html': 0,
        'css': 0
    }
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.js'):
                total_lines['js'] += conta_righe_file(os.path.join(root, file))
            elif file.endswith('.html'):
                total_lines['html'] += conta_righe_file(os.path.join(root, file))
            elif file.endswith('.css'):
                total_lines['css'] += conta_righe_file(os.path.join(root, file))
    
    return total_lines

def conta_righe_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()
            return len(lines)
    except IOError:
        return 0

if __name__ == "__main__":
    directory_paths = ['./Backend', './Frontend']  # Lista di percorsi delle directory da esaminare
    total_lines = { 'js': 0, 'html': 0, 'css': 0 }
    
    for directory_path in directory_paths:
        lines_in_directory = conta_righe_codice(directory_path)
        total_lines['js'] += lines_in_directory['js']
        total_lines['html'] += lines_in_directory['html']
        total_lines['css'] += lines_in_directory['css']
    
    print(f"Totale righe di codice JavaScript: {total_lines['js']}")
    print(f"Totale righe di codice HTML: {total_lines['html']}")
    print(f"Totale righe di codice CSS: {total_lines['css']}")

