from fpdf import FPDF
import os
from Polling_App.settings import BASE_DIR

def generate_pdf(poll):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(40, 10, poll.title)
    
    file_name = f"{poll.title}_results"    
    path = os.path.join(BASE_DIR, "pdf_results_exporter", 
                        "pdf", "pdfs", f"{file_name}.pdf")
    
    pdf.output(path)
    return path 