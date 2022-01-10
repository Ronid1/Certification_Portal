from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Certification, Profile, TrainingModule, UserCertifications, UserTraining

# https://coderwall.com/p/ktdb3g/django-signals-an-extremely-simplified-explanation-for-beginners 
# https://simpleisbetterthancomplex.com/tutorial/2016/07/28/how-to-create-django-signals.html
#create a profile (if dosn't exist) every time a user is creater
@receiver(post_save, sender=User)
def ensure_profile_exists(sender, **kwargs):
    if kwargs.get('created', False):
        Profile.objects.get_or_create(user_id=kwargs.get('instance'))

#create a user-training quary for every training in certification after user-certification is created
@receiver(post_save, sender=UserCertifications)
def create_user_training(sender, **kwargs):
    if kwargs.get('created', False):
        for training in (Certification.objects.filter(id=kwargs.get('instance').certification_id_id).values("trainings")):
            if (not training.get("trainings")):
                break
            
            UserTraining.objects.get_or_create(
                user_certification=kwargs.get('instance'), 
                user_id=kwargs.get('instance').user_id, 
                training_id=TrainingModule.objects.filter(id=training.get('trainings'))[0])