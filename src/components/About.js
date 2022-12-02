
import Security from "../images/security_small.png";
import Blockchain from "../images/blockchain_small.png";
import Democracy from "../images/democracy_small.png";
import GithubLight from "../images/github_opace.png";
import Github from "../images/github-white.png";

const About = () => {

    const [githubImage, setGitHubImage] = Github;
    
  

    return (
        <div className="aboutContainer" id="about">
                <div className="aboutTop">
                    <h1 className="centeredAbout aboutTitle">About</h1>
                    <p className="centeredAbout aboutSubtext">Dpoll uses the blockchain to handle votes. This offers a decentralized, transparent and secure system.</p>
                    <a href="www.google.com"><p className="centeredAbout githubLink">Github</p></a>
                </div>
                <div className="flexbox-container">
                    <div  className="flexbox-item-center standardText security">
                        <img src={Democracy} alt=""/>
                        <h1 className="standardText">Democracy</h1>
                        <p className="proDescription">One User = One Vote.</p>
                    </div>
                    <div className="flexbox-item-center standardText democracy">
                    <img src={Security} alt=""/>
                        <h1 className="standardText">Security</h1>
                        <p className="proDescription">Cryptographically Secured.</p>
                    </div>
                    <div className="flexbox-item-center standardText control">
                    <img src={Blockchain} alt=""/>
                        <h1 className="standardText">Control</h1>
                        <p className="proDescription">You own your data.</p>
                    </div>
                </div>
            

        </div>
    );
};
export default About;