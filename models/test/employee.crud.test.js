const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ 
        firstName: 'First Name #1',
        lastName: 'Last Name #1',
        department: 'Department #1'
      });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ 
        firstName: 'First Name #2',
        lastName: 'Last Name #2',
        department: 'Department #2' 
      });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const employee = await Employee.findOne({ 
        firstName: 'First Name #1',
        lastName: 'Last Name #1',
        department: 'Department #1' 
      });
      const expectedFirstName = 'First Name #1';
      expect(employee.firstName).to.be.equal(expectedFirstName);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

})

describe('Creating data', () => {

  it('should insert new document with "insertOne" method', async () => {
    const employee = new Employee({
      firstName: 'First Name #1',
      lastName: 'Last Name #1',
      department: 'Department #1'
    });
    await employee.save();
    expect(employee.isNew).to.be.false;
  });

  after(async () => {
    await Employee.deleteMany();
  });

});

describe('Updating data', () => {

  beforeEach(async () => {
    const testEmpOne = new Employee({
      firstName: 'First Name #1',
      lastName: 'Last Name #1',
      department: 'Department #1'
    });
    await testEmpOne.save();
  
    const testEmpTwo = new Employee({
      firstName: 'First Name #2',
      lastName: 'Last Name #2',
      department: 'Department #2'
    });
    await testEmpTwo.save();
  });

  afterEach(async () => {
    await Employee.deleteMany();
  });

  it('should properly update one document with "updateOne" method', async () => {
    await Employee.updateOne(
      {firstName: 'First Name #1'},
       { $set: {
        firstName: '=Employee #1=' 
        }});
    const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=' });
    expect(updatedEmployee).to.not.be.null;
  });

  it('should properly update one document with "save" method', async () => {
    const employee = await Employee.findOne({
      firstName: 'First Name #2',
      lastName: 'Last Name #2',
      department: 'Department #2' 
    });
    employee.firstName = '=First Name #2=';
    employee.lastName = '=Last Name #2=';
    employee.department = '=Department #2=';
    await employee.save();
  
    const updatedEmployee = await Employee.findOne({
      firstName: '=First Name #2=',
      lastName: '=Last Name #2=',
      department: '=Department #2='
    });
    expect(updatedEmployee).to.not.be.null;
  });

  it('should properly update multiple documents with "updateMany" method', async () => {
    await Employee.updateMany({}, { $set: {
      firstName: 'Updated!',
      lastName: 'Updated LastName!',
      department: 'Updated Department!',
    }});
    const employees = await Employee.find();
    expect(employees[0].firstName).to.be.equal('Updated!');
    expect(employees[0].lastName).to.be.equal('Updated LastName!');
    expect(employees[0].department).to.be.equal('Updated Department!');

    expect(employees[1].firstName).to.be.equal('Updated!');
    expect(employees[1].lastName).to.be.equal('Updated LastName!');
    expect(employees[1].department).to.be.equal('Updated Department!');
  });

});

describe('Removing data', () => {

  beforeEach(async () => {
    const testEmpOne = new Employee({
      firstName: 'First Name #1',
      lastName: 'Last Name #1',
      department: 'Department #1'
    });
    await testEmpOne.save();
  
    const testEmpTwo = new Employee({
      firstName: 'First Name #2',
      lastName: 'Last Name #2',
      department: 'Department #2'
    });
    await testEmpTwo.save();
  });
  
  afterEach(async () => {
    await Employee.deleteMany();
  });

  it('should properly remove one document with "deleteOne" method', async () => {
    await Employee.deleteOne({
      firstName: 'First Name #1',
      lastName: 'Last Name #1',
      department: 'Department #1'
      });
  const removeEmployee = await Employee.findOne({
    firstName: 'First Name #1',
    lastName: 'Last Name #1',
    department: 'Department #1'
  });
  expect(removeEmployee).to.be.null;
  });

  it('should properly remove one document with "remove" method', async () => {
    const employee = await Employee.findOne({
      firstName: 'First Name #1',
      lastName: 'Last Name #1',
      department: 'Department #1'
      });
    await employee.remove();
    const removedEmployee = await Employee.findOne({
      firstName: 'First Name #1',
      lastName: 'Last Name #1',
      department: 'Department #1'
    });
    expect(removedEmployee).to.be.null;
  });

  it('should properly remove multiple documents with "deleteMany" method', async () => {
    await Employee.deleteMany();
    const employees = await Employee.find();
    expect(employees.length).to.be.equal(0);
  });

});