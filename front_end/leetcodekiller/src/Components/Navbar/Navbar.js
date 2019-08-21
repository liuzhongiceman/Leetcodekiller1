import React from 'react';
import { Layout, Menu} from 'antd';
import { Link} from 'react-router-dom';
const { Header} = Layout;

class Navbar extends React.Component {
    render() {
        return (
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px'}}
                >
                    <Menu.Item key="1" style = {{fontSize:'24px'}}>
                        <Link to="/">LeetCode Killer</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/instruction">How It Works</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/viewAll">All Sloved Algorithms</Link>
                    </Menu.Item>
                     <Menu.Item key="4">
                        <Link to="/customize">Cutomize Review Rules</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/aboutMe">About The Author</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default Navbar;

