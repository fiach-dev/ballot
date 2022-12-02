const PollForm = () => {

    return(
        <div className="form">
            <div className="title">Welcome</div>
            <div className="subtitle">Let's create your account!</div>
            <div className="input-container ic1">
                <input id="firstname" class="input" type="text" placeholder=" " />
                <div className="cut"></div>
                <label for="firstname" class="placeholder">First name</label>
            </div>
            <div className="input-container ic2">
                <input id="lastname" class="input" type="text" placeholder=" " />
                <div className="cut"></div>
                <label for="lastname" class="placeholder">Last name</label>
            </div>
            <div className="input-container ic2">
                <input id="email" class="input" type="text" placeholder=" " />
                <div className="cut cut-short"></div>
                <label for="email" class="placeholder">Email</label>
            </div>
            <button type="text" class="submit">submit</button>
        </div>


    );

};
export default PollForm;