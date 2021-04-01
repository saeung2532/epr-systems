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
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";
import PrintIcon from "@material-ui/icons/Print";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Formik, Form, Field } from "formik";
import { red, green, purple } from "@material-ui/core/colors/";
import * as loginActions from "./../../../actions/login.action";
import * as prnumberActions from "./../../../actions/prnumber.action";
import * as prheadActions from "./../../../actions/prhead.action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 60,
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
  const prnumberReducer = useSelector(({ prnumberReducer }) => prnumberReducer);
  const prheadReducer = useSelector(({ prheadReducer }) => prheadReducer);

  const initialStatePRNumber = {
    vPRSelectNumber: null,
    vWarehouse: null,
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

  useEffect(() => {
    let status = "20";
    dispatch(prnumberActions.getEPRNumbersUser(status));
    prheadReducer.result = null;
  }, []);

  const prnumberbuyers = useMemo(() =>
    prnumberReducer.result ? prnumberReducer.result : []
  );

  const handleSearch = () => {
    setSearch(true);
    dispatch(
      prheadActions.getEPRHeadsMonitoring(
        prnumber.vPRSelectNumber,
        prnumber.vWarehouse,
        prnumber.vDepartment,
        prnumber.vMonth,
        prnumber.vStatus
      )
    );
    // dispatch(prdetailActions.getPRDetails(prnumber.vPRSelectNumber));
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
                  </TextField>
                </Grid>

                <Grid className={classes.margin}>
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
                      color="primary"
                      // disabled={viewMPRDisable}
                      startIcon={<SearchIcon />}
                    >
                      View EPR
                    </Button>
                  </a>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <div className={classes.root}>
      {/* Grid */}
      {/* <p>#Debug prnumber {JSON.stringify(prnumber)}</p> */}
      <Formik>{(props) => showForm(props)}</Formik>
    </div>
  );
};
