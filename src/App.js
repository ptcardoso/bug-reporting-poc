import React, {Component} from 'react';
import {CenteredContent} from "./components/Layout/CenteredContent";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {ScreenRecorder, Recorder} from "./ScreenRecorder";

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

    state = {
        attachments: []
    };

    onStopRecording = (uri) => {
        this.setState({
            attachments: [...this.state.attachments, { uri, name: 'screen-recording.webm' }]
        })
    };

    componentDidMount() {
        ScreenRecorder.addEventListener(Recorder.events.stopRecording, this.onStopRecording)
    }

    componentWillUnmount() {
        ScreenRecorder.removeEventListener(Recorder.events.stopRecording, this.onStopRecording)
    }

    recordVideo = (e) => {
        e.preventDefault();
        ScreenRecorder.startCapturing().then((state) => {
            if (state === 'recording') {
                const a = document.createElement("a");
                a.href = "https://www.bepretty.cl/";
                const evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
                a.dispatchEvent(evt);
            }
        });
        return false
    };

    renderForm() {
        const AttachmentLink = ({children, ...props}) => (
            <a style={classes.actionSpan} href="https://www.bepretty.cl/" target="_blank" rel="noopener noreferrer" onClick={this.recordVideo}>
                {children}
            </a>
        );
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
                            Attachments <AttachmentLink onClick={this.recordVideo}>Record Video</AttachmentLink>
                        </Typography>
                        <Typography color="textSecondary">
                            {this.state.attachments.map((attachment, index) => (
                                <a  href={attachment.uri} download={attachment.name} key={index}>{attachment.name}</a>
                            ))}
                            {!this.state.attachments.length && <span>No Attachments</span>}
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
