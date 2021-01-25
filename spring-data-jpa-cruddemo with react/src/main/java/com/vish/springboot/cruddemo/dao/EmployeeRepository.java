package com.vish.springboot.cruddemo.dao;

import com.vish.springboot.cruddemo.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee>  findByFirstName(String name);
}
