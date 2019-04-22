//rce

import React, { Component } from "react";

class Streak extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      contributions: []
    };
  }
  componentDidMount() {
    const user = window.location.pathname;
    const fetchReq = `https://api.github.com/users${user}/events`;
    fetch(fetchReq)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ contributions: json });
      });
  }
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
    return <div>{githubEvents}</div>;
  }
}

export default Streak;
