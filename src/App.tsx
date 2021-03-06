import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LCARSButton from './components/LCARSButton';
import LCARSCorner from './components/LCARSCorner';
import LCARS from './components/LCARS';
import ICONS from './resources/ICONS';
import LCARSText from './components/LCARSText';
import LCARSRectangle from './components/LCARSRectangle';
import AlamrScreenPortrait from './components/AlarmScreenPortrait';
import AlamrScreenLandscape from './components/AlarmScreenLandscape';
import LCARSIcon from './components/LCARSIcon';
import { Redirect } from 'react-router'


class App extends Component {

  state = {
    screenOrientation: 'portrait',
    navigate: false,
    path: ""
  }

  protected LEFT: number;
  protected TOP: number;
  protected RIGHT: number;
  protected BOTTOM: number;

  constructor(props: any) {
    super(props);

    this.LEFT = 10;
    this.TOP = 5;
    this.RIGHT  = 10;
    this.BOTTOM = 20;

    this.handleMenuItemOne = this.handleMenuItemOne.bind(this);
    this.handleMenuItemTwo = this.handleMenuItemTwo.bind(this);
    this.handleMenuItemThree = this.handleMenuItemThree.bind(this);
    this.handleMenuItemFour = this.handleMenuItemFour.bind(this);
    this.handleMenuItemFive = this.handleMenuItemFive.bind(this);
    this.handleMenuItemSix = this.handleMenuItemSix.bind(this);
  }
 
  setScreenOrientation = () => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      console.log('orientation: portrait');
      this.setState({
        screenOrientation: 'portrait'
      });
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
      console.log('orientation: landscape');
      this.setState({
        screenOrientation: 'landscape'
      });
    }
  }

  componentDidMount() {
    window.addEventListener('orientationchange', this.setScreenOrientation);
  }

  isPortraitMode = () => {
    console.log(this.state);
    const { screenOrientation } = this.state;
    return screenOrientation === 'portrait';
  }

  render() {
    console.log(`orientation: from render: isPortraitMode = ${this.isPortraitMode()}`);
    const navigate = this.state.navigate;
    const path = this.state.path;

    // here is the important part
    if (navigate) {
      return <Redirect to={path} push={true} />
    }

    return (
      <div>
      {!this.isPortraitMode() 
      ? <AlamrScreenPortrait 
        id="mainScreenPortrait"
        width={750} height={1340}
        title="SECURITY SYSTEM"
        />
      : <AlamrScreenLandscape 
      id="mainScreenLandscape"
      width={1000} height={560}
      title="SECURITY SYSTEM"
      />
      }

      </div>
       
    );
  }


  private handleMenuItemOne(e: any) {
    e.preventDefault();
    this.setState({ navigate: true, path: "/shapestestpage" });
  }

  private handleMenuItemTwo(e: any) {
    e.preventDefault();
    this.setState({ navigate: true, path: "/icontestpage" });
  }

  private handleMenuItemThree(e: any) {
    e.preventDefault();
    this.setState({ navigate: true, path: "/colorpalettetestpage" });
  }

  private handleMenuItemFour(e: any) {
    e.preventDefault();
    this.setState({ navigate: true, path: "/buttonstestpage" });
  }

  private handleMenuItemFive(e: any) {
    e.preventDefault();
    this.setState({ navigate: true, path: "/texttestpage" });
  }

  private handleMenuItemSix(e: any) {
    e.preventDefault();
    this.setState({ navigate: true, path: "/indicatortestpage" });
  }
}

export default App;
