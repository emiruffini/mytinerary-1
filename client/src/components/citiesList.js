import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCities } from "../actions/citiesActions";
import { DebounceInput } from "react-debounce-input";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

class CitiesList extends Component {
  componentDidMount() {
    this.props.fetchCities();
  }

  constructor() {
    super();
    this.state = {
      search: ""
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    const filteredCities = this.props.cities.filter(city => {
      return (
        city.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    return (
      <div>
        <DebounceInput
          placeholder="search city..."
          debounceTimeout={1000}
          type="text"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        <ul>
          {filteredCities.map(city => (
            <NavLink to={"/itinerary/" + city.name}>
              <li key={city._id}>{city.name}</li>
            </NavLink>
          ))}
        </ul>
      </div>
    );
  }
}

CitiesList.propTypes = {
  fetchCities: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  cities: state.cities.items
});

export default connect(
  mapStateToProps,
  { fetchCities }
)(CitiesList);
