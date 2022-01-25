import React, { useState, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import _ from 'lodash'

import BlockUI from "../../components/BlockUI"
import {history} from '../../utils/helper'
import "./message.css";

const Message = (props) => {
    

    return (
        <Fragment>
            <BlockUI />
            <div className="page-header">
              <h3 className="page-title">Send Messages</h3>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form className="form-inline user-form">
                              
                                    <label className=" mb-1" htmlFor="inlineFormInputName2">Skill</label>
                                    <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Python"
                                        name="skills_name"  
                                    />
                            
                                <button type="submit" className="btn btn-gradient-primary mb-2">Submit</button>
                                <button className="btn btn-light mb-2">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         
        </Fragment>
    )
}

export default Message