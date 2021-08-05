'use strict';

class Matrix extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <table>
                <thead>
                <tr>
                    <td />
                    {this.props.options.map(x => <td>{x.Description}</td>)}
                </tr>
                </thead>
                <tbody>
                {this.props.criteria.map(criteria => (
                    <tr>
                        <td>{criteria.Description}</td>
                        {this.props.options.map(x => <td>
                            <input className={'form-control'} type="text" value="HERE" />
                        </td>)}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}
