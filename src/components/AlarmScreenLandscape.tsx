import React, { Component } from "react";
import LCARS from './LCARS'
import LCARSText from './LCARSText';
import LCARSRectangle from './LCARSRectangle';
import LCARSCorner from './LCARSCorner';
import LCARSButton from './LCARSButton';
import LCARSIndicator from "./LCARSIndicator";

export interface AlamrScreenLandscapeProps {
    id: string;
    title: string;
    subTitle: string;
    width: number;
    vbWidth: number;
    height: number;
    vbHeight: number;
    color: number;
    //fontSize: number;
    visible: boolean;
}

export interface AlamrScreenLandscapeState {
    color: any;
    visible: boolean;
}

class AlamrScreenLandscape<P extends AlamrScreenLandscapeProps> extends Component<P> {

    public static defaultProps = {
        title: "",
        subTitle: "",
        width: 0,
        vbWidth: 0,
        height: 0,
        vbHeight: 0,
        color: LCARS.EC_ORANGE,
        //fontSize: LCARS.EF_TITLE,
        visible: true
    };

    protected title: string;
    protected subTitle: string;
    protected height: number;
    protected width: number;
    protected vbHeight: number;
    protected vbWidth: number;
    protected color: any;
    protected fontSize: number;
    protected CAP_WIDTH: number;
    protected headerThickness: number;
    protected LEFT: number;
    protected TOP: number;
    protected RIGHT: number;
    protected BOTTOM: number;
    protected titleWidth: number;
    protected titleGap: number;

    state: AlamrScreenLandscapeState;

    constructor(props: P) {
        super(props);
    
        this.title = this.props.title;
        this.subTitle = this.props.subTitle;
        this.height = this.props.height;
        this.width = this.props.width;
        this.vbHeight = this.props.vbHeight;
        this.vbWidth = this.props.vbWidth;
        this.color = LCARS.getColor(this.props.color);
        this.fontSize = LCARS.getLCARSFontSize(LCARS.EF_SUBTITLE);

        this.CAP_WIDTH = this.fontSize * 0.6;
        this.headerThickness = LCARS.LCARS_CORNER_END_HEIGHT;

        this.LEFT = 10;
        this.TOP = 35;
        this.RIGHT  = 10;
        this.BOTTOM = 20;

        this.titleWidth = LCARS.getTextWidth3(this.title, this.fontSize);
        if(this.titleWidth == 0) {
            this.titleGap = LCARS.LCARS_SPACE;
        }
        else {
            this.titleGap = 2 * LCARS.LCARS_SPACE;
        }

        if(this.props.vbWidth == 0) {
            this.vbWidth = this.props.width;
        }

        if(this.props.vbHeight == 0) {
            this.vbHeight = this.props.height;
        }

        this.state = {
            color: this.color,
            visible: this.props.visible
        };
    }

    render() {
        return(
            <svg viewBox={"0 0 " + this.vbWidth + " " + this.vbHeight}>
                <LCARSText 
                    id={this.props.id + "_screen_title"}
                    label={this.title}
                    color={this.props.color}
                    properties={ LCARS.EF_SUBTITLE }
                    x={this.width - (this.CAP_WIDTH + this.RIGHT + LCARS.LCARS_SPACE + this.titleWidth)} 
                    y={this.TOP}
                />

                <LCARSCorner
                    id={this.props.id + "_rect_title_bar"}
                    height={1}
                    width={this.width - this.titleGap - this.CAP_WIDTH - this.LEFT - this.RIGHT - this.titleWidth}
                    x={this.LEFT} y={this.TOP}
                    color={this.props.color}
                />

                <LCARSRectangle 
                    id={this.props.id + "_hb_end_cap_e"}
                    height={this.headerThickness}
                    width={this.CAP_WIDTH}
                    x={this.width - (this.CAP_WIDTH + this.RIGHT)} y={this.TOP}
                    color={this.props.color}
                    properties={LCARS.ES_RECT_RND_E }
                />

                <LCARSCorner
                    id={this.props.id + "_rect_footer_bar"}
                    height={1}
                    width={this.width - (1 * LCARS.LCARS_SPACE) - this.CAP_WIDTH - this.LEFT - this.RIGHT}
                    x={this.LEFT} y={this.height - this.BOTTOM - LCARS.LCARS_CORNER_HEIGHT}
                    color={this.props.color}
                    properties={LCARS.ES_SHAPE_SW}
                />

                <LCARSRectangle 
                    id={this.props.id + "_fb_end_cap_e"}
                    height={this.headerThickness}
                    width={this.CAP_WIDTH}
                    x={this.width - (this.CAP_WIDTH + this.RIGHT)} y={this.height - this.headerThickness - this.BOTTOM}
                    color={this.props.color}
                    properties={LCARS.ES_RECT_RND_E }
                />

                <LCARSCorner
                    id={this.props.id + "_main_status_bottom_bar"}
                    height={1}
                    width={this.width/2 - LCARS.LCARS_SPACE - this.LEFT}
                    x={this.LEFT}  
                    y={this.TOP + LCARS.LCARS_CORNER_HEIGHT + LCARS.LCARS_SPACE}
                    color={this.props.color}
                    properties={LCARS.ES_SHAPE_SW}
                />

                <LCARSCorner
                    id={this.props.id + "_main_status_bottom_bar_right"}
                    height={1}
                    width={this.width/2 - LCARS.LCARS_SPACE - this.LEFT}
                    x={this.width/2 + LCARS.LCARS_SPACE * 0.5} 
                    y={this.TOP + LCARS.LCARS_CORNER_HEIGHT*1.67 + LCARS.LCARS_SPACE}
                    color={this.props.color}
                    properties={LCARS.ES_SHAPE_NE}
                />


                <LCARSIndicator
                    id={this.props.id + "_ready_indicator"}
                    height={75}
                    width={185}
                    x={this.LEFT + 175}
                    y={this.TOP + 60}
                    color={LCARS.EC_BLUE}
                    properties={LCARS.ES_RECT_RND_W | LCARS.ES_LABEL_W}
                    label={"READY"}
                />

                <LCARSIndicator
                    id={this.props.id + "_alarm_indicator"}
                    height={75}
                    width={300}
                    x={this.LEFT + 175 + 185+LCARS.LCARS_SPACE}
                    y={this.TOP + 60}
                    color={LCARS.EC_RED}
                    properties={LCARS.ES_RECT_RND_E | LCARS.ES_LABEL_E}
                    label={"ARMED"}
                />

                <LCARSButton
                    id={this.props.id + "_button_mode_1"}
                    height={2}
                    x={this.width - this.RIGHT - LCARS.LCARS_BTN_WIDTH - LCARS.LCARS_SPACE * 0.5}
                    y={this.TOP + 260}
                    label={"MODE 1"}
                    enabled={true}
                />

                <LCARSIndicator
                    id={this.props.id + "_connection_indicator"}
                    height={30}
                    x={this.width - this.RIGHT - LCARS.LCARS_BTN_WIDTH - LCARS.LCARS_SPACE * 0.5}
                    y={this.TOP + 380 + LCARS.LCARS_SPACE*2}
                    color={LCARS.EC_BLUE}
                    properties={LCARS.ES_LABEL_E}
                    label={"CONNECTED"}
                />

                <LCARSButton
                    id={this.props.id + "_button_mode_2"}
                    height={2}
                    x={this.width - this.RIGHT - LCARS.LCARS_BTN_WIDTH - LCARS.LCARS_SPACE * 0.5}
                    y={this.TOP + 410 + LCARS.LCARS_SPACE*3}
                    label={"MODE 2"}
                    enabled={true}
                />

                <LCARSCorner
                    id={this.props.id + "_keypad_bottom_bar_right"}
                    height={1}
                    width={this.width/2 - LCARS.LCARS_SPACE - this.LEFT}
                    x={this.width/2 + LCARS.LCARS_SPACE * 0.5} 
                    y={this.TOP + 530 + LCARS.LCARS_SPACE*5}
                    color={this.props.color}
                    properties={LCARS.ES_SHAPE_SE}
                />

                <LCARSCorner
                    id={this.props.id + "_keypad_bottom_bar_left"}
                    height={1}
                    width={this.width/2 - LCARS.LCARS_SPACE - this.LEFT}
                    x={this.LEFT}  
                    y={this.TOP + 500 + LCARS.LCARS_CORNER_HEIGHT + LCARS.LCARS_SPACE*5}
                    color={this.props.color}
                    properties={LCARS.ES_SHAPE_NW}
                />

                

                {this.props.children}
            </svg>
        );
    }
    
}

export default AlamrScreenLandscape;