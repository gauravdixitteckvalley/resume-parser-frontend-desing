import React from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
// import "/example/index.css";

const tabStyle = {
  height: 500,
  maxHeight: 300,
  overflow: "scroll"
  //backgroundColor: "blue"
};

export class ComponentToPrint extends React.Component {
  render() {
    return (
      <div style={tabStyle}>
        <div ref={this.props.propsRef}>
          <table className="printElement1">
            <thead>
              <th>column 1</th>
              <th>column 2</th>
              <th>column 3</th>
            </thead>
            <tbody>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>

              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>

              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
            </tbody>
          </table>
          <table className="printElement1">
            <thead>
              <th>column 1</th>
              <th>column 2</th>
              <th>column 3</th>
            </thead>
            <tbody>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>lokesh 1</td>
                <td>lokesh 2</td>
                <td>lokesh 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


