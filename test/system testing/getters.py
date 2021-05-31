import random
import string

USER_CARD_LOG_PATH = "resources/user_card_log.txt"
USER_CARD_PATH = "resources/user_card.txt"
USER_EMAIL_LOG_PATH = "resources/user_email_log.txt"
USER_EMAIL_PATH = "resources/user_email.txt"
USER_LAST_NAME_LOG_PATH = "resources/user_last_name_log.txt"
USER_LAST_NAME_PATH = "resources/user_last_name.txt"
USER_FIRST_NAME_LOG_PATH = "resources/user_first_name_log.txt"
USER_FIRST_NAME_PATH = "resources/user_first_name.txt"
USER_USERNAME_LOG_PATH = "resources/user_username_log.txt"
USER_USERNAME_PATH = "resources/user_username.txt"
USER_LICENCE_PLATE_LOG_PATH = "resources/user_licence_plate_log.txt"
USER_OIB_LOG_PATH = "resources/user_oib_log.txt"

PASSWORD_LOG_PATH = "resources/password_log.txt"
PASSWORD_PATH = "resources/password.txt"

COMPANY_EMAIL_LOG_PATH = "resources/company_email_log.txt"
COMPANY_EMAIL_PATH = "resources/company_email.txt"
COMPANY_ADDRESS_NAMES_LOG_PATH = "resources/company_address_names_log.txt"
COMPANY_ADDRESS_NAMES_PATH = "resources/company_address_names.txt"
COMPANY_NAMES_PATH = "resources/company_names.txt"
COMPANY_NAMES_LOG_PATH = "resources/company_names_log.txt"
COMPANY_OIB_LOG_PATH = "resources/company_oib_log.txt"


def log_driver(source_path, log_path):
    file = open(source_path, encoding="utf8")
    lines = [line for line in file.readlines()]
    file.close()

    file = open(log_path)
    log = int(file.readline()) + 1
    file.close()

    file = open(log_path, "w")
    file.write(str(log))
    file.close()

    return (lines[log])[:-1]


def generate_oib():
    return "".join([str(random.randint(0, 9)) for i in range(0, 11)])


def get_company_oib():
    oib = generate_oib()

    file = open(COMPANY_OIB_LOG_PATH)

    oib_log = [line[:-1] for line in file.readlines()]
    file.close()

    while oib in oib_log:
        oib = generate_oib()

    file = open(COMPANY_OIB_LOG_PATH, "a")
    file.write(oib + "\n")
    file.close()

    return oib


def get_company_name():
    return log_driver(COMPANY_NAMES_PATH, COMPANY_NAMES_LOG_PATH)


def get_company_address():
    return log_driver(COMPANY_ADDRESS_NAMES_PATH, COMPANY_ADDRESS_NAMES_LOG_PATH)


def get_company_email():
    return log_driver(COMPANY_EMAIL_PATH, COMPANY_EMAIL_LOG_PATH)


def get_password():
    return log_driver(PASSWORD_PATH, PASSWORD_LOG_PATH)


# start = first letters
def licence_plate_driver(start, len_main, len_end):
    for i in range(0, len_main):
        start += str(random.randint(0, 9))

    for i in range(0, len_end):
        start += random.choice(string.ascii_uppercase)

    return start


def generate_licence_plate(param):
    cro_plates = ["BJ",
                  "BM",
                  "ČK",
                  "DA",
                  "DE",
                  "DJ",
                  "DU",
                  "GS",
                  "IM",
                  "KA",
                  "KC",
                  "KR",
                  "KT",
                  "KŽ",
                  "MA",
                  "NA",
                  "NG",
                  "OG"
                  "OS",
                  "PU",
                  "PŽ",
                  "RI",
                  "SB",
                  "SK",
                  "SL",
                  "ST",
                  "ŠI",
                  "VK",
                  "VT",
                  "VU",
                  "VŽ",
                  "ZD",
                  "PS",
                  "SP"
                  ]

    start = ""
    len_main = random.randint(3, 4)

    if param == "cro_plates" or param == "zg_plate":
        if param == "cro_plates":
            start = cro_plates[random.randint(0, len(cro_plates) - 1)]
        else:
            start = "ZG"

        len_end = random.randint(1, 2)

    elif param == "international_plate":
        len_start = random.randint(1, 4)

        for i in range(0, len_start):
            start += random.choice(string.ascii_uppercase)

        len_end = random.randint(1, 3)

    else:
        raise ValueError

    start = licence_plate_driver(start, len_main, len_end)
    return start


def get_user_licence_plate(param):
    licence_plate = generate_licence_plate(param)
    file = open(USER_LICENCE_PLATE_LOG_PATH, encoding="utf8")
    licence_plate_log = [line[:-1] for line in file.readlines()]
    file.close()

    while licence_plate in licence_plate_log:
        licence_plate = generate_licence_plate(param)

    file = open(USER_LICENCE_PLATE_LOG_PATH, "a", encoding="utf8")
    file.write(licence_plate + "\n")
    file.close()

    return licence_plate


def get_user_username():
    return log_driver(USER_USERNAME_PATH, USER_USERNAME_LOG_PATH)


def get_user_oib():
    oib = generate_oib()
    file = open(USER_OIB_LOG_PATH)
    oib_log = [line[:-1] for line in file.readlines()]
    file.close()
    while oib in oib_log:
        oib = generate_oib()
    c = open(USER_OIB_LOG_PATH, "a")
    c.write(oib + "\n")
    c.close()

    return oib


def get_user_first_name():
    return log_driver(USER_FIRST_NAME_PATH, USER_FIRST_NAME_LOG_PATH)


def get_user_last_name():
    return log_driver(USER_LAST_NAME_PATH, USER_LAST_NAME_LOG_PATH)


def get_user_email():
    return log_driver(USER_EMAIL_PATH, USER_EMAIL_LOG_PATH)


# IssuingNetwork
# American Express
# Diners Club
# Discover
# enRoute
# JCB
# JCB 15 digit
# MasterCard
# Visa
# Visa 13 digit
# Voyager
def get_user_card():
    return log_driver(USER_CARD_PATH, USER_CARD_LOG_PATH)


def get_user_password():
    return get_password()
