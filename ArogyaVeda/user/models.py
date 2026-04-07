from django.db import models
from django.contrib.auth.hashers import make_password

class Patient(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    city = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=20)
    patient_id = models.IntegerField(unique=True, editable=False, null=True, blank=True)
    password = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        if not self.patient_id:
            # Get the highest current patient_id
            last_patient = Patient.objects.all().order_by('-patient_id').first()
            if last_patient:
                self.patient_id = last_patient.patient_id + 1
            else:
                self.patient_id = 101  # Initial Patient ID
        
        # Hash password if it's not already hashed
        if self.password and not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
            
        super(Patient, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.patient_id}"


