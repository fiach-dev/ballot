import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

  import { useState } from "react";




const Polls = (props) => {

    const getOptionData = (options, voteCount) => {
        let returnAray = [];
        options.forEach((option, index) => {
            let objToAdd = {name: option.optionName, vote: voteCount[index]};
            returnAray.push(objToAdd);

            //console.log(objToAdd);
            
          });
        return returnAray;
    }

    return(
        <section className="main-section" id="polls">
            {props.pollList.map(({pollId,creator,name,options,voteCount},index,input) => (
                <div className="card" key={pollId}>
                    <h1 className="pollTitle">{name}</h1>
                    <h5 className="pollCreator">Created by {creator}</h5>
                    <div className="optionWrapper">
                    <div className="optionContainer">
                    {options.map(({optionId, optionName},index) => (
                        <div className="optionItem" key={optionId}>
                            <h2 
                                className="pollOption"
                                onClick={() => props.handleVote(pollId,optionId)}
                                >
                                {index+1}.{optionName}
                            </h2>

                        </div>
                    ))}
                    </div>
                    <div className="chartContainer">

                    <BarChart width={200} height={200} data={getOptionData(options, voteCount)}>
                        <Bar dataKey="vote" fill="#2A006E" />

                        
                        <XAxis dataKey="name" tick={{ fill: 'white' }} tickLine={{ stroke: 'white' }} />
                        <YAxis tick={{ fill: 'white' }} tickLine={{ stroke: 'white' }} />
                    </BarChart>

                    </div>
                    </div>


                </div>
            ))}
        </section>
    );

}
export default Polls;