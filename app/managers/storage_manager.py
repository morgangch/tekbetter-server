import os


class StorageManager:
    def __init__(self):
        self.path = os.path.join(os.getenv("STORAGE_PATH", "/tmp"))


    def init_storage(self):
        if not os.path.exists(self.path):
            os.makedirs(self.path)

    def init_userdir(self, epitech_login):
        userdir = os.path.join(self.path, epitech_login)
        if not os.path.exists(userdir):
            os.makedirs(userdir)
        return userdir

    def delete_user(self, epitech_login):
        userdir = os.path.join(self.path, epitech_login)
        if os.path.exists(userdir):
            os.rmdir(userdir)

    def get_moulinettes(self, epitech_login):
        userdir = os.path.join(self.path, epitech_login)
        moulinettes = os.path.join(userdir, "moulinettes")
        if not os.path.exists(moulinettes):
            os.makedirs(moulinettes)
        return moulinettes