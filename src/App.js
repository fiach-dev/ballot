import NavBar from "./components/NavBar";
import Landing from "./components/Landing.js";
import About from "./components/About";
import Form from "./components/Form";
import Polls from "./components/Polls";

import "./App.css";
import "./styles/css/buttonStyle.css";

import Ballot from "./artifacts/contracts/VotingFactory.sol/VotingFactory.json";

import { ethers } from "ethers";
import { BigNumber} from "@ethersproject/bignumber";
import { useState} from 'react';

function App() {

  const [question, setQuestion] = useState('');
  const [optionValues, setOptionValues] = useState([{id:1, name:''},{id:2, name:''}]);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  
  const [pollList, setPollList] = useState([]);

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const ballotAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
  }
    
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    }

  const handleOptionChange = (event,index) => {
    let data = [...optionValues];
    data[index][event.target.name] = event.target.value;
    setOptionValues(data);
  }

  const addFormFields = () => {
    const newIdx = optionValues.length + 1;
    let newField = {id:newIdx, name:''};
    setOptionValues(current => [...current, newField]); 
  }
  const removeFormFields = (id) => {
    setOptionValues(
      (current) => current.filter((optionObj) => optionObj.id !== id)
    );    
  }

  const deconstructPoll = (pollObj) => {

    let pollCreator = pollObj.pollCreator;
    
    let pollId = pollObj.pollInfoID;
    let IdToBigNumber = BigNumber.from(pollId);
    let convertedPollId = IdToBigNumber.toNumber();

    let pollName = pollObj.pollName;
    let parsedName = ethers.utils.parseBytes32String(pollName);

    let pollOptions = pollObj.pollOptions;
    let parsedOptions = pollOptions.map(option => ethers.utils.parseBytes32String(option));

    var optionObjArray = []
    let counter = 0;

    for (const option of parsedOptions) {
      var optionObj = {optionId: counter, optionName: option};
      optionObjArray.push(optionObj);
      counter++;
    }

    let pollVoteCount = pollObj.pollVoteCount;
    let convertedVoteCount = []
    
    for(let vc of pollVoteCount) {
      let vcToBigNumber = BigNumber.from(vc);
      let convertedVC = vcToBigNumber.toNumber();
      convertedVoteCount.push(convertedVC);
    }

    const returnObj = {
      creator: pollCreator,
      pollId: convertedPollId,
      name: parsedName,
      options: optionObjArray,
      voteCount: convertedVoteCount
    };

    return returnObj;
  }

  const getPolls = async () => {
    const contract = new ethers.Contract(ballotAddress, Ballot.abi, provider);
    try {
      const pollData = await contract.getPollInfoList();
      let deconstructedPollData = pollData.map(pollObj => deconstructPoll(pollObj));
      setPollList(deconstructedPollData);

    } catch(err) {
      console.log(err);
    }
  }
  const publishPoll = async (pollName, pollOptions) => {

    const signer = provider.getSigner();
    const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer);
    const transaction = await contract.createVotingContract(pollName, pollOptions);

    const transactionReceipt = await transaction.wait();
    console.log(transactionReceipt);
  }
  const handleSubmitPoll = (event) => {
    event.preventDefault();
    let options = optionValues.map(optionObj => optionObj.name);
    let byteOptions = options.map(option => ethers.utils.formatBytes32String(option));
    let byteQuestion = ethers.utils.formatBytes32String(question);
    publishPoll(byteQuestion, byteOptions);    
  }


  const vote = async (pollId, optionId) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer);
    const transaction = await contract.vote(pollId, optionId);
    const transactionReceipt = await transaction.wait();
    console.log(transactionReceipt);

  }
  
  const handleVote = (pollId, optionId) => {
    let pollIdToBigNum = BigNumber.from(pollId);
    let optionIdToBigNum = BigNumber.from(optionId);
    vote(pollIdToBigNum, optionIdToBigNum);
  }

  getPolls();

  return (
    <div>
      <NavBar
      defaultAccount = {defaultAccount}
      />
      <Landing
        defaultAccount= {defaultAccount}
        connectWalletHandler = {connectWalletHandler}
      />
      <About/>      
      <Form
        optionValues = {optionValues}
        removeFormFields = {removeFormFields}
        handleOptionChange = {handleOptionChange}
        addFormFields = {addFormFields}
        setQuestion = {setQuestion}
        handleSubmitPoll = {handleSubmitPoll}
      />
      <Polls
        pollList={pollList}
        handleVote={handleVote}
      /> 
      {errorMessage}
    </div>
  );
}
export default App;
