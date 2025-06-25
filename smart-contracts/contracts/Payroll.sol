// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Payroll {
    address public owner;

    struct Employee {
        uint256 hourlyRateWei;
        uint256 totalHoursWorked;  // in hours (can be fractional if you use decimals)
        uint256 totalPaidWei;
    }

    mapping(address => Employee) public employees;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Owner sets or updates an employee hourly rate (in wei per hour)
    function setHourlyRate(address employee, uint256 rateWei) external onlyOwner {
        employees[employee].hourlyRateWei = rateWei;
    }

    // Owner logs worked hours for an employee (e.g., from your backend attendance data)
    function logHours(address employee, uint256 hoursWorked) external onlyOwner {
        employees[employee].totalHoursWorked += hoursWorked;
    }

    // Pay employee based on their total hours worked × hourly rate
    function payEmployee(address payable employee) external onlyOwner {
        Employee storage emp = employees[employee];
        uint256 amountDue = emp.hourlyRateWei * emp.totalHoursWorked;
        require(address(this).balance >= amountDue, "Insufficient funds");

        emp.totalHoursWorked = 0;
        emp.totalPaidWei += amountDue;

        (bool sent, ) = employee.call{value: amountDue}("");
        require(sent, "Failed to send Ether");
    }

    // Fund contract balance to pay employees
    receive() external payable {}
}
