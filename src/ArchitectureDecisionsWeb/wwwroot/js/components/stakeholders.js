'use strict';

class Stakeholders extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const button = <button type="button" className={'btn btn-block btn-primary  '} onClick={() => {
            const newId = this.props.stakeholders.length === 0 ? 0 : Math.max(...this.props.stakeholders.map(x => x.Id)) + 1;
            this.props.onNewStakeholder({Id: newId, Name: '?', Role: '?', Socialised: false});
        }}>New Stakeholder</button>

        if (this.props.stakeholders.length === 0) {
            return <div>
                <p>No stakeholders defined</p>
                {button}
            </div>;
        }

        const items = this.props.stakeholders.map(x => (
            <li key={x.Id} className={'list-group-item'}>
                <div className={'form-row'}>
                    <label className={'col-form-label'}>Name</label>
                    <div className={'col'}>
                        <input className={'form-control'} type="text" value={x.Name} onChange={evt => {
                            x.Name = evt.target.value;
                            this.props.onUpdateStakeholder(x);
                        }}/>
                    </div>
                    <label className={'col-form-label'}>Role</label>
                    <div className={'col'}>
                        <input className={'form-control'} type="text" value={x.Role} onChange={evt => {
                            x.Role = evt.target.value;
                            this.props.onUpdateStakeholder(x);
                        }}/>
                    </div>
                    <div className={'col'}>
                        <div className="form-check">
                            <input className={'form-check-input'} type="checkbox" checked={x.Socialised} onChange={evt => {
                                x.Socialised = evt.target.checked;
                                this.props.onUpdateStakeholder(x);
                            }}/>
                            <label className={'col-form-label'}>Socialised</label>
                        </div>
                    </div>
                    <div className={'col'}>
                        <button type={'button'} className={'btn btn-danger btn-sm mb-2'} onClick={() => {
                            this.props.onRemoveStakeholder(x);
                        }}>Delete
                        </button>
                    </div>
                </div>
                <div className={'form-row'}>
                </div>
            </li>));

        return (
            <div>
                <ul className={'list-group'}>
                    {items}
                </ul>
                {button}
            </div>
        );
    }
}
