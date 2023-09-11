'use strict';

import React from "react";
import {FormCheck, FormLabel, Tab, Tabs} from 'react-bootstrap'
import {CriteriaModel} from "./model"
import * as marked from "marked"
import DOMPurify from "dompurify"

export interface CriteriaProps {
    criteria: CriteriaModel[]
    onNewCriteria: (criteria: CriteriaModel) => void
    onMoveUp: (criteria: CriteriaModel) => void
    onMoveDown: (criteria: CriteriaModel) => void
    onRemoveCriteria: (criteria: CriteriaModel) => void
    onUpdateCriteria: (criteria: CriteriaModel) => void
}

export class Criteria extends React.Component<CriteriaProps> {

    constructor(props: CriteriaProps) {
        super(props);
    }

    render() {

        const button = <button type="button" className={'btn btn-block btn-primary'} onClick={() => {
            const newId = this.props.criteria.length === 0 ? 0 : Math.max(...this.props.criteria.map(x => x.Id)) + 1;
            this.props.onNewCriteria({
                Id: newId,
                Description: '?',
                Definition: '?',
                Index: this.props.criteria.length,
                IsPrimary: true
            });
        }}>New Criteria</button>

        if (this.props.criteria.length === 0) {
            return <div>
                <p>No criteria defined</p>
                {button}
            </div>;
        }

        const criteria = this.props.criteria.map((x, idx) => (
            <li key={x.Id} className={'list-group-item'}>
                <div className={'form-row'}>
                    <div className={'col-1'}>
                        <button type={'button'} disabled={idx === 0} className={'btn btn-primary btn-sm mb-2'}
                                onClick={() => {
                                    this.props.onMoveUp(x);
                                }}>↑
                        </button>
                        &nbsp;
                        <button type={'button'} disabled={idx === this.props.criteria.length - 1}
                                className={'btn btn-primary btn-sm mb-2'} onClick={() => {
                            this.props.onMoveDown(x);
                        }}>↓
                        </button>
                    </div>
                    <label className={'col-form-label'}>Criteria</label>
                    <div className={'col'}>
                        <input className={'form-control'} type="text" value={x.Description} onChange={evt => {
                            x.Description = evt.target.value;
                            this.props.onUpdateCriteria(x);
                        }}/>
                    </div>
                </div>
                <div className={'form-row'}>
                    <div className={'col-1'}>
                        <FormLabel>Is Primary</FormLabel>
                    </div>
                    <div className={'col-1'}>
                        <FormCheck checked={x.IsPrimary} onChange={_ => {
                            x.IsPrimary = !x.IsPrimary;
                            this.props.onUpdateCriteria(x);
                        }}></FormCheck>
                    </div>
                </div>
                <div className={'form-row'}>
                    <div className={'col-1'}>
                        <button type={'button'} className={'btn btn-danger btn-sm mb-2'} onClick={() => {
                            this.props.onRemoveCriteria(x);
                        }}>Delete
                        </button>
                    </div>
                    <label className={'col-form-label'}
                           style={{'verticalAlign': 'top'}}>
                        Definition
                    </label>
                    <div className={'col'}>

                        <Tabs
                            defaultActiveKey="Edit"
                            className="mb-3">
                            <Tab eventKey='Edit' title='Edit'>
                                <textarea
                                    value={x.Definition || ''}
                                    id={'problemStatementEditor'}
                                    className={'form-control'}
                                    rows={7}
                                    cols={100}
                                    onChange={evt => {
                                        x.Definition = evt.target.value
                                        this.props.onUpdateCriteria(x);
                                    }}/>
                            </Tab>
                            <Tab eventKey='Preview' title='Preview'>
                                <div style={{height: "150px", overflow: "scroll"}}
                                     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked.parse(x.Definition))}}></div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </li>));

        return (
            <div>
                <ul className={'list-group'}>
                    {criteria}
                </ul>
                {button}
            </div>
        );
    }
}
