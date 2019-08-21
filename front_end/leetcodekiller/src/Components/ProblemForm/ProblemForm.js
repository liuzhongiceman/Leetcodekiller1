import React from 'react';
import { Form, Input, Button, Radio } from 'antd';



class ProblemForm extends React.Component {
    constructor() {
        super();
        this.state = {
            problemNumber:"",
            difficultieLevel:"",
            date:"",
            method:"",
            round:"",
            link:"",
            hidden:"hidden",
            apiMethod:"POST",
            apiUrl:"/createProblem",
        };
    }

    componentDidMount = () => {
       this.getDate();
    }
    


    inputonChange = (e) =>{
        this.setState({problemNumber : e.target.value.replace(/^\s+|\s+$/gm,'')}, () => {
        console.log("this.state.problemNumber",this.state.problemNumber);
        this.checkDuplication();
    })
    }

    linkonChange = (e) =>{
        this.setState({link : e.target.value })
    }

    checkDuplication = () => {
        console.log("this.props.data",this.props.data);
        console.log("problemName submit, this.state.problemNumber",this.state.problemNumber);
        const data = this.props.data;
        for(var i = data.length-1; i >= 0; i--){
            if(data[i].number === this.state.problemNumber){
                console.log("duplication true");
                this.setState({
                    apiMethod : "PUT",
                    apiUrl : "/updateProblem"
                 })
                return true;
            }
        }
        console.log("duplication false",false);
        return false;
    }

    getDate = () => {
        var m = new Date();
        var month = '' + (m.getMonth() + 1);
        var day = '' + m.getDate();
        var year = m.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        var date = [year, month, day].join('-');
        this.setState({date})
    }

    apiConnection = () => {
        console.log("this.state.apiUrl", this.state.apiUrl);
        console.log("this.state.apiUrl", typeof(this.state.apiUrl));
        console.log("this.state.method", this.state.method);
        console.log("this.state.date", this.state.date);

        console.log("this.state.method", typeof(this.state.method));
        fetch(this.state.apiUrl,{
            method:this.state.apiMethod,
            mode: 'cors',
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "number": this.state.problemNumber,
                "difficulty": this.state.difficultieLevel,
                "date": this.state.date,
                "method": this.state.method,
                "round": this.state.round,
                "link":this.state.link
            }),
        })
            .then(response => response.json())
            .then(json => 
                console.log("post problem",json),
                window.location.reload(false)
                )
            .catch((err)=>{
                console.log("post failed :", err)
            })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("form submmited clicked")
        this.checkDuplication()
        if(this.state.problemNumber !== "" && this.state.difficultieLevel !== "" &&
            this.state.method !== "" && this.state.round !== ""){
            console.log("this.state.problemNumber is not empty")
            this.apiConnection();
}}
    

    methodOnChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            method: e.target.value,
        });
    };

    difficultyOnChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            difficultieLevel: e.target.value,
        });
    };


    roundOnChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            round: e.target.value,
        });
    };

  

    render() {
        const { formLayout } = this.state;
        const formItemLayout =
                {
                    labelCol: { span: 6 },
                    wrapperCol: { span: 6 },
                }
        
        const buttonItemLayout =
                {
                    wrapperCol: { span: 14, offset: 6 },
                }

        const solvedMethods = [
            { label: 'Checked answers', value: 'answer' },
            { label: 'Without Checking answers', value: 'self' },
        ];  

        const difficultieLevel = [
            { label: 'Easy', value: 'easy' },
            { label: 'Medium', value: 'medium' },
            { label: 'Hard', value: 'hard' },
        ];

        const rounds = [
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 },
            { label: '++Three', value: 4 },
        ];

        return (
            <div className="problemForm">
                <Form layout={formLayout} onSubmit={this.onSubmit}  >
                        <Form.Item label="LeetCode Number Or Algorithm Name (Required)" {...formItemLayout}>
                              <div className="example-input">
                                <Input 
                                    size="large"
                                    type = "text"
                                    name = "problemNumber"
                                    onChange = {this.inputonChange}
                                    placeholder="For example: 65 or Priority Queue" />
                                </div>
                        </Form.Item>
                        <Form.Item label="How Did You solve this algorithm (Required)" {...formItemLayout}>
                            <Radio.Group options={solvedMethods} defaultValue={['1']} onChange={this.methodOnChange} />
                        </Form.Item>
                        <Form.Item label="Difficulty of this algorithm (Required)" {...formItemLayout}>
                            <Radio.Group options={difficultieLevel} defaultValue={['1']} onChange={this.difficultyOnChange} />
                        </Form.Item>
                        <Form.Item label="Rounds have you solved this algorithm (Required)" {...formItemLayout}>
                            <Radio.Group options={rounds} defaultValue={['1']} onChange={this.roundOnChange} />
                        </Form.Item>
                          <Form.Item label="Link to this algorithm (Optional)" {...formItemLayout}>
                              <div className="example-input">
                                <Input 
                                    size="large"
                                    type = "text"
                                    name = "link"
                                    onChange = {this.linkonChange}
                                    placeholder="For example: https://www.geeksforgeeks.org/binary-search/" />
                                </div>
                        </Form.Item>
                    
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" htmlType="submit" className="subBtn">Submit or Update Your Alogrithm</Button>
                        </Form.Item>
                       
                         <Form.Item {...buttonItemLayout}>
                            <h3  className={this.state.hidden}> Please input all Required fields</h3>
                        </Form.Item> 
                    </Form>
            </div>
        );
    }
}

export default ProblemForm;

