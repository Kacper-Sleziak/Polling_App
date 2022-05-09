
from rest_framework.test import APITestCase
from rest_framework import status, response
from Polling_App.settings import AUTH_USER_MODEL as User

class AccountCreateTestCase(APITestCase):
    # Should return HTTP_200_OK
    def test_correct_creating_account(self):
        data = {
                "company_name": "company",
                "email": "company@gmail.com",
                "password": "Qwerty123",
                "password2": "Qwerty123"
                }
        response = self.client.post("/account/register", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    # Should return HTTP_400_BAD_REQUEST beacause password and password2
    # are not the same
    def test_creating_account_with_passwords_error(self):
        data = {
                "company_name": "company",
                "email": "company@gmail.com",
                "password": "Qwerty123",
                "password2": "Qwerty1234"
                }
        response = self.client.post("/account/register", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class LoginCreateTestCase(APITestCase):
        
        #Testing account login with correct data, should return HTTP_200_OK
        def test_account_login(self):
                data = {
                "company_name": "company2",
                "email": "company2@gmail.com",
                "password": "Qwerty1234",
                "password2": "Qwerty1234"
                }
                
                self.client.post("/account/register", data)
                
                data = {
                    "email": "company2@gmail.com",
                    "password": "Qwerty1234"
                    }
                response = self.client.post("/account/login", data)
                self.assertEqual(response.status_code, status.HTTP_200_OK)
        #Testing account login with data that not exsist, should return HTTP_400_BAD_REQUEST 
        def test_account_login_with_unexisting_data(self):
                data = {
                        "email": "null@gmail.com",
                        "password": "null"
                        }
                response = self.client.post("/account/login", data)
                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)