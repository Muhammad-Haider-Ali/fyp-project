// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum)public{
        Campaign newCampaign = new Campaign(minimum,msg.sender);
        deployedCampaigns.push(address(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum,address creator){
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute()public payable {
        require(msg.value > minimumContribution,"Please enter the minimum amount of ether");
        approvers[msg.sender] = true;
        approversCount ++;
    }

    function createRequest(string memory description, uint value,address payable recipient) public restricted{
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);       

        request.approvals[msg.sender] = true;
        request.approvalCount ++;

    }

     function finalizeRequest(uint index) public payable  restricted{
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }
   
}