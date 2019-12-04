import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import * as PropTypes from "prop-types";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import Typography from "@material-ui/core/Typography/Typography";



export class AlertDialog extends Component {

    handleClose = () => {
        if (this.props.hasOwnProperty("onClose")) {
            this.props.onClose();
        }
    };

    render() {
        // const {classes, onClose, selectedValue, ...other} = this.props;

        return (
            <Dialog onClose={this.handleClose} open={this.props.open}>
                <Typography align={"center"} color={"primary"} variant={"h5"}>
                    {this.props.label !== undefined && this.props.label !== null ? this.props.label : "Alert!"}
                </Typography>
                <DialogContent>
                    <DialogContentText>
                        {this.props.message}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }
}

AlertDialog.propTypes = {
    // classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    label: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
};
