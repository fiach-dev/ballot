import {Link} from "react-scroll";

const Landing = (props) => {
    return (
        <div className="landingContainer">
            <div className="centeredContainer"> 
                <div className="landingBoxContainer">
                    <div className="landingBox">
                        <div className="intro">
                            <h1 className="topText">Decentralize Democracy</h1>
                            <h1 className="mainLandingText">DPOLL</h1>
                        </div>
                        <button
                            style={{ background: props.defaultAccount ? "#bebac5" : "white" }} 
                            type="button" 
                            className="glitchButton" 
                            onClick={props.connectWalletHandler}>
                            {props.defaultAccount ? "Connected!!" : "Connect Wallet"} 
                        </button>
                        <div className="subContainer">
                            <div className="subInner">
                            <Link to="polls" spy={true} smooth={true} offset={10} duration={1000} className="subItem">View Polls</Link>
                                <Link to="create" spy={true} smooth={true} offset={50} duration={1000} className="subItem">Create Poll</Link>
                                <Link to="about" spy={true} smooth={true} offset={5} duration={1000} className="subItem">About</Link>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    );
}
export default Landing;