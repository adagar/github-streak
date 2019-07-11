//rce

import React, { Component } from "react";
import Yesterday from "./functions/Yesterday";

class Streak extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      user: "adagar",
      contributions: [],
      streak: 0,
      page: 1,
      status: "init"
    };
  }

  fetchNow = async () => {
    let user = this.state.user;
    let page = this.state.page;
    const fetchReq = `https://us-central1-github-streak-d7ba0.cloudfunctions.net/seekUser?user=${user}&page=${page}`;
    await fetch(fetchReq)
      .then((res) => res.json())
      .then(async (json) => {
        console.log("Looking at page", page);
        //this.setState({ contributions: json });
        this.setState((state, props) => {
          return {
            contributions: [...this.state.contributions, ...json]
          };
        });
        console.log(json);
        if (json.length !== 0) {
          this.setState({
            page: this.state.page + 1
          });
          await this.fetchNow();
        } else {
          console.log("Scan complete!");
          return;
        }
      });
  };

  seekUser = async (user, page) => {
    //new user, new streak
    if (this.state.page === 1) {
      this.setState({
        streak: 0
      });
    }
    console.log(user);
    //pagination example https://api.github.com/users/${user}/events?page=3
    //const fetchReq = `https://api.github.com/users/${user}/events?page=1`;

    this.state.status = "loading";
    await this.fetchNow(user, page);
    this.state.status = "loaded";
    console.log("Fetch complete, counting streak");
    this.countStreak();
  };

  handleChange = (e) => {
    this.setState({
      user: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.seekUser(this.state.user, this.state.page);
  };

  incrementStreak = () => {
    let gap = 100;
    let streak = this.state.streak;
    streak += 1;
    this.setState({
      streak: streak
    });
    return new Promise((resolve) => setTimeout(resolve, gap));
  };

  updateRing = () => {
    const gitClrs = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"];

    if (this.state.streak > 1) {
      //console.log(this.props.ref);
    }
  };

  countStreak = async () => {
    console.log("Counting streak");
    const today = new Date();
    let formattedDate =
      ("0" + today.getFullYear()).slice(-4) +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);
    let lastContributeDate = null;
    let userContributions = this.state.contributions;
    //console.log(this.state.contributions);
    for (let i = 0; i < userContributions.length; i++) {
      let event = userContributions[i];
      let evtDate = event.created_at.slice(0, 10);

      this.updateRing();

      if (lastContributeDate) {
        //what was day before last contribute
        let priorDay = Yesterday(lastContributeDate);
        console.log(
          "Previous day:",
          priorDay,
          "Last Contribute:",
          lastContributeDate,
          "This event:",
          evtDate
        );
        if (evtDate === lastContributeDate) {
          //same day contribution
          console.log("another contribution, same day");
        } else if (evtDate === priorDay) {
          //next day contribution
          console.log("Additional streak day!");
          lastContributeDate = priorDay;
          await this.incrementStreak();
        } else {
          //Streak broken!
          console.log("streak broken, you didn't code on", priorDay);
          //streak = 0;
          break;
        }
      } else {
        //console.log(formattedDate, evtDate);
        if (formattedDate === evtDate) {
          //they had activity today!
          console.log("first contribute today");
          lastContributeDate = formattedDate;
          await this.incrementStreak();
        }
      }
      // //check if we're out of contributions, but they're still streaking
      // if (i === userContributions.length - 1) {
      //   this.setState({
      //     page: this.state.page + 1
      //   });
      //   this.seekUser(this.state.user, this.state.page);
      // }
    }
  };

  render() {
    const githubEvents = this.state.contributions.length ? (
      this.state.contributions.map((event) => {
        return (
          <div key={event.id}>
            <p>{event.repo.name}</p>
            <p>{event.created_at}</p>
          </div>
        );
      })
    ) : (
      <div>No events found</div>
    );

    let status;
    if (this.state.status === "init") {
      status = <h3>Welcome!</h3>;
    } else if (this.state.status === "loading") {
      status = (
        <div className="preloader-wrapper active">
          <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      );
    } else {
      status = <h3>{this.state.streak}</h3>;
    }

    return (
      <div className="Streak">
        {status}
        <form
          onSubmit={this.handleSubmit}
          className="input-field vertical-center"
        >
          <i className="prefix material-icons">person</i>
          <label className="black-text">Look up user:</label>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.content}
          />
        </form>
        {/*githubEvents*/}
      </div>
    );
  }
}

export default Streak;
