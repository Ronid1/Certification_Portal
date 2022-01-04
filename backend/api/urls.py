from django.urls import path #include
#from rest_framework.routers import DefaultRouter
from .views.userViews import *
from .views.userTrainingsViews import *
from .views.userCertificationsViews import *
from .views.trainingModuleViews import *
from .views.profileViews import *
from .views.instructorViews import *
from .views.certificationViews import *
from .views.levelViews import *
from .views.scaleViews import *

USERS_PATH = 'users/'
PROFILES_PATH = 'profiles/'
CERTS_PATH = 'certifications/'
INSTRUCTORS_PATH = 'instructors/'
USERS_CERTS_PATH = 'user-certifications/'
TRAININGS_PATH = 'training-modules/'
USERS_TRAINING_PATH = 'user-trainings/'
SCALES_PATH = 'scales/'
LEVELS_PATH = 'levels/'

urlpatterns = [
    path(USERS_PATH, UserList.as_view()),
    path(USERS_PATH+"<int:pk>/", UserDetail.as_view()),

    path (PROFILES_PATH, ProfileList.as_view()),
    path(PROFILES_PATH+"<int:user_id>/", ProfileDetail.as_view()),

    path (CERTS_PATH, CertificationList.as_view()),
    path(CERTS_PATH+"<int:pk>/", CertificationDetail.as_view()),

    path (INSTRUCTORS_PATH, InstructorsList.as_view()),
    path(INSTRUCTORS_PATH+"<int:pk>/", InstructorsDetail.as_view()),

    path (USERS_CERTS_PATH, UserCertificationsList.as_view()),
    path(USERS_CERTS_PATH+"<int:pk>/", UserCertificationsDetail.as_view()),

    path (TRAININGS_PATH, TrainingModuleList.as_view()),
    path(TRAININGS_PATH+"<int:pk>/", TrainingModuleDetail.as_view()),

    path (USERS_TRAINING_PATH, UserTrainingList.as_view()),
    path(USERS_TRAINING_PATH+"<int:pk>/", UserTrainingDetail.as_view()),

    path (SCALES_PATH, ScaleList.as_view()),
    path(SCALES_PATH+"<int:pk>/", ScaleDetail.as_view()),

    path (LEVELS_PATH, LevelList.as_view()),
    path(LEVELS_PATH+"<int:pk>/", LevelDetail.as_view()),

 ]
