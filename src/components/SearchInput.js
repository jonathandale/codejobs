import React, {Component, PropTypes} from 'react';
import ReactDom from 'react-dom';

export default class SearchInput extends Component {
  static propTypes = {
    actions: PropTypes.object,
    status: PropTypes.string,
  };

  searchJob(event) {
    if (event.which === 13) {
      const keyword = ReactDom.findDOMNode(this.refs.keyword).value;
      const location = ReactDom.findDOMNode(this.refs.location).value;
      this.props.actions.searchJobAction(keyword, location);

      document.getElementById('header').style.animationPlayState = 'running';
    }
  }
  render() {
    return (
      <div>
        <div className="form-group">
          <input onKeyDown={this.searchJob.bind(this)}
                 type="text"
                 ref="keyword"
                 className="form-control input-lg"
                 placeholder="JavaScript, Clojure, Ruby, etc" />
        </div>
        <div className="form-group">
          <input onKeyDown={this.searchJob.bind(this)}
                 type="text"
                 ref="location"
                 className="form-control input-lg"
                 placeholder="City, Country, Zip Code, or Remote" />
        </div>
        {()=>{
          if (this.props.status === 'PENDING') {
            return (<div className="loading" />);
          }
        }()}
      </div>
    );
  }
}
