import PropTypes from 'prop-types';
import { Component } from "react";

export class Modal extends Component {

    static PropType = {
        onClick: PropTypes.func.isRequired
    };

    componentDidMount() {
        window.addEventListener('keydown', this.onClose);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown',this.onClose);
    };

    onClose = (event) => {
        if (event.currentTarget === event.target) {
            this.props.toggleModal();
        } else if (event.code === 'Escape') {
            this.props.toggleModal();
        };
    };

    render() {
        return (
            <div className="Overlay" onClick={this.onClose}>
                <div className="Modal">
                    {this.props.children}
                </div>
            </div>
        );
    };
};
