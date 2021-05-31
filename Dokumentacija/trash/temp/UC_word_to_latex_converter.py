#

# u subrutinu load_input postaviti putanju
# INPUT_LIST se moze isprintatit da se testira
# format bi trebao biti sljedeci:
#
# UC1  - Pregled parkinga
# 	Glavni sudionik: Korisnik, klijent
# 	Cilj: Pregledati parking objekte
# 	Sudionici: Baza podataka
# 	Preduvjet: -
# 	Opis osnovnog tijeka:
# 	Karta je prikazana prilikom ucitavanja aplikacije
# 	Korisnik na karti odabire parking objekt
# 	Prikazuju se informacije o odabranom objektu
#
# UC2  - Registracija
# 	Glavni sudionik: Korisnik
# 	Cilj: Stvoriti korisnički račun za pristup sustavu
# 	Sudionici: Baza podataka
# 	Preduvjet: -
# ....
#
# OUTPUT je ispis source codea za latex
# 					\noindent \underbar{\textbf{UC1  - Pregled parkinga}}
# 					\begin{packed_item}
#
# 						\item  \textbf{Glavni sudionik: } Korisnik, klijent
# 						\item  \textbf{Cilj:} Pregledati parking objekte
# 						\item  \textbf{Sudionici:} Baza podataka
# 						\item  \textbf{Preduvjet:} -
# 						\item  \textbf{Opis osnovnog tijeka:}
#
# 						\item[] \begin{packed_enum}
# 							\item Karta je prikazana prilikom ucitavanja aplikacije
# 							\item Korisnik na karti odabire parking objekt
# 							\item Prikazuju se informacije o odabranom objektu
# 						\end{packed_enum}
# ...

def log(data):
    print("\033[34m" + str(data) + "\033[0m")


def load_input():
    import textract
    text = textract.process(r"C:\Users\PC\Desktop\Obrasci_uporabe_3.1.1.docx")
    raw = text.decode("utf-8")
    lines = str(raw).split("\n")
    global INPUT_LIST
    INPUT_LIST = lines


def driver():
    global INPUT_LIST, UC_NUMBER
    try:
        while not str(INPUT_LIST[0]).strip().startswith("UC" + str(25)):
            OUTPUT_LIST.append("					\\noindent \\underbar{\\textbf{"+str(INPUT_LIST.pop(0))+"}}")
            # INPUT_LIST.pop(0)
            OUTPUT_LIST.append("					\\begin{packed_item}")
            OUTPUT_LIST.append("")

            t = str(INPUT_LIST[0]).strip()
            OUTPUT_LIST.append("						\\item  \\textbf{Glavni sudionik: }" + t[16:])
            INPUT_LIST.pop(0)

            t = str(INPUT_LIST[0]).strip()
            OUTPUT_LIST.append("						\\item  \\textbf{Cilj:} " + t[6:])
            INPUT_LIST.pop(0)

            t = str(INPUT_LIST[0]).strip()
            OUTPUT_LIST.append("						\\item  \\textbf{Sudionici:} " + t[11:])
            INPUT_LIST.pop(0)

            t = str(INPUT_LIST[0]).strip()
            OUTPUT_LIST.append("						\\item  \\textbf{Preduvjet:} " + t[11:])
            INPUT_LIST.pop(0)

            OUTPUT_LIST.append("						\\item  \\textbf{Opis osnovnog tijeka:}")
            OUTPUT_LIST.append("")
            INPUT_LIST.pop(0)

            OUTPUT_LIST.append("						\\item[] \\begin{packed_enum}")

            while not str(INPUT_LIST[0]).startswith("\tOpis mogu") and not str(INPUT_LIST[0]) == "\t":

                OUTPUT_LIST.append("							\\item " + str(INPUT_LIST[0]).strip())
                INPUT_LIST.pop(0)

            OUTPUT_LIST.append("						\\end{packed_enum}")
            OUTPUT_LIST.append("")

            if str(INPUT_LIST[0]).startswith("\tOpis mogu"):
                OUTPUT_LIST.append("						\\item  \\textbf{Opis mogućih odstupanja:}")
                INPUT_LIST.pop(0)
                OUTPUT_LIST.append("")
                OUTPUT_LIST.append("						\\item[] \\begin{packed_item}")
                OUTPUT_LIST.append("")


                while not str(INPUT_LIST[0]).strip().startswith("UC"):
                    temp = str(INPUT_LIST[0]).strip()


                    OUTPUT_LIST.append("							\\item[" + temp[0:3] + "] " + temp[3:])
                    INPUT_LIST.pop(0)
                    OUTPUT_LIST.append("							\\item[] \\begin{packed_enum}")
                    OUTPUT_LIST.append("")

                    while not str(INPUT_LIST[0]) == "\t" and not (str(INPUT_LIST[0]).strip())[0].isdecimal():

                        OUTPUT_LIST.append("								\\item " + str(INPUT_LIST[0]).strip())
                        INPUT_LIST.pop(0)
                    if str(INPUT_LIST[0]) == "\t":
                        INPUT_LIST.pop(0)

                    OUTPUT_LIST.append("")
                    OUTPUT_LIST.append("							\\end{packed_enum}")

                OUTPUT_LIST.append("						\\end{packed_item}")
            else:
                INPUT_LIST.pop(0)

            OUTPUT_LIST.append("					\\end{packed_item}")
    except:
        OUTPUT_LIST.append("						\\end{packed_item}")
        OUTPUT_LIST.append("					\\end{packed_item}")
        for i in OUTPUT_LIST:
            log(i)

##########
# constants
##########
INPUT_LIST = list()
OUTPUT_LIST = list()
UC_NUMBER = 2


##########
# main
##########
load_input()


while INPUT_LIST.__contains__(""):
    INPUT_LIST.remove("")

for i in range(0, 18):
    INPUT_LIST.pop(0)

for line in INPUT_LIST:
    print(line)

driver()
