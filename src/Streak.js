//rce

import React, { Component } from "react";

class Streak extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      user: "adagar",
      contributions: []
    };
  }
  seekUser = () => {
    const user = this.state.user;
    console.log(user);
    const fetchReq = `https://api.github.com/users/${user}/events`;
    console.log(fetchReq);
    fetch(fetchReq)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ contributions: json });
      });
  };

  handleChange = (e) => {
    this.setState({
      user: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.seekUser();
  };

  render() {
    console.log(this.state.data);
    const githubEvents = this.state.contributions.length ? (
      this.state.contributions
        .filter((event) => {
          return event.type === "CreateEvent" || event.type === "PushEvent";
        })
        .map((event) => {
          return <div key={event.id}>{event.repo.name}</div>;
        })
    ) : (
      <div>No events found</div>
    );
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Look up user:</label>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.content}
          />
        </form>
        {githubEvents}
      </div>
    );
  }
}

export default Streak;
