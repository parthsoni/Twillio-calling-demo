import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {ValuexSDK} from "../sdk-js/sdk";
import Avatar from "material-ui/Avatar";

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */

class CallModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            title: props.title,
            conn: props.conn,
            buttonLabel: "HangUp",
            callTime: 0,
        };
        this.pickCall = this.pickCall.bind(this);
        this.pickCancel = this.pickCancel.bind(this);
        this.hangUp = this.hangUp.bind(this);
        this.handle = this.handle.bind(this);
    }

    componentWillMount() {
        let self = this;
        let callProgressInterval = null;
        this.setState({
            buttonLabel: (!ValuexSDK.getInstance().isCallActive() && !ValuexSDK.getInstance().isCaller()) ? "Accept" : "HangUp"
            ,
            title: ValuexSDK.getInstance().isCallActive() ? "Call in-progress.." : (ValuexSDK.getInstance().isCaller() ? "Calling.." : "Incoming call..")
        });
        ValuexSDK.getInstance().subscribeEvents("onConnect", function () {
            self.setState({buttonLabel: "HangUp", title: "Call in-progress.."});
            self.updateCallTime(self, callProgressInterval);
        });

        ValuexSDK.getInstance().subscribeEvents("onDisConnect", function () {
            self.props.toggle(false);
            self.setState({buttonLabel: "Accept"});
            clearInterval(callProgressInterval);
        });

        ValuexSDK.getInstance().subscribeEvents("onCancel", function () {
            self.props.toggle(false);
            self.setState({buttonLabel: "Accept"});
        });
    }

    updateCallTime(self, callProgressInterval) {
        callProgressInterval = setInterval(function () {
            self.setState({
                callTime: ValuexSDK.getInstance().getCallTime(),
            });
        }, 1000);
    }

    componentWillReceiveProps(props) {
        this.setState({open: props.open});
        this.setState({
            buttonLabel: (!ValuexSDK.getInstance().isCallActive() && !ValuexSDK.getInstance().isCaller()) ? "Accept" : "HangUp"
            ,
            title: ValuexSDK.getInstance().isCallActive() ? "Call in-progress.." : (ValuexSDK.getInstance().isCaller() ? "Calling.." : "Incoming call..")
        });
    }

    pickCall() {
        ValuexSDK.getInstance().accept(this.props.conn);
    };

    pickCancel() {
        ValuexSDK.getInstance().reject(this.props.conn);
        this.props.toggle(false);
    };

    handle() {
        (!ValuexSDK.getInstance().isCallActive() && !ValuexSDK.getInstance().isCaller()) ?
            this.pickCall() : this.hangUp();

    };

    hangUp() {
        ValuexSDK.getInstance().disconnectAll();
        this.props.toggle(false);
    };

    render() {
        const closeImg = {cursor: 'pointer', float: 'right', marginTop: '5px', width: '20px'};

        const actions = [
            <FlatButton
                label={this.state.buttonLabel}
                primary={true}
                onClick={this.handle}
            />
        ];

        if (!ValuexSDK.getInstance().isCallActive() && !ValuexSDK.getInstance().isCaller()) {
            actions.push(<FlatButton
                label="Reject"
                primary={true}
                onClick={this.pickCancel}
            />);
        }

        let style = {};

        if (undefined !== ValuexSDK.getInstance().getStyle()) {
            style.backgroundColor = ValuexSDK.getInstance().getStyle().primaryColor;
            style.color = ValuexSDK.getInstance().getStyle().primaryTextColor
        }

        let callerPic = ValuexSDK.getInstance().getCaller() ?
            ValuexSDK.getInstance().getCaller()['profile_pic'] : '';

        let calleePic = ValuexSDK.getInstance().getCallee() ?
            ValuexSDK.getInstance().getCallee()['profile_pic'] : '';

        let callerName = ValuexSDK.getInstance().getCaller() ?
            ValuexSDK.getInstance().getCaller()['name'] : '';

        let calleeName = ValuexSDK.getInstance().getCallee() ?
            ValuexSDK.getInstance().getCallee()['name'] : '';

        return (
            <MuiThemeProvider>
                <div>
                    <Dialog className="vx-call-dialog"
                            titleClassName="va-call-dialog-title"
                            title={<div>
                                {this.state.title}
                                {ValuexSDK.getInstance().isCallActive() ?
                                    <img onClick={() => this.props.toggle(false)}
                                         src={'../images/cross.png'}
                                         style={closeImg}/> : ''}
                            </div>}
                            titleStyle={style}
                            actions={actions}
                            modal={true}
                            open={this.state.open}
                    >
                        <div>
                            <div className="va-call-dialog-avatar-box"><Avatar size={60}
                                                                               src={callerPic}/>
                                <h4>{callerName}</h4></div>
                            <div className="va-call-dialog-avatar-box" style={{marginTop: '50px'}}>
                                <p>{this.state.callTime}</p>
                                =========>
                            </div>
                            <div className="va-call-dialog-avatar-box"><Avatar size={60}
                                                                               src={calleePic}/>
                                <h4>{calleeName}</h4></div>
                        </div>
                    </Dialog>

                </div>
            </MuiThemeProvider>
        );
    }
}


export default CallModal;