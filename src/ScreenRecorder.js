export class Recorder {
    recording = null;
    chunks = [];
    stream = null;
    mediaRecorder = null;
    listeners = {
        [Recorder.events.stopRecording]: []
    };

    static events = {
        stopRecording: 'stop-recording'
    };

    static getDisplayMedia() {
        if (navigator.getDisplayMedia) {
            return navigator.getDisplayMedia({video: true})
        } else if (navigator.mediaDevices.getDisplayMedia) {
            return navigator.mediaDevices.getDisplayMedia({video: true})
        } else {
            return navigator.mediaDevices.getUserMedia({video: {mediaSource: 'screen'}})
        }
    }

    async startCapturing() {
        if (this.recording) {
            window.URL.revokeObjectURL(this.recording)
        }

        this.stream = await Recorder.getDisplayMedia();
        this.stream.addEventListener('inactive', e => {
            this.stopCapturing(e)
        });
        this.mediaRecorder = new MediaRecorder(this.stream, {mimeType: 'video/webm'});
        this.mediaRecorder.addEventListener('dataavailable', event => {
            if (event.data && event.data.size > 0) {
                this.chunks.push(event.data);
            }
        });
        this.mediaRecorder.start(16);
        return this.mediaRecorder ? this.mediaRecorder.state : 'inactive'
    }

    stopCapturing(e) {
        this.mediaRecorder.stop();
        this.mediaRecorder = null;
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
        this.recording = window.URL.createObjectURL(new Blob(this.chunks, {type: 'video/webm'}));
        this.listeners[Recorder.events.stopRecording].forEach(handler => handler(this.recording))
    }

    downloadRecording(e) {
        const downloadLink = document.createElement('a');
        downloadLink.href = this.recording;
        downloadLink.download = 'screen-recording.webm';
        downloadLink.click()
    }

    addEventListener(event, handler) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }

        this.listeners[event].push(handler)
    }

    removeEventListener(event, handler) {
        if (this.listeners[event]) {
            const index = this.listeners[event].findIndex(handler);
            this.listeners[event][index] = undefined
        }
    }
}

export const ScreenRecorder = new Recorder();
