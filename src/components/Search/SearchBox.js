import React, { Component } from 'react'

class SearchBox extends Component {
    state = {
        searchValue : this.props.searchValue
    }

    _handleChange = (event) => {
        this.setState({searchValue:event.target.value})
    }

    _handleInputChange = (event) => {
        const value = this.state.searchValue;
        this.props.searchInputChangeValue(value);
    }

    render() {
        let {searchValue} = this.state;
        const {searchParentClass, searchText} = this.props;
        
        return (
            <div className={searchParentClass || "search-div"}>
                <input type="text" className="form-control search-user"
                    onKeyPress={(event) => {
                        var key = event.keyCode || event.which;
                        if (key === 13)
                            this._handleInputChange(event)
                    }}
                    value={ searchValue }
                    onChange={this._handleChange}  
                    placeholder={(searchText) ? searchText :''}
                />
            </div>
        )
    }
}

export default SearchBox;