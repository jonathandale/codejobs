import React, {Component, PropTypes} from 'react';
import ReactDom from 'react-dom';
import searchSvg from '../images/search.svg';

export default class SearchInput extends Component {
  static propTypes = {
    actions: PropTypes.object,
    status: PropTypes.string,
  };

  searchKeyDown(event) {
    if (event.which === 13) searchJob();
  }

  searchJob() {
    const keyword = ReactDom.findDOMNode(this.refs.keyword).value;
    const location = ReactDom.findDOMNode(this.refs.location).value;
    this.props.actions.searchJobAction(keyword, location);
  }

  render() {
    var searchStyle = {
      backgroundImage: 'url(' + searchSvg + ')',
      backgroundSize: '20px',
      backgroundRepeat: 'no-repeat',
      width: '50px',
      backgroundPosition: '55% 50%',
      cursor: 'pointer'
    }
    return (
      <div className="clearfix flex flex-stretch">
        <div className="flex-auto">
          <div className="col col-6 border-left">
            <input onKeyDown={this.searchKeyDown.bind(this)}
                   type="text"
                   ref="keyword"
                   className="field col-12"
                   placeholder="Job Title, Keyword, or Company" />
          </div>
          <div className="col col-6 border-left">
            <input onKeyDown={this.searchKeyDown.bind(this)}
                   type="text"
                   ref="location"
                   className="field col-12"
                   placeholder="City, Country, Zip Code, or Remote" />
          </div>
        </div>
        <div className="flex-none bg-black black block"
             onClick={this.searchJob.bind(this)}
             style={searchStyle}>&nbsp;</div>
      </div>
    );
  }
}
