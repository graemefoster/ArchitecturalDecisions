'use strict';

class Criteria extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const button = <button type="button" className={'btn btn-block btn-light'} onClick={() => {
            const newId = this.props.criteria.length === 0 ? 0 : Math.max(...this.props.criteria.map(x => x.Id)) + 1;
            this.props.onNewCriteria({Id: newId, Description: '?'});
        }}>New Criteria</button>

        if (this.props.criteria.length === 0) {
            return <div>
                <p>No criteria defined</p>
                {button}
            </div>;
        }

        const criteria = this.props.criteria.map(x => (
            <li key={x.Id} className={'list-group-item'}>
                <div className={'form-row'}>
                    <label className={'col-form-label'}>Criteria</label>
                    <div className={'col'}>
                        <input className={'form-control'} type="text" value={x.Description} onChange={evt => {
                            x.Description = evt.target.value;
                            this.props.onUpdateCriteria(x);
                        }}/>
                    </div>
                    <div className={'col'}>
                        <button type={'button'} className={'btn btn-danger btn-sm mb-2'} onClick={() => {
                            this.props.onRemoveCriteria(x);
                        }}>Delete
                        </button>
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
