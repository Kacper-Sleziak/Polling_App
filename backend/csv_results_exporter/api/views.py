from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from csv_results_exporter.api.serializers import empty_serializer
from polls.models import Poll
from csv_results_exporter.csv_exporter import generate_csv



class GetCSVView(generics.GenericAPIView):
    serializer_class = empty_serializer
    
    def get(self, request, pk, format=None):
        
        queryset = Poll.objects.filter(id=pk)
        
        if queryset.exists():
            poll = queryset[0]
            csv_path, file_name = generate_csv()
            file_name = file_name + ".csv"
            
            with open(csv_path, 'rb') as report:
                return Response(
                    report.read(),
                    headers={'Content-Disposition': 
                        f'attachment; filename="{file_name}"'},
                    content_type='application/pdf',
                    status=status.HTTP_200_OK
                    )
        return Response(status=status.HTTP_404_NOT_FOUND)