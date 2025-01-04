import base64
import os
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import unpad, pad

key = bytes(os.getenv("AES_KEY"), 'utf-8')

def encrypt_text(text):
    """Chiffre le texte avec AES."""
    iv = get_random_bytes(16)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    padded_text = pad(text.encode(), AES.block_size)
    encrypted_text = cipher.encrypt(padded_text)

    return base64.b64encode(iv + encrypted_text).decode('utf-8')


def decrypt_text(encrypted_text: str) -> str:
    """Déchiffre le texte avec AES."""

    encrypted_data = base64.b64decode(encrypted_text)
    iv = encrypted_data[:64]
    encrypted_text = encrypted_data[64:]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted_text = unpad(cipher.decrypt(encrypted_text), AES.block_size)
    return decrypted_text.decode()
