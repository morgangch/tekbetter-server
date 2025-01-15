import bcrypt


def hash_password(clean_pass: str):
    return bcrypt.hashpw(clean_pass.encode('utf-8'), bcrypt.gensalt()).decode(
        'utf-8')


def check_password(clean_pass: str, hashed_pass: str):
    return bcrypt.checkpw(clean_pass.encode('utf-8'),
                          hashed_pass.encode('utf-8'))
