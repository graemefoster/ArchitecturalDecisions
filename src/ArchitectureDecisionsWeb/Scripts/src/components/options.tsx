'use strict';

import {OptionModel} from "./model";
import React from "react";
import {  } from "react-bootstrap"

export interface OptionsProps {
    options: OptionModel[]
    onNewOption: (option: OptionModel) => void
    onUpdateOption: (option: OptionModel) => void
    onRemoveOption: (option: OptionModel) => void
}

export class Options extends React.Component<OptionsProps> {

    constructor(props: OptionsProps) {
        super(props);
    }

    render() {

        const button = <button type="button" className={'btn btn-block btn-primary  '} onClick={() => {
            const newId = this.props.options.length === 0 ? 0 : Math.max(...this.props.options.map(x => x.Id)) + 1;
            this.props.onNewOption({Id: newId, Name: "?", Description: '?', Diagram: ''});
        }}>New Option</button>

        if (this.props.options.length === 0) {
            return <div>
                <p>No options defined</p>
                {button}
            </div>;
        }

        const options = this.props.options.map(x => (
            <li key={x.Id} className={'list-group-item'}>
                <div className={'form-row'}>
                    <label className={'col-form-label'}>Title</label>
                    <div className={'col'}>
                        <input className={'form-control'} type="text" value={x.Name} onChange={evt => {
                            x.Name = evt.target.value;
                            this.props.onUpdateOption(x);
                        }}/>
                    </div>
                    <div className={'col'}>
                        <button type={'button'} className={'btn btn-danger btn-sm mb-2'} onClick={() => {
                            this.props.onRemoveOption(x);
                        }}>Delete
                        </button>
                    </div>
                </div>
                <div className={'form-row'}>
                    <div className={'col-8'}>
                        <label
                            style={{'verticalAlign': 'top'}}>
                            Description
                        </label>
                        <textarea 
                            value={x.Description || ''}
                            className={'form-control'}
                            rows={8}
                            cols={50}
                            onChange={evt => {
                                x.Description = evt.target.value
                                this.props.onUpdateOption(x);
                            }}/>
                    </div>
                    <div className={'col-4'}>
                        <label>HTML <b>Not filtered on print view</b></label>
                        <textarea rows={7} className={'form-control'} value={x.Diagram || ''} onChange={evt => {
                            x.Diagram = evt.target.value || ''
                            this.props.onUpdateOption(x);
                        }}/>
                    </div>
                </div>
            </li>));

        return (
            <div>
                <ul className={'list-group'}>
                    {options}
                </ul>
                {button}
            </div>
        );
    }
}
