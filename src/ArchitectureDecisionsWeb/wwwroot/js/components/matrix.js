'use strict';

class Matrix extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <table className={'table table-striped'}>
                <thead>
                <tr className={''}>
                    <td/>
                    {this.props.options.map(x => <td key={`description-${x.Id}`}>{x.Name}</td>)}
                </tr>
                </thead>
                <tbody>
                {this.props.criteria.map(criteria => (
                    <tr key={`criteria-${criteria.Id}`}>
                        <td>{criteria.Description}</td>
                        {this.props.options.map(x => {
                            const option = this.props.comparisons[criteria.Id];
                            let comparison = option[x.Id]
                            if (!comparison) {
                                option[x.Id] = {Rating: {Commentary: '', Rank: 3}}
                                comparison = option[x.Id]
                            }
                            const key = `${criteria.Id}-${x.Id}`
                            const commentaryRef = React.createRef();
                            const rankRef = React.createRef();

                            function backgroundStyle(rank) {
                                switch (rank) {
                                    case 0 :
                                        return 'bg-danger';
                                    case 1 :
                                        return 'bg-warning';
                                    case 3 :
                                        return '';
                                    default:
                                        return 'bg-success';
                                }
                            }

                            return (<td key={key}>
                                <div className={'row'}>
                                    <div className={'col'}>
                                        <ReactBootstrap.Form.Select
                                            className="form-control me-sm-2" ref={rankRef}
                                            value={comparison.Rating.Rank}

                                            onChange={_ => {
                                                this.props.onUpdateMatrix(criteria.Id, x.Id, {
                                                    Commentary: commentaryRef.current.value,
                                                    Rank: parseInt(rankRef.current.value, 10)
                                                });

                                            }}>
                                            <option value="0">Poor</option>
                                            <option value="1">Average</option>
                                            <option value="2">Good</option>
                                            <option value="3">Unknown</option>
                                        </ReactBootstrap.Form.Select>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col'}>
                                        <textarea className={`form-control ${backgroundStyle(comparison.Rating.Rank)}`}
                                                  cols={30} rows={2}
                                                  value={comparison.Rating.Commentary}
                                                  ref={commentaryRef}
                                                  onChange={_ => {
                                                      this.props.onUpdateMatrix(criteria.Id, x.Id, {
                                                          Commentary: commentaryRef.current.value,
                                                          Rank: parseInt(rankRef.current.value, 10)
                                                      });
                                                  }}/>
                                    </div>
                                </div>
                            </td>)
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }

}
