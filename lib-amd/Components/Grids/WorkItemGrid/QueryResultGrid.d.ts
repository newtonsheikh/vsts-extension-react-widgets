/// <reference types="react" />
import { BaseComponent } from "../../Common/BaseComponent";
import { BaseStore } from "../../../Stores/BaseStore";
import { IQueryResultGridProps, IQueryResultGridState } from "./WorkItemGrid.Props";
export declare class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    protected getStoresToLoad(): {
        new (): BaseStore<any, any, any>;
    }[];
    protected initialize(): void;
    protected onStoreChanged(): void;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>, nextContext: any): void;
    render(): JSX.Element;
    private _onWorkItemUpdated(updatedWorkItem);
    private _getCommandBarProps();
    private _runQuery(props);
    private _isDataLoaded();
}