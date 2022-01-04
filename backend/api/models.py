from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.db.models.deletion import CASCADE
from datetime import date, timedelta
from django.core.validators import validate_image_file_extension, URLValidator
from django.db.models.fields import BooleanField

class Profile(models.Model):
    user_id = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=80)
    is_admin = models.BooleanField(default=False)
    role = models.CharField(max_length=80)
    image = models.ImageField(upload_to='images/', validators=[validate_image_file_extension], height_field=None, width_field=None, max_length=100, null=True, default = 'null')

class CertificationScales(models.Model):
    scale_name = models.CharField(max_length=50, unique=True)

class CertificationLevels(models.Model):
    scale = models.ForeignKey(CertificationScales, to_field='scale_name', on_delete=models.CASCADE)
    level = models.CharField(max_length=20, unique=True)

class Certification(models.Model):
    name = models.CharField(max_length=80, unique=True)
    practical = models.BooleanField(default=True)
    level_scale = models.ForeignKey(CertificationScales, to_field='scale_name', on_delete=models.CASCADE)
    days_valid = models.IntegerField(default=365)

    #make level scale a function based on prectical

    def __str__(self):
        return self.name
 
class Instructors(models.Model):
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    certification_id = models.ForeignKey(Certification, on_delete=models.CASCADE)
 
class UserCertifications(models.Model):
    #use user id & certification id as primary keys
    certification_id = models.ForeignKey(Certification, related_name='users', on_delete=models.CASCADE)
    user_id = models.ForeignKey(Profile, related_name='certifications', on_delete=models.CASCADE)
    level = models.ForeignKey(CertificationLevels, to_field='level', on_delete=models.CASCADE) #only show levels associated to certifications
    created_on_date = models.DateField(default=date.today) #update after going up a level

    #https://docs.djangoproject.com/en/4.0/topics/db/models/

    #make level a choise based on level scale
        #if not practical - level is pending. or pass if all trainings complete

    #returns user certification expiration date
    @property
    def expiration_date(self):
        daysValid = Certification.objects.filter(id=self.certification_id_id).values("days_valid")
        days = daysValid[0].get("days_valid")
        return self.created_on_date + timedelta(days=days)
    
    #returns if a certifiation is still valid (not expired)
    @property
    def valid(self):
        return self.expiration_date > date.today()

    @property
    def days_until_expires(self):
        return (self.expiration_date - date.today()).days

class TrainingModule(models.Model):
    certification_id = models.ForeignKey(Certification, related_name='trainings', on_delete=CASCADE)
    name = models.CharField(max_length=80)
    link = models.URLField(max_length=200, validators=[URLValidator] ,null=True)

class UserTraining(models.Model):
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    #user_certification = models.ForeignKey(UserCertifications, related_name='trainings_stats', on_delete=models.CASCADE)
    training_id = models.ForeignKey(TrainingModule, related_name='users', on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    #get user id from training->cert->user-cert

