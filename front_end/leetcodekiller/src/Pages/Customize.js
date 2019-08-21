import React from 'react';
import { Form, Input, Button, Row} from 'antd';
import { withRouter } from 'react-router-dom';


class Customize extends React.Component {
    constructor() {
        super();
        this.state = {
           rule1:"",
           rule2:"",
           rule3:"",
           rule4:"",
           rule5:"",
           rule6:"",
           rule7:"",
           rule8:""
        };
        this.routeChange = this.routeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    routeChange() {
        let path = `/home`;
        this.props.history.push(path);
    }

    inputonChange1 = (e) =>{
        // console.log(typeof(e.target.value));
        this.setState({rule1 : e.target.value })
    }

    inputonChange2 = (e) =>{
        // console.log(e.target.value);
        this.setState({rule2 : e.target.value })
    }

      inputonChange3 = (e) =>{
        // console.log(e.target.value);
        this.setState({rule3 : e.target.value })
    }

      inputonChange4 = (e) =>{
        // console.log(e.target.value);
        this.setState({rule4: e.target.value })
    }


    inputonChange5 = (e) =>{
        // console.log(e.target.value);
        this.setState({rule5 : e.target.value })
    }

    inputonChange6 = (e) =>{
        // console.log(e.target.value);
        this.setState({rule6: e.target.value })
    }

      inputonChange7 = (e) =>{
        // console.log(e.target.value);
        this.setState({rule7 : e.target.value })
    }

      inputonChange8 = (e) =>{
        // console.log(e.target.value);
        this.setState({rule8 : e.target.value })
    }

    onSubmit = (e) => {
        // console.log("post rule submitted")
        e.preventDefault();
        fetch("/createRule",{
            method:'POST',
            mode: 'cors',
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "rule1": this.state.rule1,
                "rule2": this.state.rule2,
                "rule3": this.state.rule3,
                "rule4": this.state.rule4,
                "rule5": this.state.rule5,
                "rule6": this.state.rule6,
                "rule7": this.state.rule7,
                "rule8": this.state.rule8,
            }),
        })
        .then(response => response.json())
        .then(data => 
            // console.log("post rule data",data),
            window.location.reload(false)
            )
        .catch((err)=>{
            console.log("post failed :", err)
        })
    }  

    render() {
        const { formLayout } = this.state;
        const formItemLayout =
                {
                    labelCol: { span: 12 },
                    wrapperCol: { span: 2 },
                }
        
        const buttonItemLayout =
                {
                    wrapperCol: { span: 14, offset: 6 },
                }
        const textDisplay =  this.props.rule? 
                <Row justify="space-around" align="middle">
                    <h2 className="rule-text-display"> 
                        You Current Review Rule is: {this.props.rule.rule1},{this.props.rule.rule2},
                        {this.props.rule.rule3},{this.props.rule.rule4},{this.props.rule.rule5},
                        {this.props.rule.rule6}, {this.props.rule.rule6}, {this.props.rule.rule7},
                        {this.props.rule.rule8}
                    </h2> 
                </Row> : null     

        return (
            <div className="customize">
                <div className="customize-content">
                <h2 className="customize-head">Customize Your Review Rules</h2>
                 {textDisplay}
                 <hr className="hrstyle"/>
                <Form layout={formLayout} onSubmit={this.onSubmit}  >
                        <Form.Item label="Round1 and Sloved with the help of answer" {...formItemLayout}>
                              <div className="example-input">
                                <Input 
                                    size="large"
                                    type = "text"
                                    name = "problemNumber"
                                    onChange = {this.inputonChange1}
                                    placeholder="default 3 days" />
                                </div>
                        </Form.Item>

                         <Form.Item label="Round2 and Sloved with the help of answer" {...formItemLayout}>
                              <div className="example-input">
                                <Input 
                                    size="large"
                                    type = "text"
                                    name = "problemNumber"
                                    onChange = {this.inputonChange2}
                                    placeholder="default 7 days" />
                                </div>
                        </Form.Item>

                        <Form.Item label="Round3 and Sloved with the help of answer" {...formItemLayout}>
                              <div className="example-input">
                                <Input 
                                    size="large"
                                    type = "text"
                                    name = "problemNumber"
                                    onChange = {this.inputonChange3}
                                    placeholder="default 7 days" />
                                </div>
                        </Form.Item>

                        <Form.Item label="Round3+ and Sloved with the help of answer" {...formItemLayout}>
                              <div className="example-input">
                                <Input 
                                    size="large"
                                    type = "text"
                                    name = "problemNumber"
                                    onChange = {this.inputonChange4}
                                    placeholder="default 7 days" />
                                </div>
                        </Form.Item>

                         <Form.Item label="Round1 and Sloved without the help of checking answer" {...formItemLayout}>
                              <div className="example-input">
                                <Input 
                                    size="large"
                                    type = "text"
                                    name = "problemNumber"
                                    onChange = {this.inputonChange5}
                                    placeholder="default 7 days" />
                                </div>
                        </Form.Item>

                          <Form.Item label="Round2 and Sloved without the help of checking answer" {...formItemLayout}>
                              <div className="example-input">
                                <Input 
                                    size="large"
                                    type = "text"
                                    name = "problemNumber"
                                    onChange = {this.inputonChange6}
                                    placeholder="default 15 days" />
                                </div>
                        </Form.Item>

                        <Form.Item label="Round3 and Sloved without the help of checking answer" {...formItemLayout}>
                              <div className="example-input">
                                <Input 
                                    size="large"
                                    type = "text"
                                    name = "problemNumber"
                                    onChange = {this.inputonChange7}
                                    placeholder="default 30 days" />
                                </div>
                        </Form.Item>
                     
                         <Form.Item label="Round3+ and Sloved without the help of checking answer" {...formItemLayout}>
                              <div className="example-input">
                                <Input 
                                    size="large"
                                    type = "text"
                                    name = "problemNumber"
                                    onChange = {this.inputonChange8}
                                    placeholder="default 60 days" />
                                </div>
                        </Form.Item>
                    
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" htmlType="submit" className="subBtn" >Submit Your Alogrithm</Button>
                        </Form.Item>
                        {/* onClick={this.routeChange} */}
                    </Form>
                    </div>
            </div>
        );
    }
}

export default withRouter(Customize);