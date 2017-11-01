import "./Badge.scss";

import * as React from "react";

import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../Utilities/BaseFluxComponent";

import { Callout, DirectionalHint } from "OfficeFabric/Callout";
import { Icon } from "OfficeFabric/Icon";
import { Label } from "OfficeFabric/Label";

export interface IBadgeProps extends IBaseFluxComponentProps {
    notificationCount: number;
    showCalloutOnHover?: boolean;
    directionalHint?: DirectionalHint;
}

export interface IBadgeState extends IBaseFluxComponentState {
    isCalloutVisible: boolean;
}

export class Badge extends BaseFluxComponent<IBadgeProps, IBadgeState> {
    private _calloutTargetElement: HTMLElement;

    protected initializeState() {
        this.state = {
            isCalloutVisible: false
        };
    }

    protected getDefaultClassName(): string {
        return "badge";
    }

    public render() {
        return <div className={this.getClassName()}>
            <div              
                className="badge-container" 
                onMouseEnter={this._onMouseOver}
                onMouseLeave={this._onMouseOut}
                onClick={this._onClickCallout}>

                <div ref={(element) => this._calloutTargetElement = element}>
                    <Icon iconName="Ringer" className="badge-icon" />
                </div>
                <Label className="badge-notification-count">{this.props.notificationCount}</Label>
            </div>
            { 
                this.state.isCalloutVisible && 
                <Callout                    
                    gapSpace={0}
                    target={this._calloutTargetElement}
                    onDismiss={this._dismissCallout}
                    setInitialFocus={true}
                    isBeakVisible={true}
                    directionalHint={this.props.directionalHint || DirectionalHint.bottomRightEdge}
                >
                    <div className="badge-callout-container">
                        { this.props.children }
                    </div>                    
                </Callout>
            }
        </div>
    }

    private _onMouseOver = () => {
        if (this.props.showCalloutOnHover){
            this.setState({
                isCalloutVisible: true
            });
        }
    }

    private _onMouseOut = () => {
        if (this.props.showCalloutOnHover){
            this._dismissCallout();
        }
    } 

    private _onClickCallout = () => {
        if (!this.props.showCalloutOnHover){
            this.setState({
                isCalloutVisible: !this.state.isCalloutVisible
            });
        }        
    }

    private _dismissCallout = () => {
        this.setState({
            isCalloutVisible: false
        });
    }
}