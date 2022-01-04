from django.contrib import admin
from .models import *

# adim site model views
admin.site.register(Profile)
#admin.site.register(Part)
admin.site.register(Certification)
#admin.site.register(CertificationLevels)
#admin.site.register(UserCertifications)
admin.site.register(TrainingModule)
admin.site.register(UserTraining)