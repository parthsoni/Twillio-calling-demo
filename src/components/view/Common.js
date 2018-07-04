/**
 * Created by rajachhabra on 13/01/18.
 */
import React from "react";

export class Section extends React.Component {

    render() {
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        )
    }

}

