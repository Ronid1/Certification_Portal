from django.db import models
from django.contrib.auth.models import User
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
    scale = models.ForeignKey(CertificationScales, related_name='levels', on_delete=models.CASCADE)
    level = models.CharField(max_length=20, unique=True)

class Certification(models.Model):
    name = models.CharField(max_length=80, unique=True)
    practical = models.BooleanField(default=True)
    level_scale = models.ForeignKey(CertificationScales, to_field='scale_name', on_delete=models.CASCADE)
    days_valid = models.IntegerField(default=365)
 
class Instructors(models.Model):
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    certification_id = models.ForeignKey(Certification, on_delete=models.CASCADE)
 
class UserCertifications(models.Model):
    certification_id = models.ForeignKey(Certification, related_name='users', on_delete=models.CASCADE)
    user_id = models.ForeignKey(Profile, related_name='certifications', on_delete=models.CASCADE)
    entered_level = models.ForeignKey(CertificationLevels, to_field='level', on_delete=models.CASCADE)
    created_on_date = models.DateField(auto_now=True)
    #https://docs.djangoproject.com/en/4.0/topics/db/models/

    class Meta:
        unique_together = ['certification_id', 'user_id']

    @property
    def level(self):
        #if certification expired - level is expired
        if self.days_until_expires < 0:
            return "Expired"

        #if cert is not practical and level scale is pass/fail -> if all trainings are completed - pass, otherwise - pending
        certification = Certification.objects.filter(id=self.certification_id_id)

        if ((not certification.values("practical")[0].get("practical")) and (certification.values("level_scale")[0].get("level_scale")=="Pass/Fail")):
            for training in certification.values("trainings"):
                training_id = training.get("trainings")
                userTrainingStat = UserTraining.objects.filter(training_id=training_id, user_id=self.user_id).values("completed")
                #at least one training is not completed
                if (not userTrainingStat[0].get("completed")):
                    return "Pending"
            
            #all trainings are completed
            return "Pass"

        #check that entered level is part of certifications level scale, otherwise return "None"
        scale = certification.values("level_scale")
        levelScale = scale.values("level_scale")[0].get("level_scale")
        scaleId = CertificationScales.objects.filter(scale_name=levelScale).values("id")
        levels = CertificationLevels.objects.filter(scale=scaleId[0].get("id"))
        for level in levels.values("level"):
            if self.entered_level_id == level.get('level'):
                return self.entered_level_id

        return "None"

    #returns user certification expiration date
    @property
    def expiration_date(self):
        daysValid = Certification.objects.filter(id=self.certification_id_id).values("days_valid")
        days = daysValid[0].get("days_valid")
        return self.created_on_date + timedelta(days=days)

    @property
    def days_until_expires(self):
        return (self.expiration_date - date.today()).days

class TrainingModule(models.Model):
    certification_id = models.ForeignKey(Certification, related_name='trainings', on_delete=CASCADE)
    name = models.CharField(max_length=80)
    link = models.URLField(max_length=200, validators=[URLValidator] ,null=True)

class UserTraining(models.Model):
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    user_certification = models.ForeignKey(UserCertifications, related_name='trainings_stats', on_delete=models.CASCADE)
    training_id = models.ForeignKey(TrainingModule, related_name='users', on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ['user_id', 'training_id']