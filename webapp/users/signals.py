from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile


# This function runs AFTER a User is saved
# "created=True" means it was just created, not updated
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        # When a new User is created, also create a Profile linked to that user
        Profile.objects.create(user=instance)


# This function also runs AFTER a User is saved
# Here, we make sure the Profile is saved whenever the User is saved
@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    # instance = the User object just saved
    # instance.profile = the Profile linked to this User (OneToOne relationship)
    instance.profile.save()

