import { combineReducers } from "redux";
import companyReducer from "./company.reducer";
import warehouseReducer from "./warehouse.reducer";
import buReducer from "./bu.reducer";
import departmentReducer from "./department.reducer";
import costcenterReducer from "./costcenter.reducer";
import approveReducer from "./approve.reducer";
import buyerReducer from "./buyer.reducer";
import itemReducer from "./item.reducer";
import itemprdetailReducer from "./itemprdetail.reducer";
import loginReducer from "./login.reducer";
import prnumberReducer from "./prnumber.reducer";
import prnumberbuyerReducer from "./prnumberbuyer.reducer";
import prheadReducer from "./prhead.reducer";
import prheadapproveReducer from "./prheadapprove.reducer";
import prdetailReducer from "./prdetail.reducer";
import prdetailbuyerReducer from "./prdetailbuyer.reducer";
import itemunitReducer from "./itemunit.reducer";
import phgroupReducer from "./phgroup.reducer";
import phbuyerReducer from "./phbuyer.reducer";
import supplierReducer from "./supplier.reducer";
import prconfirmbuyerReducer from "./prconfirmbuyer.reducer";
import monthReducer from "./month.reducer";
import statusReducer from "./status.reducer";
import sendemailReducer from "./sendemail.reducer";
import genpoReducer from "./genpo.reducer";

export default combineReducers({
  companyReducer,
  warehouseReducer,
  buReducer,
  departmentReducer,
  costcenterReducer,
  approveReducer,
  buyerReducer,
  itemReducer,
  itemprdetailReducer,
  itemunitReducer,
  loginReducer,
  prnumberReducer,
  prnumberbuyerReducer,
  prheadReducer,
  prheadapproveReducer,
  prdetailReducer,
  prdetailbuyerReducer,
  phgroupReducer,
  phbuyerReducer,
  supplierReducer,
  prconfirmbuyerReducer,
  monthReducer,
  statusReducer,
  sendemailReducer,
  genpoReducer,
});
