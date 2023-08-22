'use strict';

import React from "react";
import {OptionModel} from "./model";

export interface ChosenOptionProps {
    options: OptionModel[]
    onChosenOptionChanged: (option: number) => void
    chosenOption: number
}

export class ChosenOption extends React.Component<ChosenOptionProps> {

    constructor(props: ChosenOptionProps) {
        super(props);
    }

    render() {

        if (this.props.options.length === 0) {
            return <div />;
        }

        return (
            <div className={'form-group'}>
                <label htmlFor="chosenOption">Chosen Option</label>
                <select name="chosenOption" value={this.props.chosenOption} className={'form-select'} onChange={x => this.props.onChosenOptionChanged(Number(x.target.value))}>
                    <option value="" />
                    {this.props.options.map(x => (<option key={x.Id} value={x.Id}>{x.Name}</option>))}
                </select>
            </div>
        );
    }
}
