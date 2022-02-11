import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash';
import BlockUI from "../../components/BlockUI"

const MessageDetails = (props) => {
    const currentId = props?.match?.params?.id;
    const messages = useSelector((state) =>  { console.log('state.message',state); return state.message; });
    console.log('messages',messages);
    const { blocking, messageList } = messages;
    console.log('messageList',messageList);
    const currentmsg = _.filter(messageList, function(o) {
        if (o._id === currentId) return o;
    });
console.log('sss',currentmsg)

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
                                    <p className="page-title" style={{fontWeight: '600'}}> { (!_.isEmpty(currentmsg))?currentmsg[0].message_text:'' }</p>
                                </div>
                                <div className="">

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