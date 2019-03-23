import React, {Component} from 'react';
import {CenteredContent} from "./components/Layout/CenteredContent";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const classes = {
    card: {
        width: 500,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 22,
    },
    pos: {
        marginBottom: 12,
    },
    textField: {
        width: '100%'
    },
    actions: {
        justifyContent: 'flex-end',
        padding: '16px'
    },
    submitButton: {
        marginRight: 0
    },
    attachmentsText: {
        fontSize: '16px',
        marginTop: '32px'
    },
    actionSpan: {
        fontSize: '12px',
        color: '#1167C9',
        textDecoration: 'underline',
        cursor: 'pointer'
    }
};

class App extends Component {
    renderForm() {
        const ActionSpan = ({children}) => <span style={classes.actionSpan}>{children}</span>;
        return (
            <Card style={classes.card}>
                <form className={classes.container} noValidate autoComplete="off">
                    <CardContent>
                        <Typography style={classes.title} color="textPrimary" gutterBottom>
                            Report Bug
                        </Typography>
                        <TextField
                            id="standard-name"
                            label="Title"
                            style={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-static"
                            label="Description"
                            multiline
                            rows="4"
                            style={classes.textField}
                            margin="normal"
                        />
                        <Typography color="textSecondary" style={classes.attachmentsText}>
                            Attachments <ActionSpan>Record Video</ActionSpan> <ActionSpan>Attach File</ActionSpan>
                        </Typography>
                        <Typography color="textSecondary">
                            No Attachments
                        </Typography>
                    </CardContent>
                    <CardActions style={classes.actions}>
                        <Button variant="contained" color="primary" style={classes.submitButton}>
                            Submit
                        </Button>
                    </CardActions>
                </form>
            </Card>
        )
    }

    render() {
        return (
            <div>
                <CenteredContent style={{height: '100vh'}}>
                    {this.renderForm()}
                </CenteredContent>
            </div>
        );
    }
}

export default App;
