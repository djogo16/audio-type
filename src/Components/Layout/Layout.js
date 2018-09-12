import React, {Component} from 'react';
import Aux from '../../hoc/Aux.js';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar.js'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer.js'
class  Layout extends Component{
    state = {showSideDrawer:false};

    showSidedrawerHandler = ()=>{
        this.setState({showSideDrawer:false});
    }
    ToggleButtonHandler = ()=>{
        this.setState({showSideDrawer:true});
    }
    render(){
        return(
        <Aux>
            <SideDrawer open = {this.state.showSideDrawer} closed= {this.showSidedrawerHandler} />
            <Toolbar clickedToggle = {this.ToggleButtonHandler}/>
            <main className = {Classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
} 
export default Layout;