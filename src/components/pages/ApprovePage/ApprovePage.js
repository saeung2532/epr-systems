import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import NumberFormat from "react-number-format";
import MaterialTable, { MTableToolbar } from "material-table";
import { Link, NavLink } from "react-router-dom";
import {
  makeStyles,
  withStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography, Grid, Paper, TextField, Button } from "@material-ui/core";
import { Card, CardMedia } from "@material-ui/core/";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Formik, Form, Field } from "formik";
import { red, green, purple } from "@material-ui/core/colors/";
import * as loginActions from "./../../../actions/login.action";
import * as prheadActions from "./../../../actions/prhead.action";
import * as prheadapproveActions from "./../../../actions/prheadapprove.action";
import * as prdetailActions from "./../../../actions/prdetail.action";
import * as companyActions from "./../../../actions/company.action";
import { server } from "../../../constants";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 60,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  margin: {
    marginTop: "0.4rem",
    marginRight: "0.4rem",
    // margin: theme.spacing(0.3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "40%", // 16:9
  },
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const prheadapproveReducer = useSelector(
    ({ prheadapproveReducer }) => prheadapproveReducer
  );
  const prdetailReducer = useSelector(({ prdetailReducer }) => prdetailReducer);

  const initialStateParams = {
    cono: "",
    divi: "",
    prno: "",
    page: "",
    approve: "",
    token: "",
  };

  const [params, setParams] = useState(initialStateParams);
  const initialStatePRHead = {
    vPRNumber: "",
    vDate: "",
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
    vApprove: "",
    vApproveSign: null,
    vApproveDate: moment(new Date()).format("YYYY-MM-DD"),
    vApprove1: "",
    vApproveSign1: null,
    vApproveDate1: null,
    vApprove2: "",
    vApproveSign2: null,
    vApproveDate2: null,
    vApprove3: "",
    vApproveSign3: null,
    vApproveDate3: null,
    vApprove4: "",
    vApproveSign4: null,
    vApproveDate4: null,
    vStatus: "",
    vReason: "",
  };
  const [prhead, setPRHead] = useState(initialStatePRHead);
  const [reject, setReject] = useState(false);
  const [approve, setApprove] = useState(false);
  const [approveDisable, setApproveDisable] = useState(true);
  const [rejectDisable, setRejectDisable] = useState(true);
  const [opendrawer, setOpenDrawer] = useState(false);

  const handleDraweropendrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    let params = props.match.params;
    let fromStatus = "15";
    let toStatus = "20";
    let statusDetail = "10";
    // console.log(params);

    localStorage.setItem(server.APPROVE_TOKEN_KEY, params.token);

    setParams({
      cono: params.cono,
      divi: params.divi,
      prno: params.prno,
      page: "approvempr",
      approve: params.approve,
      token: params.token,
    });

    // if (prheadapproveReducer.result === null) {
    // dispatch(companyActions.getCompanysWithConoDivi(params.cono, params.divi));
    // }

    dispatch(
      prheadapproveActions.getPRHeadApproves(
        params.cono,
        params.divi,
        params.prno,
        fromStatus,
        toStatus,
        params.approve,
        "approvempr"
      )
    );

    dispatch(
      prdetailActions.getPRDetailApproves(
        params.cono,
        params.divi,
        params.prno,
        statusDetail,
        "approvempr"
      )
    );
  }, []);

  useEffect(() => {
    const prheadapproves = prheadapproveReducer.result
      ? prheadapproveReducer.result
      : [];

    prheadapproves.map((item) => {
      setPRHead({
        ...prhead,
        vPRNumber: item.HD_IBPLPN,
        vDate: moment(item.HD_PURCDT).format("YYYY-MM-DD"),
        vWarehouse: item.HD_IBWHLO,
        vDepartment: item.HD_IBCOCE,
        vMonth: item.HD_IBMTH,
        vPlanUnPlan: item.HD_IBPRIP,
        vBU: item.HD_BU,
        vBuyer: item.HD_IBBUYE,
        vGroup: item.HD_IBMODL,
        vCAPNo: item.HD_CAPNO,
        vRequestor: item.HD_IBPURC,
        vRemark: item.HD_REM1,
        vApprove: item.HD_APP,
        vApproveSign: item.HD_APPSIGN,
        vApprove1: item.HD_APP1,
        vApproveSign1: item.HD_APPSIGN1,
        vApproveDate1: moment(item.HD_APPDT1).format("YYYY-MM-DD"),
        vApprove2: item.HD_APP2,
        vApproveSign2: item.HD_APPSIGN2,
        vApproveDate2: moment(item.HD_APPDT2).format("YYYY-MM-DD"),
        vApprove3: item.HD_APP3,
        vApproveSign3: item.HD_APPSIGN3,
        vApproveDate3: moment(item.HD_APPDT3).format("YYYY-MM-DD"),
        vApprove4: item.HD_APP4,
        vApproveSign4: item.HD_APPSIGN4,
        vApproveDate4: moment(item.HD_APPDT4).format("YYYY-MM-DD"),
        vStatus: item.HD_STATUS,
      });

      // console.log("item.HD_APPCK: " + item.HD_APPCK);
      if (item.HD_APPCK > 0 || item.HD_IBPLPN === "") {
        setApproveDisable(true);
        setRejectDisable(true);
      } else {
        setApproveDisable(false);
        setRejectDisable(false);
      }
    });
  }, [prheadapproveReducer]);

  const viewPR = () => {};

  // const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />;
  // const img = <img src={`data:image/jpeg;base64,${data}`} />;

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
              <Grid container item xs className={classes.margin}>
                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 120 }}
                  disabled={true}
                  margin="normal"
                  size="small"
                  id="vPRNumber"
                  label="PR Number"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vPRNumber}
                />

                <TextField
                  className={classes.margin}
                  style={{ width: "150px" }}
                  disabled={true}
                  margin="normal"
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vWarehouse"
                  label="Warehouse"
                  value={prhead.vWarehouse}
                />

                <TextField
                  className={classes.margin}
                  style={{ width: "150px" }}
                  disabled={true}
                  margin="normal"
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vCostcenter"
                  label="Costcenter"
                  value={prhead.vCostcenter}
                />

                <TextField
                  className={classes.margin}
                  style={{ width: "150px" }}
                  disabled={true}
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  id="vDepartment"
                  label="Department"
                  value={prhead.vDepartment}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 100 }}
                  disabled={true}
                  size="small"
                  id="vMonth"
                  label="Month"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vMonth}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 120 }}
                  required
                  disabled={true}
                  size="small"
                  id="vPlanUnPlan"
                  label="Plan / UnPlan"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vPlanUnPlan}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 120 }}
                  required
                  disabled={true}
                  size="small"
                  id="vBuyer"
                  label="Buyer"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vBuyer}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 120 }}
                  required
                  disabled={true}
                  size="small"
                  id="vGroup"
                  label="Group"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vGroup}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 100 }}
                  required
                  disabled={true}
                  size="small"
                  id="vBU"
                  label="Bu"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vBU}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 100 }}
                  disabled={true}
                  size="small"
                  id="vCAPNo"
                  label="CAP No"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vCAPNo}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 150 }}
                  required
                  disabled={true}
                  size="small"
                  id="vRequestor"
                  label="Requestor"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vRequestor}
                />

                <TextField
                  className={classes.margin}
                  style={{ maxWidth: 200 }}
                  disabled={true}
                  size="small"
                  id="vRemark"
                  label="Remark"
                  placeholder="Placeholder"
                  variant="outlined"
                  value={prhead.vRemark}
                />
              </Grid>

              <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.margin}
                    disabled={true}
                    fullWidth
                    size="small"
                    id="vApprove1"
                    label="Approve 1"
                    placeholder="Placeholder"
                    variant="outlined"
                    value={prhead.vApprove1}
                  />
                </Grid>

                <Grid item xs={12} sm={3} spacing={2}>
                  <TextField
                    className={classes.margin}
                    disabled={true}
                    fullWidth
                    size="small"
                    id="vApprove2"
                    label="Approve 2"
                    placeholder="Placeholder"
                    variant="outlined"
                    value={prhead.vApprove2}
                  />
                </Grid>

                <Grid item xs={12} sm={3} spacing={2}>
                  <TextField
                    className={classes.margin}
                    disabled={true}
                    fullWidth
                    size="small"
                    id="vApprove3"
                    label="Approve 3"
                    placeholder="Placeholder"
                    variant="outlined"
                    value={prhead.vApprove3}
                  />
                </Grid>

                <Grid item xs={12} sm={3} spacing={2}>
                  <TextField
                    className={classes.margin}
                    disabled={true}
                    fullWidth
                    required
                    size="small"
                    id="vApprove4"
                    label="Approve 4"
                    placeholder="Placeholder"
                    variant="outlined"
                    value={prhead.vApprove4}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.margin}
                    disabled={true}
                    fullWidth
                    type="date"
                    size="small"
                    id="vApproveDate1"
                    label="ApproveDate 1"
                    variant="outlined"
                    defaultValue={prhead.vApproveDate1}
                    value={prhead.vApproveDate1}
                    InputLabelProps={{ shrink: true, required: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={3} spacing={2}>
                  <TextField
                    className={classes.margin}
                    disabled={true}
                    fullWidth
                    type="date"
                    size="small"
                    id="vApproveDate2"
                    label="ApproveDate 2"
                    variant="outlined"
                    defaultValue={prhead.vApproveDate4}
                    value={prhead.vApproveDate2}
                    InputLabelProps={{ shrink: true, required: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={3} spacing={2}>
                  <TextField
                    className={classes.margin}
                    disabled={true}
                    fullWidth
                    type="date"
                    size="small"
                    id="vApproveDate3"
                    label="ApproveDate 3"
                    variant="outlined"
                    defaultValue={prhead.vApproveDate4}
                    value={prhead.vApproveDate3}
                    InputLabelProps={{ shrink: true, required: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={3} spacing={2}>
                  <TextField
                    className={classes.margin}
                    disabled={true}
                    fullWidth
                    type="date"
                    size="small"
                    id="vApproveDate4"
                    label="ApproveDate 4"
                    variant="outlined"
                    defaultValue={prhead.vApproveDate4}
                    value={prhead.vApproveDate4}
                    InputLabelProps={{ shrink: true, required: true }}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} sm={3}>
                  {/* <Example data={data} />
                <img src={`data:image/jpeg;base64,${data}`} /> */}
                  <Card>
                    <CardMedia
                      className={classes.media}
                      image={`data:image/jpeg;base64,${prhead.vApproveSign1}`}
                      title="Paella dish"
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={3} spacing={2}>
                  <Card>
                    <CardMedia
                      className={classes.media}
                      image={`data:image/jpeg;base64,${prhead.vApproveSign2}`}
                      title="Paella dish"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={3} spacing={2}>
                  <Card>
                    <CardMedia
                      className={classes.media}
                      image={`data:image/jpeg;base64,${prhead.vApproveSign3}`}
                      title="Paella dish"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={3} spacing={2}>
                  <Card>
                    <CardMedia
                      className={classes.media}
                      image={`data:image/jpeg;base64,${prhead.vApproveSign4}`}
                      title="Paella dish"
                    />
                  </Card>
                </Grid>
              </Grid>
              <br />

              <MaterialTable
                id="root_pr"
                title={`Approve mPR : ${prhead.vStatus}`}
                columns={columns}
                data={prdetailReducer.result ? prdetailReducer.result : []}
                components={{
                  Toolbar: (props) => (
                    <div>
                      <MTableToolbar {...props} />
                      <a
                        // href={
                        //   viewMPRDisable
                        //     ? ""
                        //     : `${process.env.REACT_APP_API_URL}/br_api/api_report/viewmpr/${params.cono}/${params.divi}/${params.prno}`
                        // }
                        href={`${process.env.REACT_APP_API_URL}/br_api/api_report/viewmpr/${params.cono}/${params.divi}/${params.prno}`}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          // disabled={viewMPRDisable}
                          startIcon={<SearchIcon />}
                          onClick={viewPR}
                        >
                          View PR
                        </Button>
                      </a>
                    </div>
                  ),
                }}
                options={{
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
                }}
              />
              <br />
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                item
                xs={12}
                spacing={2}
              >
                <Grid item xs={12} sm={3} spacing={2}>
                  <Card>
                    <CardMedia
                      className={classes.media}
                      image={`data:image/jpeg;base64,${prhead.vApproveSign}`}
                      title="Paella dish"
                    />
                    {`${prhead.vApprove}`}
                  </Card>
                </Grid>
              </Grid>

              <Grid
                className={classes.margin}
                container
                direction="row"
                justify="center"
                alignItems="center"
                item
                xs={12}
                spacing={2}
              >
                <Grid className={classes.margin}>
                  <Button
                    style={{ width: "100px" }}
                    disabled={approveDisable}
                    type="submit"
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<SendIcon />}
                    onClick={(event, rowData) => {
                      setApprove(true);
                      // setSelectedProduct("rowData");
                      // setOpenDialog(true);
                      // dispatch(itemActions.getItems(prhead.vWarehouse));
                      // dispatch(phgroupActions.getPHGroups(phgroup));
                    }}
                  >
                    Approve
                  </Button>
                </Grid>

                <Grid className={classes.margin}>
                  {/* <TextField
                    style={{ width: "200px" }}
                    placeholder="Reason"
                  ></TextField> */}
                  <TextField
                    style={{ width: "200px" }}
                    required
                    fullWidth
                    disabled="true"
                    margin="dense"
                    type="date"
                    size="small"
                    id="vApproveDate"
                    label="Approve Date"
                    variant="standard"
                    defaultValue={prhead.vApproveDate}
                    value={prhead.vApproveDate}
                    InputLabelProps={{ shrink: true, required: true }}
                  />
                </Grid>
              </Grid>

              <Grid
                className={classes.margin}
                container
                direction="row"
                justify="center"
                alignItems="center"
                item
                xs={12}
                spacing={2}
              >
                <Grid className={classes.margin}>
                  <Button
                    style={{ width: "100px" }}
                    disabled={rejectDisable}
                    type="submit"
                    size="small"
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={(event, rowData) => {
                      setReject(true);
                      // let phgroup = "PH";
                      // setSelectedProduct("rowData");
                      // setOpenDialog(true);
                      // dispatch(itemActions.getItems(prhead.vWarehouse));
                      // dispatch(phgroupActions.getPHGroups(phgroup));
                    }}
                  >
                    Reject
                  </Button>
                </Grid>

                <Grid className={classes.margin}>
                  <TextField
                    disabled={rejectDisable}
                    style={{ width: "200px" }}
                    placeholder="Reason"
                    value={prhead.vReason}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setPRHead({
                        ...prhead,
                        vReason: event.target.value,
                      });
                    }}
                  />
                </Grid>
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
          {item.PR_IBPLPS === "999" ? "" : item.PR_IBPLPS}
          {/* {item.PR_IBPLPS} */}
        </Typography>
      ),
    },
    {
      title: "Item No",
      field: "PR_IBITNO",
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
          {item.PR_IBITNO}
        </Typography>
      ),
    },
    {
      title: "Item Name",
      field: "PR_IBPITT",
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
      title: "Deli. Date",
      field: "PR_IBDWDT",
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
          {item.PR_IBDWDT ? moment(item.PR_IBDWDT).format("DD/MM/YYYY") : ""}
        </Typography>
      ),
    },
    // {
    //   title: "Stock Rem.",
    //   field: "MBSTQT",
    //   // type: "numeric",
    //   headerStyle: { maxWidth: 100, whiteSpace: "nowrap", textAlign: "left" },
    //   cellStyle: {
    //     textAlign: "right",
    //     borderLeft: 1,
    //     borderRight: 1,
    //     borderBottom: 1,
    //     borderTop: 1,
    //     borderColor: "#E0E0E0",
    //     borderStyle: "solid",
    //   },
    //   render: (item) => (
    //     <Typography variant="body1" noWrap>
    //       {item.MBSTQT}
    //     </Typography>
    //   ),
    // },
    {
      title: "Qty",
      field: "PR_IBORQA",
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
            value={item.PR_IBORQA}
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
    {
      title: "U/P",
      field: "PR_IBPUPR",
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
      title: "Sub Total",
      field: "PR_IBTOTA",
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
            value={item.PR_IBTOTA}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={"$"}
          />
        </Typography>
      ),
    },
    {
      title: "Vat Amt",
      field: "PR_VTCHARGE",
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
            value={item.PR_VTCHARGE}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={"$"}
          />
        </Typography>
      ),
    },
    {
      title: "Total",
      field: "PR_IBTOTA2",
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
            value={item.PR_IBTOTA2}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={"$"}
          />
        </Typography>
      ),
    },
    {
      title: "Curr.",
      field: "PR_IBCUCD",
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
          {item.PR_IBCUCD}
        </Typography>
      ),
    },
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
      field: "SASUNM",
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
          {item.SASUNM}
        </Typography>
      ),
    },
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
      title: "Cost Cen.",
      field: "PR_IBCOCE",
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
          {item.PR_IBCOCE}
        </Typography>
      ),
    },
    {
      title: "Cost Name",
      field: "S2TX15",
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
          {item.S2TX15}
        </Typography>
      ),
    },
    {
      title: "Group",
      field: "PR_IBMODL",
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
          {item.PR_IBMODL}
        </Typography>
      ),
    },
    {
      title: "Buyer",
      field: "PR_IBBUYE",
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
          {item.PR_IBBUYE}
        </Typography>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      {/* <p>#Debug prhead {JSON.stringify(prhead)}</p> */}
      {/* <p>#Debug params {JSON.stringify(params)}</p> */}

      <AppBar
        color={
          process.env.REACT_APP_IS_PRODUCTION === "1" ? "primary" : "secondary"
        }
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: opendrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="opendrawer drawer"
            onClick={handleDraweropendrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: opendrawer,
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Smart Approve : Monthly Plan - Ver {process.env.REACT_APP_VERSION}
            {/* <Typography variant="body1"> Approve </Typography> */}
            <Typography variant="body1">
              {loginActions.getApproveTokenCompany()}
            </Typography>
          </Typography>

          <div className={classes.grow} />
        </Toolbar>
      </AppBar>

      <Formik
        initialValues={{
          vPRNumber: prhead.vPRNumber,
          vApprove: "",
          vApproveSign: null,
          vApproveDate: moment(new Date()).format("YYYY-MM-DD"),
          vStatus: prhead.vStatus,
        }}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(values));
          let formData = new FormData();
          formData.append("vCono", params.cono);
          formData.append("vDivi", params.divi);
          formData.append("vPRNumber", prhead.vPRNumber);
          formData.append("vApprove", prhead.vApprove);
          // formData.append("vApprove", loginActions.getApproveTokenUsername());
          // formData.append("vApproveSign", prhead.vApproveSign);
          formData.append("vApproveDate", prhead.vApproveDate);
          formData.append("vStatus", prhead.vStatus);
          formData.append(
            "vNextStatus",
            prhead.vStatus === "15" ? "20" : prhead.vStatus
          );
          formData.append(
            "vReason",
            prhead.vReason ? prhead.vReason : "Reject"
          );

          if (approve) {
            // console.log("approve");
            if (prhead.vApprove === loginActions.getApproveTokenUsername()) {
              dispatch(
                prheadapproveActions.approveFinalPRHead(
                  formData,
                  props.history,
                  params.page
                )
              );
              setTimeout(() => {
                dispatch(
                  prheadapproveActions.checkApprovePRHead(
                    formData,
                    props.history,
                    params.page
                  )
                );
                alert("Approve complete.");
                setApprove(false);
              }, 1000);
            } else {
              alert("Approver not match.");
            }
          } else {
            // console.log("reject");
            dispatch(
              prheadapproveActions.rejectFinalPRHead(
                formData,
                props.history,
                params.page
              )
            );
            setTimeout(() => {
              dispatch(
                prheadapproveActions.checkApprovePRHead(
                  formData,
                  props.history,
                  params.page
                )
              );
              alert("Reject complete.");
              setPRHead({ ...initialStatePRHead });
              let statusDetail = "10";
              dispatch(
                prdetailActions.getPRDetailApproves(
                  params.cono,
                  params.divi,
                  params.prno,
                  statusDetail,
                  params.page
                )
              );
              setApproveDisable(true);
              setRejectDisable(true);
              setReject(false);
            }, 1000);
          }

          setTimeout(() => {
            let fromStatus = "15";
            let toStatus = "20";
            dispatch(
              prheadapproveActions.getPRHeadApproves(
                params.cono,
                params.divi,
                params.prno,
                fromStatus,
                toStatus,
                params.approve,
                params.page
              )
            );
          }, 1000);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
    </div>
  );
};
