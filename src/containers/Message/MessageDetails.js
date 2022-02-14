import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash';
import { Link } from "react-router-dom"
import BlockUI from "../../components/BlockUI"
import { IMAGE_URL } from '../../utils/helper';
import { fetchMessageDetail } from '../../actions/Message';

const MessageDetails = (props) => {
    const currentId = props?.match?.params?.id;
    const messages = useSelector((state) =>  { return state.message; });
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchMessageDetail(currentId));
    },[])
    const { blocking, messageDetail } = messages;
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
                                    <p className="page-title" style={{fontWeight: '600'}}> { messageDetail?.message_subject }</p>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                                    <p><img src={messageDetail?.users?.profile_image ? IMAGE_URL+messageDetail?.users?.profile_image :"/assets/img/user_icon.png"} className="me-2" alt="image" style={{width: '40px'}} />  { messageDetail?.users?.first_name+' '+messageDetail?.users?.last_name   }</p>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                                    <p>{ messageDetail?.message_text }</p>
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