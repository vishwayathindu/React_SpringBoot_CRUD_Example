package com.vish.springboot.cruddemo.rest;

import com.google.common.hash.Hashing;
import com.vish.springboot.cruddemo.csvhelper.CsvHelp;
import com.vish.springboot.cruddemo.entity.Employee;
import com.vish.springboot.cruddemo.service.EmployeeService;
import com.vish.springboot.cruddemo.util.PasswordHash;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeRestController {

    private EmployeeService employeeService;

    @Autowired
    public EmployeeRestController(EmployeeService theEmployeeService) {
        employeeService = theEmployeeService;
    }

    // expose "/employees" and return list of employees
    @GetMapping("/employees")
    public List<Employee> findAll() {

        return employeeService.findAll();
    }

    // add mapping for GET /employees/{employeeId}
    @PostMapping("/employees/login/{name}/{password}")
    public String login(@PathVariable("name") String name, @PathVariable("password") String password) {
        String login = "fail";
        List<Employee> employess = employeeService.findByFirstName(name);
        String pw_hash = PasswordHash.CheckPass(password);
        for (int i = 0; i < employess.size(); i++) {
            if (BCrypt.checkpw(pw_hash, employess.get(i).getPassword())) {
                login = "success";
                break;
            }
        }
        return login;
    }

    @GetMapping("/employees/{employeeId}")
    public Employee getEmployee(@PathVariable int employeeId) {
        Employee theEmployee = employeeService.findById(employeeId);
        if (theEmployee == null) {
            throw new RuntimeException("Employee id not found - " + employeeId);
        }
        return theEmployee;
    }

    // generate pdf Report
    @GetMapping("/Report/{format}")
    public String generateReport(@PathVariable String format) throws IOException, JRException {
        System.out.println(format);
        return employeeService.exportReport(format);
    }

    // add mapping for POST /employees - add new employee
    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee theEmployee) {
        theEmployee.setId(0);
        String pw_hash= PasswordHash.hash(theEmployee.getPassword());
        theEmployee.setPassword(pw_hash);
        employeeService.save(theEmployee);
        return theEmployee;
    }

    // add mapping for PUT /employees - update existing employee
    @PutMapping("/employees")
    public Employee updateEmployee(@RequestBody Employee theEmployee) {
        employeeService.save(theEmployee);
        return theEmployee;
    }

    // add mapping for DELETE /employees/{employeeId} - delete employee
    @DeleteMapping("/employees/{employeeId}")
    public String deleteEmployee(@PathVariable int employeeId) {
        Employee tempEmployee = employeeService.findById(employeeId);
        // throw exception if null
        if (tempEmployee == null) {
            throw new RuntimeException("Employee id not found - " + employeeId);
        }
        employeeService.deleteById(employeeId);
        return "Deleted employee id - " + employeeId;
    }

    @PostMapping("/CSV/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file){
        try{
            employeeService.saveCSV(file);
            return "File uploaded";
        }catch (Exception e){
            return "File couldnt be uploaded";
        }
    }

}










