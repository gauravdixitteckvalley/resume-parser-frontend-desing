import React, { Fragment } from "react"
import { Link } from "react-router-dom";

import BlockUI from "../../components/BlockUI";
import './Notification.css';

const Notification = () => {
    const blocking = false;
    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="page-title font-style-bold mb-4">Your Notifications</h4>
                            <hr className="mb-4" />
                            <div className="row notification-container mb-4 pb-2">
                                <div className="col-md-12 notification-main">
                                    <img src="/assets/img/user_icon.png" />
                                    <div className="content-area">
                                        <p>Announcing the winner of the <strong>The only book awards</strong> decided by you, the readers. Check out the champions and runners-up in all 21 categories now!</p>
                                        <p>Just now</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row notification-container mb-4 pb-2">
                                <div className="col-md-12 notification-main">
                                    <img src="/assets/img/user_icon.png" />
                                    <div className="content-area">
                                        <p>Last chance to vote in <strong>The 2018 Falcon Choice Awards!</strong> See what made it to the Final Round and help your favourite take home the win. Voting closes on November 26</p>
                                        <p>15min</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row notification-container mb-4 pb-2">
                                <div className="col-md-12 notification-main">
                                    <img src="/assets/img/user_icon.png" />
                                    <div className="content-area">
                                        <p><strong>Jennifer Kent</strong> declared you as a <strong>President</strong> of computer Science and Engineering Society</p>
                                        <p>1h</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row notification-container mb-4 pb-2">
                                <div className="col-md-12 notification-main">
                                    <img src="/assets/img/user_icon.png" />
                                    <div className="content-area">
                                        <p>Congratulate <strong>Woody Allen</strong> for starting a new position as Busuness Development Manager & Implementation Engineer at <strong>Helwett Packart Enterprise(HP)</strong></p>
                                        <p>6h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Notification