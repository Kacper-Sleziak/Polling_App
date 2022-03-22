from rest_framework.serializers import ValidationError


class PasswordValidator():
    def __init__(self, password):
        self.password = password

    # use all validations
    def validate(self, length, password2):
        self.are_password_same_validate(password2)
        self.min_len_validate(length)
        self.numberal_validate

    def are_password_same_validate(self, password2):
        if self.password != password2:
            raise ValidationError({'password': 'Passwords are not the same.'})

    def min_len_validate(self, length):
        if len(self.password) < length:
            raise ValidationError(
                {'password': f"Password is to short, min length is {length}."})

    def numberal_validate(self):
        if not any(char.isdigit() for char in self.password):
            raise ValidationError(
                {'password': "Password should have at least one numeral."})
