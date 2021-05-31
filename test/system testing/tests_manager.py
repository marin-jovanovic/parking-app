import time
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver

from getters import get_user_username, get_user_oib, get_user_first_name, get_user_last_name, get_user_email, \
    get_user_licence_plate, get_user_card, get_user_password, get_company_oib, get_company_name, get_company_address, \
    get_company_email, get_password

import unittest


class TestApp(unittest.TestCase):
    PAGE_URL = "http://127.0.0.1:3000/"
    SHOW_LOG = False
    USER_USERNAME = "marin"
    USER_PASSWORD = "123123"

    IS_ALL_OK = True

    driver = webdriver.Chrome(ChromeDriverManager().install())

    class FailTest(Exception):

        def __init__(self, message="fail test error"):

            self.message = message
            super().__init__(self.message)

    def login_driver(self, username, password, invert_score=False):
        driver = self.driver

        try:
            driver.get(self.PAGE_URL)
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

            time.sleep(4)
            try:
                tester = driver.find_element_by_id("name_ph")
            except:
                raise self.FailTest("login nije uspjesno napravljen")

            self.assertTrue(not invert_score)

        except self.FailTest as e:
            self.IS_ALL_OK = False
            print(e)

            self.assertTrue(invert_score)

        except:
            self.IS_ALL_OK = False
            import sys
            print(sys.exc_info()[0])
            self.assertTrue(False)

    def test_login_user_false(self):
        username = "marin"
        password = "123d123"

        self.login_driver(username, password, True)

    def test_user_change_name(self):

        try:
            self.login_driver(self.USER_USERNAME, self.USER_PASSWORD)

            if self.IS_ALL_OK:


                time.sleep(4)

                self.driver.find_element_by_id(0).click()
                time.sleep(1)

                self.driver.find_element_by_id("firstname").click()
                self.driver.find_element_by_id("firstname").clear()
                self.driver.find_element_by_id("firstname").\
                    send_keys(get_user_first_name())

                self.driver.find_element_by_id(4).click()

                self.assertTrue(True)

            else:
                raise self.FailTest("login nije uspjesno napravljen")


        except:
            self.assertTrue(False)

    def test_user_add_car(self):

        try:
            self.login_driver(self.USER_USERNAME, self.USER_PASSWORD)
            if self.IS_ALL_OK:

                time.sleep(4)

                self.driver.find_element_by_id("addCar").click()
                time.sleep(1)

                self.driver.find_element_by_id("addCarInputField").click()
                self.driver.find_element_by_id("addCarInputField").send_keys(get_user_licence_plate("zg_plate"))

                self.driver.find_element_by_id("addCarButton").click()

                self.assertTrue(True)

            else:
                raise self.FailTest("login nije uspjesno napravljen")

        except:
            self.assertTrue(False)

    def test_login_user(self):

        username = "marin"
        password = "123123"

        self.login_driver(username, password)

    def test_login_company(self):

        username = "marin doo"
        password = "123123d"
        
        self.login_driver(username, password)

    def signup_user_driver(self, plate_tag):
        driver = self.driver

        credentials = [get_user_username(), get_user_oib(), get_user_first_name(),
                       get_user_last_name(), get_user_email(), get_user_licence_plate(plate_tag),
                       get_user_card(), get_user_password()
        ]

        if self.SHOW_LOG:
            print(credentials)

        try:
            driver.get(self.PAGE_URL)
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
                if self.SHOW_LOG:
                    print(i_1)

            # password again
            user = driver.find_element_by_id(str(i_0))
            user.click()
            i_0 += 1
            user.send_keys(password)

            # register button
            user = driver.find_element_by_id(str(i_0))
            user.click()

            time.sleep(4)

            try:
                tester = driver.find_element_by_id("name_ph")
            except:
                raise self.FailTest("login nije uspjesno napravljen")

            self.assertTrue(True)

        except self.FailTest as e:
            print(e)

            self.assertTrue(False)

        except:
            import sys
            print(sys.exc_info()[0])
            self.assertTrue(False)

    # zg plate
    def test_signup_user_1(self):

        self.signup_user_driver("zg_plate")

    # cro plates
    def test_signup_user_2(self):

        self.signup_user_driver("cro_plates")

    # international_plate
    def test_signup_user_3(self):

        self.signup_user_driver("international_plate")

    # noinspection PyBroadException
    def test_signup_company(self):
        driver = self.driver

        credentials = [get_company_oib(), get_company_name(), get_company_address(),
                       get_company_email(), get_password()]

        try:
            driver.get(self.PAGE_URL)
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
            if self.SHOW_LOG:
                print("password " + str(password))

            for i_1 in credentials:
                user = driver.find_element_by_id(str(i_0))
                user.click()
                i_0 += 1
                user.send_keys(i_1)
                if self.SHOW_LOG:
                    print(i_1)

            # password again
            user = driver.find_element_by_id(str(i_0))
            user.click()
            i_0 += 1
            user.send_keys(password)

            # register button
            user = driver.find_element_by_id(str(i_0))
            user.click()

            time.sleep(4)

            try:
                tester = driver.find_element_by_id("name_ph")
            except:
                raise self.FailTest("login nije uspjesno napravljen")

            self.assertTrue(True)

        except self.FailTest as e:
            print(e)

            self.assertTrue(False)

        except:
            import sys
            print(sys.exc_info()[0])
            self.assertTrue(False)
