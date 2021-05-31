import time
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver

from getters import get_user_username, get_user_oib, get_user_first_name, get_user_last_name, get_user_email, \
    get_user_licence_plate, get_user_card, get_user_password, get_company_oib, get_company_name, get_company_address, \
    get_company_email, get_password

STOP_AT_END = False


def test_login(driver, username, password):
    try:
        driver.get("http://127.0.0.1:3000/")
        time.sleep(4)

        i_0 = 2
        credentials = [username, password]

        for i_1 in credentials:
            user = driver.find_element_by_id(i_0)
            user.click()
            user.send_keys(i_1)
            i_0 += 1

        user = driver.find_element_by_id(i_0)
        user.click()

        if STOP_AT_END:
            print(input("press any key to continue"))

    except:
        import sys
        print(sys.exc_info()[0])
        return False

    return True


def test_signup_user(driver, credentials):
    print(credentials)

    try:
        driver.get("http://127.0.0.1:3000/")
        time.sleep(4)

        i_0 = 5

        # button: register as company
        user = driver.find_element_by_id(str(i_0))
        user.click()
        i_0 += 1

        # username
        # OIB
        # first name
        # last name
        # email
        # licence plate
        # card number
        # password
        password = credentials[-1]

        for i_1 in credentials:
            user = driver.find_element_by_id(str(i_0))
            user.click()
            i_0 += 1
            user.send_keys(i_1)
            print(i_1)

        # password again
        user = driver.find_element_by_id(str(i_0))
        user.click()
        i_0 += 1
        user.send_keys(password)

        # register button
        user = driver.find_element_by_id(str(i_0))
        user.click()

        if STOP_AT_END:
            print(input("press any key to continue"))

    except:
        import sys
        print(sys.exc_info()[0])
        return False

    return True


def test_signup_company(driver, credentials):
    try:
        # driver = webdriver.Chrome(ChromeDriverManager().install())
        driver.get("http://127.0.0.1:3000/")
        time.sleep(4)

        i_0 = 16

        # button: register as company
        user = driver.find_element_by_id(str(i_0))
        user.click()
        i_0 += 1

        # oib
        # name
        # address
        # email
        # password
        password = credentials[-1]
        print("password " + str(password))

        for i_1 in credentials:
            user = driver.find_element_by_id(str(i_0))
            user.click()
            i_0 += 1
            user.send_keys(i_1)
            print(i_1)

        # password again
        user = driver.find_element_by_id(str(i_0))
        user.click()
        i_0 += 1
        user.send_keys(password)

        # register button
        user = driver.find_element_by_id(str(i_0))
        user.click()

        if STOP_AT_END:
            print(input("press any key to continue"))

    except:
        return False

    return True


def test_make_reservation_for_nearest_location(driver, credentials):
    try:
        driver.get("http://127.0.0.1:3000/")
        time.sleep(4)

        i_0 = 2

        for i_1 in credentials:
            user = driver.find_element_by_id(i_0)
            user.click()
            user.send_keys(i_1)
            i_0 += 1

        user = driver.find_element_by_id(i_0)
        user.click()

        time.sleep(3)
        user = driver.find_element_by_class_name("dismissButton")
        user.click()

    #     TODO

    except:
        import sys
        print(sys.exc_info()[0])
        return False

    return True


def run_all_tests():
    driver = webdriver.Chrome(ChromeDriverManager().install())

    status = list()

    # status.append(test_make_reservation_for_nearest_location(driver, ["marin", "12345678"]))

    status.append(test_login(driver, "marin", "12345678"))
    status.append(test_login(driver, "marin doo", "12345678"))

    for i, token in enumerate(["zg_plate", "cro_plates", "international_plate"]):
        status.append(test_signup_user(driver, [
            get_user_username(),
            get_user_oib(),
            get_user_first_name(),
            get_user_last_name(),
            get_user_email(),
            get_user_licence_plate(token),
            get_user_card(),
            get_user_password()
        ]))

    status.append(test_signup_company(driver, [get_company_oib(), get_company_name(), get_company_address(),
                                               get_company_email(), get_password()]))

    print(status.count(True), "/", len(status))


if __name__ == '__main__':
    run_all_tests()
    # print(generate_oib())
    # driver = webdriver.Chrome(ChromeDriverManager().install())
