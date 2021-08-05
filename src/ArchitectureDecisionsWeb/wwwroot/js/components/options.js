'use strict';

class Options extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const button = <button type="button" className={'btn btn-block btn-light'} onClick={() => {
            const newId = this.props.options.length === 0 ? 0 : Math.max(...this.props.options.map(x => x.Id)) + 1;
            this.props.onNewOption({ Id: newId, Description: '?' });
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
                    <div className={'col'}>
                        <input className={'form-control'} type="text" value={x.Description} onChange={evt => {
                            x.Description = evt.target.value;
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
