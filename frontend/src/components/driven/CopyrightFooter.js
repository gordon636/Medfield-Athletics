import React, {Component} from "react";
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/Grid";

export class CopyrightFooter extends Component {
    render() {
        return (
            <Grid container justify={"center"} style={{marginTop:16}}>
                <Typography align={"center"} variant={"caption"}>Footer</Typography>
            </Grid>
        );
    }
}
