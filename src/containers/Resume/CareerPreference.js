import React, { Fragment } from "react"

import BlockUI from "../../components/BlockUI"
import './CareerPreference.css';

const CareerPreference = () => {

    const blocking = false;
    return (
      <Fragment>
        <BlockUI blocking={blocking} />
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="page-title font-style-bold mb-4">
                  Career Preference
                </h4>
                <hr className="mb-4" />

                <form className="form-inline edit-form">
                    <div className="row">
                    <div className="col-md-6">
                        <label className="mb-1 required" for="inlineFormInputName2">
                        Preferred Location
                        </label>
                        <input
                        type="text"
                        name="preferredLoc"
                        className="form-control mb-2 mr-sm-2 col-md-6"
                        id="inlineFormInputName2"
                        placeholder="Preferred Location"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="mb-1 required" for="inlineFormInputName2">
                        Preferred Role
                        </label>
                        <input
                        type="text"
                        name="preferredRole"
                        className="form-control mb-2 mr-sm-2 col-md-6"
                        id="inlineFormInputName2"
                        placeholder="Preferred Role"
                        />
                    </div>
                    </div>
                    <div className="row mt-3">
                    <div className="col-md-6">
                        <label className="mb-1 required" for="inlineFormInputName2">
                        Preferred Salary
                        </label>
                        <input
                        type="text"
                        name="preferredSal"
                        className="form-control mb-2 mr-sm-2 col-md-6"
                        id="inlineFormInputName2"
                        placeholder="Preferred Salary"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="mb-1 required" for="inlineFormInputName2"> Preferred Shift</label>
                        <div className="Radio-btn">
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
                            />
                            <label className="form-check-label" for="inlineRadio1">Day</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="option2"
                            />
                            <label className="form-check-label" for="inlineRadio2">Night</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio3"
                                value="option3"
                            />
                            <label className="form-check-label" for="inlineRadio3">Flexible</label>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row mt-3">
                    <div className="col-md-6">
                        <label className="mb-1 required" for="inlineFormInputName2">
                            Job Type
                        </label>
                        <div className="Radio-btn">
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
                            />
                            <label className="form-check-label" for="inlineRadio1">Contractual</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="option2"
                            />
                            <label className="form-check-label" for="inlineRadio2">Permanent</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="mb-1 required" for="inlineFormInputName2"> Employement Type</label>
                        <div className="Radio-btn">
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
                            />
                            <label className="form-check-label" for="inlineRadio1">Full time</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="option2"
                            />
                            <label className="form-check-label" for="inlineRadio2">Part time</label>
                            </div>
                        </div>
                    </div>
                    </div>
                    <button type="submit" className="btn btn-gradient-primary mt-4 mb-2">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
}

export default CareerPreference