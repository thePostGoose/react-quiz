import React, { Component } from "react";
import classes from "./Layout.module.scss";
import MenuTogle from "../../components/navigation/MenuToggle/MenuToggle";
import Drawer from '../../components/navigation/Drawer/Drawer'
class Layout extends Component {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState((prevState) => {
      return {
        menu: !prevState.menu,
      };
    });
  };
  render() {
    return (
      <div className={classes.Layout}>
        <Drawer  isOpen={this.state.menu} onClose={this.toggleMenuHandler}/>
        <MenuTogle onToggle={this.toggleMenuHandler} isOpen={this.state.menu} />

        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
