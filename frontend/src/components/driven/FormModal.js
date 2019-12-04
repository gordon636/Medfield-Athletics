import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import * as PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography/Typography";

export class FormModal extends Component {

    handleClose = () => {
        this.props.close(); // this should call either success/failure then close
    };

    render() {
        return (
            <Dialog onClose={this.handleClose} open={this.props.open}>
                <Typography align={"center"} variant={"h5"} style={{margin:8}}>
                    {this.props.label !== undefined && this.props.label !== null ? this.props.label : null}
                </Typography>
                <DialogContent>
                    {/*inject child components here IE: the <form>*/}
                    {this.props.children}
                </DialogContent>
            </Dialog>
        );
    }
}

FormModal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    label: PropTypes.string,
    success: PropTypes.func,
    failure: PropTypes.func,
};