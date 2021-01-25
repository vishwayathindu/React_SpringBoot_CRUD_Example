package com.vish.springboot.cruddemo.csvhelper;

import com.google.common.hash.Hashing;
import com.vish.springboot.cruddemo.entity.Employee;
import com.vish.springboot.cruddemo.util.PasswordHash;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class CsvHelp {
    public static String TYPECSV = "text/csv";
    public static String TYPEExcelCSVxls = "application/vnd.ms-excel";
    public static String TYPEExcelCSVxlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"firstName", "lastName", "email", "password"};

    public static boolean hasCSVFormat(MultipartFile file) {
        if (!TYPECSV.equals(file.getContentType())) {
            return false;
        }

//        else if (!TYPECSV.equals(file.getContentType())){
//            return false;
//        }else if(!TYPEExcelCSVxlsx.equals(file.getContentType())){
//            return false;
//        }
        return true;

    }
    public static List<Employee> csvToEmployees(InputStream inputStream) {
        System.out.println("-------------------c--------------");
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {
            List<Employee> employees = new ArrayList<Employee>();
            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords){
                String pw_hash = PasswordHash.CSVhash(csvRecord.get("password"));
                Employee emp = new Employee(
                        csvRecord.get("firstName"),
                        csvRecord.get("lastName"),
                        csvRecord.get("email"),
                        pw_hash
                );
                employees.add(emp);
            }
            return employees;
        }catch(IOException e){
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }
}
