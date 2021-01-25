package com.vish.springboot.cruddemo.service;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.vish.springboot.cruddemo.csvhelper.CsvHelp;
import com.vish.springboot.cruddemo.entity.Employee;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRCsvExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleWriterExporterOutput;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vish.springboot.cruddemo.dao.EmployeeRepository;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.management.openmbean.CompositeDataSupport;
import javax.servlet.http.HttpServletResponse;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	private EmployeeRepository employeeRepository;
	
	@Autowired
	public EmployeeServiceImpl(EmployeeRepository theEmployeeRepository) {
		employeeRepository = theEmployeeRepository;
	}
	
	@Override
	public List<Employee> findAll() {

		return employeeRepository.findAll();
	}


	@Override
	public Employee findById(int theId) {
		Optional<Employee> result = employeeRepository.findById(theId);
		
		Employee theEmployee = null;
		
		if (result.isPresent()) {
			theEmployee = result.get();
		}
		else {
			// we didn't find the employee
			throw new RuntimeException("Did not find employee id - " + theId);
		}
		
		return theEmployee;
	}

	@Override
	public void save(Employee theEmployee) {
		employeeRepository.save(theEmployee);
	}

	@Override
	public void deleteById(int theId) {
		employeeRepository.deleteById(theId);
	}

	@Override
	public List<Employee> findByFirstName(String name) {

		List<Employee> result= employeeRepository.findByFirstName(name);

		return result;
		
	}

	public String exportReport(String format) throws IOException, JRException {
		HttpServletResponse response = null;
		String downloadPath = "C:\\Users\\Vishwa_p\\Downloads";
		//load the file and compile it
		File file = ResourceUtils.getFile("classpath:employeeReport.jrxml");
		JasperReport jasperreport = JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(employeeRepository.findAll());
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("madeBy","dev");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperreport,parameters,dataSource);

		//if parameter is set to be pdf
		if(format.equalsIgnoreCase("pdf")){
			JasperExportManager.exportReportToPdfFile(jasperPrint, downloadPath+"\\EmployeeReportPDF.pdf");
		}
		//if parameter is set to excel
		if(format.equalsIgnoreCase("excel")){
			JRXlsxExporter exporter = new JRXlsxExporter();


			exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
			exporter.setExporterOutput(
					new SimpleOutputStreamExporterOutput(downloadPath+"\\EmployeeReportExcel.xls"));
			SimpleXlsxReportConfiguration reportConfig
					= new SimpleXlsxReportConfiguration();
			reportConfig.setSheetNames(new String[] { "Employee Data" });

			exporter.setConfiguration(reportConfig);
			exporter.exportReport();
		}
		//if parameter is set to be csv
		if(format.equalsIgnoreCase("csv")){
			JRCsvExporter exporter = new JRCsvExporter();


			exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
			exporter.setExporterOutput(
					new SimpleWriterExporterOutput(downloadPath+"\\EmployeeReportCSV.csv"));

			exporter.exportReport();
		}

		return "report generated in "+downloadPath;
	}


	public void saveCSV(MultipartFile file) {
		try{
			System.out.println("-------------------A--------------");
			List<Employee> employees =  CsvHelp.csvToEmployees(file.getInputStream());
			System.out.println("-------------------B--------------");
			//save to db
			for (Employee employee : employees) {
				employeeRepository.save(employee);
				System.out.println("Empl" +employee);
			}

		}catch (IOException e){
			throw new RuntimeException("fail to store csv data: " + e.getMessage());
		}

	}

}






