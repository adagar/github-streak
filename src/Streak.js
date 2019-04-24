//rce

import React, { Component } from "react";
import * as moment from "moment";

class Streak extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      user: "adagar",
      contributions: [],
      streak: 0
    };
  }
  seekUser = () => {
    const user = this.state.user;
    console.log(user);
    //pagination example https://api.github.com/users/${user}/events?page=3
    const fetchReq = `https://api.github.com/users/${user}/events?page=1`;

    fetch(fetchReq)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ contributions: json });
        this.countStreak();
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

  countStreak = () => {
    console.log("Counting streak");
    const today = new Date();
    let todaysDate =
      ("0" + today.getFullYear()).slice(-4) +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);
    let lastContributeDate = null;
    let userContributions = this.state.contributions;
    console.log(this.state.contributions);
    for (let i = 0; i < userContributions.length; i++) {
      let event = userContributions[i];
      let evtDate = event.created_at.slice(0, 10);
      let streak = this.state.streak;
      if (lastContributeDate) {
      } else {
        console.log(todaysDate, evtDate);
        if (todaysDate === evtDate) {
          //they had activity today!
          console.log("first contribute today");
          lastContributeDate = today;
          streak = 1;
        }
      }
      this.setState({
        streak: streak
      });
    }
  };

  render() {
    const githubEvents = this.state.contributions.length ? (
      this.state.contributions.map((event) => {
        return (
          <div key={event.id}>
            <p>{event.repo.name}</p>
          </div>
        );
      })
    ) : (
      <div>No events found</div>
    );
    return (
      <div>
        {this.state.streak}
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
