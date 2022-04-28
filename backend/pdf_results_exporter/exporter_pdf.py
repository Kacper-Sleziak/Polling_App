from fpdf import FPDF
from questions.models import Question
import os
from Polling_App.settings import BASE_DIR

def generate_pdf(poll):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(190, 10, poll.title, 0, 1, align='C')
    
    questions = Question.objects.filter(poll=poll)
    
    
    
    for question in questions:
        questionHeader = f"Question {question.position}"
        pdf.cell(190, 15, "", 0, 1, 'C')
        pdf.cell(190, 8, questionHeader, 0, 1, align='C')
        pdf.cell(190, 8, question.content, 'B', 1, align='C')
        
        """
        To Do:
            Download options from data base
        """
        options = ["1 Option  25%", "2 Option  25%", 
                   "3 Option  25%", "4 Option  25%"]

        for option in options:
            pdf.cell(100, 20, option, 0, 1)
        
           
    file_name = f"{poll.title}_results"    
    path = os.path.join(BASE_DIR, "pdf_results_exporter", 
                        "pdf", "pdfs", f"{file_name}.pdf")
    
    
    pdf.output(name=path)
    return path, file_name 