import * as React from "react";

import { CoreUtils } from "../../Utilities/Core";
import "../../Utilities/PasteImagePlugin";
import "../../Utilities/UploadImagePlugin";
import { BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState } from "./BaseFluxComponent";

import { autobind } from "OfficeFabric/Utilities";

import "trumbowyg/dist/trumbowyg";
import "trumbowyg/dist/ui/trumbowyg.min.css";

export interface IRichEditorProps extends IBaseFluxComponentProps {
    containerId: string;
    data?: string;
    delay?: number;
    onChange?: (newValue: string) => void;
    editorOptions?: any;
}

export class RichEditor extends BaseFluxComponent<IRichEditorProps, IBaseFluxComponentState> {
    private _richEditorContainer: JQuery;
    private _delayedFunction: CoreUtils.DelayedFunction;

    protected getDefaultClassName(): string {
        return "rich-editor";
    }

    public componentDidMount() {
        this._richEditorContainer = $("#" + this.props.containerId);
        this._richEditorContainer
            .trumbowyg(this.props.editorOptions || {})
            .on("tbwchange", this._onChange)
            .on("tbwblur", this._fireChange);
        
        this._richEditorContainer.trumbowyg("html", this.props.data || "");
    }

    public componentWillUnmount() {
        this._richEditorContainer.trumbowyg("destroy");
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
        }
    }

    public componentWillReceiveProps(nextProps: IRichEditorProps) {
        if (nextProps.data !== this._richEditorContainer.trumbowyg("html")) {
            this._richEditorContainer.trumbowyg("html", nextProps.data || "");
        }
    }

    public render() {
        return <div id={this.props.containerId} className={this.getClassName()} />;
    }

    @autobind
    private _onChange() {
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
        }
       
        if (this.props.delay == null) {
            this._fireChange();
        }
        else {
            this._delayedFunction = CoreUtils.delay(this, this.props.delay, () => {
                this._fireChange();
            });
        }      
    }

    @autobind
    private _fireChange() {
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
        }
        
        if (this.props.onChange) {
            this.props.onChange(this._richEditorContainer.trumbowyg("html"));
        }
    }
}