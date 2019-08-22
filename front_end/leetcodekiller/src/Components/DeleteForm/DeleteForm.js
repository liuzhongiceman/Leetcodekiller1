import React from 'react'
import { Form, Input, Button } from 'antd';

class DeleteForm extends React.Component {
       constructor() {
        super();
        this.state = {
            data:[],
            problemNumber:""
            };
        }

    handleSubmit = e => {
        e.preventDefault();
        for(var i=0;i<this.props.data.length;i++){
            if(this.props.data[i].number === this.state.problemNumber){
                   fetch("/deleteOneProblem/"+this.props.data[i]._id,{
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'},
                        })
                        .then(res => res.text()) // OR res.json()
                        .then(res => 
                            console.log("delete success", res),
                            window.location.reload(false)
                        )
            }
        }
    };

    inputonChange = (e) =>{
        console.log(e.target.value)
        this.setState({ problemNumber: e.target.value.replace(/^\s+|\s+$/gm, '') })
    }
    
  render() {
    return (
        <div className="deleteForm">
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item  >
                    <Input
                    placeholder="Number Or Name"
                    onChange = {this.inputonChange}
                    />
                </Form.Item>
            
                <Form.Item>
                <Button type="primary" htmlType="submit">
                    Delete Algorithm
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
  }
}

export default DeleteForm
