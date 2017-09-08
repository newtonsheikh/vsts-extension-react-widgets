var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "TFS/WorkItemTracking/RestClient", "../../Utils/String", "../Stores/BaseStore", "../Stores/WorkItemTemplateStore", "./ActionsHub"], function (require, exports, WitClient, String_1, BaseStore_1, WorkItemTemplateStore_1, ActionsHub_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemTemplateActions;
    (function (WorkItemTemplateActions) {
        var workItemTemplateStore = BaseStore_1.StoreFactory.getInstance(WorkItemTemplateStore_1.WorkItemTemplateStore);
        function initializeWorkItemTemplates(teamId) {
            return __awaiter(this, void 0, void 0, function () {
                var workItemTemplates, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!workItemTemplateStore.isLoaded(teamId)) return [3, 1];
                            ActionsHub_1.WorkItemTemplateActionsHub.InitializeWorkItemTemplates.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!workItemTemplateStore.isLoading(teamId)) return [3, 5];
                            workItemTemplateStore.setLoading(true, teamId);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, WitClient.getClient().getTemplates(VSS.getWebContext().project.id, teamId)];
                        case 3:
                            workItemTemplates = _a.sent();
                            workItemTemplates.sort(function (a, b) { return String_1.StringUtils.localeIgnoreCaseComparer(a.name, b.name); });
                            ActionsHub_1.WorkItemTemplateActionsHub.InitializeWorkItemTemplates.invoke({ teamId: teamId, templates: workItemTemplates });
                            workItemTemplateStore.setLoading(false, teamId);
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            workItemTemplateStore.setLoading(false, teamId);
                            throw e_1.message;
                        case 5: return [2];
                    }
                });
            });
        }
        WorkItemTemplateActions.initializeWorkItemTemplates = initializeWorkItemTemplates;
    })(WorkItemTemplateActions = exports.WorkItemTemplateActions || (exports.WorkItemTemplateActions = {}));
});
