import PropTypes from 'prop-types';
import { Component } from "react";

export class Searchbar extends Component {

    static PropType = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func,
    };

    state = {
       name: '', 
    };

    handleInputForm = (event) => {
        this.setState({ name: event.currentTarget.value });
    };

    formSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(this.state.name);
        
        this.setState({ name: '' });
    };
    
    render() {
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.formSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="name"
                        onChange={this.handleInputForm}
                    />
                </form>
            </header>
        );
    };
};
