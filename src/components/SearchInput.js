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
    }
  }
  render() {
    return (
      <div className="clearfix flex flex-stretch">
        <div className="flex-auto">
          <div className="col col-6 border-left">
            <input onKeyDown={this.searchJob.bind(this)}
                   type="text"
                   ref="keyword"
                   className="field col-12"
                   placeholder="Job Title, Keyword, or Company" />
          </div>
          <div className="col col-6 border-left">
            <input onKeyDown={this.searchJob.bind(this)}
                   type="text"
                   ref="location"
                   className="field col-12"
                   placeholder="City, Country, Zip Code, or Remote" />
          </div>
        </div>
        <div className="flex-none bg-red white">
          search button
        </div>
      </div>
    );
  }
}
