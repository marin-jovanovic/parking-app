package ConstantsModule;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.Scanner;

public enum Constant {
    I(0),
    A(1),
    B(2),
    C(3),
    D(4);

    private static boolean isPrintActive = false;

    private static void log(Object o) {
        if (isPrintActive) {
            System.out.println(o);
        }
    }

    Constant(int value) {
        this.value = value;
        log(this + " " + this.value);

        String newList = "";
        boolean isPresent = false;

        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(Config.SETTINGS_MEMORY_PATH))) {

            String line;
            while ((line = bufferedReader.readLine()) != null) {
                log("\treading line: " + line);
                String[] raw = line.split(" = ");

                if (raw[0].equals(this.toString())) {
                    log("\tvec postoji");
                    this.value = Integer.parseInt((line.split(" = "))[1]);
                    isPresent = true;
                } else {
                }

                newList += line + "\n";
            }


        } catch (Exception exception) {
            exception.printStackTrace();
        }

        if (isPresent) {
            log("var vec postoji, ne zapisujem ju");
        } else {
            newList += this + " = " + this.value + "\n";
        }

        log("***\n" + newList + "***");
        log(this + " " + this.value);
        log("");

        writeToSettings(String.join("\n", newList));

    }

    private int value;

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
        log(this + " " + this.value);

        String newList = "";

        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(Config.SETTINGS_MEMORY_PATH))) {

            String line;
            while ((line = bufferedReader.readLine()) != null) {
                log("\treading line: " + line);
                String[] raw = line.split(" = ");

                if (raw[0].equals(this.toString())) {
                    log("\tvec postoji");

                } else {
                    newList += line + "\n";

                }
            }

        } catch (Exception exception) {
            exception.printStackTrace();
        }

        newList += this + " = " + this.value + "\n";

        log("***\n" + newList + "***");
        log(this + " " + this.value);
        log("");

        writeToSettings(String.join("\n", newList));
    }

    public static void printAll() {
        System.out.println("Constant: printAll");

        for (Constant constant : EnumSet.allOf(Constant.class)) {
            System.out.println(constant + " -> " + constant.value);
        }
        System.out.println("");
    }

    private void restartConstants() {
        ArrayList<String> lines = new ArrayList<>();
        try (Scanner myReader = new Scanner(new File(Config.DEFAULT_SETTINGS_MEMORY_PATH))) {
            while (myReader.hasNextLine()) {
                lines.add(myReader.nextLine());
            }
        } catch (FileNotFoundException e) {
            log("An error occurred.");
            e.printStackTrace();
        }

        writeToSettings(String.join("\n", lines));
    }

    private static void writeToSettings(String newSettings) {
        try (FileOutputStream fileOutputStream = new FileOutputStream(Config.SETTINGS_MEMORY_PATH)) {
            fileOutputStream.write(newSettings.getBytes());
        } catch (IOException fileNotFoundException) {
            fileNotFoundException.printStackTrace();
        }
    }

    public static void main(String[] args) {
        printAll();

        System.out.println(Constant.I.getValue());
        System.out.println();

        Constant.I.setValue(Constant.I.getValue() + 1);


        System.out.println(Constant.I.getValue());
        System.out.println();

        printAll();


    }

}
