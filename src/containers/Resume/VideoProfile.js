import React, { Fragment } from "react"

import BlockUI from "../../components/BlockUI"

const VideoProfile = () => {

    const blocking = false;
    return (
      <Fragment>
        <BlockUI blocking={blocking} />
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="page-title font-style-bold mb-2">
                  {" "}
                  Video Profile
                </h4>
                <p style={{ fontSize: "13px" }}>
                  List your work experience, from the most recent to the oldest.
                  Feel free to use out pre-written examples.
                </p>
                <hr className="mb-4" />

                <form className="form-inline edit-form">
                  <div className="row mt-2">
                    <div className="col-md-12 mb-3">
                      <label for="formFile" className="form-label required">Upload video</label>
                      <input
                        name="document"
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-gradient-primary mt-4 mb-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
}

export default VideoProfile