'use strict';

class Criteria extends React.Component {

    constructor(props) {
        super(props);
        var count = 0;
        this.state = {
            criteria: props.criteria.map(x => ({
                id: (++count),
                definition: x
            }))
        };
    }

    componentDidMount() {
        this.props.onUpdate(this.state.criteria);
    }

    render() {

        const button = <button type="button" className={'btn btn-block btn-light'} onClick={() => {
            const newState = this.state.criteria.concat({
                id: this.state.criteria.length + 1,
                definition: 'New Criteria'
            });
            this.setState({criteria: newState});
        }}>New Criteria</button>

        if (this.state.criteria.length === 0) {
            return <div>
                <p>No criteria defined</p>
                {button}
            </div>;
        }

        const criteria = this.state.criteria.map(x => (
            <li key={x.id} className={'list-group-item'}>
                <div className={'form-row'}>
                    <div className={'col'}>
                        <input className={'form-control'} type="text" value={x.definition} onChange={evt => {
                            x.definition = evt.target.value;
                            this.setState({criteria: this.state.criteria});
                            this.props.onUpdate(this.state.criteria);
                        }}/>
                    </div>
                    <div className={'col'}>
                        <button type={'button'} className={'btn btn-danger btn-sm mb-2'} onClick={() => {
                            let index = this.state.criteria.indexOf(x);
                            let state = this.state.criteria;
                            state.splice(index, 1);
                            this.setState({criteria: state});
                            this.props.onUpdate(state);
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
