import database
import random


def generate_id():
    id = get_random_id()
    while database.id_exists(id):
        id = get_random_id()
    return id


def get_random_id():
    return get_random_char() + get_random_char() + get_random_digit()

def get_random_char():
    random_char_index = random.randint(ord('a'), ord('a')+25)
    random_char = chr(random_char_index)
    return random_char
    
def get_random_digit():
    random_digit = random.randint(0, 9)
    return str(random_digit)