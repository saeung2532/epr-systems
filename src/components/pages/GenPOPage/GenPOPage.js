import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import NumberFormat from "react-number-format";
import MaterialTable, { MTableToolbar } from "material-table";
import {
  makeStyles,
  withStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography, Grid, Paper, TextField, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik, Form, Field } from "formik";
import { red, green, purple } from "@material-ui/core/colors/";
import * as loginActions from "./../../../actions/login.action";
import * as prnumberbuyerActions from "./../../../actions/prnumberbuyer.action";
import * as prheadActions from "./../../../actions/prhead.action";
import * as prdetailbuyerActions from "./../../../actions/prdetailbuyer.action";
import * as warehouseActions from "./../../../actions/warehouse.action";
import * as buActions from "./../../../actions/bu.action";
import * as departmentActions from "./../../../actions/department.action";
import * as costcenterActions from "./../../../actions/costcenter.action";
import * as approveActions from "./../../../actions/approve.action";
import * as buyerActions from "./../../../actions/buyer.action";
import * as itemActions from "./../../../actions/item.action";
import * as itemunitActions from "./../../../actions/itemunit.action";
import * as phgroupActions from "./../../../actions/phgroup.action";
import * as phbuyerActions from "./../../../actions/phbuyer.action";
import * as supplierActions from "./../../../actions/supplier.action";
import * as prconfirmbuyerActions from "./../../../actions/prconfirmbuyer.action";
import * as genpoActions from "./../../../actions/genpo.action";
import * as deliveryActions from "./../../../actions/delivery.action";
import * as paymentActions from "./../../../actions/payment.action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 60,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  margin: {
    marginTop: "0.4rem",
    marginRight: "0.4rem",
    margin: theme.spacing(0.3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  row: {
    borderLeft: 1,
    borderRight: 1,
    borderBottom: 1,
    borderTop: 1,
    borderColor: "#E0E0E0",
    borderStyle: "solid",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const theme = createMuiTheme({
  palette: {
    // primary: {
    //   500: "#0FF",
    // },
    fourth: {
      500: "#0FF",
    },
  },
});

const accent = purple["A200"]; // #E040FB
// const accent = purple.A200; // #E040FB (alternative method)

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const prnumberbuyerReducer = useSelector(
    ({ prnumberbuyerReducer }) => prnumberbuyerReducer
  );
  const prheadReducer = useSelector(({ prheadReducer }) => prheadReducer);
  const prdetailbuyerReducer = useSelector(
    ({ prdetailbuyerReducer }) => prdetailbuyerReducer
  );
  const warehouseReducer = useSelector(
    ({ warehouseReducer }) => warehouseReducer
  );
  const buReducer = useSelector(({ buReducer }) => buReducer);
  const departmentReducer = useSelector(
    ({ departmentReducer }) => departmentReducer
  );
  const costcenterReducer = useSelector(
    ({ costcenterReducer }) => costcenterReducer
  );
  const approveReducer = useSelector(({ approveReducer }) => approveReducer);
  const buyerReducer = useSelector(({ buyerReducer }) => buyerReducer);
  const itemReducer = useSelector(({ itemReducer }) => itemReducer);
  const itemunitReducer = useSelector(({ itemunitReducer }) => itemunitReducer);
  const phgroupReducer = useSelector(({ phgroupReducer }) => phgroupReducer);
  const phbuyerReducer = useSelector(({ phbuyerReducer }) => phbuyerReducer);
  const supplierReducer = useSelector(({ supplierReducer }) => supplierReducer);
  const genpoReducer = useSelector(({ genpoReducer }) => genpoReducer);
  const deliveryReducer = useSelector(({ deliveryReducer }) => deliveryReducer);
  const paymentReducer = useSelector(({ paymentReducer }) => paymentReducer);
  const prconfirmbuyerReducer = useSelector(
    ({ prconfirmbuyerReducer }) => prconfirmbuyerReducer
  );
  const [prnumber, setPRNumber] = useState({
    vPRSelectNumber: "",
    vPRSelectNumberLine: "",
  });
  const [ponumber, setPONumber] = useState({ vPOSelectNumber: "" });
  const initialStatePRHead = {
    vPRNumber: "",
    vDate: moment(new Date()).format("YYYY-MM-DD"),
    vWarehouse: "",
    vCostcenter: "",
    vMonth: "",
    vPlanUnPlan: "",
    vBU: "",
    vBuyer: "",
    vGroup: "",
    vCAPNo: "",
    vRequestor: "",
    vRemark: "",
    vApprove1: "",
    vApprove2: "",
    vApprove3: "",
    vApprove4: "",
    vStatus: "",
    vDelivery: "",
    vPayment: "",
  };
  const [prhead, setPRHead] = useState(initialStatePRHead);
  const initialStateItemPRDetail = {
    vItemLine: "",
    vItemNo: "",
    vItemDesc1: "",
    vItemDesc2: null,
    vQty: "",
    vUnit: "",
    vDateDetail: moment(new Date()).format("YYYY-MM-DD"), //"2018-12-01"
    vSupplierNo: "",
    vSupplierName: "",
    vSupplierDesc: null,
    vPrice: "",
    vVat: "",
    vCurrency: "",
    vOrdertype: "",
    vTotal: "",
    vCostcenterDetail: "",
    vPHGroupDetail: "",
    vBuyerDetail: "",
    vRemarkDetail: "",
    vAddFreeItem: "",
  };
  const [itemprdetail, setItemPRDetail] = useState(initialStateItemPRDetail);
  const [searchdisable, setSearchDisable] = useState(false);
  const [newdisable, setNewDisable] = useState(false);
  const [editdisable, setEditDisable] = useState(true);
  const [genpodisable, setGenPODisable] = useState(true);
  const [createdisable, setCreateDisable] = useState(true);
  const [cancelprdisable, setCancelPRDisable] = useState(true);
  const [savedisable, setSaveDisable] = useState(false);
  const [confirmdisable, setConfirmDisable] = useState(false);
  const [addfreeitem, setAddFreeItem] = useState(false);
  const [editnamedisable, setEditNameDisable] = useState(true);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [reject, setReject] = useState(false);
  const [whsdisable, setWhsDisable] = useState(true);
  const [deptdisable, setDeptDisable] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prconfirmbuyer, setPRConfirmBuyer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  useEffect(() => {
    // console.log("dispatch prnumberbuyerActions");
    let status = "92";
    dispatch(prnumberbuyerActions.getEPRNumbersGenPO(status));
    dispatch(warehouseActions.getWarehouses());
    dispatch(buActions.getBUs());
    dispatch(approveActions.getApproves());
    dispatch(buyerActions.getBuyers());
    dispatch(supplierActions.getSuppliers());
    dispatch(deliveryActions.getDeliverys());
    // console.log(loginActions.getTokenUsername());
    // loginActions.getTokenUsername();
    prheadReducer.result = null;
    prdetailbuyerReducer.result = null;
  }, []);

  useEffect(() => {
    const prheads = prheadReducer.result ? prheadReducer.result : [];

    prheads.map((item) => {
      // console.log("prheads.vStatus: " + item.HD_STATUS);

      // if (item.HD_STATUS === "10") {
      dispatch(itemActions.getItems(item.HD_IBWHLO));
      let phgroup = "PH";
      let bu = item.HD_BU;
      let department = item.HD_IBCOCE;
      dispatch(phgroupActions.getPHGroups(phgroup));
      dispatch(costcenterActions.getCostCenters(department));
      dispatch(departmentActions.getDepartments(bu));
      setPRNumber({ ...prnumber, vPRSelectNumber: item.HD_IBPLPN });
      setPRHead({
        ...prhead,
        vPRNumber: item.HD_IBPLPN,
        vDate: moment(item.HD_PURCDT).format("YYYY-MM-DD"),
        vWarehouse: item.HD_IBWHLO,
        vCostcenter: item.HD_IBCOCE,
        vMonth: item.HD_IBMTH,
        vPlanUnPlan: item.HD_IBPRIP,
        vBU: item.HD_BU,
        vBuyer: item.HD_IBBUYE,
        vGroup: item.HD_IBMODL,
        vCAPNo: item.HD_CAPNO,
        vRequestor: item.HD_IBPURC,
        vRemark: item.HD_REM1,
        vApprove1: item.HD_APP1,
        vApprove2: item.HD_APP2,
        vApprove3: item.HD_APP3,
        vApprove4: item.HD_APP4,
        vStatus: item.HD_STATUS,
      });
      // } else {
      // console.log("prheads.vStatus: false");
      // setPRHead({ ...initialStatePRHead });
      // dispatch(prdetailbuyerActions.getEPRDetails("00"));
      // handleCancel();
      // }
    });
  }, [prheadReducer]);

  useEffect(() => {
    const prdetails = prdetailbuyerReducer.result
      ? prdetailbuyerReducer.result
      : [];

    prdetails.map((item) => {
      console.log("prdetails.PR_IBSUNO: " + item.PR_IBSUNO);
      dispatch(paymentActions.getPayments(item.PR_IBSUNO));
      setItemPRDetail({ ...itemprdetail, vSupplierNo: item.PR_IBSUNO });
    });
  }, [prdetailbuyerReducer]);

  useEffect(() => {
    const prconfirmbuyers = prconfirmbuyerReducer.result
      ? prconfirmbuyerReducer.result
      : [];
    prconfirmbuyers.map((item) => {
      console.log("PR_CONFIRM: " + item.PR_CONFIRM);
      setPRConfirmBuyer(item.PR_CONFIRM);
      if (item.PR_CONFIRM === "0") {
        console.log("prconfirm: true");
        let fromStatus = "05";
        let toStatus = "10";
        dispatch(prnumberbuyerActions.getEPRNumbers(fromStatus, toStatus));

        let statusprhead = "15";
        dispatch(
          prheadActions.updateStsEPRHead(prhead.vPRNumber, statusprhead)
        );
        prheadReducer.result = null;
        prdetailbuyerReducer.result = null;
        setPRHead({
          ...initialStatePRHead,
        });

        handleCancel();
      }
    });
  }, [prconfirmbuyerReducer]);

  useEffect(() => {
    const genpos = genpoReducer.result ? [genpoReducer.result] : [];
    // console.log(JSON.stringify(genpos));
    genpos.map((item) => {
      // console.log(item.message);
      setPONumber({ ...prnumber, vPOSelectNumber: item.message });
      setSuccess(true);
      setLoading(false);
      handleAfterGenPO();
    });
  }, [genpoReducer]);

  const prnumberbuyers = useMemo(() =>
    prnumberbuyerReducer.result ? prnumberbuyerReducer.result : []
  );

  const warehouses = useMemo(() =>
    warehouseReducer.result ? warehouseReducer.result : []
  );

  const bus = useMemo(() => (buReducer.result ? buReducer.result : []));

  const departments = useMemo(() =>
    departmentReducer.result ? departmentReducer.result : []
  );

  const costcenters = useMemo(() =>
    costcenterReducer.result ? costcenterReducer.result : []
  );

  const approves = useMemo(() =>
    approveReducer.result ? approveReducer.result : []
  );

  const genpos = useMemo(() =>
    genpoReducer.result ? genpoReducer.result : []
  );

  const deliverys = useMemo(() =>
    deliveryReducer.result ? deliveryReducer.result : []
  );

  const payments = useMemo(() =>
    paymentReducer.result ? paymentReducer.result : []
  );

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const ValidationTextField = withStyles({
    root: {
      "& input:valid + fieldset": {
        borderColor: "green",
        borderWidth: 2,
      },
      "& input:invalid + fieldset": {
        borderColor: "red",
        borderWidth: 2,
      },
      "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        padding: "4px !important", // override inline-style
      },
    },
  })(TextField);

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
  }))(Button);

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  const handleSearch = () => {
    if (prnumber.vPRSelectNumber === "") {
    } else {
      let fromStatus = "92";
      let toStatus = "92";

      dispatch(
        prheadActions.getEPRHeads(
          prnumber.vPRSelectNumber,
          fromStatus,
          toStatus
        )
      );
      dispatch(
        prdetailbuyerActions.getEPRDetailsGenPO(
          fromStatus,
          prnumber.vPRSelectNumberLine
        )
      );
      setPONumber({ ...prnumber, vPOSelectNumber: "" });
      setGenPODisable(false);
    }
  };

  const handleGenPO = () => {
    let status = "92";
    dispatch(
      genpoActions.genPONumber(
        status,
        prnumber.vPRSelectNumberLine,
        prhead.vDelivery,
        prhead.vPayment
      )
    );
    setGenPODisable(true);
    setSuccess(false);
    setLoading(true);
  };

  const handleAfterGenPO = () => {
    let status = "92";
    dispatch(prnumberbuyerActions.getEPRNumbersGenPO(status));
    prheadReducer.result = null;
    prdetailbuyerReducer.result = null;
  };

  const handleCancel = () => {
    setPRNumber({ ...prnumber, vPRSelectNumber: "" });
    setPRHead({ ...initialStatePRHead });
    dispatch(prdetailbuyerActions.getEPRDetails("00"));
    setSearchDisable(false);
    setNewDisable(false);
    setEditDisable(true);
    setCreateDisable(true);
    setCancelPRDisable(true);
    setWhsDisable(true);
    setDeptDisable(true);
  };

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const NumberFormatCustom = (props) => {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="฿"
      />
    );
  };

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <Grid container style={{ marginBottom: 2 }} spacing={5}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container item xs={12} className={classes.margin}>
                <Grid item xs={12} sm={2} className={classes.margin}>
                  <TextField
                    error={true}
                    fullWidth
                    select
                    size="small"
                    variant="outlined"
                    required
                    id="vSelectPRNumber"
                    label="EPR Number"
                    disabled={searchdisable}
                    value={prnumber.vPRSelectNumberLine}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      let getEPRNumberselect = event.target.value
                        .toString()
                        .split("::");
                      let getPRNumberLine = getEPRNumberselect[0]
                        .toString()
                        .split("-");
                      let getPRnumber = getPRNumberLine[0];
                      let getBuyer = getEPRNumberselect[2];

                      // console.log(getPRnumber + "  " + getBuyer);

                      setPRNumber({
                        ...prnumber,
                        vPRSelectNumber: getPRnumber,
                        vPRSelectNumberLine: event.target.value,
                      });
                    }}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option />
                    {prnumberbuyers.map((option) => (
                      <option key={option.ID} value={option.PRNUMBER}>
                        {option.PRNUMBER}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={1}
                  className={(classes.margin, classes.wrapper)}
                >
                  <Button
                    fullWidth
                    size="medium"
                    id="vSearch"
                    variant="contained"
                    color="primary"
                    disabled={searchdisable}
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Grid>
                <Grid className={(classes.margin, classes.wrapper)}>
                  <a
                    href={`${
                      process.env.REACT_APP_API_URL
                    }/br_api/api_report/viewepr/${loginActions.getTokenCono()}/${loginActions.getTokenDivi()}/${
                      prnumber.vPRSelectNumber
                    }`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      disabled={searchdisable}
                      startIcon={<SearchIcon />}
                    >
                      View EPR
                    </Button>
                  </a>
                </Grid>
                <Grid
                  // item
                  // xs={12}
                  // sm={1}
                  className={(classes.margin, classes.wrapper)}
                >
                  <ColorButton
                    fullWidth
                    size="medium"
                    id="vSearch"
                    variant="contained"
                    color="primary"
                    disabled={genpodisable}
                    startIcon={<SearchIcon />}
                    onClick={handleGenPO}
                    // onClick={handleButtonClick}
                  >
                    Gen PO
                  </ColorButton>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Grid>

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 200 }}
                  disabled={true}
                  size="small"
                  id="vPONumber"
                  label="PO Number"
                  placeholder="PO Number"
                  variant="outlined"
                  value={ponumber.vPOSelectNumber}
                  onChange={(event) => {
                    // handleSearch();
                    // console.log(event.target.value);
                    // setPRHead({
                    //   ...prhead,
                    //   vPRNumber: event.target.value,
                    // });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid container item xs className={classes.margin}>
                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 120 }}
                  required
                  disabled={true}
                  size="small"
                  id="vPRNumber"
                  label="EPR Number"
                  placeholder="EPR Number"
                  variant="outlined"
                  value={prhead.vPRNumber}
                  values={(values.vPRNumber = prhead.vPRNumber)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vPRNumber: event.target.value,
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 180 }}
                  required
                  disabled={true}
                  // disabled={editdisable}
                  type="date"
                  size="small"
                  id="vDate"
                  label="Date"
                  variant="outlined"
                  defaultValue={prhead.vDate}
                  value={prhead.vDate}
                  values={(values.vDate = prhead.vDate)}
                  onChange={(event) => {
                    // console.log("onChange: " + event.target.value.substr(2, 2) +
                    // event.target.value.substr(5, 2));
                    var dateNow = new Date();
                    if (
                      event.target.value < moment(dateNow).format("YYYY-MM-DD")
                    ) {
                      alert("Date not less than present day.");
                    } else {
                      setPRHead({
                        ...prhead,
                        vDate: event.target.value,
                        vMonth:
                          event.target.value.substr(2, 2) +
                          event.target.value.substr(5, 2),
                      });
                    }
                  }}
                  InputLabelProps={{ shrink: true, required: true }}
                />

                <TextField
                  className={classes.margin}
                  style={{ width: "150px" }}
                  disabled={true}
                  // disabled={whsdisable}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vWarehouse"
                  label="Warehouse"
                  value={prhead.vWarehouse}
                  values={(values.vWarehouse = prhead.vWarehouse)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vWarehouse: event.target.value,
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {warehouses.map((option) => (
                    <option key={option.ID} value={option.MWWHLO}>
                      {option.WAREHOUSE}
                    </option>
                  ))}
                </TextField>

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 100 }}
                  required
                  disabled={deptdisable}
                  select
                  size="small"
                  id="vBU"
                  label="BU"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vBU}
                  values={(values.vBU = prhead.vBU)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vBU: event.target.value,
                    });

                    dispatch(
                      departmentActions.getDepartments(event.target.value)
                    );
                  }}
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {bus.map((option) => (
                    <option key={option.ID} value={option.S1STID}>
                      {option.BU}
                    </option>
                  ))}
                </TextField>

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 120 }}
                  required
                  // disabled={editdisable}
                  disabled={true}
                  size="small"
                  id="vCostcenter"
                  label="Costcenter"
                  placeholder="Costcenter"
                  variant="outlined"
                  value={prhead.vCostcenter}
                  values={(values.vCostcenter = prhead.vCostcenter)}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 100 }}
                  required
                  // disabled={editdisable}
                  disabled={true}
                  size="small"
                  id="vMonth"
                  label="Month"
                  placeholder="Month"
                  variant="outlined"
                  value={prhead.vMonth}
                  values={(values.vMonth = prhead.vMonth)}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 120 }}
                  required
                  // disabled={editdisable}
                  disabled={true}
                  size="small"
                  id="vPlanUnPlan"
                  label="Plan / UnPlan"
                  placeholder="Plan / UnPlan"
                  variant="outlined"
                  value={prhead.vPlanUnPlan}
                  values={(values.vPlanUnPlan = prhead.vPlanUnPlan)}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 100 }}
                  // required
                  // disabled={editdisable}
                  disabled={true}
                  size="small"
                  id="vCAPNo"
                  label="CAP No"
                  placeholder="CAP No"
                  variant="outlined"
                  value={prhead.vCAPNo}
                  values={(values.vCAPNo = prhead.vCAPNo)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vCAPNo: event.target.value,
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 150 }}
                  required
                  // disabled={editdisable}
                  disabled={true}
                  size="small"
                  id="vRequestor"
                  label="Requestor"
                  placeholder="Requestor"
                  variant="outlined"
                  value={prhead.vRequestor}
                  values={(values.vRequestor = prhead.vRequestor)}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 200 }}
                  // required
                  // disabled={editdisable}
                  disabled={true}
                  size="small"
                  id="vRemark"
                  label="Remark"
                  placeholder="Remark"
                  variant="outlined"
                  value={prhead.vRemark}
                  values={(values.vRemark = prhead.vRemark)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vRemark: event.target.value,
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid container item xs className={classes.margin}>
                <TextField
                  className={classes.margin}
                  style={{ width: "200px" }}
                  error={true}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vDelivery"
                  label="Delivery terms"
                  value={prhead.vDelivery}
                  values={(values.vDelivery = prhead.vDelivery)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vDelivery: event.target.value,
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {deliverys.map((option) => (
                    <option key={option.ID} value={option.CTSTKY}>
                      {option.DELIVERY}
                    </option>
                  ))}
                </TextField>

                <TextField
                  className={classes.margin}
                  style={{ width: "200px" }}
                  error={true}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vPayment"
                  label="Payment terms"
                  value={prhead.vPayment}
                  values={(values.vPayment = prhead.vPayment)}
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setPRHead({
                      ...prhead,
                      vPayment: event.target.value,
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option />
                  {payments.map((option) => (
                    <option key={option.ID} value={option.IITEPY}>
                      {option.PAYMENT}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    );
  };

  const columns = [
    {
      title: "Line",
      field: "PR_IBPLPS",
      // type: "numeric",
      editable: "never",
      width: 50,
      headerStyle: {
        maxWidth: 50,
        whiteSpace: "nowrap",
        textAlign: "center",
      },
      cellStyle: {
        textAlign: "center",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBPLPS}
        </Typography>
      ),
    },
    {
      title: "Group",
      field: "PR_SPORDER",
      type: "numeric",
      editable: "never",
      width: 80,
      headerStyle: { maxWidth: 80, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "center",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_SPORDER}
        </Typography>
      ),
    },
    {
      title: "Item No",
      field: "PR_IBITNO",
      editable: "never",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "left",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      // editComponent: props => (
      //   <Autocomplete
      //     id="combo-box-demo"
      //     options={top100Films}
      //     getOptionLabel={option => option.title}
      //     style={{ width: 100 }}
      //     renderInput={params => <TextField {...params} />}
      //   />
      // ),
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBITNO}
        </Typography>
      ),
    },
    {
      title: "Item Name",
      field: "PR_IBPITT",
      editable: "never",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "left",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBPITT}
        </Typography>
      ),
    },
    {
      title: "Unit",
      field: "PR_IBPUUN",
      editable: "never",
      headerStyle: { maxWidth: 50, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "center",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBPUUN}
        </Typography>
      ),
    },
    {
      title: "Qty",
      field: "PR_IBORQA",
      editable: "never",
      type: "numeric",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "right",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {/* {item.PR_IBORQA} */}
          {/* var NumberFormat = require('react-number-format'); */}
          <NumberFormat
            value={item.PR_IBORQA}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={"$"}
          />
        </Typography>
      ),
    },
    {
      title: "U/P",
      field: "PR_IBPUPR",
      editable: "never",
      // type: "numeric",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "right",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          <NumberFormat
            value={item.PR_IBPUPR}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={"$"}
          />
        </Typography>
      ),
    },
    {
      title: "Vat.",
      field: "PR_IBVTCD",
      editable: "never",
      headerStyle: { maxWidth: 50, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "center",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          <NumberFormat
            value={item.PR_IBVTCD}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={"$"}
          />
        </Typography>
      ),
    },
    // {
    //   title: "Amt.",
    //   field: "PR_IBTOTA",
    //   editable: "never",
    //   headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
    //   cellStyle: {
    //     textAlign: "right",
    //     borderLeft: 1,
    //     borderRight: 1,
    //     borderBottom: 1,
    //     borderTop: 1,
    //     borderColor: "#E0E0E0",
    //     borderStyle: "solid",
    //     paddingLeft: "6px",
    //     paddingRight: "6px",
    //     paddingBottom: "12px",
    //     paddingTop: "12px",
    //   },
    //   render: (item) => (
    //     <Typography variant="body1" noWrap>
    //       <NumberFormat
    //         value={item.PR_IBTOTA}
    //         displayType={"text"}
    //         thousandSeparator={true}
    //         // prefix={"$"}
    //       />
    //     </Typography>
    //   ),
    // },
    // {
    //   title: "Curr.",
    //   field: "PR_IBCUCD",
    //   editable: "never",
    //   headerStyle: { maxWidth: 50, whiteSpace: "nowrap", textAlign: "center" },
    //   cellStyle: {
    //     textAlign: "center",
    //     borderLeft: 1,
    //     borderRight: 1,
    //     borderBottom: 1,
    //     borderTop: 1,
    //     borderColor: "#E0E0E0",
    //     borderStyle: "solid",
    //     paddingLeft: "6px",
    //     paddingRight: "6px",
    //     paddingBottom: "12px",
    //     paddingTop: "12px",
    //   },
    //   render: (item) => (
    //     <Typography variant="body1" noWrap>
    //       {item.PR_IBCUCD}
    //     </Typography>
    //   ),
    // },
    {
      title: "Deli. Date",
      field: "PR_IBDWDT",
      // editable: "never",
      type: "date",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "center",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {moment(item.PR_IBDWDT).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Supp. No",
      field: "PR_IBSUNO",
      editable: "never",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "left",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBSUNO}
        </Typography>
      ),
    },
    // {
    //   title: "Supp. Name",
    //   field: "SASUNM",
    //   editable: "never",
    //   headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
    //   cellStyle: {
    //     textAlign: "left",
    //     borderLeft: 1,
    //     borderRight: 1,
    //     borderBottom: 1,
    //     borderTop: 1,
    //     borderColor: "#E0E0E0",
    //     borderStyle: "solid",
    //     paddingLeft: "6px",
    //     paddingRight: "6px",
    //     paddingBottom: "12px",
    //     paddingTop: "12px",
    //   },
    //   render: (item) => (
    //     <Typography variant="body1" noWrap>
    //       {item.SASUNM}
    //     </Typography>
    //   ),
    // },
    {
      title: "Order Typ.",
      field: "PR_IBORTY",
      editable: "never",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "center",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBORTY}
        </Typography>
      ),
    },
    {
      title: "HD_IBPURC",
      field: "HD_IBPURC",
      editable: "never",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "center",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.HD_IBPURC}
        </Typography>
      ),
    },
    {
      title: "PR_IBODI",
      field: "PR_IBODI1",
      editable: "never",
      headerStyle: { maxWidth: 60, whiteSpace: "nowrap", textAlign: "center" },
      cellStyle: {
        textAlign: "center",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_IBODI1}
        </Typography>
      ),
    },
    // {
    //   title: "V Amt.",
    //   field: "PR_VTCHARGE",
    //   editable: "never",
    //   headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
    //   cellStyle: {
    //     textAlign: "right",
    //     borderLeft: 1,
    //     borderRight: 1,
    //     borderBottom: 1,
    //     borderTop: 1,
    //     borderColor: "#E0E0E0",
    //     borderStyle: "solid",
    //     paddingLeft: "6px",
    //     paddingRight: "6px",
    //     paddingBottom: "12px",
    //     paddingTop: "12px",
    //   },
    //   render: (item) => (
    //     <Typography variant="body1" noWrap>
    //       <NumberFormat
    //         value={item.PR_VTCHARGE}
    //         displayType={"text"}
    //         thousandSeparator={true}
    //         // prefix={"$"}
    //       />
    //     </Typography>
    //   ),
    // },
    {
      title: "Remark3",
      field: "PR_REM3",
      editable: "never",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "left" },
      cellStyle: {
        textAlign: "left",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PR_REM3}
        </Typography>
      ),
    },
    {
      title: "PH Remark",
      field: "PHREMARK",
      editable: "never",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "left" },
      cellStyle: {
        textAlign: "left",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.PHREMARK}
        </Typography>
      ),
    },
    {
      title: "GRN Return",
      field: "GRNRETURN",
      editable: "never",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "left" },
      cellStyle: {
        textAlign: "left",
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "#E0E0E0",
        borderStyle: "solid",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingBottom: "12px",
        paddingTop: "12px",
      },
      render: (item) => (
        <Typography variant="body1" noWrap>
          {item.GRNRETURN}
        </Typography>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      {/* Grid */}
      <Formik
        initialValues={{
          vPRNumber: "",
          vDate: "",
          vWarehouse: "",
          vCostcenter: "",
          vMonth: "",
          vPlanUnPlan: "",
          vBU: "",
          vCAPNo: "",
          vRequestor: "",
          vRemark: "",
          vApprove1: "",
          vApprove2: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(values));
          let formData = new FormData();
          formData.append("vPRNumber", values.vPRNumber);
          formData.append("vDate", values.vDate);
          formData.append("vWarehouse", values.vWarehouse);
          formData.append("vCostcenter", values.vCostcenter);
          formData.append("vMonth", values.vMonth);
          formData.append("vPlanUnPlan", "5");
          formData.append("vBU", values.vBU);
          formData.append("vCAPNo", values.vCAPNo);
          formData.append(
            "vRequestor",
            prhead.vRequestor
              ? prhead.vRequestor
              : loginActions.getTokenUsername()
          );
          formData.append("vRemark", values.vRemark);
          formData.append("vApprove1", values.vApprove1);
          formData.append("vApprove2", values.vApprove2);
          formData.append("vStatus", prhead.vStatus ? prhead.vStatus : "00");

          if (newdisable === false && cancelprdisable === true) {
            dispatch(prheadActions.addEPRHead(formData, props.history));
            setTimeout(() => {
              setSearchDisable(false);
              setNewDisable(false);
              setEditDisable(true);
              setCreateDisable(true);
              setWhsDisable(true);
              setDeptDisable(true);
              setPRNumber({ ...prnumber, vPRSelectNumber: "" });
              setPRHead({ ...initialStatePRHead });
              let fromStatus = "05";
              let toStatus = "10";
              dispatch(
                prnumberbuyerActions.getEPRNumbers(fromStatus, toStatus)
              );
            }, 500);
          } else if (searchdisable === false) {
            dispatch(prheadActions.updateEPRHead(formData, props.history));
          }
        }}
      >
        {(props) => showForm(props)}
      </Formik>

      {/* Plan PR Table */}
      {/* <p>#Debug {JSON.stringify(selectedProduct)}</p> */}
      <MaterialTable
        id="root_pr"
        title={`Gen PO : ${prhead.vStatus}`}
        columns={columns}
        data={prdetailbuyerReducer.result ? prdetailbuyerReducer.result : []}
        // isLoading={prdetailbuyerReducer.result ? false : true}
        options={{
          exportButton: true,
          // toolbar: false,
          paging: false,
          headerStyle: {
            textAlign: "center",
            borderLeft: 1,
            borderRight: 1,
            borderBottom: 1,
            borderTop: 1,
            borderColor: "#E0E0E0",
            borderStyle: "solid",
            paddingLeft: "6px",
            paddingRight: "6px",
            paddingBottom: "12px",
            paddingTop: "12px",
            // backgroundColor: "red",
            // padding: "5px",
            // whiteSpace: "normal",
            // wordWrap: "break-word",
            // wordBreak: "break-all"
          },
          cellStyle: {
            textAlign: "center",
            borderLeft: 1,
            borderRight: 1,
            borderBottom: 1,
            borderTop: 1,
            borderColor: "#E0E0E0",
            borderStyle: "solid",
          },
          // rowStyle: rowData => ({
          //   // backgroundColor:
          //   //   selectedRow && selectedRow.tableData.id === rowData.tableData.id
          //   //     ? "#EEE"
          //   //     : "#FFF"
          // }),
          fixedColumns: {
            // left: 2
          },
        }}
        // cellEditable={
        //   {
        // onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
        //   dispatch(
        //     prdetailbuyerActions.updateEPRDetailGrouping(
        //       rowData.PR_IBPLPN,
        //       rowData.PR_IBPLPS,
        //       newValue
        //     )
        //   );
        //   return new Promise((resolve, reject) => {
        //     // console.log("newValue: " + rowData.PR_IBPLPN + " " + rowData.PR_IBPLPS + " " + newValue );
        //     setTimeout(() => {
        //       dispatch(
        //         prdetailbuyerActions.getEPRDetailsGrouping(
        //           prnumber.vPRSelectNumber
        //         )
        //       );
        //     }, 500);
        //     setTimeout(resolve, 1000);
        //   });
        // },
        //   }
        // }
        editable={{
          onRowUpdate: (newData, oldData) => {
            // console.log(JSON.stringify(oldData));
            dispatch(
              prdetailbuyerActions.updateEPRDetailGrouping(
                oldData.PR_IBPLPN,
                oldData.PR_IBPLPS,
                oldData.PR_SPORDER,
                moment(newData.PR_IBDWDT).format("YYYY-MM-DD")
              )
            );
            return new Promise((resolve, reject) => {
              // console.log("newValue: " + oldData.PR_IBPLPN + " " + oldData.PR_IBPLPS + " " + oldData.PR_SPORDER + " " + moment(newData.PR_IBDWDT).format("YYYY-MM-DD"));
              setTimeout(() => {
                let fromStatus = "92";
                let toStatus = "92";
                dispatch(
                  prdetailbuyerActions.getEPRDetailsGenPO(
                    fromStatus,
                    prnumber.vPRSelectNumberLine
                  )
                );
              }, 1000);
              setTimeout(resolve, 1000);
            });
          },
        }}
      />
    </div>
  );
};
