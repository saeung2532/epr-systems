import React, { useEffect, useState, useMemo } from "react";
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
import { Typography, Grid, Paper, TextField, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Formik, Form, Field } from "formik";
import { red, green, purple } from "@material-ui/core/colors/";
import * as prnumberActions from "./../../../actions/prnumber.action";
import * as prheadActions from "./../../../actions/prhead.action";
import * as prdetailActions from "./../../../actions/prdetail.action";
import * as monthActions from "./../../../actions/month.action";
import * as statusActions from "./../../../actions/status.action";
import * as warehouseActions from "./../../../actions/warehouse.action";
import * as buActions from "./../../../actions/bu.action";
import * as departmentActions from "./../../../actions/department.action";
import * as costcenterActions from "./../../../actions/costcenter.action";
import * as phgroupActions from "./../../../actions/phgroup.action";
import * as sendemailActions from "./../../../actions/sendemail.action";

const document = "EPR";

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
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "6px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      },
    },
  },
});

const accent = purple["A200"]; // #E040FB
// const accent = purple.A200; // #E040FB (alternative method)

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const prnumberReducer = useSelector(({ prnumberReducer }) => prnumberReducer);
  const warehouseReducer = useSelector(
    ({ warehouseReducer }) => warehouseReducer
  );
  const departmentReducer = useSelector(
    ({ departmentReducer }) => departmentReducer
  );
  const buReducer = useSelector(({ buReducer }) => buReducer);
  const costcenterReducer = useSelector(
    ({ costcenterReducer }) => costcenterReducer
  );
  const phgroupReducer = useSelector(({ phgroupReducer }) => phgroupReducer);
  const monthReducer = useSelector(({ monthReducer }) => monthReducer);
  const statusReducer = useSelector(({ statusReducer }) => statusReducer);
  const prheadReducer = useSelector(({ prheadReducer }) => prheadReducer);
  const prdetailReducer = useSelector(({ prdetailReducer }) => prdetailReducer);
  const sendemailReducer = useSelector(
    ({ sendemailReducer }) => sendemailReducer
  );

  const initialStatePRNumber = {
    vPRSelectNumber: null,
    vPRNumberDesc: null,
    vWarehouse: null,
    vBU: null,
    vDepartment: null,
    vCostCenter: null,
    vPHGroup: null,
    vMonth: null,
    vStatus: null,
  };
  const [prnumber, setPRNumber] = useState(initialStatePRNumber);
  const initialStatePRHead = {
    vPRNumber: "",
    vDate: moment(new Date()).format("YYYY-MM-DD"),
    vWarehouse: "",
    vDepartment: "",
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
  };
  const [prhead, setPRHead] = useState(initialStatePRHead);
  const initialStateItemPRDetail = {
    vPRNumber: "",
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
  };
  const [itemprdetail, setItemPRDetail] = useState(initialStateItemPRDetail);

  const [search, setSearch] = useState(false);
  const [cancle, setCancle] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sendemaildisable, setSendEmailDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(prnumberActions.getEPRNumbersWithOutUser());
    dispatch(warehouseActions.getWarehouses());
    dispatch(buActions.getBUs());
    let phgroup = "PH";
    dispatch(phgroupActions.getPHGroups(phgroup));
    dispatch(monthActions.getMonths());
    dispatch(statusActions.getStatuses());
    prheadReducer.result = null;
    prdetailReducer.result = null;
  }, []);

  useEffect(() => {
    const sendemails = sendemailReducer.result ? [sendemailReducer.result] : [];
    // console.log(JSON.stringify(sendemails));
    sendemails.map((item) => {
      // console.log(item.message);
      setSendEmailDisable(false);
      setSuccess(true);
      setLoading(false);
    });
  }, [sendemailReducer]);

  const prnumberbuyers = useMemo(() =>
    prnumberReducer.result ? prnumberReducer.result : []
  );

  const warehouses = useMemo(() =>
    warehouseReducer.result ? warehouseReducer.result : []
  );

  const bus = useMemo(() => (buReducer.result ? buReducer.result : []));

  const costcenters = useMemo(() =>
    costcenterReducer.result ? costcenterReducer.result : []
  );

  const months = useMemo(() =>
    monthReducer.result ? monthReducer.result : []
  );

  const statuses = useMemo(() =>
    statusReducer.result ? statusReducer.result : []
  );

  const handleSearch = () => {
    setSearch(true);
    // console.log(JSON.stringify(prnumber));
    dispatch(
      prheadActions.getEPRHeadsMonitoring(
        prnumber.vPRSelectNumber,
        prnumber.vWarehouse,
        prnumber.vBU,
        prnumber.vCostCenter,
        prnumber.vMonth,
        prnumber.vStatus
      )
    );
    // dispatch(prdetailActions.getPRDetails(prnumber.vPRSelectNumber));
  };

  const handleCancel = () => {};

  const handleClose = () => {
    setItemPRDetail(initialStateItemPRDetail);
    setOpenDialog(false);
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
                <Grid item xs={12} sm={3} className={classes.margin}>
                  <Autocomplete
                    autoFocus
                    fullWidth
                    size="small"
                    id="vSelectPRNumberAuto"
                    options={prnumberbuyers}
                    getOptionLabel={(option) => option.PRNUMBER}
                    value={prnumber.vPRNumberDesc}
                    onChange={(event, values) => {
                      console.log(values);
                      if (values) {
                        setPRNumber({
                          ...prnumber,
                          vPRSelectNumber: values.HD_IBPLPN,
                          vPRNumberDesc: { PRNUMBER: values.PRNUMBER },
                        });
                      } else {
                        setPRNumber(initialStatePRNumber);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        id="vSelectPRNumber"
                        label="EPR Number"
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />

                  {/* <TextField
                    fullWidth
                    select
                    size="small"
                    variant="outlined"
                    // required
                    id="vSelectPRNumber"
                    label="EPR Number"
                    value={prnumber.vPRSelectNumber}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setPRNumber({
                        ...prnumber,
                        vPRSelectNumber:
                          event.target.value == "" ? null : event.target.value,
                      });
                    }}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option />
                    {prnumberbuyers.map((option) => (
                      <option key={option.ID} value={option.HD_IBPLPN}>
                        {option.PRNUMBER}
                      </option>
                    ))}
                  </TextField> */}
                </Grid>
                <Grid item xs={12} sm={1} className={classes.margin}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    variant="outlined"
                    // required
                    id="vWarehouse"
                    label="Warehouse"
                    value={prnumber.vWarehouse}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setPRNumber({
                        ...prnumber,
                        vWarehouse:
                          event.target.value == "" ? null : event.target.value,
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
                </Grid>
                <Grid item xs={12} sm={1} className={classes.margin}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    id="vBU"
                    label="BU"
                    placeholder="Placeholder"
                    variant="outlined"
                    value={prnumber.vBU}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setPRNumber({
                        ...prnumber,
                        vBU:
                          event.target.value == "" ? null : event.target.value,
                      });

                      dispatch(
                        costcenterActions.getCostCentersBU(event.target.value)
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
                </Grid>
                <Grid item xs={12} sm={1} className={classes.margin}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    variant="outlined"
                    // required
                    id="vCostcenter"
                    label="Costcenter"
                    value={prnumber.vCostcenter}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setPRNumber({
                        ...prnumber,
                        vCostCenter:
                          event.target.value == "" ? null : event.target.value,
                      });
                    }}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option />
                    {costcenters.map((option) => (
                      <option key={option.ID} value={option.S2AITM}>
                        {option.COSTCENTER}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={1} className={classes.margin}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    variant="outlined"
                    // required
                    id="vMonth"
                    label="vMonth"
                    value={prnumber.vMonth}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setPRNumber({
                        ...prnumber,
                        vMonth:
                          event.target.value == "" ? null : event.target.value,
                      });
                    }}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option />
                    {months.map((option) => (
                      <option key={option.ID} value={option.HD_IBMTH}>
                        {option.HD_IBMTH}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={1} className={classes.margin}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    variant="outlined"
                    // required
                    id="vStatus"
                    label="Status"
                    value={prnumber.vStatus}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setPRNumber({
                        ...prnumber,
                        vStatus:
                          event.target.value == "" ? null : event.target.value,
                      });
                    }}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option />
                    {statuses.map((option) => (
                      <option key={option.ID} value={option.HD_STATUS}>
                        {option.HD_STATUS}
                      </option>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs sm={1} className={classes.margin}>
                  <Button
                    fullWidth
                    size="medium"
                    id="vSearch"
                    variant="contained"
                    color="primary"
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item xs sm={1} className={classes.margin}>
                  <Button
                    fullWidth
                    size="medium"
                    id="vCancel"
                    variant="contained"
                    color="secondary"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    );
  };

  const showDialog = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    if (selectedProduct === null) {
      return "";
    }

    return (
      <Dialog
        open={openDialog}
        maxWidth="xl"
        scroll="paper"
        keepMounted
        onClose={() => {}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={handleSubmit}>
          {/* <DialogTitle id="alert-dialog-slide-title">
            MPR Number : {itemprdetail.vPRNumber}
          </DialogTitle> */}
          <DialogContent>
            <MaterialTable
              id="root_prdetail"
              title={`EPR Detail : ${itemprdetail.vPRNumber}`}
              columns={columnsdetail}
              data={prdetailReducer.result ? prdetailReducer.result : []}
              components={{
                Toolbar: (props) => (
                  <div>
                    <MTableToolbar {...props} />
                    <Grid className={(classes.margin, classes.wrapper)}>
                      <Button
                        // className={classes.wrapper}
                        fullWidth
                        disabled={sendemaildisable}
                        variant="contained"
                        color="primary"
                        startIcon={<MailOutlineIcon />}
                        onClick={(event, rowData) => {
                          setSendEmailDisable(true);
                          setSuccess(false);
                          setLoading(true);

                          dispatch(
                            sendemailActions.sendEmail(
                              itemprdetail.vPRNumber,
                              itemprdetail.vStatus,
                              document,
                              prnumber.vPRSelectNumber,
                              prnumber.vWarehouse,
                              prnumber.vBU,
                              prnumber.vCostCenter,
                              prnumber.vMonth,
                              prnumber.vStatus
                            )
                          );
                        }}
                      >
                        Send Email
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </Grid>
                  </div>
                ),
              }}
              options={{
                exportButton: true,
                // toolbar: false,
                paging: true,
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
                fixedColumns: {
                  // left: 2
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  const columns = [
    {
      title: "PR Number",
      field: "HD_IBPLPN",
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
          {item.HD_IBPLPN}
        </Typography>
      ),
    },
    {
      title: "Status",
      field: "HD_STATUS",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.HD_STATUS}
        </Typography>
      ),
    },
    {
      title: "Requestor",
      field: "HD_IBPURC",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
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
        <Typography variant="body1" noWrap alignSelf="baseline">
          {item.HD_IBPURC}
        </Typography>
      ),
    },
    {
      title: "Whs.",
      field: "HD_IBWHLO",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.HD_IBWHLO}
        </Typography>
      ),
    },
    {
      title: "Cost.",
      field: "HD_IBCOCE",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.HD_IBCOCE}
        </Typography>
      ),
    },
    {
      title: "PH Grp.",
      field: "HD_IBMODL",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.HD_IBMODL}
        </Typography>
      ),
    },
    {
      title: "Buyer",
      field: "HD_IBBUYE",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.HD_IBBUYE}
        </Typography>
      ),
    },
    {
      title: "Month",
      field: "HD_IBMTH",
      // type: "numeric",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.HD_IBMTH}
        </Typography>
      ),
    },
    {
      title: "Date",
      field: "HD_PURCDT",
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
          {moment(item.HD_PURCDT).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Plan/UnPln.",
      field: "HD_IBPRIP",
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
          {item.HD_IBPRIP}
        </Typography>
      ),
    },
    {
      title: "BU",
      field: "HD_BU",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.HD_BU}
        </Typography>
      ),
    },
    {
      title: "CAP. No",
      field: "HD_CAPNO",
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
          {item.HD_CAPNO}
        </Typography>
      ),
    },
    {
      title: "Approve1",
      field: "HD_APP1",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.HD_APP1}
        </Typography>
      ),
    },

    {
      title: "Approve Date1",
      field: "HD_APPDT1",
      // type: "numeric",
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
          {item.HD_APPDT1 === "0"
            ? ""
            : moment(item.HD_APPDT1).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Approve2",
      field: "HD_APP2",
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
          {item.HD_APP2}
        </Typography>
      ),
    },
    {
      title: "Approve Date2",
      field: "HD_APPDT2",
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
          {item.HD_APPDT2 === "0"
            ? ""
            : moment(item.HD_APPDT2).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Approve3",
      field: "HD_APP3",
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
          {item.HD_APP3}
        </Typography>
      ),
    },
    {
      title: "Approve Date3",
      field: "HD_APPDT3",
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
          {item.HD_APPDT3 === "0"
            ? ""
            : moment(item.HD_APPDT3).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Approve4",
      field: "HD_APP4",
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
          {item.HD_APP4}
        </Typography>
      ),
    },
    {
      title: "Approve Date4",
      field: "HD_APPDT4",
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
          {item.HD_APPDT4 === "0"
            ? ""
            : moment(item.HD_APPDT4).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
  ];

  const columnsdetail = [
    {
      title: "Confirm",
      field: "PR_CONFIRM",
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
          {item.PR_CONFIRM}
        </Typography>
      ),
    },
    {
      title: "Line",
      field: "PR_IBPLPS",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "center" },
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
      title: "Status",
      field: "PR_STATUS",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "center" },
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
          {item.PR_STATUS}
        </Typography>
      ),
    },
    {
      title: "GRN",
      field: "GRN",
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
          {item.GRN}
        </Typography>
      ),
    },
    {
      title: "PO Number",
      field: "PR_IBPUNO",
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
          {item.PR_IBPUNO}
        </Typography>
      ),
    },
    {
      title: "Item No",
      field: "PR_IBITNO",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "left" },
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
          {item.PR_IBITNO}
        </Typography>
      ),
    },
    {
      title: "Item Name",
      field: "PR_IBPITT",
      // type: "numeric",
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "left" },
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
          {item.PR_IBPUUN}
        </Typography>
      ),
    },
    {
      title: "Qty",
      field: "PR_IBORQA",
      headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "right" },
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
      headerStyle: { maxWidth: 70, whiteSpace: "nowrap", textAlign: "right" },
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
    // {
    //   title: "PR_IBPTCD",
    //   field: "PR_IBPTCD",
    //   headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
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
    //       {item.PR_IBPTCD}
    //     </Typography>
    //   ),
    // },
    {
      title: "Vat.",
      field: "PR_IBVTCD",
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
    //   title: "PR_IBPRIP",
    //   field: "PR_IBPRIP",
    //   // type: "numeric",
    //   headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
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
    //       {item.PR_IBPRIP}
    //     </Typography>
    //   ),
    // },
    {
      title: "Order Typ.",
      field: "PR_IBORTY",
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
      title: "Deli. Date",
      field: "PR_IBDWDT",
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
          {item.HD_APPDT2 === "0"
            ? ""
            : moment(item.PR_IBDWDT).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      title: "Vat. Claim",
      field: "PR_VTCLM",
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
            value={item.PR_VTCLM}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={"$"}
          />
        </Typography>
      ),
    },
    {
      title: "PR_REM3",
      field: "PR_REM3",
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
          {item.PR_REM3}
        </Typography>
      ),
    },
    {
      title: "PR_REM5",
      field: "PR_REM5",
      headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
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
            value={item.PR_REM5}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={"$"}
          />
        </Typography>
      ),
    },
    // {
    //   title: "PR_IBPNLI",
    //   field: "PR_IBPNLI",
    //   headerStyle: { maxWidth: 150, whiteSpace: "nowrap", textAlign: "center" },
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
    //       {item.PR_IBPNLI}
    //     </Typography>
    //   ),
    // },
    {
      title: "Supp. No",
      field: "PR_IBSUNO",
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
    {
      title: "Supp. Name",
      field: "IDSUNM",
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
          {item.IDSUNM}
        </Typography>
      ),
    },

    // {
    //   title: "Buyer",
    //   field: "PR_IBBUYE",
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
    //       {item.PR_IBBUYE}
    //     </Typography>
    //   ),
    // },
    // {
    //   title: "Cost Cen.",
    //   field: "PR_IBCOCE",
    //   headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
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
    //       {item.PR_IBCOCE}
    //     </Typography>
    //   ),
    // },
    // {
    //   title: "Cost Name",
    //   field: "S2TX15",
    //   headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "center" },
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
    //       {item.S2TX15}
    //     </Typography>
    //   ),
    // },
  ];

  return (
    <div className={classes.root}>
      {/* Grid */}
      {/* <p>#Debug prnumber {JSON.stringify(prnumber)}</p> */}
      <Formik initialValues="">{(props) => showForm(props)}</Formik>

      {/* Plan PR Table */}
      <MaterialTable
        id="root_pr"
        title={`EPR Monitoring`}
        columns={columns}
        data={prheadReducer.result ? prheadReducer.result : []}
        options={{
          // exportButton: true,
          // toolbar: false,
          pageSize: 10,
          paging: true,
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
            // whiteSpace: "normal",
            // wordWrap: "break-word",
            // wordBreak: "break-all"
          },
          fixedColumns: {
            // left: 2
          },
        }}
        actions={[
          (rowData) => ({
            icon: "search",
            tooltip: "Search row",
            iconProps: { color: "primary" },
            onClick: (event, rowData) => {
              // console.log("rowData: " + JSON.stringify([rowData]));
              let data = [rowData];
              data.map((item) => {
                setItemPRDetail({
                  ...itemprdetail,
                  vPRNumber: item.HD_IBPLPN,
                  vStatus: item.HD_STATUS,
                });
                dispatch(
                  prdetailActions.getEPRDetailsMonitoring(item.HD_IBPLPN)
                );
              });
              setSelectedProduct("rowData");
              setOpenDialog(true);
            },
          }),
        ]}
      />

      {/* Dialog */}
      <Formik>{(props) => showDialog(props)}</Formik>
    </div>
  );
};
