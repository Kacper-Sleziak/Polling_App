from pdf_results_exporter.api.renderers import BinaryFileRenderer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from polls.models import Poll
from pdf_results_exporter.exporter_pdf import generate_pdf


'''
This view return pdf with results of poll
'''

class GetPdfView(APIView):
    renderer_classes = [BinaryFileRenderer]
    
    def get(self, request, pk, format=None):
        
        queryset = Poll.objects.filter(id=pk)
        
        if queryset.exists():
            poll = queryset[0]
            pdf_path, file_name = generate_pdf(poll)
            file_name = file_name + ".pdf"
            
            with open(pdf_path, 'rb') as report:
                return Response(
                    report.read(),
                    headers={'Content-Disposition': 
                        f'attachment; filename="{file_name}"'},
                    content_type='application/pdf',
                    status=status.HTTP_200_OK
                    )
        return Response(status=status.HTTP_404_NOT_FOUND)