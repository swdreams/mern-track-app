import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: '',
            date: new Date(),
            users: []
        }
        // let name = "Liki"
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username,
                    })
                }
            });

        this.setState({
            users: ['test user'],
            username: 'test user'
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });

        console.log(this.state);
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));
        window.location = "/";
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select ref="userInput"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text"
                               required
                               className="form-control"
                               onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration (in minutes):</label>
                        <input type="text"
                               required
                               className="form-control"
                               onChange={this.onChangeDuration}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date:</label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
};