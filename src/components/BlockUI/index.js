import React from "react";

import BlockStyle from './style';

const BlockUI = props => {
    if (!props.blocking) {
        return "";
    } else {
        return (
            <BlockStyle>
                <div className="block-ui-container">
                    <div className="block-ui-overlay" />
                    <div className="block-ui-message-container">
                        <div className="block-ui-message">
                            <h4>{props.title}</h4>
                            <div className="loading-indicator">
                                <svg id="indicator" viewBox="0 0 100 100">
                                    <circle id="circle" cx="50" cy="50" r="45" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </BlockStyle>
        )
    }
}

BlockUI.defaultProps = {
    blocking: false,
    title: "Loading, Please wait"
};

export default BlockUI;