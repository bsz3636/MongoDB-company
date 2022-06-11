const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  it('should throw an error if no "firstName", "lastName", "department" arg', () => {
    const cases = [
      { firstName: 'Amanda', lastName: 'Doe' },
      { firstName: 'Amanda', department: 'IT' },
      { lastName: 'Doe', department: 'IT' },
    ];
    for (let employees of cases) {
      const emp = new Employee(employees);
      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "firstName" is not a string', () => {
    const cases = [{}, []];
    for(let firstName of cases) {
      const emp = new Employee({ firstName });
      emp.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });

  it('should throw an error if "lastName" is not a string', () => {
    const cases = [{}, []];
    for(let lastName of cases) {
      const emp = new Employee({ lastName });
      emp.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should throw an error if "department" is not a string', () => {
    const cases = [{}, []];
    for(let department of cases) {
      const emp = new Employee(department);
      emp.validate(err => {
      expect(err.errors.department).to.exist;
      });
    }
  });

  it('should not throw an error if data is correct', () => {
    const emp = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
    emp.validate((err) => {
      expect(err).to.not.exist;
    });
  });

});