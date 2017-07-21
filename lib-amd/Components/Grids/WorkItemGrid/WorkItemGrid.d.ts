/// <reference types="react" />
import "./WorkItemsGrid.scss";
import { BaseComponent } from "../../Common/BaseComponent";
import { IWorkItemGridProps, IWorkItemGridState } from "./WorkItemGrid.Props";
import { BaseStore } from "../../../Flux/Stores/BaseStore";
export declare class WorkItemGrid extends BaseComponent<IWorkItemGridProps, IWorkItemGridState> {
    private _workItemStore;
    private _workItemFieldStore;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IWorkItemGridProps): void;
    protected getStores(): BaseStore<any, any, any>[];
    protected getStoresState(): IWorkItemGridState;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _mapFieldsToColumn(fields);
    private _getCommandBarProps();
    private _getContextMenuProps();
    private _onItemInvoked(workItem, index?, ev?);
    private _itemComparer(workItem1, workItem2, field, sortOrder);
    private _itemFilter(workItem, filterText, field);
    private _getWiql(workItems?);
}
