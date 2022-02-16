import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash';
import { Link } from "react-router-dom"
import BlockUI from "../../components/BlockUI"
import { IMAGE_URL,displayRecordNotFound } from '../../utils/helper';
import { fetchMessageDetail, messageSend } from '../../actions/Message';

const MessageDetails = (props) => {
    const currentId = props?.match?.params?.id;
    const messages = useSelector((state) =>  { return state.message; });
    const dispatch = useDispatch();
    const [isReply,setIsReply] = useState(false);
    const [showReply,setShowReply] = useState(true);
    const [replyMessage,setReplyMessage] = useState(false);

    useEffect(()=>{
        dispatch(fetchMessageDetail(currentId));
    },[])
    

    const _reply = () =>{
        setIsReply(true)
        setShowReply(false)
    }

    const _handleChange = (data) =>{
        
        setReplyMessage(data.value);
    }

    const _sendReply = () =>{

        if(replyMessage!== ''){

            const postData = {
                to   : messageDetail[0].users._id,
                subject : messageDetail[0].message_subject,
                messageText: replyMessage,
                reply: messageDetail[0]._id,
            }
            dispatch(messageSend(postData)); 
        }

    }

    const _buildList = (data) => {

        if (!_.isEmpty(data)) {
            return (
                <> 
                { data.map((data, index) => ( 
                    <>   
                    { (index  === 0)?         
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                        <p className="page-title" style={{fontWeight: '600'}}> { data.message_subject }</p>
                    </div>
                    :""}
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                        <p><img src={data.users?.profile_image ? IMAGE_URL+data.users?.profile_image :"/assets/img/user_icon.png"} className="me-2" alt="image" style={{width: '40px'}} />  { data.users?.first_name+' '+data.users?.last_name   }</p>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                        <p>{ data.message_text }</p>
                    </div>
                    </>
                    
                )) }    
                </>  
            )
            } else {
                return (
                  displayRecordNotFound('No Resume Found')
                )
              }
    }
    const { blocking, messageDetail } = messages;
    console.log('messageDetail',messageDetail);
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
                            { _buildList(messageDetail) }
                                {/* { messageDetail.map((messageData, index)=>{  
                                    
                                <>
                               
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                                
                                    <p className="page-title" style={{fontWeight: '600'}}> { messageData.message_subject }</p>
                                </div>
                
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                                    <p><img src={messageData.users?.profile_image ? IMAGE_URL+messageData.users?.profile_image :"/assets/img/user_icon.png"} className="me-2" alt="image" style={{width: '40px'}} />  { messageData.users?.first_name+' '+messageData.users?.last_name   }</p>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                                    <p>{ messageData.message_text }</p>
                                </div>
                                </>
                                })
                                } */}
                                
                                { (isReply)?
                                <>
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2text-right">
                                    <textarea name="message" onChange={(event)=>{ _handleChange(event.target) }} className="form-control mb-2 mr-sm-2 col-md-12" ></textarea>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2text-right" >
                                        <button type="button" onClick={ (event)=>{ _sendReply(event.target) }}  className="btn btn-gradient-primary btn-fw mb-2"> Send Reply</button>
                                    </div>
                                </>
                                

                                : "" }

                                 { (showReply)?
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2text-right" >
                                    <Link to="#">
                                        <button type="button" onClick={ (event)=>{ _reply(event.target) }} className="btn btn-gradient-primary btn-fw mb-2">Reply</button>
                                    </Link>
                                </div>
                                : "" }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </Fragment>
    )
}

export default MessageDetails;