// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0 < 0.9.0;
pragma abicoder v2;


contract Voting {

    string contractName = "Voting";

    address creator;
    bytes32 name;

    bytes32[] options;
    uint256[] voteCount;
    uint256 pollId;

    struct Voter{
        address voterAddress;
        uint256 voterId;
        bool hasVoted;
    }

    Voter[] voters;

    mapping (address=>bool) public hasVoted;
    mapping (address=>uint256) public addressToVoterId;
    

    constructor (
                address sender,
                bytes32 _name,
                bytes32[] memory _options,
                uint256[] memory _voteCount,
                uint256 _pollId          
    ){
        creator = sender;
        name = _name;
        options = _options;
        voteCount = _voteCount;
        pollId = _pollId;
    }

    function addNewVoter (address _voterAddress) public{

        if(addressToVoterId[_voterAddress] == 0){
            voters.push(Voter({voterAddress:_voterAddress,
                                voterId: voters.length+1,
                                hasVoted: false 
            }));
            addressToVoterId[msg.sender] = voters.length;
        }
    }

    function vote(uint optionID) external{
        addNewVoter(msg.sender);
        
        uint256 voterId = addressToVoterId[msg.sender];
        uint256 voterIndex = voterId-1;
        require(!voters[voterIndex].hasVoted, "You have already voted");
        voteCount[optionID]++;
        voters[voterIndex].hasVoted = true;
        
    }

    function getVoteCount() public view returns(uint256[] memory) {
        return voteCount;
    }

    
}