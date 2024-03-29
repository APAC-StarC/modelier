"""
Django settings for modelier project.

Generated by 'django-admin startproject' using Django 3.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', '<a string of random characters>')
DEBUG = os.environ.get('DJANGO_DEBUG') == "True"

SECURE_SSL_REDIRECT = os.environ.get('SECURE_SSL_REDIRECT') != "False"

# Flag when running with custom nginx, instead of the Divio setup
IS_PROD = os.environ.get('ENVIRONMENT','DEV') == 'PROD'

# This is not really used / deprecated
USE_S3 = os.environ.get('USE_S3', 'FALSE') == 'TRUE'
# SECURITY WARNING: don't run with debug turned on in production!


if IS_PROD:
    ALLOWED_HOSTS = [
        os.environ.get('ALLOWED_HOST','')
    ]
else:
    ALLOWED_HOSTS = [
        '*'
    ]
# Application definition

INSTALLED_APPS = [
    'modelier.suit.SuitConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'storages',
    'colorfield',
    'ckeditor',
    'collaborators',
    'pointclouds'
]

SITE_ID = 1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
X_FRAME_OPTIONS = 'SAMEORIGIN'

ROOT_URLCONF = 'modelier.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'modelier.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

if IS_PROD:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'postgres',
            'USER': 'postgres',
            'PASSWORD': 'postgres',
            'HOST': 'db',
            'PORT': 5432,
        }
    }

else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Athens'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

if USE_S3:
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
    AWS_DEFAULT_ACL = 'public-read'
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
    # s3 static settings
    STATIC_FILES_LOCATION = 'static'
    MEDIA_FILES_LOCATION = 'media'
    STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{STATIC_FILES_LOCATION}/'
    MEDIA_URL= f'https://{AWS_S3_CUSTOM_DOMAIN}/{MEDIA_FILES_LOCATION}/'
    STATICFILES_STORAGE = 'modelier.storage_backends.StaticStorage'
    DEFAULT_FILE_STORAGE = 'modelier.storage_backends.PublicMediaStorage'

else:
    STATIC_URL = '/staticfiles/'
    STATIC_ROOT = os.path.join(BASE_DIR,'staticfiles')
    MEDIA_URL = '/mediafiles/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'mediafiles')


CKEDITOR_CONFIGS = {
    'basic_editor': {
        'toolbar': 'Minimal',
        'toolbar_Minimal': [
            ['Bold', 'Italic', 'Underline'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink'],
            ['RemoveFormat', 'Source'],
            ['TextColor', 'BGColor']
        ]
    },
    'annotation_editor': {
        'toolbar': 'Annotation',
        'toolbar_Annotation': [
            ['Bold', 'Italic', 'Underline'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink'],
            ['RemoveFormat', 'Source'],
            ['TextColor', 'BGColor'],
            ['Embed']
        ]
    },
    'extraPlugins': ','.join([
            #'uploadimage', # the upload image feature
            # your extra plugins here
            #'div',
            'embed',
            'mediaembed',
            #'autolink',
            #'autoembed',
            #'embedsemantic',
            #'autogrow',
            # 'devtools',
            #'widget',
            #'lineutils',
            #'clipboard',
            #'dialog',
            #'dialogui',
            #'elementspath'
        ]),
}
