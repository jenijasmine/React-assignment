import React, { Component } from 'react';
import axios from 'axios';
import '../styles.css'

export default class ApiDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            answers: [],
            users: []
        }
    }

    handleChange = event => {
        this.setState({
            name: event.target.value
        });
    }

    getPosts = () => {
        axios.get(`http://localhost:3000/posts?q=${this.state.name}`)
            .then(response => {
                console.log(response);
                const data = JSON.parse(JSON.stringify(response.data));
                this.setState({
                    posts: data.slice()
                });
            })
    }


    getUsers = (aid) => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                console.log(aid);
                const data = JSON.parse(JSON.stringify(response.data));
                console.log('data ',data)
                this.setState({
                    users: data.filter(data => data.user_id === aid)
                });
            })
    }


    getAnswers = (qid) => {
        axios.get(`http://localhost:3000/answers`)
            .then(response => {
                console.log(qid);
                const data = JSON.parse(JSON.stringify(response.data));
                console.log('data ', data)
                this.setState({
                    answers: data.filter(data => data.ques_id === qid)
                });
                //console.log('answers ', this.state.answers)
            })
    }

    render() {
        let postlist = this.state.posts.map(
            p => (
                <div key={p.ques_id} className="card">
                    <div className="container">
                        {/* /* <button onClick={() => {this.getAnswers(p.ques_id)}}> */} 
                            <button className="btn btn-success" onClick={() => {this.getAnswers(p.ques_id)}}>Question:</button>
                            {p.question}
                            {/* Question: {p.question} */}
                           
                        {/* </button> */}
               </div>
                    
            </div>

            )
        );
        let answerlist = this.state.answers.map(
            p => (
               
                    <div className="col">
                        {/* <button onClick={() => {this.getAnswers(p.ques_id)}}> */}
                            {/* <p><button className="btn btn-success" onClick={this.getAnswers}>Question:</button></p> {p.question} <br/> */}
                            <button className="btn btn-success" onClick={() => {this.getUsers(p.user_id)}}>Answer:</button>
                            {p.answer}
                            
                        {/* </button> */}
                    </div>
            )
        );
        let userlist = this.state.users.map(
            p => (
               
                    <div className="col">
                        {/* <button onClick={() => {this.getAnswers(p.ques_id)}}> */}
                            {/* <p><button className="btn btn-success" onClick={this.getAnswers}>Question:</button></p> {p.question} <br/> */}
                           Answer is given by: {p.userName}
                            
                        {/* </button> */}
                    </div>
            )
        );


        return (
            <div className='searchform_wrapper'>
                <center><h1>StackOverflow Search</h1></center>
                {/* <input type="text" placeholder="Search Terms" name='searchTerms'/> */}
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
                &nbsp;
                    {/* <button className="btn btn-success" onClick={this.getPosts}>Get Posts</button> */}
                <button onClick={this.getPosts} disabled={this.state.name === ''}>Search</button>
                <div className="row">
                {postlist} 
                <div className="col">
                <br/>{answerlist}
                </div>
                </div>
                {userlist}
                            

            </div>
            // <div>
            //     <button className="btn btn-success" onClick={this.getPosts}>Get Posts</button>
            //     {postlist}
            // </div>
        )
    }
}