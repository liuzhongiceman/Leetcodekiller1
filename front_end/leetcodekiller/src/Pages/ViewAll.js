import React from 'react';
import giphy from "../Assets/images/giphy.gif";
import {Table} from 'antd';

export default class ViewAll extends React.Component{
      constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    render(){
         const style = {
            width:"100px"
        }

         const columns = [
            {
                title: 'Problem Number Or Name',
                dataIndex: 'number',
                width: 200,
            },
            {
                title: 'Difficulty Level',
                dataIndex: 'level',
                width: 200,
            },
            {
                title: 'Round',
                dataIndex: 'round',
                width: 200,
            },
             {
                title: 'Method',
                dataIndex: 'method',
                width: 200,
            },
             {
                title: 'Link',
                dataIndex: 'link',
                width: 200,
            },
             {
                title: 'Last Submitted Date',
                dataIndex: 'date',
                width: 200,
            },
        ];

         const dataSrouce = [];
         const res = this.props.data;
        for (let i = res.length-1; i >=0;  i--) {
            dataSrouce.push({
                id: res[i]._id,
                number: res[i].number,
                level: res[i].difficulty,
                round: res[i].round,
                method: res[i].method,
                link: res[i].link? <a href={res[i].link} target="_blank" rel="noopener noreferrer" >link</a>: null,
                date: res[i].date,
            });
        }
        if (!res) return null;

        return(
            <div className="vieAll">
                <div className="viewAll-content">
                    
                        <h2 className="viewAll-text-display"> 
                            <img src={giphy} style={style} alt="fun images"/> 
                            You Are Doing Great! You have finished  {this.props.data? this.props.data.length: 0} Algorithms!
                        </h2> 
                   
                 <Table columns={columns} dataSource={dataSrouce} pagination={{ pageSize: 14 }} scroll={{ y: 750 }} rowKey="number" />

                </div>
            </div>
        )
    }
}