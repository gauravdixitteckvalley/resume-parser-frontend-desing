import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash';
import { Link } from "react-router-dom"
import BlockUI from "../../components/BlockUI"
import { IMAGE_URL } from '../../utils/helper';

const MessageDetails = (props) => {
    const currentId = props?.match?.params?.id;
    const messages = useSelector((state) =>  { return state.message; });
    console.log('messages',messages);
    const { blocking, messageList } = messages;
    console.log('messageList',messageList);
    const currentmsg = _.filter(messageList, function(o) {
        if (o._id === currentId) return o;
    });


    return (
        <Fragment>
            <BlockUI blocking={blocking} /> 
            <div className="page-header">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                  <h3 className="page-title" style={{fontWeight: '600'}}> Message Details</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                                    <p className="page-title" style={{fontWeight: '600'}}> { (!_.isEmpty(currentmsg))?currentmsg[0].message_subject:'' }</p>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                                    <p><img src={currentmsg[0]?.users.profile_image ? IMAGE_URL+currentmsg[0].users.profile_image :"/assets/img/user_icon.png"} className="me-2" alt="image" style={{width: '40px'}} />  { (!_.isEmpty(currentmsg))?currentmsg[0].users.first_name+' '+currentmsg[0].users.last_name:'' }</p>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                                    <p>{ (!_.isEmpty(currentmsg))?currentmsg[0].message_text:'' }</p>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2text-right">
                                    <Link to="#">
                                        <button type="button" className="btn btn-gradient-primary btn-fw mb-2">Reply</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </Fragment>
    )
}

export default MessageDetails;