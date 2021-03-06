import * as React from "react";

import { ClassificationNodeActions } from "../../../Flux/Actions/ClassificationNodeActions";
import { BaseStore, StoreFactory } from "../../../Flux/Stores/BaseStore";
import {
    ClassificationNodeKey, ClassificationNodeStore
} from "../../../Flux/Stores/ClassificationNodeStore";
import { StringUtils } from "../../../Utilities/String";
import {
    BaseFluxComponent, IBaseFluxComponentState
} from "../../Utilities/BaseFluxComponent";
import { TreeCombo, ITreeComboProps } from "../../VssCombo/TreeCombo";

import { autobind, css } from "OfficeFabric/Utilities";

import { WorkItemClassificationNode } from "TFS/WorkItemTracking/Contracts";

import { TreeNode } from "VSS/Controls/TreeView";

export interface IClassificationPickerProps extends ITreeComboProps {
    type: ClassificationNodeKey;    
}

export interface IClassificationPickerState extends IBaseFluxComponentState {
    treeNode?: TreeNode;
    value?: string;
}

export class ClassificationPicker extends BaseFluxComponent<IClassificationPickerProps, IClassificationPickerState> {
    private _classificationNodeStore = StoreFactory.getInstance<ClassificationNodeStore>(ClassificationNodeStore);

    protected initializeState(): void {
        this.state = {
            value: this.props.value || ""
        };
    }

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._classificationNodeStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        this._initializeNodes(this.props.type);
    }

    public componentWillReceiveProps(nextProps: IClassificationPickerProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }

        if (nextProps.type !== this.props.type) {
            this._initializeNodes(nextProps.type);
        }
    }

    protected getStoresState(): IClassificationPickerState {
        return {
            treeNode: this._getTreeNode(this._classificationNodeStore.getItem(this.props.type), null, 1)
        }
    }

    public render(): JSX.Element {
        if (!this.state.treeNode) {
            return null;
        }

        const { value } = this.state;        
        const error = this.props.error || this._getDefaultError();
        const props = {
            ...this.props,
            className: css("classification-picker", this.props.className),
            value: value,
            options: [this.state.treeNode],
            error: error,
            onChange: this._onChange
        } as ITreeComboProps;

        return <TreeCombo {...props} />;
    }

    private _initializeNodes(type: ClassificationNodeKey) {
        if (this._classificationNodeStore.isLoaded(type)) {
            this.setState({
                treeNode: this._getTreeNode(this._classificationNodeStore.getItem(type), null, 1)
            });
        }
        else if (type === ClassificationNodeKey.Area) {
            ClassificationNodeActions.initializeAreaPaths();
        }
        else {
            ClassificationNodeActions.initializeIterationPaths();
        }
    }

    private _getTreeNode(node: WorkItemClassificationNode, uiNode: TreeNode, level: number): TreeNode {
        if (!node) {
            return null;
        }

        const nodes = node.children;
        let newUINode: TreeNode;
        const nodeName = node.name;

        level = level || 1;
        if (uiNode) {
            newUINode = TreeNode.create(nodeName);
            uiNode.add(newUINode);
            uiNode = newUINode;
        }
        else {
            uiNode = TreeNode.create(nodeName);
        }
        uiNode.expanded = level < 2;
        if (nodes) {
            for (const node of nodes) {
                this._getTreeNode(node, uiNode, level + 1);
            }
        }
        return uiNode;
    }
    
    @autobind
    private _onChange(value: string) {
        this.setState({value: value}, () => {
            this.props.onChange(value);
        });
    }

    private _getDefaultError(): string {
        const nodePath = this.state.value;
        if (StringUtils.isNullOrEmpty(nodePath)) {
            return this.props.required ? "A value is required." : null;
        }
        else if (this.props.type === ClassificationNodeKey.Area) {
            return !this._classificationNodeStore.getAreaPathNode(nodePath) ? "This area path doesn't exist in the current project" : null;
        }
        else if (this.props.type === ClassificationNodeKey.Iteration) {
            return !this._classificationNodeStore.getIterationPathNode(nodePath) ? "This iteration path doesn't exist in the current project" : null;
        }

        return null;
    }
}