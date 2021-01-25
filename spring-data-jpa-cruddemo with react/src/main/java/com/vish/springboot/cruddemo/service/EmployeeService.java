package com.vish.springboot.cruddemo.service;

import com.vish.springboot.cruddemo.entity.Employee;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

public interface EmployeeService {

	public List<Employee> findAll();
	
	public Employee findById(int theId);
	
	public void save(Employee theEmployee);
	
	public void deleteById(int theId);

	public List<Employee> findByFirstName(String name);

	String exportReport(String format) throws IOException, JRException;

	void saveCSV(MultipartFile file);
}
