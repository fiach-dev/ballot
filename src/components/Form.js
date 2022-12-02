const Form = (props) => {
    return (
        <div className="formWrapper" id="create">
            <div className="formCenter">
                <h1 className="formTitle">Create a Dpoll</h1>
                <form className="pollSubmitForm" onSubmit={props.handleSubmitPoll}>
                    <div>
                        <input 
                            type="text"
                            className="inputBox"
                            required
                            onChange ={(e) => props.setQuestion(e.target.value)}/>
                        <span className="formText">Question</span>
                    </div> 
                        {props.optionValues.map(({id},index,input) => (
                            <div className="optionsContainer" key={id}>
                                <div classame="inputbox">
                                    <input 
                                        type="text"
                                        required
                                        name="name"
                                        value = {input.name}
                                        onChange = {(e) => props.handleOptionChange(e,index)}/>
                                    
                                    <span className="formText">Option {index+1}</span>
                                </div>
                                    {
                                    index > 1 ? 
                                        <div 
                                            className="btn btn-change"
                                            type="button"
                                            onClick={() => props.removeFormFields(id)}>
                                            <span className="btn-text">Remove</span>
                                        </div> 
                                        : null
                                    }
                            </div> 
                            ))}
                            <div className="inputbox">
                                        <div 
                                            className="btn btn-change"
                                            type="button"
                                            onClick={() => props.addFormFields()}>
                                            <span className="btn-text">Add</span>
                                        </div>
                            </div>
                            <div className="btn submit">   
                                <input 
                                    type="submit"
                                    value="submit"
                                />
                            </div>
                    </form>
            </div>
        </div>
    );
}

export default Form;