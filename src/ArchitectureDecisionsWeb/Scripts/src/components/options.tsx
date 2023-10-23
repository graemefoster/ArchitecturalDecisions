'use strict';

import {OptionModel} from "./model";
import React from "react";
import {Tab, Tabs} from "react-bootstrap"
import * as marked from "marked"
import DOMPurify from "dompurify"

export interface OptionsProps {
    decisionId: string
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
            this.props.onNewOption({Id: newId, Name: "?", Description: '?', Diagram: '', DiagramFile: null});
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
                        <Tabs
                            defaultActiveKey="Edit"
                            className="mb-3">
                            <Tab eventKey='Edit' title='Edit'>
                                <textarea
                                    value={x.Description || ''}
                                    id={'problemStatementEditor'}
                                    className={'form-control'}
                                    rows={7}
                                    cols={100}
                                    onChange={evt => {
                                        x.Description = evt.target.value
                                        this.props.onUpdateOption(x);
                                    }}/>
                            </Tab>
                            <Tab eventKey='Preview' title='Preview'>
                                <div style={{height: "150px", overflow: "scroll"}}
                                     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked.parse(x.Description))}}></div>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className={'col-4'}>
                        <label>Image {x.DiagramFile == null ? '(not set)' : x.DiagramFile }</label>
                        <form encType={'multipart/form-data'} method={'post'} action={`/savedecisiondiagram/execute/${this.props.decisionId}/${x.Id}`}>
                            <input type={'file'} name={'imageFile'} />
                            <button type={'submit'}>Update</button>
                        </form>
                        <label>Legacy HTML <b>Not filtered on print view</b></label>
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
