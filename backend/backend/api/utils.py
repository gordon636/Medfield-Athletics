import logging
import uuid

import environ
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

env = environ.Env()
log = logging.getLogger('logger')


class Utils:

    def __init__(self):
        ROOT_DIR = environ.Path(__file__) - 3  # This will put us at the base directory of the project
        ## LOAD SETTINGS FROM .env FILE IN ROOT DIRECTORY
        try:
            env_file = str(ROOT_DIR.path('.env'))
            print('Loading : {}'.format(env_file))
            env.read_env(env_file)
            print('The .env file has been loaded.')
        except:
            print('Failed to load .env file. Please check permissions.')
            exit(1)

    @staticmethod
    def get_env():
        return env

    @staticmethod
    def get_root_dir():
        return environ.Path(__file__) - 3  # This will put us at the base directory of the project

    @staticmethod
    def get_app_dir():
        return Utils.get_root_dir().path('backend')

    @staticmethod
    def get_hostname_and_port():
        return env("HOSTNAME")

    '''
    This is ugly AF
    '''

    @staticmethod
    def fix_url(url):
        broken_url = url.split("/")
        broken_url[2] = Utils.get_hostname_and_port()
        fixed_url = ''
        for part in broken_url:
            fixed_url += part + "/"
        # log.info(fixed_url[:-1])
        return fixed_url[:-1]

    @staticmethod
    def get_serializer_context():
        # GET FAKE CONTEXT TO RESOLVE URLS
        factory = APIRequestFactory()
        request = factory.get('/')
        return {
            'request': Request(request),
        }

    @staticmethod
    def generate_uuid():
        return str(uuid.uuid1())
