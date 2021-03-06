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
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik, Form, Field } from "formik";
import { red, green, purple } from "@material-ui/core/colors/";
import * as prnumberbuyerActions from "./../../../actions/prnumberbuyer.action";
import * as prdetailbuyerActions from "./../../../actions/prdetailbuyer.action";
import * as genpoActions from "./../../../actions/genpo.action";
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
  const genpoReducer = useSelector(({ genpoReducer }) => genpoReducer);
  const paymentReducer = useSelector(({ paymentReducer }) => paymentReducer);
  const initialStatePRNumber = {
    vPRSelectNumber: null,
    vPRSelectNumberLine: null,
    vPRNumberDesc: null,
    vPROrderDate: "",
    vPRDeliDate: "",
    // vPRDate: moment(new Date()).format("YYYY-MM-DD"),
  };
  const [prnumber, setPRNumber] = useState(initialStatePRNumber);
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
  const [searchdisable, setSearchDisable] = useState(false);
  const [cancelpoDisable, setCancelPODisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingchangepo, setLoadingChangePO] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  useEffect(() => {
    // console.log("dispatch prnumberbuyerActions");
    let fromstatus = "15";
    let tostatus = "85";
    dispatch(prnumberbuyerActions.getPONumbers(fromstatus, tostatus));
    dispatch(paymentActions.getPayments());
    prheadReducer.result = null;
    prdetailbuyerReducer.result = null;
  }, []);

  useEffect(() => {
    const prdetails = prdetailbuyerReducer.result
      ? prdetailbuyerReducer.result
      : [];
    // console.log(JSON.stringify(prnumbers));
    prdetails.map((item) => {
      // console.log(item.message);
      setPRNumber({
        ...prnumber,
        vPROrderDate: moment(item.IAPUDT).format("YYYY-MM-DD"),
        vPRDeliDate: moment(item.IADWDT).format("YYYY-MM-DD"),
      });
      setPRHead({
        ...prhead,
        vPayment: item.IITEPY,
      });
    });
  }, [prdetailbuyerReducer]);

  useEffect(() => {
    const genpos = genpoReducer.result ? [genpoReducer.result] : [];
    // console.log(JSON.stringify(genpos));
    genpos.map((item) => {
      // console.log(item.message);
      setPONumber({ ...prnumber, vPOSelectNumber: item.message });
      setSuccess(true);
      setLoading(false);
      setLoadingChangePO(false);
      handleAfterCancelPO();
    });
  }, [genpoReducer]);

  const prnumberbuyers = useMemo(() =>
    prnumberbuyerReducer.result ? prnumberbuyerReducer.result : []
  );

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
  }))(Button);

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

  const handleSearch = () => {
    if (prnumber.vPRSelectNumber === "") {
      setPRNumber(initialStatePRNumber);
      setCancelPODisable(true);
      prheadReducer.result = null;
      prdetailbuyerReducer.result = null;
    } else {
      dispatch(prdetailbuyerActions.getPODetails(prnumber.vPRSelectNumber));
      setCancelPODisable(false);
    }
  };

  const handleCancelPO = () => {
    dispatch(genpoActions.cancelPONumber(prnumber.vPRSelectNumber));
    setCancelPODisable(true);
    setSuccess(false);
    setLoading(true);
  };

  const handleAfterCancelPO = () => {
    let fromstatus = "15";
    let tostatus = "85";
    dispatch(prnumberbuyerActions.getPONumbers(fromstatus, tostatus));
    prheadReducer.result = null;
    prdetailbuyerReducer.result = null;
  };

  const handleChangePO = () => {
    dispatch(
      genpoActions.changePO(
        prnumber.vPRSelectNumber,
        prnumber.vPROrderDate,
        prnumber.vPRDeliDate,
        prhead.vPayment
      )
    );
    setCancelPODisable(true);
    setSuccess(false);
    setLoadingChangePO(true);
    // prheadReducer.result = null;
    // prdetailbuyerReducer.result = null;
  };

  const payments = useMemo(() =>
    paymentReducer.result ? paymentReducer.result : []
  );

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
                <Grid item xs={12} sm={3} className={classes.margin}>
                  {/* <TextField
                    error={true}
                    fullWidth
                    select
                    size="small"
                    variant="outlined"
                    required
                    id="vSelectPRNumber"
                    label="PO Number"
                    disabled={searchdisable}
                    value={prnumber.vPRSelectNumberLine}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      let getEPRNumberselect = event.target.value
                        .toString()
                        .split("::");
                      let getPRnumber = getEPRNumberselect[0].trim();

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
                      <option key={option.ID} value={option.PONUMBER}>
                        {option.PONUMBER}
                      </option>
                    ))}
                  </TextField> */}

                  <Autocomplete
                    autoFocus
                    fullWidth
                    size="small"
                    id="vSelectPRNumberAuto"
                    options={prnumberbuyers}
                    getOptionLabel={(option) => option.PONUMBER}
                    value={prnumber.vPRNumberDesc}
                    onChange={(event, values) => {
                      // console.log(event.target.value);
                      if (values) {
                        let getEPRNumberselect = values.PONUMBER.toString().split(
                          "::"
                        );
                        let getPRnumber = getEPRNumberselect[0].trim();
                        setPRNumber({
                          ...prnumber,
                          vPRSelectNumber: getPRnumber,
                          vPRSelectNumberLine: values.PONUMBER,
                          vPRNumberDesc: { PONUMBER: values.PONUMBER },
                        });
                      } else {
                        setPRNumber(initialStatePRNumber);
                        setCancelPODisable(true);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        id="vSelectPRNumber"
                        label="PO Number"
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
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
                  <Button
                    style={{ maxWidth: 200 }}
                    fullWidth
                    size="medium"
                    id="vCancelPO"
                    variant="contained"
                    color="secondary"
                    disabled={cancelpoDisable}
                    startIcon={<DeleteIcon />}
                    onClick={handleCancelPO}
                  >
                    Cancel PO
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Grid>
              </Grid>

              <Grid container item xs className={classes.margin}>
                <TextField
                  className={classes.margin}
                  error={true}
                  style={{ maxWidth: 180 }}
                  margin="dense"
                  type="date"
                  size="small"
                  id="vOrderDate"
                  label="Order Date"
                  variant="outlined"
                  disabled={cancelpoDisable}
                  defaultValue={prnumber.vPROrderDate}
                  value={prnumber.vPROrderDate}
                  onChange={(event) => {
                    // console.log("event.target.value: " + event.target.value);
                    setPRNumber({
                      ...prnumber,
                      vPROrderDate: event.target.value,
                    });
                  }}
                  InputLabelProps={{ shrink: true, required: true }}
                />

                <TextField
                  className={classes.margin}
                  error={true}
                  style={{ maxWidth: 180 }}
                  margin="dense"
                  type="date"
                  size="small"
                  id="vDeliveryDate"
                  label="Delivery Date"
                  variant="outlined"
                  disabled={cancelpoDisable}
                  defaultValue={prnumber.vPRDeliDate}
                  value={prnumber.vPRDeliDate}
                  onChange={(event) => {
                    // console.log("event.target.value: " + event.target.value);
                    setPRNumber({
                      ...prnumber,
                      vPRDeliDate: event.target.value,
                    });
                  }}
                  InputLabelProps={{ shrink: true, required: true }}
                />

                <TextField
                  className={classes.margin}
                  style={{ width: "200px" }}
                  required
                  error={true}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  id="vPayment"
                  label="Payment terms"
                  disabled={cancelpoDisable}
                  value={prhead.vPayment}
                  // values={(values.vPayment = prhead.vPayment)}
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
                    <option key={option.ID} value={option.CTSTKY}>
                      {option.PAYMENT}
                    </option>
                  ))}
                </TextField>

                <Grid className={(classes.margin, classes.wrapper)}>
                  <ColorButton
                    style={{ maxWidth: 200 }}
                    fullWidth
                    size="medium"
                    id="vCancelPO"
                    variant="contained"
                    color="secondary"
                    disabled={cancelpoDisable}
                    startIcon={<SaveIcon />}
                    onClick={handleChangePO}
                  >
                    Change PO
                  </ColorButton>
                  {loadingchangepo && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Grid>
              </Grid>

              {/* <Grid container item xs className={classes.margin}>
                <TextField
                  className={classes.margin}
                  style={{ width: "200px" }}
                  required
                  error={true}
                  select
                  size="small"
                  variant="outlined"
                  margin="normal"
                  id="vPayment"
                  label="Payment terms"
                  disabled={cancelpoDisable}
                  value={prhead.vPayment}
                  // values={(values.vPayment = prhead.vPayment)}
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
                    <option key={option.ID} value={option.CTSTKY}>
                      {option.PAYMENT}
                    </option>
                  ))}
                </TextField>
              </Grid> */}
            </Paper>
          </Grid>
        </Grid>
      </form>
    );
  };

  const columns = [
    {
      title: "Line",
      field: "IBPNLI",
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
          {item.IBPNLI}
        </Typography>
      ),
    },
    {
      title: "Status",
      field: "IBPUSL",
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
          {item.IBPUSL}
        </Typography>
      ),
    },
    {
      title: "Item No",
      field: "IBITNO",
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
          {item.IBITNO}
        </Typography>
      ),
    },
    {
      title: "Item Name",
      field: "IBPITD",
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
          {item.IBPITD}
        </Typography>
      ),
    },
    {
      title: "Qty",
      field: "IBORQA",
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
            value={item.IBORQA}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={"$"}
          />
        </Typography>
      ),
    },
    {
      title: "Unit",
      field: "IBPUUN",
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
          {item.IBPUUN}
        </Typography>
      ),
    },
    {
      title: "Conf dely date",
      field: "IBCODT",
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
          {item.IBCODT === "0--"
            ? moment(item.IADWDT).format("DD/MM/YYYY")
            : moment(item.IBCODT).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      {/* Grid */}
      <Formik initialValues="">{(props) => showForm(props)}</Formik>

      {/* Plan PR Table */}
      {/* <p>#Debug {JSON.stringify(prnumber)}</p> */}
      <MaterialTable
        id="root_pr"
        title={`PO Detail : ${prhead.vStatus}`}
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
        editable={{
          onRowUpdate: (newData, oldData) => {
            // console.log(JSON.stringify(oldData));

            if (oldData.IBPUSL < 70) {
              dispatch(
                genpoActions.changeConfirmDatePO(
                  oldData.IBPUNO,
                  oldData.IBPNLI,
                  moment(newData.IBCODT).format("YYYY-MM-DD")
                )
              );
            } else {
              alert("Status should not over than 70");
            }

            return new Promise((resolve, reject) => {
              // console.log("newValue: " + oldData.PR_IBPLPN + " " + oldData.PR_IBPLPS + " " + oldData.PR_SPORDER + " " + moment(newData.PR_IBDWDT).format("YYYY-MM-DD"));

              setTimeout(resolve, 1000);
            });
          },
        }}
      />
    </div>
  );
};
